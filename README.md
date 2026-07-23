# Skelet.css

Skelet.css is a lightweight, classless-first CSS framework for modern browsers. It styles
selected native HTML elements, provides a token-driven component layer, and uses
attribute-based grid and flex primitives instead of a large utility-class API.

Core is plain CSS with no build step, JavaScript runtime, or npm dependencies.

> **Checkout note:** the CSS banner and `package.json#version` are not currently aligned.
> The checked-in stylesheet is authoritative for this checkout's behavior, while npm and
> jsDelivr use the package version. Verify a published package before using these docs or
> pinning a CDN URL.

## Features

- Native styling for typography, links, buttons, explicit form controls, tables, lists,
  code, horizontal rules, progress, and meter elements.
- Attribute-driven layouts through `<x-grid>`, `<x-flex>`, and their plain-attribute forms.
- Responsive `-s` and `-m` layout attributes and utilities.
- Global and locally overridable CSS custom properties for color, type, spacing, controls,
  tables, focus, and motion.
- Light/dark color-scheme support through adaptive `light-dark()` tokens.
- Optional CSS-only tooltip presentation.
- Optional visual treatment for native `<dialog>` and Popover API elements.
- Modern CSS features such as nesting, relative colors, subgrid, container queries,
  `:has()`, `field-sizing`, and `@starting-style`.

## Quick start

Start from `skelet.html`, or load the stylesheets directly. Use this order so project
customizations win:

```html
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="stylesheet" href="css/skelet.css">

<!-- Optional add-ons: uncomment only what the page uses. -->
<!-- <link rel="stylesheet" href="css/skelet-tooltips.css"> -->
<!-- <link rel="stylesheet" href="css/skelet-overlay.css"> -->

<link rel="stylesheet" href="css/app.css">
```

Inter is optional. Without it, Skelet falls back to its system sans-serif stack. Font
Awesome is not required by the framework.

A minimal document:

```html
<!doctype html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Page title</title>
  <meta name="description" content="Page description">

  <script>
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
  </script>

  <link rel="stylesheet" href="css/skelet.css">
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
  <a href="#mainContent" class="button is-primary visually-hidden-focus skipTo">
    Skip to content
  </a>

  <div id="app">
    <header></header>
    <main id="mainContent" tabindex="-1"></main>
    <footer></footer>
  </div>
</body>
</html>
```

`#app` is a full-height flex column and `main` grows to create a sticky-footer layout.
Replace example titles, descriptions, icons, URLs, and indexing policy before deployment.

## Install

### npm

```sh
npm install selekkt-skelet
```

This installs the latest published release, which may lag this checkout. Check the banner in
`node_modules/selekkt-skelet/css/skelet.css` and verify that optional files exist before
using this source checkout's API reference.

The package entry point exposes core CSS. Import add-ons explicitly with a CSS-aware
bundler only when the installed release contains them:

```js
import "selekkt-skelet/css/skelet.css";
import "selekkt-skelet/css/skelet-tooltips.css"; // optional
import "selekkt-skelet/css/skelet-overlay.css";  // optional
import "./app.css";
```

### Source archive

Download or clone the repository and use the checked-in files:

```sh
git clone https://github.com/Selekkt/skelet.git
```

The only required stylesheet is `css/skelet.css`. `css/app.css` is an optional project
override starter and should be loaded last when used.

The checked-in `skelet.html` starter references `img/touch.png`; replace or remove that
project asset before launch. The tooltip, overlay, `app.css`, and `js/` files are optional
and are commented out or loaded as an override starter until needed.

### CDN

Do not use `@latest` in production. Pin a package version only after verifying that its CSS
matches the API your project uses:

```text
https://cdn.jsdelivr.net/npm/selekkt-skelet@<verified-version>/css/skelet.css
```

Optional add-ons use the same package version and their explicit file paths. The current
checkout does not include `css/skelet.min.css`; do not publish or reference that path unless
a release process actually creates it.

