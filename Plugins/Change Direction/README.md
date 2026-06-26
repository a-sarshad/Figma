# Change Direction

A no-build Figma plugin that flips a design's layout direction between **LTR** and **RTL** — built for mirroring English design systems into RTL. Select, pick a direction, Apply.

As of v2.0.0 the geometry engine is the original "Change Direction" legacy build (ported unchanged from `code.legacy.js`), wrapped in the v2 UI, an idempotency guard, target-aware text, and bounded icon-swapping — plus a report with master-component navigation.

## What it does
- Horizontal Auto Layout: reverse child order, swap left/right padding, flip primary/counter alignment.
- Swaps left/right corner radius and stroke weights, preserving bound variables (tokens) via the `swapPair` engine (fewest writes).
- Fixes text alignment and paragraph direction (mixed fonts safe — every segment's font is loaded first).
- Shadows: mirrors the horizontal offset of drop/inner shadows (symmetric shadows untouched).
- GRID auto-layout: padding + alignment flipped; cells are NOT reordered (unsupported).
- Instances: `reconcileInstance` mirrors only the radius/border/padding/shadow props the instance already overrides; everything else stays linked and updates when the master is flipped. Instances are never opened or detached.
- Optional: swaps `arrow-left` ↔ `arrow-right` icon components (or a `left`/`right` variant property) instead of flipping them.
- Report: a count table (frames / texts / instances / shapes / masters / icons / errors) plus the list of master components behind the touched instances — click a name to select those instances, drill into a master, breadcrumbs + a Return button to navigate back.

It is **direction-aware and idempotent** — each node is tagged with `pluginData('cd_dir')`, so running the same direction twice is a no-op.

## Usage
1. Select one or more nodes (or a master component).
2. Pick `→ RTL` or `LTR →` (default RTL).
3. (Optional) Check **Swap left/right icons** if your icons are separate `*-left` / `*-right` components or have a `left`/`right` direction variant.
4. Apply.

To convert a design system cleanly, run it on the master components themselves, bottom-up (leaf masters first, then composed components).

## Install (dev)
Figma → Plugins → Development → Import plugin from manifest → select `manifest.json`.

## Limitations
- GRID Auto Layout: only padding/alignment, no cell reversal.
- Icon swap matches `left`/`right` on word boundaries; camelCase without separators (`ArrowLeft`) is not matched.
- Counterpart icon search is bounded (siblings → component set → nearest SECTION) to stay fast on large libraries; a counterpart outside that scope is not found.
- Idempotency guard means a second run in the same direction does nothing; to flip back, run the opposite direction.
- Editing a master component propagates every write to all its instances across the file (Figma behaviour) — inherently slower than editing detached frames.

## Files
- `manifest.json` — plugin manifest (keep `documentAccess: "dynamic-page"`)
- `code.js` — main logic (v2.0.0, legacy engine + UI/report, ported from the `Change Layout` build)
- `ui.html` — UI panel + report
- `code.v1-complex.js` — v1.1.0 (report + master list + Auto Mode), kept for reference
- `code.legacy.js` — original pre-rewrite, kept for reference
- `CHANGELOG.md` — version history
