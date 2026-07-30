# Building with Skelet.css

The implementation reference for building a site **with** Skelet.css. Read it before
generating or changing HTML or CSS in a project that consumes the framework. Framework
contributors should follow the Skelet source repository's root `AGENTS.md` instead.

**Reference snapshot: Skelet.css v6.7.0.** Match this guide to the banner in the
`css/skelet.css` your project actually loads.

> **Drop this file into your own project** so your coding agent knows Skelet's conventions.
> Copy it in as `skelet.md`, then point your agent config at it — add a line to your
> project's `AGENTS.md` / `CLAUDE.md` like `Follow the Skelet.css conventions in skelet.md.`
> Agents auto-load those standard instruction filenames, not arbitrary files. Keep the copy
> and its reference-version marker in sync when you upgrade Skelet. Paths such as `tests/`
> and `skelet.html` refer to the Skelet source checkout and can be ignored when they are not
> part of your application.

Skelet is classless-first, not classless-only. Core styles selected native elements,
provides token-driven components, and supplies attribute-based grid/flex layouts. Use that
system before adding project CSS.

---

## 1. API authority

The stylesheet loaded by your application is authoritative for behavior. Match core and
add-ons from the same release; do not assume an add-on path or API exists in an older npm
package.

When sources disagree, use this order:

1. The exact `css/skelet.css` loaded by the application.
2. Matching `css/skelet-overlay.css` and `css/skelet-tooltips.css` files, when used.
3. Documentation explicitly versioned for those files.
4. Source-repository fixtures and starters, which may lag.

npm and jsDelivr versions come from `package.json#version`, not from the CSS banner. Pin and
inspect a published package instead of constructing a release URL from this document's
snapshot version.

---

## 2. Mental model

Skelet's design has five layers:

1. **Base/reset** — box sizing, zeroed margins, responsive media, typography, focus,
   hidden/disabled/inert states, and selected native-element defaults.
2. **Tokens** — global CSS custom properties for color, type, space, controls, tables,
   accessibility, easing, and add-ons.
3. **Native controls/components** — links, buttons, form fields, tables, lists, code,
   progress/meter, and horizontal rules.
4. **Attribute-driven layout** — `<x-grid>`, `<x-flex>`, subgrid, alignment, order, and
   responsive suffixes.
5. **Small utilities and optional add-ons** — sizing, text, visibility, scrolling,
   tooltips, dialogs, and popovers.

Core is plain, untranspiled CSS. It has no JavaScript runtime and no npm dependencies.
Inter and Font Awesome in `skelet.html` are optional starter assets, not framework
requirements. Dialogs and popovers use native browser APIs; Skelet only supplies their
visual treatment.

Skelet intentionally uses modern platform features, including CSS nesting,
`light-dark()`, relative colors, `:has()`, container queries, `field-sizing`, subgrid,
`@starting-style`, discrete transitions, the Popover API, and logical properties. Assume a
modern browser only after checking the project's actual support matrix.

---

## 3. Rules of engagement

1. **Use semantic HTML first.** Choose the correct native element before considering a
   class or ARIA role.
2. **Use a Skelet primitive before custom CSS.** Prefer native element styling,
   `<x-grid>`, `<x-flex>`, alignment attributes, responsive suffixes, and existing
   utilities.
3. **Use a token before a literal.** Prefer `var(--space-4)`, `var(--primary)`,
   `var(--radius)`, and component tokens over repeated hard-coded values.
4. **Style native elements directly.** Use `<button class="is-primary">`, not a custom
   `.btn`. Use a semantic `<table>`, not a div-based table.
5. **Put project CSS in `css/app.css`.** Load it last. Keep additions page-specific and
   token-driven; do not recreate framework primitives.
6. **Use responsive suffixes for supported framework behavior.** Reach for `columns-s`,
   `span-m`, `direction-s`, `text-center-m`, and similar forms before custom media queries.
   Not every utility has suffix variants, so verify the exact selector first.
7. **Use modern range query syntax.** When custom breakpoints are necessary, write
   dimensional media and container queries with range comparisons, such as
   `@media (width <= 777px)` or `@container (width <= 777px)`, instead of legacy
   `max-width` / `min-width` syntax.
8. **Do not confuse appearance with semantics.** `.button`, `[role="button"]`,
   `.disabled`, and `.is-loading` do not create native keyboard behavior or disable
   activation.
9. **Preserve accessibility.** Keep focus indication, document order, labels, native
   control semantics, and reduced-motion behavior. Visual reordering does not change
   reading or focus order.
10. **Verify uncertain APIs in the CSS.** Attribute selectors are exact and finite; an
    intuitive value is not necessarily implemented.
11. **Test the relevant modes.** At minimum, inspect small/medium/base widths, keyboard
    focus, dark mode if used, and reduced motion for interaction-heavy work.

---

## 4. Install and load order

### Local files

Load styles in this order:

1. Optional external fonts and icon libraries.
2. `css/skelet.css`.
3. Optional Skelet add-ons used by the page.
4. `css/app.css` last, so project overrides win.

```html
<link rel="stylesheet" href="https://rsms.me/inter/inter.css">
<link rel="stylesheet" href="css/skelet.css">

<!-- Optional: uncomment only what the page uses. -->
<!-- <link rel="stylesheet" href="css/skelet-tooltips.css"> -->
<!-- <link rel="stylesheet" href="css/skelet-overlay.css"> -->

<link rel="stylesheet" href="css/app.css">
```

Without Inter, `--fontFamily` falls back to Skelet's system sans-serif stack. Font Awesome
is required only when the project actually uses Font Awesome classes or the tooltip
`.font-awesome` option.

### npm

```sh
npm i selekkt-skelet
```

The unversioned command installs the latest published release, which may lag this reference
snapshot. Inspect `node_modules/selekkt-skelet/css/skelet.css` and confirm optional files
exist before using the APIs documented here.

With a CSS-aware bundler, import explicit paths only when the installed release contains
them:

```js
import "selekkt-skelet/css/skelet.css";
import "selekkt-skelet/css/skelet-tooltips.css"; // optional, release-dependent
import "selekkt-skelet/css/skelet-overlay.css";  // optional, release-dependent
import "./app.css";
```

The package `main`/`style` entry points expose core CSS, not an all-add-ons bundle.

### CDN

Do not use an `@latest` URL in production. Pin the exact npm package version, inspect its
contents, and use only paths present in that release. npm and jsDelivr use
`package.json#version`; the CSS banner alone is not a valid CDN version.

---

## 5. Starting a page

Use `skelet.html` as a scaffold, not as production-ready content. A safe minimal page is:

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

  <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
  <link rel="stylesheet" href="css/skelet.css">
  <link rel="stylesheet" href="css/app.css">
