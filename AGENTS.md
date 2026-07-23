# AGENTS.md — Developing Skelet.css

This repository **is** the Skelet.css framework source. If you are working here, you are
developing the framework itself. Read this before changing any file in `css/`.

> **Building a *site* with Skelet, not editing the framework?** You want the usage
> reference, not this file: [`docs/using/skelet.md`](docs/using/skelet.md).

---

## What Skelet is

A lightweight, classless-first CSS framework for modern browsers. Plain, untranspiled CSS —
**no build step, no JavaScript runtime, no npm dependencies.** It styles selected native
elements, adds a token-driven component layer, and provides attribute-based grid/flex
primitives (`<x-grid>`, `<x-flex>`) instead of a large utility-class API.

## Source of truth

When docs, fixtures, and CSS disagree, trust in this order:

1. `css/skelet.css` — core framework behavior.
2. `css/skelet-overlay.css`, `css/skelet-tooltips.css` — optional add-ons.
3. A current, focused fixture in `tests/`.
4. `docs/`, `skelet.html`, `README.md` — scaffolding that can lag the CSS.

The checked-in CSS is authoritative for framework behavior. npm and jsDelivr mechanically
use `package.json#version`, so never publish while that version disagrees with the CSS banner
or release tag (see [releasing](docs/developing/releasing.md)).

## Repo map

```
css/
  skelet.css            Core framework
  skelet-tooltips.css   Optional add-on — CSS-only tooltips.
  skelet-overlay.css    Optional add-on — <dialog> / Popover visual treatment.
  app.css               Consumer override layer (loaded last). Shipped as a starter.
tests/                  Manual browser fixtures — visual, not assertion-based.
docs/
  using/skelet.md       The "build a site WITH Skelet" API reference (for consumers).
  developing/           You are here — how the framework is built and shipped:
    architecture.md       file map, section order, cascade strategy, distribution
    releasing.md          versioning, npm publish, CDN, downstream sync
skelet.html             Accessible HTML starter (ships to consumers).
```

## Rules of engagement (framework dev)

1. **Keep the section-banner order.** `skelet.css` has no `@layer`; the cascade is managed
   by source order + low-specificity `:where()`. Add rules inside the matching banner
   section, not at the end of the file. See [architecture](docs/developing/architecture.md).
2. **Token before literal.** New values go through the `--*` custom-property system. Reuse an
   existing `--space-*` / `--type-*` / color / control token before inventing one; if you
   add a token, follow the existing naming.
3. **Keep specificity low.** Match the file's `:where()` / attribute-selector style so
   consumer overrides remain straightforward. Existing legacy/state rules include
   `!important` and an ID selector; do not add new ones or create a specificity ratchet.
4. **Modern platform features are intentional.** Nesting, `light-dark()`, relative colors,
   `:has()`, container queries, `field-sizing`, subgrid, `@starting-style`, Popover API,
   logical properties. No transpilation or polyfills — a browser-baseline change is a
   deliberate decision, not an incidental one.
5. **Add-ons stay separate and opt-in.** Tooltip and overlay behavior lives in its own
   core-dependent file; don't fold it into core.
6. **Every component change gets a fixture.** Add or update the matching file in `tests/` and
   verify it in a browser (small / medium / base widths, keyboard focus, dark mode, reduced
   motion). Fixtures are how this repo is validated.
7. **Bump the version deliberately.** The CSS banner is the canonical framework/API
   version; `package.json#version` controls npm/jsDelivr and the git tag identifies the source
   release. Don't publish until all three agree; read
   [releasing](docs/developing/releasing.md).
8. **Keep the consumer doc in sync.** If you change a public API, update
   [`docs/using/skelet.md`](docs/using/skelet.md) in the same change.
