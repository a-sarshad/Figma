# Change Direction

A no-UI-build Figma plugin that converts a design's layout direction between **LTR** and **RTL** — built for mirroring English design systems into RTL.

## What it does
- Reverses horizontal Auto Layout order, swaps left/right padding, flips alignment.
- Swaps left/right corner radius and stroke weights, preserving bound variables (tokens).
- Flips horizontal shadow offsets and absolute-positioned children (with constraints).
- Fixes text alignment and direction (mixed fonts safe).
- Optional: swaps `arrow-left` ↔ `arrow-right` icon components instead of flipping them.

It is **direction-aware and idempotent** — running the same direction twice does nothing (tracked via `pluginData('cd_dir')`).

## Workflow
Process bottom-up: apply to leaf master components first, then to composed components (e.g. Card containing Button). Instances are never opened or detached — only their own overrides are mirrored.

## Usage
1. Select one or more nodes.
2. Pick `→ RTL` or `LTR →`.
3. (Optional) Check **Swap left/right icons** if your icons are separate `*-left` / `*-right` components or direction variants.
4. Apply. The result line reports counts (frames / texts / instances / icons).

## Install (dev)
Figma → Plugins → Development → Import plugin from manifest → select `manifest.json`.

## Limitations
- GRID Auto Layout: only padding/alignment, no column reversal.
- Icon swap matches `left`/`right` on word boundaries; camelCase without separators (`ArrowLeft`) is not matched.
- Counterpart icon search is scoped to the master's page; counterparts on a different page are not found.

## Files
- `manifest.json` — plugin manifest
- `code.js` — main logic
- `ui.html` — minimal UI
- `code.legacy.js` — original v0 (pre-rewrite), kept for reference
