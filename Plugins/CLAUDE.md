# Plugins — Conventions (single source of truth)

This file is the rulebook for every Figma plugin in `Figma/Plugins/`. It is also read
automatically by Claude in future sessions, so these rules are applied without re-explaining.

## Repo & layout
- Monorepo: all plugins live in `Figma/Plugins/`, one folder per plugin.
- Repo root: `a-sarshad/Figma` (origin). Root `.gitignore` covers `.DS_Store`, `node_modules/`, etc.
- Design kits stay in `Figma/Make-Kits/`; never mix kit assets into a plugin folder.

## Per-plugin folder — required files
```
Plugins/<Plugin Name>/
├─ manifest.json     # Figma manifest
├─ code.js           # main logic
├─ ui.html           # only if the plugin has UI
├─ README.md         # what it does + usage + limitations
└─ CHANGELOG.md      # version history, newest on top
```
- No `package.json` unless the plugin adds a real build step (TypeScript/bundler). Plain
  `code.js` plugins do not need one.
- Keep any pre-rewrite original as `code.legacy.js` for reference (optional).

## Identity
- Each plugin has a **slug**: kebab-case (e.g. `change-direction`). Used in tags and commits.
- The folder name may be human-readable ("Change Direction"); the slug is the machine name.
- `manifest.json` `id` equals the slug exactly (e.g. slug `change-direction` → `"id": "change-direction"`).

## Versioning — source of truth = git tags + CHANGELOG
- Semver `MAJOR.MINOR.PATCH`:
  - PATCH = bugfix, no behavior change for the user (1.0.0 → 1.0.1).
  - MINOR = new feature, backward compatible (1.0.0 → 1.1.0).
  - MAJOR = breaking change in behavior/usage (1.x → 2.0.0).
- There is no version field in a working file. The released version = the latest git tag
  for that slug, mirrored by the top entry in the plugin's `CHANGELOG.md`.

## Tag naming
```
<slug>-v<MAJOR.MINOR.PATCH>
e.g.  change-direction-v1.0.0   change-direction-v1.0.1
```
Tags are namespaced per plugin, so plugins version independently inside one repo.

## Commit message format
```
<slug>: <what changed> (<version>)
e.g.  change-direction: fix icon-swap freeze on large libraries (1.0.1)
```
Scope commits to one plugin's folder when possible.

## Release a new version (existing plugin)
1. Edit the plugin's code.
2. Add a new `## [X.Y.Z] — YYYY-MM-DD` block at the TOP of its `CHANGELOG.md`.
3. `git add "Plugins/<Plugin Name>"`
4. `git commit -m "<slug>: <what> (X.Y.Z)"`
5. `git tag <slug>-vX.Y.Z`
6. `git push origin main --tags`

## Start a new plugin
1. Copy `Plugins/_template/` to `Plugins/<New Plugin Name>/`.
2. Fill in `manifest.json` (name, id/slug), write `code.js` / `ui.html`.
3. Set `CHANGELOG.md` to `## [1.0.0] — <date>` baseline; write `README.md`.
4. Commit `+ tag <slug>-v1.0.0` per the release steps above.

## Note for Claude
When asked to create or update any plugin in this repo, follow this file by default:
correct folder layout, the required files, slug/tag/commit conventions, and semver bump.
Do not ask the user to restate these rules. Confirm only the version bump level
(patch/minor/major) and the changelog line if it is ambiguous.
