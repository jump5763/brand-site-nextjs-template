# Structured Data Standard

Status: normative

This document defines the rules for implementing and testing JSON-LD structured data in Brand Sites. The terms **MUST**, **MUST NOT**, **SHOULD**, and **MAY** have their BCP 14 meanings when written in uppercase.

## Core rules

1. JSON-LD **MUST** describe only real, visible, and confirmed page information.
2. Mutable content such as menus, FAQs, prices, and actions **MUST** be derived from the page business data or an explicitly confirmed Site configuration.
3. Every supported entity **MUST** have a data contract, projection tests, and final HTML tests.

Missing information **MUST** be omitted or confirmed before serving. Agents **MUST NOT** invent ratings, reviews, dietary properties, fees, minimum order thresholds, or action capabilities.

## Data responsibilities

| Data | Responsibility | Rule |
|---|---|---|
| Entity Declaration | Declare `@type`, stable `@id`, URL, name, description, and confirmed facts | **MUST NOT** contain collections derived from page Sections |
| Page Business Data | Source the content rendered by the page: products, prices, FAQs, locations, and actions | UI and JSON-LD **MUST** consume the same source |
| Entity Projection | Convert declarations and business data into Schema.org entities | **MUST** be deterministic and use explicit inputs only |

The following properties **MUST** be projected rather than statically duplicated:

```text
Menu Section  → hasMenuSection
Menu Item     → hasMenuItem
Product Price → offers
FAQ Item      → mainEntity
```

## Scored canonical properties

The scoring contract is a completeness target, not permission to fabricate data. A property counts only when it is valid for the entity and backed by visible or confirmed facts.

### Restaurant on the homepage

| Tier | Canonical properties | Rule |
|---|---|---|
| Required | `name`, `address` | Both **MUST** be present for rich-result eligibility |
| High | `telephone`, `openingHoursSpecification`, `geo`, `url` | All four are required for the high-impact tier |
| Mid | `servesCuisine`, `priceRange`, `menu`, `aggregateRating` | Three or four are required for the highest completeness tier |
| Low | `image`, `acceptsReservations` | Context only; never infer either property |

Tier calculation: after the required hard-fail gate, tier 1 requires at most one high property; tier 2 requires two or three high properties; tier 3 requires all four high properties and zero to two mid properties; tier 4 requires all four high properties and at least three mid properties.

If the implementation uses a Schema.org successor or alias such as `hasMenu` instead of the scorer's `menu` name, the project **MUST** define and test the compatibility mapping. Do not emit duplicate equivalent properties without a deliberate compatibility decision.

### MenuItem on the menu page

The wrapper `Menu` and `MenuSection` provide context. Completeness is calculated across MenuItems.

| Tier | Canonical properties | Coverage |
|---|---|---|
| Required | `name` | 100% of MenuItems |
| High | `offers` (`price` + `priceCurrency`), `description` | Each passing property on at least 80% of MenuItems |
| Mid | `image`, `suitableForDiet` | Each passing property on at least 80% of MenuItems |
| Low | `nutrition`, `menuAddOn`, `identifier` | Context only |

The implementation **MUST** report numerator and denominator for every percentage-based property. A missing `suitableForDiet` value **MUST** remain missing when product-level dietary facts are not confirmed.

Tier calculation: after the required 100% name gate, tier 1 has zero high properties; tier 2 has one high property; tier 3 has both high properties and zero to one mid property; tier 4 has both high properties and both mid properties.

### FAQPage

| Tier | Canonical properties | Rule |
|---|---|---|
| Required | `Question.name`, `Question.acceptedAnswer.text` | Every Question **MUST** have both |
| High | `acceptedAnswer.url`, `inLanguage` | Both are needed for the high-impact tier |
| Mid | `dateCreated`, Question `image` | Add only when the fact or media is real |
| Low | `acceptedAnswer.author`, `acceptedAnswer.upvoteCount` | Do not add to site-authored FAQ without facts |

