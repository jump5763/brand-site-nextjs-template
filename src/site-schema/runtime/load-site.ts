import { cache } from "react";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { assertValidSiteDocument } from "./validate-site";

import type { SiteDocument } from "../generated/types";
import { parseSiteJson } from "./validator.mjs";
export type { SiteDocument } from "../generated/types";
const currentPath = resolve(process.cwd(), "src/site-schema/current.json");

async function readAndValidate(filePath: string): Promise<SiteDocument> {
  return assertValidSiteDocument(parseSiteJson(readFileSync(filePath, "utf8")));
}

export const loadSite = cache(async (): Promise<SiteDocument> =>
  readAndValidate(currentPath),
);
export const loadSiteFromFile = cache(
  async (filePath: string): Promise<SiteDocument> =>
    readAndValidate(resolve(filePath)),
);
export const loadSiteSchema = loadSite;
export const loadSiteSchemaFromFile = loadSiteFromFile;
