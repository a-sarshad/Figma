# Change Direction — Handoff

## ✅ v2.1.0 = "Swap absolute" feature (2026-06-26)
Added an optional **Swap absolute** checkbox (default off). When on, `swapAbsolutePhase` does a
**symmetric horizontal mirror** of absolute-positioned nodes: swap horizontal constraint BOTH ways
(`MIN ↔ MAX`) and mirror `x` within the parent (`x = parentWidth − x − width`), preserving the edge
gap. A right-pinned (MAX) close button moves left (MIN); a left-pinned one moves right.
CENTER/STRETCH/SCALE untouched. Works on any node incl. INSTANCE (writes x/constraints override on the
instance's OWN node only). Plumbing: `apply` carries `swapAbsolute`; `run`/`applyToNodes`/`traverse`
thread it; report shows `Absolute mirrored`.

CORRECTION made during testing: the first draft was one-directional (RTL only `MIN→MAX`) and silently
ignored right-pinned (MAX) elements — exactly the close-button case the user reported. Fixed to a full
symmetric mirror.

WHY a separate tag: a mirror is its own inverse, so the constraint value alone can't distinguish
"already mirrored" from "authored that way". Each node carries `pluginData('cd_abs')` = the direction
it was last mirrored to; UNTAGGED = authored `LTR`. RTL on untagged → mirror + tag RTL; RTL again →
no-op; LTR → un-mirror. LTR on untagged (assumed LTR) → no-op. Independent of the geometry `cd_dir`
tag, so order vs `reconcileInstance` doesn't matter. Never mirror `x` without also swapping the
constraint and setting `cd_abs`.

KNOWN INCONSISTENCY (left as-is): `flipAlignment` is still one-directional (RTL only `MIN→MAX`) while
absolute is a full symmetric mirror. Right-aligned auto-layout won't flip under RTL but a right-pinned
absolute will. The user confirmed alignment works for their cases; don't change it without asking.

REMAINING for 2.1.0: live-test the checkbox in Figma (e.g. the top-right close button case), then
commit `change-direction: swap-absolute for absolute-positioned nodes (2.1.0)` + tag
`change-direction-v2.1.0`. NOTE: if `change-direction-v2.0.0` isn't committed/tagged yet, do that first.

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

Live-tested in Figma by the user (Untitled UI PRO copy, tab-button instances): RTL → right-align,
LTR → left-align confirmed working after the alignment fix below.

REMAINING: commit + tag (this is the first tagged release). Run:
`change-direction: adopt Change Layout build as v2 (2.0.0)` + tag `change-direction-v2.0.0` + push.

## Alignment direction — how it works (READ BEFORE TOUCHING `flipAlignment`)
Evolved across testing. CURRENT behavior (2.1.0): symmetric mirror with its own `cd_align` tag.

- `flipAlignment(frame, target, stats)` is a **symmetric horizontal MIRROR**: it swaps the left/right
  axis BOTH ways (`MIN → MAX` AND `MAX → MIN`), so a right-aligned (MAX) row flips left and a
  left-aligned (MIN) row flips right. Reads `primaryAxisAlignItems` for HORIZONTAL, `counterAxisAlignItems`
  for VERTICAL/GRID. `CENTER` / `SPACE_BETWEEN` untouched.
- **Idempotency via its OWN tag `pluginData('cd_align')`** (UNTAGGED = authored `LTR`), NOT the geometry
  `cd_dir` tag. A mirror is its own inverse, so the value alone can't tell "already mirrored" from
  "authored that way" — the tag does. RTL on untagged → flip + tag RTL; RTL again → no-op; LTR →
  un-mirror; LTR on untagged (assumed LTR) → no-op.
- **Called OUTSIDE the `cd_dir` early-return**: in the frame path it runs for any auto-layout frame
  regardless of `already`; in `reconcileInstance` it runs BEFORE the `cd_dir` guard. Consequence:
  alignment is corrected on the FIRST press even when the node has a stale `cd_dir` tag (because
  `cd_align` is a fresh, separate tag). This is why 2.1.0 fixes the "right-aligned FILL row stays MAX"
  bug that 2.0.0's one-directional, `cd_dir`-gated alignment could not.
- INSTANCE override: alignment flips ONLY when the align axis is in the instance's OWN `overriddenFields`
  (`o.id === inst.id`), so we never write a new override onto an inherited field. Nested-child overrides
  inside an instance are still not handled (instances aren't opened) — accepted gap.
- HISTORY: 2.0.0 shipped `flipAlignment` as one-directional target-aware (RTL only `MIN→MAX`), which
  silently ignored MAX-aligned rows. Before that, the ported original was a blind `MAX↔MIN` toggle with
  no tag (polarity depended on run parity → "backwards" symptom). 2.1.0's symmetric-mirror + `cd_align`
  is the final model; it matches `swapAbsolutePhase` (`cd_abs`).
- MIGRATION: correct for a clean LTR source run ONCE. A node already mirrored by an OLDER version
  (no `cd_align` set) reads as untagged-LTR and may re-mirror on first run under 2.1.0 — test on a FRESH
  duplicate that never went through the plugin.

### The `cd_dir` guard — why it stays, and its one quirk
- `reconcileInstance` and the frame path early-return when `getPluginData('cd_dir') === target`. This
  guard is **load-bearing**: the geometry swaps (`swapPair` for radius/padding/stroke) and
  `reverseChildrenOrder` are **toggles** (non-idempotent). Without the guard, a second same-direction
  run would swap/reverse them AGAIN and corrupt geometry. Do NOT remove or bypass the guard.
- ONE-TIME QUIRK observed: a node carrying a stale `cd_dir` tag from BEFORE the alignment fix can no-op
  on the first matching-direction press (guard sees the old tag and returns). Pressing the opposite
  direction once, then back, clears it. On untouched nodes the first press is correct. This is a
  one-time migration artifact, self-correcting — not a recurring bug. We deliberately did NOT add code
  to work around it (risk of breaking the guarded swaps outweighs the cosmetic benefit).
- FUTURE option (not done, deferred to its own version): make the swaps + `reverseChildrenOrder`
  target-aware/absolute too, after which the whole plugin is idempotent and the `cd_dir` guard could be
  dropped. Only then is it safe to evaluate alignment outside the guard.

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