</head>
<body>
  <a href="#mainContent" class="button is-primary visually-hidden-focus skipTo">
    Skip to content
  </a>

  <div id="app">
    <header>…</header>
    <main id="mainContent" tabindex="-1">…</main>
    <footer>…</footer>
  </div>
</body>
</html>
```

Important scaffold details:

- Keep the skip link and focusable matching target.
- The checked-in starter defaults to `noindex,nofollow`; replace its title, description,
  robots policy, canonical/social metadata, theme color, and icons before launch.
- Include only the external fonts, icons, scripts, and add-ons the project needs.
- `js/modules.js` and `js/app.js` are optional project placeholders, not Skelet dependencies.
- Core CSS works without JavaScript. The early inline script only switches `.no-js` state
  helpers to `.js`; under a strict Content Security Policy, authorize it with a nonce/hash or
  move equivalent code to an allowed early script. If it is blocked, `.js`-only content
  stays hidden and `.no-js` content remains visible.
- Use `classList` as shown instead of assigning `document.documentElement.className = 'js'`;
  assigning `className` removes unrelated root classes such as `.dark-mode`.

`#app` is a flex column with `min-height: 100vh`, and `main` has `flex: 1`, producing a
sticky footer. Note that the `main { flex: 1 }` rule is global, not scoped to `#app`.

---

## 6. Token system and customization

Most framework configuration lives on `:where(html)`, which has zero selector specificity.
Override tokens in `css/app.css` on `:root`, a theme wrapper, a section, or one component.
Custom properties inherit, so local overrides are usually preferable to new selectors.

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

.pricing-table {
  --tablePaddingInline: var(--space-5);
}
```

Use this escalation order:

1. Existing token override.
2. Existing class/attribute/modifier.
3. A local custom property consumed by a small page-specific rule.
4. A new selector in `css/app.css` only when the first three cannot express the design.

### Root sizing

`html` uses `font-size: 62.5%`. With the usual browser default of 16px, `1rem` computes to
10px; it still responds to user font-size settings. The space and type scales are mainly
`rem`-based, but the full token API also uses unitless numbers, `px`, `em`, `ex`, viewport
units, container-query units, colors, and CSS functions. Do not describe every token as a
`rem` value.

### Color tokens

Static brand/state tokens:

- `--primary`
- `--red`, `--orange`, `--yellow`, `--green`, `--purple`, `--blue`
- `--white`, `--black`, `--light`, `--dark`
- `--colorSuccess`, `--colorWarning`, `--colorDanger`, `--colorInfo`

Adaptive surface/content tokens include:

- `--bgColor`, `--color`, `--shadow`
- `--selectionBg`, `--selectionText`
- `--codeBg`, `--codeColor`
- `--inputBg`, `--inputColor`, `--inputBorderColor` and related hover/active values
- `--linkHover`

Only values defined with `light-dark()` or derived from adaptive values change with
`color-scheme`. `--primary`, `--linkColor`, brand swatches, and the default button palette
remain static unless the project overrides them.

### Typography tokens

Font families:

- `--fontFamily` — body and controls.
- `--fontFamilyVar` — variable-font preference.
- `--hFontFamily` — headings.
- `--fontFallback`, `--fontMono`, `--fontSerif` — built-in stacks.

Body typography:

- `--globalScale`
- `--fontSize`
- `--fontSizeMin`, `--fontSizeVal`, `--fontSizeMax` fallback hooks
- `--fontLine`, `--fontSpace`, `--fontWeight`, `--fontStyle`

Heading typography:

- `--hScale`, `--h1Size` … `--h6Size`
- `--hWeight`, `--hStyle`, `--hTransform`, `--hAlign`, `--hColor`
- `--hMargin`, `--hTextWrap`
- `--hSize`, `--hLine`, `--hSpace` shared overrides
- Per-level hooks such as `--h1Line` and `--h1Space`

### Space and type scales

- `--space-0` … `--space-6` are fixed steps: 0, 0.4rem, 0.8rem, 1.2rem, 1.6rem,
  2.4rem, and 3.2rem.
- `--space-7` … `--space-30` are fluid `clamp()` values.
- `--type-0` … `--type-6` are fixed from 0 through 2rem.
- `--type-7` … `--type-30` are fluid `clamp()` values.

Common structural aliases:

- `--padding`, `--margin`
- `--radius`, `--radiusFull`
- `--borderWidth`, `--borderStyle`
- `--rowGap`, `--columnGap`, `--gap`
- `--hrMargin`, `--pMargin`, `--textUnderlineOffset`

### Control and component token families

Prefer the relevant family rather than overriding a broad selector:

- Inputs: `--input*`
- Buttons: `--button*`
- Checkboxes/radios/switches: `--check*`, `--radio*`, `--switch*`
- Toggle tokens: `--token*`
- Tables: `--table*`
- Scroll snap: `--scroll*`
- Accessibility/focus: `--a11y*`
- Overlay add-on: `--overlay*`
- Tooltip add-on: `--tooltip*`

### Easing and keyframes

Skelet defines 24 cubic-bezier tokens: In/Out/InOut variants for Sine, Quad, Cubic,
Quart, Quint, Expo, Circ, and Back. Elastic and Bounce easing tokens are not included.

Named keyframes include:

- `fadeIn`, `fadeInUp`, `fadeInDown`, `fadeInLeft`, `fadeInRight`
- `fadeOut`, `fadeOutUp`, `fadeOutDown`, `fadeOutLeft`, `fadeOutRight`
- `flash`, `loading`, `rollIn`, `rollOut`
- `zoomIn`, `zoomOut`, `zoomInDown`, `scaleIn`, `scaleOut`
- `pulse`, `shake`, `bounce`, `bounceIn`, `wobble`
- `flip`, `flipInX`, `flipOutX`, `flipInY`, `flipOutY`

These are definitions, not animation utility classes. Apply them from `css/app.css`.

---

## 7. Base and reset behavior

Understand the baseline before overriding it:

- All elements plus `::before` and `::after` use `box-sizing: border-box` and start with
  `margin: 0`.
- `html` has stable scrollbar gutters and preference-aware smooth document scrolling.
- `body` receives background, text color, and fluid font tokens.
- `img`, `svg`, `canvas`, `video`, `embed`, `object`, and `dd` become block-level and
  responsive.
- All `svg` elements receive `height: 100%`, `flex-shrink: 0`, and
  `pointer-events: none !important`. Do not use a directly targeted SVG as an interactive
  pointer surface without an intentional override.
- `[dir="rtl"]` sets RTL direction, and most framework placement uses logical properties.
- `[hidden]`, `[type="hidden"]`, and `.hidden` force `display: none !important`.
- `[disabled]` and `.disabled` apply grayscale, opacity, and a not-allowed cursor.
- `[inert]` and its descendants are dimmed, non-selectable, and non-interactive.
- An open modal `<dialog>` clips root page overflow even when the overlay add-on is absent.
- `p:empty` is hidden; paragraphs use `text-wrap: pretty`.
- Headings use `text-wrap: balance`.
- `figure`, `figcaption`, `dt`, `dd`, `iframe`, selection colors, and inline code receive
  base treatment.

A visual `.disabled` class does not prevent clicks, form submission, or navigation. Use the
native `disabled` attribute on supported controls; for non-native patterns, implement
semantics and interaction intentionally.

---

## 8. Typography and links

### Headings

Native `<h1>` … `<h6>` are styled. Classes `.h1` … `.h6` apply the corresponding heading
size and shared heading presentation to another element:

```html
<p class="h2">Visually an H2; semantically a paragraph.</p>
```

Use visual heading classes only when semantics genuinely require a different element. Do
not choose heading levels for size alone.

`.hx` applies only the shared heading family, weight, style, transform, alignment, wrap,
color, and margin. It does **not** assign a size and does not consume `--hSize` on its own.
Use `.h1` … `.h6` for a framework size, or add an explicit token-driven `font-size` rule in
`css/app.css`.

### Links

`<a>` and `[role="link"]` receive link treatment unless also styled as a button.

Built-in link hooks:

- `--linkColor`, `--linkHover`
- `--linkDecoration`, `--linkDecorationHover`
- `--linkDecorationOffset`
- Under an `.all-states` ancestor: `--linkFocus`, `--linkActive`, `--linkVisited` and
  matching decoration hooks
- `.no-style` removes link text decoration only; it does not remove link color

```html
<nav class="all-states">
  <a href="/docs">Documentation</a>
