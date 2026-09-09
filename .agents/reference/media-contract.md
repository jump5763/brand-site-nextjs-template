# Media Contract

Media references point to ordinary files served from the template's `public/` directory.

## Required fields

- `src`: a stable path beginning with `/media/` or `/assets/`.
- `alt`: meaningful alternative text, or an explicit empty string for decorative media.
- `width` and `height`: source dimensions when the Contract requires them.
- `format`: a supported local image format such as WebP, PNG, JPEG, or SVG where the renderer permits it.

## Rules

- Resolve the path against `public/`; do not use `../`, `file://`, data URLs, or unstable external URLs.
- Keep the asset at a stable path and preserve its aspect ratio unless the Section Contract explicitly defines a crop.
- Do not claim an asset exists until the corresponding file is present under `public/media/` or `public/assets/`.
- The renderer must retain accessible alt text and must not use a decorative image as the only source of essential information.
- Validate the current Schema after changing media references.