FAQPage **MUST** only describe authoritative, site-authored Q&A. User-generated questions belong to QAPage. `mainEntity` **MUST** equal the FAQ items visible on the current page.

Tier calculation: after the required Question gate, tier 1 has zero high properties; tier 2 has one high property; tier 3 has both high properties and zero to one mid property; tier 4 has both high properties and both mid properties.

### OrderAction

| Tier | Canonical properties | Rule |
|---|---|---|
| Required | `target.urlTemplate`, `target.actionPlatform` | Every required target property **MUST** be present |
| High | `deliveryMethod`, `priceSpecification.price` | Both are needed for the high-impact tier |
| Mid | `target.inLanguage`, `priceSpecification.eligibleQuantity.minValue` | Add only from confirmed ordering facts |
| Low | `result` | Context only |

`priceSpecification.price` **MUST** represent a confirmed action or fee price, not an arbitrary menu item price. `eligibleQuantity.minValue` **MUST** represent a confirmed minimum quantity. If either fact is unavailable, omit the property or block the explicitly declared action; never use a guessed default.

Tier calculation: after the required target gate, tier 1 has zero high properties; tier 2 has one high property; tier 3 has both high properties and zero to one mid property; tier 4 has both high properties and both mid properties.

## IDs, URLs, money, and output

- `@id` **MUST** be stable and **MUST NOT** depend on array order, random values, build time, or deployment paths.
- The same real entity **MUST** reuse the same `@id` across pages.
- `@id`, `url`, `image`, `logo`, `sameAs`, Offer URLs, and Action targets **MUST** be absolute HTTPS URLs.
- `sameAs` **MUST** contain only confirmed official URLs.
- Amount units and ISO 4217 currency codes **MUST** be explicit; conversion **MUST** be deterministic.
- Generation logic **MUST NOT** hard-code a Site domain, Place ID, currency, or third-party platform value.
- JSON-LD **MUST** be server-rendered in a native `<script type="application/ld+json">`; `next/script` **MUST NOT** be used.
- Serialized JSON-LD **MUST** escape `<` as at least `\u003c`.
- A page without an Entity Declaration **MUST NOT** emit an empty script, and the same entity **MUST** appear only once per page.

## Test contract

Every supported entity **MUST** have three test layers:

1. **Data Contract tests** — reject unsupported types, missing required fields, invalid URLs/IDs/money, placeholders, and static derived collections.
2. **Projection tests** — verify field mappings, exact content, stable IDs, required-input failures, canonical-property coverage, and the tier calculation for the applicable entity. MenuItem percentage checks **MUST** use the 100%/80% rules above.
3. **Final HTML tests** — parse real Next.js output, verify route success, script count, JSON validity, entity identity, derived collections, no duplicates, no empty scripts, and safe escaping.

Each scoring-contract test **MUST** run the required hard-fail gate first, count only the canonical property names at the specified entity level, report field numerator/denominator where applicable, and assert the resulting tier. A semantically valid alias that the scorer does not recognize **MUST** be treated as a compatibility decision, not silently counted.

Minimum change-to-test mapping:

| Change | Required checks |
|---|---|
| FAQ content or FAQPage metadata | FAQ contract, projection, canonical-property assertions, `/faq` HTML |
| OrderAction or ordering facts | Action contract, required/high/mid property assertions, homepage HTML |
| Menu or price | Menu contract, MenuItem coverage, `/menu` HTML |
| Generator or serializer | All affected projections, HTML, typecheck, lint, and build |

Final HTML tests **MUST NOT** inspect only source objects or the Schema API. Deployment-time Rich Results, GSC, and external validator checks remain operational verification; they are not evidence that an Agent may claim without actually running them.

## Completion check

Before reporting completion, the Agent **MUST** confirm:

- every emitted property is real, visible, and confirmed;
- mutable properties come from page business data or explicit confirmed configuration;
- canonical property names and coverage thresholds are satisfied or the gap is reported;
- IDs, URLs, money, and serialization are valid;
- the data contract, projection tests, and final HTML tests pass; and
- executed, omitted, and still-unconfirmed checks are reported accurately.