</nav>
```

ARIA roles affect styling only. `[role="link"]` does not gain navigation or keyboard
behavior, and `[role="button"]` does not gain native button behavior. Prefer `<a href>` and
`<button>`.

---

## 9. Grid — `<x-grid>` / `[x-grid]`

The primary page-layout primitive is `<x-grid>`. A plain element with the `x-grid`
attribute is equivalent:

```html
<x-grid columns="12">…</x-grid>
<div x-grid columns="12">…</div>
```

Both forms use `display: grid`, a default four-column template, and `gap: var(--gap)`.
Direct children are grid items; `<x-col>` is a convention, not a required registered
component.

```html
<x-grid columns="12" columns-s="1">
  <header span="row">Header</header>
  <main span="8" span-s="row">Main</main>
  <aside span="4" span-s="row">Sidebar</aside>
</x-grid>
```

### Column templates

Supported `columns` values:

| Value | Behavior |
|---|---|
| `1` … `12` | Repeated equal-width tracks. |
| `fit` | `auto-fit` tracks with a default 10rem minimum. |
| `fill` | `auto-fill` tracks with a default 10rem minimum. |
| `1f` | One track; direct children are explicitly full-row. |
| `stack` | All direct children overlap in one cell; the first child is above the rest. |

Advanced local overrides are available through `--grid-mm`, `--grid-tc-ln`, and
`--grid-tc`, but use the public `columns` values unless a design truly needs a custom track
template.

### Column span grammar

| Form | Meaning |
|---|---|
| `span="3"` | Span three columns from normal grid flow. |
| `span="5+3"` | Start at column line 5 and span three tracks. |
| `span="2-6"` | Occupy columns 2 through 6 inclusive. |
| `span="row"` | Full row: grid line 1 through -1. |

```html
<x-grid columns="12">
  <x-col span="row">Full width</x-col>
  <x-col span="5+3">Starts at 5, spans 3</x-col>
  <x-col span="2-6">Columns 2 through 6</x-col>
</x-grid>
```

Only use documented forms. The source contains partial selectors for a `..` form, but it is
not consistently wired and should not be treated as a supported API.

### Row spans

`span-y` mirrors numeric, `start+span`, and start-end forms for grid rows. `span-y="1f"`
sets `grid-row: 1 / -1`; this is meaningful only when the grid has suitable explicit row
lines. Skelet does not create an explicit row template by default.

```html
<x-grid columns="3">
  <x-col span-y="2">Two rows tall</x-col>
  <x-col span-y="1+2">Starts on row 1, spans 2</x-col>
</x-grid>
```

### Gaps

- `--rowGap` and `--columnGap` feed `--gap`.
- Override `--gap` directly for shorthand behavior.
- `--gap-s` and `--gap-m` override the whole gap at small and medium widths.

```html
<x-grid columns="3" style="--gap: var(--space-5); --gap-s: var(--space-2)">
  …
</x-grid>
```

### Subgrid

`<x-subgrid>` and `[x-subgrid]` use `grid-template-columns: subgrid` and inherit the gap.
Skelet supplies column subgrid only, not row subgrid. The element must participate in an
appropriate parent grid for subgrid to work.

### Debugging

Add `.debug` to color direct children. Add `.debug.outline` for dashed item outlines.
Remove debug classes before shipping.

### Selector scope caveat

Layout attributes such as `columns`, `span`, and `span-y` are implemented with global
attribute selectors, not selectors scoped only to `<x-grid>`. Do not reuse those attribute
names for unrelated application behavior.

---

## 10. Flexbox — `<x-flex>` / `[x-flex]`

`<x-flex>` and `[x-flex]` use `display: flex` and `gap: var(--gap)`. `<x-cell>` is a
convention; any direct child works.

```html
<x-flex ai="center" jc="between" wrap wrap-s="nowrap">
  <x-cell>Left</x-cell>
  <x-cell span="2">Grows at ratio 2</x-cell>
  <x-cell span="full">Fills remaining space</x-cell>
