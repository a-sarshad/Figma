# Change Direction — Handoff

## ✅ v2.0.0 = Change Layout build adopted (2026-06-25)
Decision (confirmed by user): scrap the unshipped "simplest converter" v2 draft and ship the build
developed in the `Change Layout` plugin as Change Direction **v2.0.0** instead. Done:
- `code.js` + `ui.html` replaced with the `Change Layout` build (legacy geometry engine + v2 UI +
  report + master-list navigation + bounded swap-icons). The two `Change Layout` name strings were
  renamed to `Change Direction` (code.js header comment, ui.html `<h1>`).
- `manifest.json` kept at `id: "change-direction"`, `name: "Change Direction"`,
  **`documentAccess: "dynamic-page"`** (NOT the full-access manifest from Change Layout — that omission
  was a speed experiment and is documented as crash-prone on large libraries). The ported code resolves
  masters via `getMainComponentAsync`, which is compatible with dynamic-page; the stale "full document
  access" comment at the top of code.js was corrected.
- `CHANGELOG.md` `[2.0.0]` entry rewritten to describe the engine swap (was previously describing the
  abandoned "simplification"). README rewritten to the new feature set.
- The unshipped "simplest v2" `code.js` was **discarded** per user (no backup kept).
- `Change Layout/` folder is **kept as a separate benchmark plugin** (id `change-layout`); only its
  content was copied here, not removed.
- `code.legacy.js` (original) and `code.v1-complex.js` (v1.1.0) retained as reference.

REMAINING: not committed/tagged yet, and not tested live in Figma. Next session:
(1) reopen the Figma file fresh + re-import manifest, (2) test on a real selection + on a master
component + the report navigation, (3) commit `change-direction: adopt Change Layout build as v2 (2.0.0)`
+ tag `change-direction-v2.0.0` + push.

## What v2.0.0 does
- Horizontal Auto Layout: reverse child order, swap left/right padding, flip alignment.
- Corner radius + stroke weights swapped via `swapPair` (fewest writes, variable bindings preserved).
- Text: direction-aware alignment + paragraph direction (mixed-font safe).
- Shadows: mirror horizontal offset of drop/inner shadows.
- GRID auto-layout: padding + alignment flipped; cells NOT reordered.
- Instances: `reconcileInstance` mirrors only the radius/border/padding/shadow props already overridden;
  inherited props stay linked. Instances never opened or detached.
- Report: count table + master-components list behind touched instances (click name → select, arrow →
  drill into master, breadcrumbs, Return to origin, elapsed Time).
- Bounded swap-icons: `arrow-left` ↔ `arrow-right` via variant property or SECTION-scoped search.
- Idempotent via `pluginData('cd_dir')`.

## Hard-won lessons (do not relearn these)
1. **`documentAccess: "dynamic-page"` is REQUIRED in the manifest.** Removing it makes Figma pull a
   "full connection" / load the whole document — on a big library this is ~41s, ~384MB, and throws
   `es: An error occurred while loading the plugin environment`. The Change Layout manifest omitted it
   on purpose (full-access speed experiment); that omission is NOT carried into change-direction.
2. **Never scan the whole page or document.** `findOne`/`findAllWithCriteria` over a huge page, and
   `loadAllPagesAsync`, freeze the plugin ("Working…" forever). Bound every search. Current code's only
   `findOne` is SECTION-scoped (safe).
3. **Resolving instances' masters (`getMainComponentAsync`) per nested instance is the big slowdown** on
   large libraries (cross-page loads). The report's master-list does this — expect it to be the slow part
   on big files. The conversion itself is sync/fast.
4. **Editing a master component propagates every write to all its instances** (Figma behaviour) — an
   inherent cost. `swapPair` minimizes writes to cut propagation work.
5. **Don't write instance overrides** beyond what the instance already overrides (detaches from master) —
   `reconcileInstance` only mirrors already-overridden props.

## Conventions (already set, follow them)
- Repo: `a-sarshad/Figma`, monorepo, this plugin in `Plugins/Change Direction/`.
- See `Plugins/CLAUDE.md` for the full rulebook (layout, semver, tags, commit format).
- Version source of truth = git tag + top of `CHANGELOG.md`. Tag: `change-direction-v2.0.0`.
- Commit format: `change-direction: <what> (2.0.0)`. Scope the commit to `Plugins/Change Direction/`.
- Files: `manifest.json`, `code.js`, `ui.html`, `README.md`, `CHANGELOG.md`. Keep `code.legacy.js` and
  `code.v1-complex.js` as reference backups.
- NOTHING in this repo has been committed/tagged yet — v2.0.0 will be the first tagged release.

## Status at handoff
- `manifest.json`: dynamic-page ✓, id `change-direction` ✓.
- `code.js` / `ui.html`: the adopted Change Layout build, names corrected. Syntax-checked.
- Not committed, not tagged, not live-tested in Figma.
