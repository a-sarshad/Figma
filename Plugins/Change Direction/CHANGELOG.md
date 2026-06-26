# Change Direction — Changelog

Semver. Newest on top. Each release maps to a git tag `change-direction-v<version>`.

## [2.0.0] — 2026-06-25
### Changed (BREAKING — engine swap)
- `code.js` + `ui.html` replaced with the build developed in the `Change Layout` plugin: the
  original "Change Direction" **legacy geometry engine** (ported unchanged) wrapped in the v2 UI,
  the idempotency guard, target-aware text, and the bounded swap-icons phase. This supersedes the
  unshipped "simplest converter" rewrite that earlier drafts of this file described (that build was
  never committed/tagged and is not retained).
- Frame geometry now runs through the `swapPair` engine — fewest writes; for variable-bound props it
  swaps the two bindings directly instead of unbind→set→rebind, preserving design tokens.
### Added
- **Report**: a count table (frames / texts / instances / shapes / masters / icons / errors) plus a
  list of the master components behind every touched instance — `×N` count, ✓ already-applied,
  click a name to select those instances on canvas, arrow to drill into a master, breadcrumbs to
  climb back, and a Return button to the original selection/viewport. Elapsed `Time` shown.
- `reconcileInstance`: mirrors ONLY the radius / border / padding / shadow props an instance already
  overrides; inherited props stay linked and update when the master is flipped. Instances are never
  opened or detached.
- `flipEffects`: mirror horizontal offset of drop/inner shadows (no-op when offset.x = 0).
- GRID auto-layout: padding swap + counter-axis alignment flip (cells are NOT reordered).
### Kept
- Auto-layout flip (reverse horizontal order, swap padding, flip alignment), corner-radius /
  stroke-weight swap with variable bindings preserved, mixed-font-safe text flip.
- Bounded swap-icons (variant property or SECTION-scoped counterpart search — no full-document scan).
- `documentAccess: "dynamic-page"` in the manifest (required — removing it forces full document load
  and errors the plugin env on large libraries). The ported code resolves masters via
  `getMainComponentAsync`, which is compatible with dynamic-page. NOTE: the `Change Layout` source
  manifest omitted `documentAccess` (full access) as a speed experiment; that is intentionally NOT
  carried over here.
- Idempotency guard via `pluginData('cd_dir')`.
- v1.1.0 logic preserved in `code.v1-complex.js`; original pre-rewrite in `code.legacy.js`.

## [1.1.0] — 2026-06-24
### Added
- UI lists the unique master components behind every touched instance ("fix each master separately"), grouped with an instance count (`×N`). Variants point to the parent component set.
- Per instance row: clicking the **name** (hover-underline) selects those instances on the canvas; a small **arrow icon-button** on the right jumps to the master component (switches page + selects + zooms).
- Change report is rendered as a labeled table of rows (Direction, Frames, Texts, Instances, Shapes, and Icons/Errors when relevant).
- "Return" button restores the page, selection, and viewport from where the conversion was applied.
- **Breadcrumbs**: drilling into a master (the row arrow) pushes a crumb and lists that master's own instances; crumbs are clickable to climb back up; the "Selection" root returns to the original selection. Manual drill-down aid for the bottom-up workflow.
- **Already-applied indicator**: each master row shows a ✓ when that master has already been converted to the current direction.
### Performance
- Kept `documentAccess: "dynamic-page"`. (Tried removing it to match the original plugin, but full document access on a very large library forces a "full connection" that takes ~40s, ~384MB, and errors the plugin environment — dynamic-page is required for big files.)
- Root-caused part of the master-component slowness: `reconcileInstance` resolved each nested instance's master with `getMainComponentAsync` (cross-page loads) — something the original plugin never did, which is why the original was fast on masters. `reconcileInstance` is now **fully synchronous**: it reads the overridden fields straight from `instance.overrides` (no master fetch) and mirrors only those. The conversion path no longer resolves any master; `getMainComponentAsync` is used only by the on-demand master list and icon-swap.
- Master-component write reduction. Editing a master propagates every write to all its instances across the file (confirmed: detached copies are fast, masters are slow — this is Figma behaviour, not the plugin). The radius/border/padding swaps now use `swapPair`, which makes the fewest writes possible — for variable-bound props it swaps the two bindings directly (2 writes) instead of the old unbind→set→rebind dance (~6 writes), cutting propagation work roughly 3×. Editing masters is still inherently slower than detached frames.
- Big-selection slowness fixed. The conversion itself is sync/fast; the cost was building the "instances to fix" list, which resolves every nested instance's master component (`getMainComponentAsync`, cross-page loads under dynamic-page). Now: (1) `reconcileInstance` is gated by a sync `instance.overrides` check (no async master fetch unless the instance actually overrides a geometry prop); (2) `getMainComponentAsync` is called at most once per instance; (3) in manual mode the master list is **lazy** — the conversion + report are instant, and the list is built only when you click "Show N instances to fix". Auto Mode still builds it (it needs it).
### Fixed
- Icon-swap freeze on large libraries: the name-based counterpart search no longer scans the whole page (a synchronous `findOne` over a huge library page froze the plugin on "Working…"). It is now bounded to the icon's nearest `SECTION` ancestor (plus direct siblings / component-set variants).
### Changed
- **Instances are no longer geometry-swapped directly** (that created overrides detached from the master, breaking master propagation). Instead, `reconcileInstance` mirrors ONLY the corner-radius / stroke-weight / shadow props the instance already overrides; inherited props are left for the master fix to propagate. Idempotent via the `cd_dir` guard.
### Auto Mode
- **Auto Mode** (checkbox): after converting the selection, automatically applies the same direction to the master component of each listed instance, in order. If those masters contain nested instances, a modal lists them and asks whether to continue deeper. "No" stops, returns to origin, and shows the aggregate report. Idempotent via the `cd_dir` guard. Warning: editing masters affects every instance of them across the whole file.
- Wider UI panel (340px).

## [1.0.0] — 2026-06-24
Baseline release.

### Features
- Minimal UI with direction toggle: `→ RTL` / `LTR →`, plus an optional "Swap left/right icons" checkbox.
- Direction-aware & idempotent: each node is tagged with `pluginData('cd_dir')`; re-running the same direction is a no-op.
- Auto Layout: reverse horizontal children order, swap left/right padding, flip primary/counter alignment.
- Swap left/right corner radius and stroke weights — bound variables (design tokens) are preserved.
- Flip horizontal offset of drop/inner shadows.
- Instances: only their own overrides (radius/border/shadow) are swapped; internals are NOT opened (bottom-up workflow). Instances are never detached.
- Absolute-positioned and free-frame children: mirror `x` + flip horizontal constraint.
- Text: direction-aware alignment + paragraph direction; mixed fonts handled without crashing (batched font load).
- Optional icon handling: swap left/right icon components (`arrow-left` ↔ `arrow-right`) via variant property or scoped name search. No full-document scan (safe on large libraries).