</x-flex>
```

### Direction

Supported values:

- `direction="row"`
- `direction="row-reverse"`
- `direction="column"`
- `direction="column-reverse"`

Base flex direction is the browser default (`row`) even without the attribute.

### Wrapping

- Bare `wrap` or `wrap="wrap"`
- `wrap="nowrap"`
- `wrap="reverse"`

### Flex child spans

- Numeric `span="1"` … `span="12"` set a flex-grow ratio.
- `span="full"` sets `flex: 1 1 auto`.
- `span="row"` sets `flex-basis: 100%` and needs a wrapping container to create a break.
- `.even` on the flex container gives every direct child `width: 100%`, allowing the flex
  algorithm to share space evenly.

Responsive numeric ratios and `span-*-="row"` are implemented through `span-s` and
`span-m`. There is no special responsive implementation for `span-s="full"` or
`span-m="full"`; only base `span="full"` has that behavior.

As with grid, `direction`, `wrap`, and several span selectors are global attribute
selectors. Avoid name collisions with unrelated application attributes.

---

## 11. Alignment, placement, and order

Attributes map to exact CSS declarations. Only listed values are implemented.

| Attribute | CSS property | Supported values |
|---|---|---|
| `jc` | `justify-content` | `start`, `center`, `end`, `stretch`, `around`, `between`, `evenly` |
| `ji` | `justify-items` | `start`, `center`, `end`, `stretch` |
| `ai` | `align-items` | `start`, `center`, `end`, `stretch`, `baseline`, `first baseline`, `last baseline`, safe/unsafe start/center/end, `self-start`, `self-end`, `anchor-center` |
| `ac` | `align-content` | `start`, `center`, `end`, `stretch`, `around`, `between`, `evenly` |
| `as` | `align-self` | `start`, `center`, `end`, `stretch` |
| `js` | `justify-self` | `start`, `center`, `end`, `stretch` |
| `pi` | `place-items` | Supported one- or two-value combinations of start/center/end/stretch |
| `pc` | `place-content` | Supported one- or two-value combinations of start/center/end/stretch/around/between/evenly |
| `ps` | `place-self` | Supported one- or two-value combinations of start/center/end/stretch |
| `order` | `order` | `first`, `1` … `16`, `last` |

```html
<x-flex jc="between" ai="center">…</x-flex>
<x-grid columns="3" pi="center">…</x-grid>
<x-col as="end" js="center">…</x-col>
<x-cell order-s="first">…</x-cell>
```

Normal CSS layout rules still apply:

- `jc`, `ai`, `ac`, `as`, and `order` can matter in flex and grid depending on available
  space and wrapping.
- `ji` and `js` are grid-oriented; flexbox does not use `justify-items`/`justify-self`.
- On flex layouts, only the align half of `pi` and `ps` has an effect.
- `align-content` needs extra cross-axis space and, for flex, usually multiple lines.
- `order` changes visual order only. It does not change DOM order, screen-reader reading
  order, or sequential keyboard focus. Do not use it to repair semantic source order.

Every alignment/order attribute has `-s` and `-m` forms, such as `jc-s`, `ai-m`, and
`order-s`.

Current source discrepancy: base `pi="end center"` and `pi="end stretch"` emit
`flex-end` for the align value, while their `-s` and `-m` forms emit `end`. Verify these two
combinations at the widths the page supports.

---

## 12. Responsive behavior

Skelet is base-first rather than mobile-first. Unsuffixed declarations apply at every
width; small and medium attributes override the same property inside their ranges.

| Suffix | Core range |
|---|---|
| `-s` | `@media (width <= 777px)` |
| `-m` | `@media (777px < width <= 1024px)` |
| none | Always active unless a suffixed declaration overrides it |

There is no large suffix.

Responsive forms exist for:

- Grid `columns`, `span`, and `span-y`
- Grid/flex gaps through `--gap-s` and `--gap-m`
- Flex `direction`, `wrap`, and numeric/row spans
- Alignment, placement, and order attributes
- Most sizing, display, text, overflow, and sticky utilities
- `.center-axyz` and `.no-scrollbars`
- Scroll snap, with a source-level exception noted below

Not every utility has responsive forms. In particular, `.field-sizing`, `.flow`, and
`.mob-scroller` do not have `-s`/`-m` variants.

### Example

```html
<x-grid columns="12" columns-m="6" columns-s="1" style="--gap-s: var(--space-2)">
  <article span="8" span-m="4" span-s="row">…</article>
  <aside span="4" span-m="2" span-s="row">…</aside>
</x-grid>
```

### Visibility helpers

The named visibility helpers follow the same continuous small, medium, and large ranges as
the responsive API:

| Helper | Visible range |
|---|---|
| `.small-only` | Small only: `width <= 777px`. |
| `.medium-only` | Medium only: `777px < width <= 1024px`. |
| `.large-only` | Large only: `width > 1024px`. |
| `.small-medium` | Small and medium: `width <= 1024px`. |
| `.medium-large` | Medium and large: `width > 777px`. |

### Current responsive quirks

Treat these as implementation facts, not patterns to copy:

- `.text-bold` uses weight 700, while `.text-bold-s` and `.text-bold-m` use 600.
- `.overflow` uses `overflow: clip`, while responsive forms use `overflow: hidden`.


When exact responsive parity matters, inspect the source and add the smallest deliberate
override in `css/app.css`.

---

## 13. Buttons

These receive the button skin:

- `<button>`
- `.button`
- `[role="button"]`
- `<input type="button">`
- `<input type="submit">`
- `<input type="reset">`

Default buttons are filled with `--buttonBg` (normally `--primary`).

```html
<button type="button">Default</button>
<button type="submit" class="is-primary is-pill">Save</button>
<a href="/next" class="button is-outline is-black">Continue</a>
<button type="button" class="is-large has-icon">
  <i aria-hidden="true"><svg>…</svg></i>
  Add item
</button>
```

### Modifiers

| Group | Classes |
|---|---|
| Color | `.is-primary`, `.is-white`, `.is-black`, `.is-blue`, `.is-green`, `.is-yellow`, `.is-red`, `.is-orange`, `.is-purple` |
| Size | `.is-small`, `.is-large` |
| Shape | `.is-pill`, `.is-circle`, `.is-square` |
| Style | `.is-outline`, `.is-link`, `.is-blank`, `.is-custom`, `.is-unset` |
| Content | `.has-icon` |
| Busy | `.is-loading`, `[aria-busy="true"]` |

Important differences:

- `.is-link` strips the control down to link-like text.
- `.is-blank` keeps button layout but uses transparent surfaces and current text color.
- `.is-custom` neutralizes framework color/shadow variables for a project-defined look.
- `.is-unset` applies `all: unset`; rebuild cursor, layout, and focus treatment if used.
- `.is-outline` fills on hover/focus.
- `.has-icon` adds a token-driven gap and sizes a nested `<i>` icon wrapper. A direct SVG
  receives Skelet's global SVG rules but no `.has-icon` width; size it deliberately or wrap
  it in `<i>` as shown.
- Loading adds a spinner after existing content. It does not hide the label or disable the
  control.

Use `[aria-busy="true"]` when busy state is semantically true, and separately prevent
activation when necessary. `.is-loading` alone is visual.

For icon-only buttons, provide an accessible name:

```html
<button type="button" class="is-circle has-icon" aria-label="Close">
  <i aria-hidden="true"><svg>…</svg></i>
</button>
```

Do not use `.disabled` on a link and assume it is disabled. Links remain navigable unless
the application intentionally changes behavior and communicates `aria-disabled`.

---

## 14. Forms

### Styled fields

The full field skin applies to explicit types:

- `color`, `date`, `datetime`, `datetime-local`
- `email`, `file`, `month`, `number`, `password`
- `search`, `tel`, `text`, `time`, `url`, `week`
- Any input with `inputmode` or `list`
- `<select>` and `<textarea>`

Always write the input type. Although HTML treats a missing type as text semantically,
Skelet's selector does not style a plain `<input>` without `type`, `inputmode`, or `list`.

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" required>
```

