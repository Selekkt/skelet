# Architecture

How the Skelet.css source is organized and distributed. For the public API, see
[`../using/skelet.md`](../using/skelet.md); for shipping it, see
[releasing](releasing.md).

## Files and distribution boundary

`package.json#files` defines the npm package boundary. npm also includes `package.json`,
`README.md`, and `LICENSE` automatically.

| File or directory | Role | In npm package? |
| --- | --- | --- |
| `css/skelet.css` | Core framework — the product | Yes (`main` / `style`) |
| `css/skelet-tooltips.css` | Optional, core-dependent tooltip treatment | Yes, opt-in |
| `css/skelet-overlay.css` | Optional, core-dependent `<dialog>` / Popover treatment | Yes, opt-in |
| `css/app.css` | Consumer override starter, loaded last | Yes |
| `skelet.html` | Accessible HTML starter | Yes |
| `img/`, `js/` | Assets/placeholders used by the starter | Yes |
| `docs/using/` | Consumer API reference shipped with the package | Yes |
| `AGENTS.md`, `docs/developing/` | Framework-contributor guidance | No |
| `tests/`, `layouts/` | Manual fixtures and source examples | No |
| `.github/` | Repository automation and sync configuration | No |

Source archives and git clones still contain the full repository. “Not in npm” does not
mean “not in the source tree.” Verify the boundary with `npm pack --dry-run --json` before
every release.

Core has no runtime dependencies. Inter and Font Awesome referenced by the starter are
optional external assets, not framework requirements. The add-ons consume tokens from core,
so load `skelet.css` first and keep add-on/core versions aligned.

## Conceptual model versus physical order

The framework can be understood as five conceptual layers:

1. **Base / reset** — box sizing, zeroed margins, responsive media, focus,
   hidden/disabled/inert states, selected native-element defaults.
2. **Tokens** — public `--*` custom properties for color, type, space, controls, tables,
   accessibility, easing, and add-ons.
3. **Native controls / components** — links, buttons, form fields, tables, lists, code,
   progress/meter, and rules.
4. **Attribute-driven layout** — `<x-grid>`, `<x-flex>`, subgrid, alignment, order, and
   responsive `-s` / `-m` suffixes.
5. **Utilities** — sizing, text, visibility, and scrolling helpers.

That is a mental model, not the literal source order. `css/skelet.css` physically starts
with root variables, then reset/basics/typography. Component sections follow, then grid,
flex, alignment, utilities, easing, and keyframes. Additional token blocks live beside the
component they configure. Preserve the existing comment-banner order when editing the file.

Tooltips and overlays form a separate opt-in layer in their own stylesheets.

## Cascade strategy — no `@layer`

Skelet does **not** use `@layer`. The cascade is managed with:

- **Source order** — related rules stay inside their section banner. Add a rule in the
  matching section rather than appending it to the file.
- **Generally low specificity** — many selectors use `:where()` and attributes so normal
  consumer overrides remain straightforward.
- **Tokens** — the preferred customization surface avoids selector competition entirely.

Loading `app.css` last helps only when importance and specificity permit it; it is not an
absolute override guarantee. Core contains legacy/state exceptions, including
`!important` declarations and the `#app` selector. Preserve compatibility by avoiding new
ID selectors, new `!important` declarations, and unnecessary specificity escalation.

Consumer load order is: optional fonts/icons → `skelet.css` → add-ons → `app.css`.

## Token system

Public configuration is exposed primarily through CSS custom properties. Most shared
values are declared on `:where(html)` and inherit into components. Some component tokens
are declared directly on the component selector, such as progress/meter bar tokens; an
inherited root value does not beat a declaration on the element itself, so override those
on the component or with a selector that wins the cascade.

When adding configuration:

1. Reuse an existing token family where possible.
2. Put shared tokens in the appropriate root variable block.
3. Put genuinely component-local defaults next to that component.
4. Document public tokens in the [usage reference](../using/skelet.md).

## Attribute-driven layout

Grid/flex support both custom elements (`<x-grid>`, `<x-flex>`) and plain-attribute forms.
Global attribute selectors are backed by internal `--grid-*` custom properties. Attribute
values are exact and finite; an intuitive value is not necessarily implemented.

When extending layout, update the base selector and its relevant `-s` / `-m` variants,
consider collisions caused by globally scoped attribute names, and add a focused fixture.

## Add-ons

`css/skelet-tooltips.css` and `css/skelet-overlay.css` are separate, opt-in, and dependent
on core tokens. They do not have independent version banners; they ship under the npm
package version. A public add-on change requires consumer-doc updates, a fixture, package
inspection, and CDN verification of that specific file.

## npm and CDN distribution

- Package: `selekkt-skelet`.
- `main` and `style`: `css/skelet.css`.
- Add-ons: imported by explicit path when present in the installed release.
- CDN: jsDelivr serves files from the published npm package version.
- There is no `skelet.min.css`; do not reference one unless a build creates and packages it.

The CSS banner describes the checked-in framework/API version. npm and jsDelivr use
`package.json#version`. A release is valid only when the banner, package version, and git
tag agree.

## Downstream synchronization

Two files define downstream sync behavior:

- `.github/workflows/sync.yml` runs on pushes to `master` and invokes the sync action.
- `.github/sync.yml` is the authoritative source/target mapping.

Only `css/skelet.css` and `css/app.css` are copied to `selekkt/wp-Skelet`,
`selekkt/grav-Skelet`, and `selekkt/astro-Skelet`. Add-ons, docs, package metadata, and the
HTML starter are **not** synchronized by this workflow.

Because `app.css` propagates downstream, keep it a safe, minimal starter rather than a
scratchpad.
