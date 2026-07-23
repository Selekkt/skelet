# Releasing

How a Skelet.css version is prepared, packaged, published, and synchronized. See
[architecture](architecture.md) for the distribution surfaces.

## Release prerequisites

Before cutting a release:

1. Work from an up-to-date release branch with no unrelated or untracked files.
2. Land each behavior change with a focused fixture under `tests/`.
3. Verify affected behavior in a browser at small, medium, and base widths, including
   keyboard focus, dark mode where applicable, and reduced motion.
4. Update `docs/using/skelet.md` and `README.md` for every public API change.
5. Update the reference-version marker near the top of `docs/using/skelet.md`.
6. Review `css/app.css` as a published starter and downstream-synced file.

## Align release metadata

1. Set the banner at the top of `css/skelet.css` to the release version.
2. Set `package.json#version` to the same version.
3. Confirm `package.json#homepage` resolves to the canonical current page.
4. Plan an annotated tag named `vX.Y.Z` for the exact release commit.

Do not derive a CDN URL from the CSS banner alone. npm and jsDelivr use the package
version.

## Validate the package boundary

`package.json#files` is the npm allowlist. It intentionally includes core/add-on CSS, the
consumer starter and assets, and `docs/using/`; it excludes fixtures, layouts, contributor
docs, automation, and the root development `AGENTS.md`.

From a clean candidate tree, run:

```sh
npm pack --dry-run --json
```

Inspect the JSON. Confirm:

- The package name and version are correct.
- `css/skelet.css`, `css/app.css`, both add-ons, `skelet.html`, starter assets, and
  `docs/using/skelet.md` are present.
- `tests/`, `layouts/`, `.github/`, `docs/developing/`, and `AGENTS.md` are absent.
- No secrets, scratch files, or unrelated untracked work is present.
- No nonexistent `skelet.min.css` path is advertised.

The dry run checks the package boundary before the release commit. Build the publishable
tarball only from the final clean release commit.

## Publish

1. Commit all release changes and complete review.
2. Merge the exact release commit to `master`. This immediately starts the downstream sync
   workflow for `css/skelet.css` and `css/app.css`; npm publication is not atomic with that
   sync, so monitor the promotion window.
3. Check out the exact `master` commit and confirm `git status --short` is empty.
4. Before creating a public tag, verify npm identity, registry, and that the target version
   is not already published:

   ```sh
   npm config get registry
   npm whoami
   npm view selekkt-skelet versions --json
   ```

5. Create the tarball outside the worktree so the release checkout stays clean. Use an empty
   artifact directory, inspect the JSON and tarball contents, and retain that exact file:

   ```sh
   mkdir -p ../release-artifacts
   npm pack --pack-destination ../release-artifacts --json
   ```

6. Create and push the annotated `vX.Y.Z` tag on the exact commit used to build the tarball.
7. Publish the inspected artifact, not the working directory:

   ```sh
   npm publish ../release-artifacts/selekkt-skelet-X.Y.Z.tgz
   ```

8. If publication fails after the public tag exists, do not move or reuse the tag/version;
   diagnose the failure and follow npm's versioning constraints for the next attempt.

## Verify after publication

1. Confirm npm shows the expected version and package contents.
2. Load core from jsDelivr and compare it with the release artifact:

   ```text
   https://cdn.jsdelivr.net/npm/selekkt-skelet@X.Y.Z/css/skelet.css
   ```

3. Verify every changed distributed stylesheet by explicit CDN path, including
   `skelet-overlay.css` or `skelet-tooltips.css` when changed.
4. Confirm the `Sync Files` workflow completed for the `master` commit.
5. Inspect the downstream changes configured in `.github/sync.yml`. Only core and
   `app.css` should propagate to `wp-Skelet`, `grav-Skelet`, and `astro-Skelet`.
6. Remove the external release artifact after verification, or archive it according to the
   project's release-retention policy.

## What not to ship

- No `skelet.min.css` unless a documented build creates and packages it.
- No `tests/`, `layouts/`, `.github/`, root `AGENTS.md`, or contributor-only docs.
- No stale `app.css`; it is both a package starter and a downstream-synced file.
- No package whose banner, package version, and release tag disagree.