Built-in special cases include:

- Styled color input
- Dashed file-input shell and file selector button
- Custom range track/thumb
- Custom arrow for non-multiple selects
- Removed WebKit number spinners
- Search-field normalization
- Textarea minimum height of `6lh`

### Labels, fieldsets, and legends

`label` and `legend` are inline-flex, aligned, and semibold by default. Fieldsets receive a
border and radius; `fieldset.no-style` removes the border.

Do not omit explicit labels in favor of placeholders.

### Validation and state

Available manual states:

- `.is-green` maps to `--colorSuccess`.
- `.is-red` maps to `--colorDanger`.
- `[aria-invalid="true"]` maps to the danger state.

Native invalid styling is narrower than the shorthand description “`:user-invalid` is
red.” The exact core selector is:

```css
input:not(:placeholder-shown):user-invalid
```

It does not cover `select` or `textarea`, and a required empty input still showing its
placeholder does not match. A required invalid single select changes placeholder-like text
color but does not receive the same red border rule.

`.is-green`, `.is-red`, and `[aria-invalid="true"]` are global selectors. Apply them
intentionally to controls. There is no built-in `:user-valid` treatment.

### Blank fields and resizing

- `.is-blank` removes border, background, and shadow from controls matched by the styled
  field selector.
- `.field-sizing` applies `field-sizing: content` to a compatible input, select, or
  textarea.
- Textareas support `.resize-block`, `.resize-inline`, and `.resize-none`.

`field-sizing` is a modern feature and has no responsive utility variants.

### Checkbox and radio

Native checkbox/radio inputs are replaced with token-driven custom controls. Customize
with `--check*` and `--radio*` tokens.

The adjacent label enhancements require exact sibling markup:

```html
<input id="updates" type="checkbox" name="updates">
<label for="updates">Product updates</label>
```

Wrapping an input inside a label is still valid, but it does not match the adjacent-sibling
spacing rule. No custom indeterminate visual is provided.

### Switch

Use an actual checkbox with `role="switch"`:

```html
<input id="darkMode" type="checkbox" role="switch">
<label for="darkMode">Dark mode</label>
```

The switch selector is exact: a radio with `role="switch"` does not receive switch styling.
If changing switch dimensions through tokens, verify `--switchThumbTravel` as well.

The thumb moves through logical `inset-inline-start`, so checked movement automatically
reverses in right-to-left interfaces.

### Disabled and readonly

- Native `[disabled]` gets visual disabled treatment and native behavior.
- `.disabled` gets visual treatment only.
- `readonly` has no distinct Skelet appearance.

---

## 15. Grouped controls — `<x-stack>`

`<x-stack>` is an inline-flex wrapper for grouped controls.

### Shared shell with `presuffix`

```html
<label for="domain">Domain</label>
<x-stack presuffix>
  <span aria-hidden="true">https://</span>
  <input id="domain" type="text" class="is-blank">
  <button type="button" class="is-blank">Copy</button>
</x-stack>
```

`presuffix` adds a shared input-like background, border, radius, hover state, and
focus-within outline. It normalizes descendant `input`, `button`, and `select`, and removes
borders from only the first and last direct children.

### Neutral wrapper with `no-style`

```html
<label for="siteSearch" class="visually-hidden">Search site</label>
<x-stack no-style class="search-composition">
  <input id="siteSearch" type="search" name="q">
  <button type="submit">Search</button>
</x-stack>
```

```css
/* css/app.css: no-style removes the input outline, so replace it on the composition. */
.search-composition:focus-within {
  outline: var(--a11yOutline);
  outline-offset: var(--a11yOffset);
}
```

`no-style` is a descendant reset, not a shared shell. Its current selector resets `input`,
`button`, and a literal `stack` element; it does not reset `select` or `textarea`. It also
removes the focused input's outline, border, and shadow with `!important`, so a bare
`no-style` composition needs a visible replacement such as the wrapper `:focus-within`
style above. Use a control's `.is-blank` modifier or another deliberate project rule where
needed.

`no-style` and `presuffix` can be combined; `presuffix` supplies its own wrapper
focus-within outline. Bare `<x-stack>` supplies inline-flex layout and also changes inherited
button defaults (`--buttonMargin`, `--buttonHeight`, and `--buttonWeight`).

---

## 16. Toggle tokens

`.toggle-token` turns radio/checkbox choices into button-like tokens. It supports both
wrapping-label and adjacent-label markup.

```html
<fieldset class="toggle-token" style="--tokenLegend: block">
  <legend class="visually-hidden">Density</legend>

  <input id="density-comfortable" type="radio" name="density" value="comfortable">
  <label for="density-comfortable">Comfortable</label>

  <input id="density-compact" type="radio" name="density" value="compact">
  <label for="density-compact">Compact</label>
</fieldset>
```

Behavior:

- Inputs are visually hidden but remain interactive.
- Labels get button-like default, hover, focus, active, and disabled states.
- The fieldset and legend are reset with `all: unset`.
- The legend is hidden with `display: none` by default, which also removes the group's
  accessible name. The example sets `--tokenLegend: block` and then visually hides the
  legend while keeping it available to assistive technology.
- Disabled tokens default to grayscale, low opacity, and line-through text.
- Tokens retain individual margins/radii; this is not automatically a fused segmented
  control.

Active token styling follows the live `:checked` state. The initial HTML `checked` attribute
can set the default choice, but changing a radio or checkbox immediately updates the visual
state.

---

## 17. Tables

Use semantic table markup. Wrap tables in `.table-container` when they may overflow:

```html
<div class="table-container is-scrollable">
  <table class="is-striped is-hover">
    <caption>Recent orders</caption>
    <thead>
      <tr><th scope="col">Order</th><th scope="col">Status</th></tr>
    </thead>
    <tbody>
      <tr><th scope="row">#1042</th><td>Ready</td></tr>
    </tbody>
  </table>
</div>
```

### Default behavior

- Tables are full width by default.
- Header cells use a pill-shaped grouped background even without a modifier.
- Cells receive logical padding and block-end borders.
- `.table-container` establishes a named inline-size container, `table`, and normally
  enables horizontal overflow.
- Below a container width of 500px, cell padding becomes compact via a container query.

This is the framework's only built-in container-query behavior; grid/flex responsiveness
remains viewport-based.

### Table modifiers

Put these on `<table>`:

- `.has-borders`
- `.is-striped`
- `.is-hover`
- `.is-sticky-head`
- `.is-sticky-foot`
- `.borders-none`
- `.borders-inline`
- `.borders-block`
- `.compact`

Put `.is-scrollable` on `.table-container`, **not** on `<table>`:

