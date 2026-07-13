---
name: audit-design-tokens
description: Audit and fix hardcoded values in designs — finds spacing, color, radii, and border properties not bound to design system variables and offers to fix them
---

# Audit & Fix Design Tokens

This skill audits a selected frame (or the entire current page) against the Chakra-based design system library and fixes any hardcoded values that should use design tokens.

## Design System Reference

### Spacing Tokens (Collection: "Size Tokens", scope: GAP)

| Token | px Value |
|---|---|
| Spacing/0_5 | 2 |
| Spacing/1 | 4 |
| Spacing/1_5 | 6 |
| Spacing/2 | 8 |
| Spacing/2_5 | 10 |
| Spacing/3 | 12 |
| Spacing/3_5 | 14 |
| Spacing/4 | 16 |
| Spacing/4_5 | 18 |
| Spacing/5 | 20 |
| Spacing/6 | 24 |
| Spacing/7 | 28 |
| Spacing/8 | 32 |
| Spacing/9 | 36 |
| Spacing/10 | 40 |
| Spacing/11 | 44 |
| Spacing/12 | 48 |
| Spacing/14 | 56 |
| Spacing/16 | 64 |
| Spacing/20 | 80 |
| Spacing/24 | 96 |
| Spacing/28 | 112 |
| Spacing/32 | 128 |
| Spacing/36 | 144 |
| Spacing/40 | 160 |
| Spacing/44 | 176 |
| Spacing/48 | 192 |
| Spacing/52 | 208 |
| Spacing/56 | 224 |
| Spacing/60 | 240 |
| Spacing/64 | 256 |
| Spacing/72 | 288 |
| Spacing/80 | 320 |
| Spacing/96 | 384 |

### Radii Tokens (scope: CORNER_RADIUS)

| Token | px Value |
|---|---|
| Radii/none | 0 |
| Radii/2xs | 1 |
| Radii/xs | 2 |
| Radii/sm | 4 |
| Radii/md | 6 |
| Radii/lg | 8 |
| Radii/xl | 12 |
| Radii/2xl | 16 |
| Radii/3xl | 24 |
| Radii/4xl | 32 |
| Radii/full | 9999 |

### Semantic Radii Tokens

| Token | Alias to |
|---|---|
| Radii/Semantic_tokens/l1 | Radii/xs (2px) |
| Radii/Semantic_tokens/l2 | Radii/sm (4px) |
| Radii/Semantic_tokens/l3 | Radii/md (6px) |

### Border Tokens (scope: STROKE_FLOAT)

| Token | px Value |
|---|---|
| Borders/xs | 0.5 |
| Borders/sm | 1 |
| Borders/md | 2 |
| Borders/lg | 4 |
| Borders/xl | 6 |

### Size Tokens (scope: WIDTH_HEIGHT)

Same scale as Spacing (2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256, 288, 320, 384) — use Size/* tokens for width/height bindings.

### Color Collections

- **Color/Global Tokens** (1 mode): whiteAlpha, blackAlpha, gray, red, pink, purple, cyan, blue, teal, green, yellow, orange — each with shades 50-950
- **Color/Semantic Tokens** (2 modes: Chakra/light, Chakra/dark): bg/*, fg/*, border/*, text/*, brand/*, plus per-color semantic aliases
- **Color/Brands** (2 modes: Default, Picoach): brand/50-brand/950

### Typography Tokens (Collection: "Typography Tokens")

- **fonts**: heading, mono, body (STRING)
- **fontWeights**: thin, extralight, light, normal, medium, semibold, bold, extrabold, black
- **fontSizes**: 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- **lineHeights**: shorter, short, moderate, tall, taller
- **letterSpacings**: tighter, tight, wide, wider, widest

## Audit Workflow

When the user asks to audit or fix token usage, follow these steps:

### Step 1: Identify Target Nodes

If the user has selected a frame, audit that frame and its descendants. Otherwise, audit all top-level frames on the current page.

### Step 2: Run the Audit Script

Use evaluate_script to traverse all descendants of the target node(s) and check for hardcoded values:

#### Spacing Audit

For every node with layoutMode (auto-layout frames), check:
- itemSpacing — is it bound to a Spacing/* variable?
- paddingTop, paddingRight, paddingBottom, paddingLeft — are they bound to Spacing/* variables?
- counterAxisSpacing (wrap spacing) — is it bound?

How to check if a property is bound to a variable:

    const bindings = node.boundVariables;
    // bindings.itemSpacing, bindings.paddingTop, etc.
    // will be { type: "VARIABLE_ALIAS", id: "VariableID:..." } if bound

If the property has a numeric value that matches a spacing token but is NOT bound, flag it as "can be auto-fixed." If the value does NOT match any token, flag it as "non-standard value" and suggest the closest token.

#### Color Audit

For every node, check:
- Fills — are solid color fills bound to color variables?
- Strokes — are they bound?
- For text nodes, check fills for text color bindings.

#### Radii Audit

For every node with cornerRadius, check if it's bound to a Radii/* variable.

#### Border Width Audit

For every node with strokes, check if strokeWeight is bound to a Borders/* variable.

### Step 3: Report Results

Output a structured report grouped by issue type:

    SPACING ISSUES (X found):
    - NodeName (id: X:Y) -> itemSpacing = 16px, not bound -> suggested token: Spacing/4
    - NodeName (id: X:Y) -> paddingLeft = 15px, not bound -> closest token: Spacing/4 (16px) WARNING: value mismatch

    COLOR ISSUES (X found):
    - ...

    RADII ISSUES (X found):
    - ...

    BORDER ISSUES (X found):
    - ...

### Step 4: Fix (when user confirms)

After showing the report, ask the user which categories to fix. Then use evaluate_script to bind the correct variables:

    const variable = await figma.variables.getVariableByIdAsync("VariableID:40:920");
    node.setBoundVariable('itemSpacing', variable);
    node.setBoundVariable('paddingTop', variable);

For values that don't exactly match a token, ask the user whether to:
1. Round to the nearest token (and adjust the value)
2. Skip that property

**Important:** When working in a consuming file (not the library file itself), variables must be imported using figma.variables.importVariableByKeyAsync(variableKey). Use the variable key property (not id) for cross-file imports.

## Quick Commands

The user can request specific audit scopes:

- **"audit spacing"** — only check spacing/padding/gap bindings
- **"audit colors"** — only check fill and stroke color bindings
- **"audit radii"** — only check corner radius bindings
- **"audit borders"** — only check stroke weight bindings
- **"audit all"** — check everything
- **"fix spacing"** — auto-fix all spacing issues that have exact token matches
- **"fix all"** — auto-fix all issues with exact token matches

## Important Notes

- Spacing tokens have scope GAP — they are intended for itemSpacing, paddingTop/Right/Bottom/Left, and counterAxisSpacing
- Size tokens have scope WIDTH_HEIGHT — use them for explicit width/height bindings
- The design system has 3 modes for Size Tokens: px, Size, and Picoach
- Color/Semantic Tokens have 2 modes: Chakra/light and Chakra/dark. Designs should use semantic tokens for theme support
- Always prefer semantic color tokens (bg/default, fg/default, etc.) over global color tokens (gray/500, blue/600, etc.) for theme compatibility