Browse published package files and versions on
[jsDelivr](https://www.jsdelivr.com/package/npm/selekkt-skelet).

## Core usage

### Tokens

Framework configuration is exposed as CSS custom properties. Override tokens in
`css/app.css` globally or on a local subtree:

```css
:root {
  --primary: oklch(58% 0.2 255);
  --radius: var(--space-3);
  --buttonRadius: var(--radiusFull);
}

[data-theme="editorial"] {
  --hFontFamily: var(--fontSerif);
  --hWeight: 500;
}
```

Prefer existing `--space-*`, `--type-*`, color, control, and component tokens over repeated
literal values.

### Grid

```html
<x-grid columns="12" columns-m="6" columns-s="1">
  <main span="8" span-m="4" span-s="row">Main content</main>
  <aside span="4" span-m="2" span-s="row">Sidebar</aside>
</x-grid>
```

`columns` supports `1` through `12`, `fit`, `fill`, `1f`, and `stack`. Child `span` values
support numeric spans, `start+span`, `start-end`, and `row`.

### Flex

```html
<x-flex jc="between" ai="center" direction-s="column">
  <span>Start</span>
  <span>End</span>
</x-flex>
```

Use `direction`, `wrap`, alignment attributes such as `jc`/`ai`, and responsive `-s`/`-m`
forms instead of recreating common flex rules in application CSS.

### Native controls

```html
<form action="/subscribe" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>

  <button type="submit" class="is-primary is-pill">Subscribe</button>
</form>
```

Write explicit input types. A plain `<input>` without `type`, `inputmode`, or `list` does
not match Skelet's full field selector.

## Optional add-ons

### Tooltips

Load `css/skelet-tooltips.css`, then use a focusable trigger and always provide a position:

```html
<button
  type="button"
  data-tooltip="Copy link"
  tooltip-pos="up"
  aria-describedby="copy-help"
>
  Copy
</button>
<span id="copy-help" class="visually-hidden">Copies this page's link</span>
```

Tooltips are generated with CSS pseudo-elements. Do not put essential information only in
`data-tooltip`; provide real DOM text for accessible descriptions.

### Dialog and popover overlays

Load `css/skelet-overlay.css` for the Skelet card surface, backdrop, placement, and optional
motion:

```html
<dialog id="confirmDialog" class="is-animated" aria-labelledby="confirmTitle">
  <form method="dialog">
    <h2 id="confirmTitle">Continue?</h2>
    <button value="cancel" class="is-blank">Cancel</button>
    <button value="confirm">Confirm</button>
  </form>
</dialog>
```

Open native dialogs with `showModal()` or `show()`. Popovers receive transition wiring;
add `.dialog` to a `[popover]` element for the card treatment. These styles do not provide
a JavaScript modal runtime.

## Browser baseline

Skelet is distributed without transpilation or polyfills. Check support for the features a
project actually uses, especially:

- Native CSS nesting
- `light-dark()` and relative colors
- `:has()` and `:modal`
- Container queries and `cqi`
- CSS subgrid
- `field-sizing`
- Popover API and `:popover-open`
- `@starting-style` and discrete transitions
- `backdrop-filter`

Missing Popover API support is a functional limitation, while unsupported motion or blur
features can often degrade to simpler presentation.

## Repository layout

```text
.
├── AGENTS.md                    Framework-development entrypoint (for contributors)
├── README.md                    Project overview and setup
├── docs/
│   ├── using/skelet.md          Detailed API reference (building a site with Skelet)
│   └── developing/              Contributor docs (architecture, releasing)
├── skelet.html                  HTML starter
├── css/
│   ├── skelet.css               Core framework
│   ├── skelet-tooltips.css      Optional tooltip add-on
│   ├── skelet-overlay.css       Optional dialog/popover add-on
│   └── app.css                  Project-level overrides
├── js/
│   ├── modules.js               Optional project placeholder
│   └── app.js                   Optional project JavaScript
├── img/
│   ├── logo.png
│   └── touch.png
├── layouts/                     Example page layouts (some legacy)
├── tests/                       Manual browser fixtures
├── package.json
└── LICENSE
```

## Documentation and examples

- Read [`docs/using/skelet.md`](docs/using/skelet.md) for the detailed, source-backed API,
  accessibility caveats, responsive behavior, current implementation quirks, and validation
  checklist. Framework contributors start at the repository's
  [`AGENTS.md`](https://github.com/Selekkt/skelet/blob/master/AGENTS.md).
- **Building with an AI agent?** Copy `docs/using/skelet.md` into your project as `skelet.md`
  and reference it from your `AGENTS.md` / `CLAUDE.md` so the agent follows Skelet's
  conventions. See the note at the top of that file.
- Open the repository's
  [`tests/html-elements.html`](https://github.com/Selekkt/skelet/blob/master/tests/html-elements.html)
  for broad integrated coverage.
- Browse the focused
  [`tests/` fixtures](https://github.com/Selekkt/skelet/tree/master/tests) for grids,
  flexbox, tokens, controls, subgrid, dialogs, and popovers.

The public website currently documents an older release; use the source-backed reference
above for this checkout.

The files in `tests/` are visual fixtures, not assertion-based automated tests. Some older
fixtures may lag the current CSS, so use the checked-in stylesheet as the final authority.

## License

Skelet.css is available under the [MIT License](LICENSE).