```html
<div class="table-container is-scrollable">…</div>
```

`.table-container.is-scrollable` makes the descendant table `max-content` width with a
100% minimum.

Sticky caveat: without `.is-scrollable`, a wrapper containing `.is-sticky-head` or
`.is-sticky-foot` changes to `overflow: visible`. Adding `.is-scrollable` later reintroduces
`overflow-x: auto`, which can change or prevent sticky behavior because it creates an
overflow ancestor. Do not assume sticky cells and horizontal wrapper scrolling combine;
test the exact table. Sticky offsets use `--tableStickyOffset`, defaulting to `--space-2`.

Stripes and hover backgrounds target `td` cells; row-header `th` cells may need a local
surface override for a fully filled row treatment.

---

## 18. Lists, code, rules, and native media

### Lists

Available list classes:

- `.inline` — inline list items with no markers or built-in gap.
- `.no-style` — remove markers, margin, and padding; nested lists also lose markers.
- `.indent`
- `.inside`, `.outside`
- `ul.disc`, `ul.circle`, `ul.square`
- `ol.roman`, `ol.alpha`, `ol.decimal`

Every `li` gets block-end spacing through `--liMargin`. Native definition lists style
`dt` bold and indent `dd`.

Because `.inline` is also a generic display utility later in the stylesheet, an inline list
container itself becomes `display: inline`, while its items match the list-specific inline
rule.

### Code and keyboard input

- Inline `code` and `samp` are inline-block, padded, and single-line. Content wider than the
  available space scrolls horizontally without requiring hover.
- `kbd` gets a keycap skin.
- Block code requires the direct-child form `<pre><code>…</code></pre>`.
- A bare `<pre>` has no dedicated Skelet card skin.

For a code or sample region expected to overflow, add `tabindex="0"` so keyboard users can
reliably focus and scroll it.

### Horizontal rules

- `<hr>` — standard rule.
- `<hr class="gradient">` — fading rule.
- `.text-hr` — line on both sides.
- `.text-hrs` — line after the text.
- `.text-hre` — line before the text.

### Progress and meter

`<progress>` and `<meter>` are styled through browser-specific pseudo-elements.

- Progress uses `--primary`.
- Meter optimum/suboptimum/even-less-good states use semantic success/warning/danger
  colors.
- `--barHeight`, `--barBg`, and `--barRadius` customize both.

### Media

Images and other replaced media are responsive by default. Grid/flex images additionally
use `object-fit: contain`. Remember the global SVG sizing and pointer-events caveat from the
base section.

---

## 19. Optional add-on: tooltips

Load `css/skelet-tooltips.css` after core and before `app.css`.

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

The add-on creates `::before`/`::after` tooltip content from `data-tooltip`.

### Position

Always provide `tooltip-pos`; no useful default geometry is defined.

Supported forms:

- `up`, `up-left`, `up-right`
- `down`, `down-left`, `down-right`
- `left`, `right`

### Width and behavior

- `tooltip-length` accepts `small`, `medium`, `large`, `xlarge`, or `fit`.
- `tooltip-break` preserves line breaks; with a length it uses wrapping `pre-line` behavior.
- `tooltip-visible` forces the tooltip visible.
- `tooltip-nofocus` suppresses focus-triggered display.
- `tooltip-blunt` removes the transition.
- `.font-awesome` switches generated tooltip text to a Font Awesome font stack and needs
  that font asset.

### Accessibility and layout limits

- Use a focusable trigger for keyboard access.
- Do not put essential information only in `data-tooltip`; CSS-generated content is not a
  reliable accessible description. Provide real DOM text and connect it with
  `aria-describedby` when appropriate.
- These are pseudo-elements, not top-layer UI. They can be clipped by ancestors, overflow
  the viewport, and are unreliable as hover-only interaction on touch devices.
- Use native visible help text for critical instructions and errors.

---

## 20. Optional add-on: dialog and popover overlays

Load `css/skelet-overlay.css` after core and before `app.css`.

Core does **not** provide the dialog card skin. Core only includes modal page-scroll
locking. The add-on styles native `<dialog>` and Popover API elements.

### Dialog

After the add-on is loaded, a bare dialog receives the card surface:

```html
<dialog id="confirmDialog" class="is-animated" aria-labelledby="confirmTitle">
  <form method="dialog" class="flow">
    <h2 id="confirmTitle">Delete item?</h2>
    <p>This action cannot be undone.</p>
    <x-flex jc="end">
      <button value="cancel" class="is-blank">Cancel</button>
      <button value="confirm" class="is-red">Delete</button>
    </x-flex>
  </form>
</dialog>

<button type="button" onclick="confirmDialog.showModal()">Open dialog</button>
```

Native opening modes:

- `dialog.showModal()` — modal, top-layer, focus-managed by the browser, with backdrop.
- `dialog.show()` — non-modal, no backdrop or modal focus behavior; Skelet fixes and
  centers it near the top with a configurable z-index.
- `dialog.close()` or `<form method="dialog">` — native closing.

`.is-animated` opts dialogs into fade/scale entry and exit transitions. Plain dialogs retain
native instant show/hide behavior.

### Popover

All `[popover]` elements receive transition wiring, but a bare popover does not receive the
Skelet card surface. Add `.dialog` for the card/sizing/shadow/backdrop treatment:

```html
<button type="button" popovertarget="accountMenu">Account</button>
<div id="accountMenu" popover="auto" class="dialog">
  …
</div>
```

- `popover="auto"` supports native light dismissal.
- `popover="manual"` remains open until explicitly hidden/toggled.
- `popovertarget` controls can work without project JavaScript.
- `.dialog` is a visual skin only; a popover remains semantically non-modal.

### Edge and corner positioning

The custom `position` attribute applies to `<dialog>` and `[popover].dialog`:

```html
<dialog position="bottom right">…</dialog>
<div popover="auto" class="dialog" position="top">…</div>
```

Supported keywords are `top`, `bottom`, `left`, and `right`; two space-separated keywords
compose corners.

### Overlay tokens and caveats

Important tokens include:

- Sizing: `--overlayMinW`, `--overlayMaxW`, `--overlayW`, matching height tokens
- Surface: `--overlayPadding`, `--overlayBorder`, `--overlayRadius`, `--overlayBg`,
  `--overlayColor`, `--overlayShadow`
- Backdrop: `--overlayBackdropBg`, `--overlayBackdropBlur`
- Motion: `--overlayScaleFrom`, `--overlayDuration`, `--overlayEasing`,
  `--overlayTransOrigin`
- Placement: `--overlayEdgeOffset`, `--overlayTop`, `--overlayZindex`

The default `--overlayMinW` is 35rem, approximately 350px under the usual root setting.
Override it for narrower viewports or embedded contexts.

