# Change Direction — Changelog

Semver. Newest on top. Each release maps to a git tag `change-direction-v<version>`.

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
