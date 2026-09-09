// Shared by the CLI and server loader; only generated contracts are compiled.
import Ajv from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import schema from "../generated/site-schema.json" with { type: "json" };
import coreSchema from "../contracts/site-schema.schema.json" with { type: "json" };

const pointer = (base, key) =>
  `${base}/${String(key).replaceAll("~", "~0").replaceAll("/", "~1")}`;
const object = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const reservedPaths = ["/api", "/_next", "/admin", "/auth", "/checkout"];
const stable = (value) =>
  Array.isArray(value)
    ? value.map(stable)
    : object(value)
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((key) => [key, stable(value[key])]),
        )
      : value;

export class SiteValidationError extends Error {
  constructor(diagnostics) {
    super(`Site Schema validation failed (${diagnostics.length} errors)`);
    this.name = "SiteValidationError";
    this.diagnostics = diagnostics;
  }
}

export function parseSiteJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new SiteValidationError([
      { ruleId: "SITE_JSON_INVALID", pointer: "/", message: "Invalid JSON" },
    ]);
  }
}

const coreValidator = addFormats(
  new Ajv({ allErrors: true, strict: false }),
).compile(coreSchema);
export function validateSiteCore(value) {
  const valid = coreValidator(value);
  return { valid, errors: valid ? [] : structuredClone(coreValidator.errors) };
}

export function createSiteValidator(rootSchema) {
  const ajv = addFormats(new Ajv({ allErrors: true, strict: false }));
  ajv.addSchema(rootSchema);
  const sections = new Map(
    rootSchema.$defs.section.oneOf.map(({ $ref }) => {
      const definition = rootSchema.$defs[$ref.split("/").at(-1)];
      return [
        `${definition.properties.type.const}.${definition.properties.variant.const}`,
        ajv.getSchema(rootSchema.$id + $ref),
      ];
    }),
  );
  return (value) => {
    const errors = [];
    const add = (ruleId, at, message) =>
      errors.push({ ruleId, pointer: at || "/", message });
    const appendSchemaErrors = (items, prefix = "", rule = "") => {
      for (const error of items ?? []) {
        let at = prefix + error.instancePath;
        if (error.keyword === "required")
          at = pointer(at, error.params.missingProperty);
        if (error.keyword === "additionalProperties")
          at = pointer(at, error.params.additionalProperty);
        add(
          rule || `CORE_${error.keyword.toUpperCase()}`,
          at,
          error.message ?? "Invalid value",
        );
      }
    };
    const core = validateSiteCore(value);
    if (!core.valid) {
      appendSchemaErrors(core.errors);
      return { valid: false, errors };
    }
    const pageIds = new Set(value.pages.map((page) => page.id));
    const seenIds = new Set(),
      seenPaths = new Set(),
      products = new Map();
    value.pages.forEach((page, i) => {
      const at = `/pages/${i}`;
      if (seenIds.has(page.id))
        add("PAGE_ID_DUPLICATE", at + "/id", "Duplicate page id");
      if (seenPaths.has(page.path))
        add("PAGE_PATH_DUPLICATE", at + "/path", "Duplicate page path");
      seenIds.add(page.id);
      seenPaths.add(page.path);
      if (!page.path.startsWith("/") || page.path.includes("#"))
        add(
          "PAGE_PATH_INVALID",
          at + "/path",
          "Page path must be absolute and contain no fragment",
        );
      if (
        reservedPaths.some(
          (path) => page.path === path || page.path.startsWith(path + "/"),
        )
      )
        add(
          "PAGE_PATH_RESERVED",
          at + "/path",
          "Page path is reserved by the application",
        );
      const sectionIds = new Set();
      page.sections.forEach((section, j) => {
        const sectionAt = `${at}/sections/${j}`;
        if (sectionIds.has(section.id))
          add(
            "SECTION_ID_DUPLICATE",
            sectionAt + "/id",
            "Duplicate section id on page",
          );
        sectionIds.add(section.id);
        const identity = `${section.type}.${section.variant}`;
        const validate = sections.get(identity);
        if (!validate)
          add(
            "SECTION_UNKNOWN",
            sectionAt + "/type",
            `Unknown section ${identity}`,
          );
        else if (!validate(section))
          appendSchemaErrors(
            validate.errors,
            sectionAt,
            "SECTION_CONTRACT_INVALID",
          );
        for (const collection of [
          section.content.products,
          section.content.categories,
        ]) {
          if (!Array.isArray(collection)) continue;
          for (const item of collection) {
            const candidates =
              object(item) && Array.isArray(item.products)
                ? item.products
                : [item];
            for (const product of candidates) {
              if (
                !object(product) ||
                typeof product.id !== "string" ||
                !(product.title || product.name)
              )
                continue;
              const fingerprint = JSON.stringify(stable(product));
              if (
                products.has(product.id) &&
                products.get(product.id) !== fingerprint
              )
                add(
                  "PRODUCT_DEFINITION_CONFLICT",
                  sectionAt + "/content",
                  `Conflicting product definition for ${product.id}`,
                );
              products.set(product.id, fingerprint);
            }
          }
        }
      });
    });
    // Preserve existing link/media semantic checks; asset resolution is separate.
    const walk = (node, at) => {
      if (Array.isArray(node)) {
        node.forEach((child, i) => walk(child, pointer(at, i)));
        return;
      }
      if (!object(node)) return;
      if (node.kind === "image") {
        if (
          typeof node.path !== "string" ||
          !(node.path.startsWith("/media/") || node.path.startsWith("https://"))
        )
          add(
            "MEDIA_PATH_INVALID",
            pointer(at, "path"),
            "Image path must use /media/ or https://",
          );
        if (
          typeof node.width !== "number" ||
          typeof node.height !== "number" ||
          node.width < 1 ||
          node.height < 1
        )
          add(
            "MEDIA_DIMENSIONS_REQUIRED",
            at,
            "Image width and height must be positive numbers",
          );
      }
      if (node.kind === "page") {
        if (!pageIds.has(node.pageId))
          add("LINK_PAGE_UNKNOWN", pointer(at, "pageId"), "Unknown page id");
        if (
          node.fragment !== undefined &&
          (typeof node.fragment !== "string" ||
            !/^[A-Za-z0-9_-]+$/.test(node.fragment))
        )
          add(
            "LINK_FRAGMENT_INVALID",
            pointer(at, "fragment"),
            "Invalid fragment",
          );
      }
      for (const [key, child] of Object.entries(node))
        walk(child, pointer(at, key));
    };
    walk(value, "");
    return errors.length
      ? { valid: false, errors }
      : { valid: true, value, errors: [] };
  };
}

export const validateSiteDocument = createSiteValidator(schema);
export function assertValidSiteDocument(value) {
  const result = validateSiteDocument(value);
  if (!result.valid) throw new SiteValidationError(result.errors);
  return result.value;
}