The add-on includes a darker non-blur backdrop fallback when `backdrop-filter` is missing.
Missing support for newer transition features should degrade to instant behavior; missing
native dialog/popover APIs is a functional limitation.

Focus caveat: the add-on removes the outline from any `[autofocus]` descendant. It restores
an explicit focus-visible outline for buttons and `[role="button"]`, but not for an
autofocused input, link, select, or textarea. Avoid non-button `autofocus`, or provide and
test a replacement focus style in `css/app.css`.

---

## 21. Utility reference

Utilities are intentionally small. Prefer layout attributes and component tokens when they
better express the intent.

### Sizing

- `.fullwidth`, `.fullwidth-max`
- `.fullheight`, `.fullheight-max`
- `.full`, `.full-max`
- `.fitcontent`, `.fitcontent-height`

`.fullwidth` also sets `--buttonWidth` and `--inputWidth` to 100%, so it works with controls
whose width is token-driven.

Most sizing utilities have `-s` and `-m` variants.

### Display and visibility

- `.block`, `.inline`, `.inline-block`, `.contents`
- `.center` — block, centered text, auto inline margins
- `.display-none`
- `.display-none-empty`, `.hide-empty`
- `.overflow`
- `.visibility-hidden`
- `.hidden` / `[hidden]` — forced display none

Most display utilities have `-s`/`-m` forms. `.visibility-hidden` does not.

### Centering and alignment

- `.center-axyz` — grid with `place-items: center`
- `.center-axyz.full` — 100% width and minimum 100vh
- `.center-axyz-s`, `.center-axyz-m`
- `.ac`, `.align-center` — `align-content: center`

### Text

- Alignment: `.text-start`, `.text-center`, `.text-end`, `.text-justify`
- Weight: `.text-normal`, `.text-bold`
- Case: `.text-nonecase`, `.text-uppercase`, `.text-lowercase`, `.text-capitalize`
- Decoration: `.text-underline`, `.text-line-through`
- Wrapping: `.text-break-word`, `.text-balance`, `.text-pretty`
- Truncation: `.text-clip`

Most have `-s`/`-m` variants. Remember the responsive bold-weight discrepancy documented
above.

### Flow and form sizing

- `.flow > * + *` adds `margin-top: var(--flow-space, 1em)`.
- `.field-sizing` applies `field-sizing: content`.

Neither has responsive variants.

### Sticky positioning

- `.sticky`
- `.sticky-bottom`
- `.sticky-none`
- Responsive `-s`/`-m` forms

Use `--sticky` for the inset and `--stickyZindex` for the stacking level. Base and
responsive top/bottom sticky utilities use the same tokens.

### Mobile horizontal scroller

`.mob-scroller` creates a non-wrapping horizontal flex scroller and hides its WebKit
scrollbar up to 1024px. It has no responsive suffix forms.

### Scrollbar hiding

- `.no-scrollbars`
- `.no-scrollbars-s`
- `.no-scrollbars-m`

Do not hide scrollbars when doing so makes scrollability undiscoverable.

### Scroll snap

Scroll snap uses space-separated values in an activation attribute:

```html
<ul scroll-snap="x mandatory align-start stop-always">
  <li>First item</li>
  <li>Second item</li>
</ul>
```

Choose one value from each group as needed:

- Direction: `x` (default) or `y`
- Strictness: `mandatory` (default) or `proximity`
- Item alignment: `align-start` (default), `align-center`, or `align-end`
- Item stopping: `stop-normal` (default) or `stop-always`

The empty boolean form, `<div scroll-snap>`, uses all defaults. Direct children become snap
items; alignment and stop behavior are applied to those children.

Responsive activation uses the same token-list API:

- `[scroll-snap-s]` activates at the small breakpoint (`width <= 777px`).
- `[scroll-snap-m]` activates in the medium range (above `777px` through `1024px`).

Responsive attributes can stand alone or override a base configuration:

```html
<div
  scroll-snap="y mandatory align-start stop-always"
  scroll-snap-s="x proximity align-center stop-normal"
>
  ...
</div>
```

In this example the scroller is vertical by default and becomes a horizontal proximity
scroller on small screens. Customize further through the inherited `--scroll*` tokens.

The former `.scroll-snap`, `.scroll-snap-s`, `.scroll-snap-m`, and modifier-class API has
been replaced by these attributes.

---

## 22. Accessibility helpers

### Focus

Default `*:focus-visible` preserves the browser outline while setting Skelet's outline
color and offset.

- `.a11y-custom` on an ancestor applies the full token-driven outline/shadow to focused
  descendants.
- `.a11y-inputs-off` removes the outline and box shadow from text-like input descendants.
- `.a11y-off` removes the outline and box shadow from focused descendants. Component
  hover/focus surface or border changes may still remain.

Avoid `.a11y-off` unless an equally visible, WCAG-compliant focus treatment replaces it.
The ancestor selectors do not style the element carrying the class itself.

### Visually hidden content

- `.sr-only`, `.visually-hidden` — remain visually hidden.
- `.visually-hidden-focus` — hidden until it or a descendant receives focus.
- `.visibility-hidden` — occupies layout space but is invisible.

A correctly positioned skip link needs the compound button class and focus-reveal helper:

```html
<a href="#mainContent" class="button visually-hidden-focus skipTo">
  Skip to content
</a>
```

`.skipTo` alone has no rule; positioning is defined for `.button.skipTo`.

### Disabled/inert behavior

- Prefer native `disabled` for controls.
- Use `inert` when an entire subtree must be non-interactive. Core applies disabled
  opacity/filtering once to the inert root while blocking interaction throughout its subtree.
- Do not rely on `.disabled` for behavior.
- Skelet has no built-in `[aria-disabled="true"]` style.

### ARIA and roles

ARIA communicates semantics; it does not create behavior. Likewise, role selectors in
Skelet only style an element. Use native elements wherever possible and implement required
keyboard interactions for any custom widget.

---

## 23. JavaScript state helpers

The expected root starts as `<html class="no-js">`, then project JavaScript changes it to
`.js`.

Content helpers:

- Under `html.js`, `.js` content is shown and `.no-js` content is hidden.
- Under `html.no-js`, `.no-js` content is shown; `.js` and `.no-js-hidden` are hidden.
- Shown content uses `display: var(--jsDisplay, inherit) !important`.
- `<x-flex>` sets `--jsDisplay: flex` so a state-gated flex container restores correctly.

```html
<p class="no-js">JavaScript is unavailable.</p>
<div class="js">Enhanced interface</div>
```

If the root has neither class, these helpers do not hide either branch. Preserve any other
root classes when switching state:

```js
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');
```

For a state-gated component whose display should not be inherited, set `--jsDisplay`
locally.

---

## 24. Dark mode

Core defaults to `color-scheme: light`. Any of these switches a subtree to dark scheme:

- `.dark-mode`
- `[dark-mode]`
- `[color-scheme="dark"]`

```html
<html class="dark-mode" lang="en">
```

The switch only sets `color-scheme: dark`. Tokens using `light-dark()` then choose their
dark value, and compatible native controls follow the scheme. Static brand/button/link
values do not change automatically.

Skelet does not automatically follow OS preference. Add that policy in `css/app.css` only
if the product wants it:

```css
@media (prefers-color-scheme: dark) {
  html { color-scheme: dark }
}
```

For user-controlled themes, a class/attribute plus persisted application state is usually
better than an unconditional media query. If using the `.no-js` startup script, ensure it
preserves the theme class.

---

## 25. Motion and scrolling

Document smooth scrolling is enabled only under `prefers-reduced-motion: no-preference` and
can be changed through `--scrollBehavior`.

Under either `prefers-reduced-motion: reduce` or `update: slow`, Skelet globally collapses
animations and transitions to one near-instant iteration. It does not remove animation
names with `animation: none`, but the practical effect is near-instant motion. The rule also
covers pseudo-elements and backdrops, including animations added later in `css/app.css`.

`.mob-scroller` and the scroll-snap attributes use smooth scrolling normally. Under
`prefers-reduced-motion: reduce` or `update: slow`, core resets their `scroll-behavior` to
`auto`; no project-level override is required.

---

## 26. Browser baseline

Skelet has no transpilation or polyfills. Verify target browsers for the features actually
used.

| Feature | Where it matters | Failure mode |
|---|---|---|
| Native CSS nesting | Throughout core and add-ons | Older parsers may drop nested rules. |
| `light-dark()` and relative colors | Theme, hover, and surface tokens | Colors may fail rather than merely lose dark mode. |
| `:has()` and `:modal` | modal scroll lock, tables, toggle tokens | Conditional styling is lost. |
| Container queries and `cqi` | narrow table density | Table remains at base density. |
| CSS subgrid | `<x-subgrid>` | Subgrid layout does not work. |
| `field-sizing` | `.field-sizing` | Controls do not auto-size to content. |
| Popover API / `:popover-open` | native popovers | Functional failure without a polyfill/fallback. |
| `@starting-style` and discrete transitions | overlay animation | Interaction may work with instant transitions. |
| `backdrop-filter` | overlay blur | Add-on supplies a darker non-blur backdrop fallback. |
| `interpolate-size` | keyword size interpolation | Related transitions degrade. |

“Evergreen” is not a substitute for a product browser matrix. Progressive enhancement is
acceptable only when the fallback remains usable.

---

## 27. Tests and manual validation

There is no test command in `package.json`. Files in `tests/` are browser fixtures, not
assertion-based tests, and some contain stale class names or inline prototype CSS.

Useful starting points:

- `tests/html-elements.html` — broad integrated native elements/components/add-ons.
- `tests/skelet-grids.html` — grid API.
- `tests/grid-flex.html` and `tests/grid-align.html` — layout/alignment.
- `tests/test-subgrid.html` and `tests/test-subgrid-layout.html` — subgrid.
- `tests/space-system.html` and `tests/type-system.html` — token scales.
- `tests/buttons.html`, `tests/html-inputs.html`, `tests/toggle-token.html` — controls,
  with some legacy examples that must be checked against core.
- `tests/overlay-check.html` — current dialog/popover positions and animation.
- `tests/popover.html` — auto/manual popover behavior.

Known fixture caveats:

- `tests/dialog.html` is a legacy inline dialog implementation, not the current overlay
  add-on.
- `tests/tooltips.html` does not currently load `css/skelet-tooltips.css`; do not use it as
  standalone proof that the add-on works.
- Demo prose occasionally calls add-on behavior “core.” Trust the stylesheet imports and
  selectors instead.

For a changed page or component, manually verify:

1. Base, small, and medium widths at the actual boundaries.
2. Keyboard tab order and visible focus.
3. Labels, names, roles, and error communication.
4. Hover, focus, active, disabled, busy, invalid, and empty states where relevant.
5. Light and dark schemes if supported.
6. Reduced motion.
7. Long content, zoom, and narrow containers.
8. Native dialog/popover close, dismissal, and focus behavior.

---

## 28. Implementation workflow for agents

Use this sequence for new UI:

1. **Identify semantics.** Choose landmarks, heading levels, links, buttons, controls,
   lists, tables, dialogs, and popovers correctly.
2. **Choose layout primitives.** Use `<x-grid>` for two-dimensional placement and
   `<x-flex>` for one-dimensional distribution.
3. **Add responsive attributes.** Define base behavior, then only the necessary `-m` and
   `-s` overrides.
4. **Use native component styling.** Add only documented `is-*` modifiers and wrappers.
5. **Customize with tokens.** Override globally or locally depending on intended scope.
6. **Add minimal page CSS.** Put genuine design-specific rules in `css/app.css`.
7. **Check source quirks.** Verify visibility helpers, responsive scroll snap, grouped
   controls, and interactive toggle tokens instead of assuming their names.
8. **Validate accessibility and browser behavior.** Use the checklist above.
9. **Remove scaffolding/debug code.** Delete `.debug`, sample metadata/content, inline
   prototype styles, and unused dependencies.

---

## 29. Anti-patterns

Do not:

- Recreate buttons with `.btn` when native button styling and `is-*` modifiers already
  exist.
- Build `.row`/`.col` or generic flex/grid utility soup instead of `<x-grid>`/`<x-flex>`.
- Create a generic `.container` abstraction solely to duplicate width/alignment utilities.
- Use divs for links, buttons, tables, checkboxes, dialogs, or other native semantics.
- Hard-code repeated colors, spacing, type sizes, radii, or control dimensions instead of
  tokens.
- Put project rules in `css/skelet.css`; use `css/app.css`.
- Load `app.css` before add-ons and then fight the cascade.
- Invent attribute values that are not implemented by exact selectors.
- Assume every utility has `-s`/`-m` variants.
- Use visual `order` to compensate for incorrect DOM order.
- Remove focus outlines without an accessible replacement.
- Treat `.disabled`, `.is-loading`, or ARIA roles as native behavior.
- Put essential information only in a pseudo-element tooltip.
- Hand-roll a JavaScript modal or tooltip dependency before evaluating native
  `<dialog>`, Popover, and the optional add-ons.
- Assume all native HTML elements have a bespoke Skelet skin; verify the selector.

Skelet does not include a generic card component. A page-specific card is legitimate when
the design needs it, but implement it minimally in `css/app.css` with existing surface,
space, border, and radius tokens rather than inventing a parallel component system.

When the framework cannot express a real requirement, add the smallest intentional rule,
document any non-obvious constraint, and keep the native/token/layout model intact.
