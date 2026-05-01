# Chakra UI Design System Guidelines

This file serves as the main hub for Chakra UI design system guidelines. It provides an overview and directs you to specialized guideline files for detailed information.

## Reading order

Always read first:
- `Guidelines.md` — this file; the main hub and entry point
- `setup.md` — required project configuration, providers, and CSS imports
- `tokens.md` — foundational design tokens (color, typography, spacing)

Read on-demand:
- `components.md` — read BEFORE using any design-system component
- `icon-discovery.md` — read BEFORE using any icons
- `styles.md` — read when building page layouts or applying custom spacing
- `rtl.md` — read when building RTL or bilingual (Persian/English) layouts

## Companion guideline files

| File | Focus |
|---|---|
| `components.md` | Component imports, props/API surfaces, variants, composition patterns, and usage examples |
| `icon-discovery.md` | Icon naming convention, import path, available sizes, and how to search for icons |
| `tokens.md` | Design tokens, color/typography/shadow/border tokens, theming, and CSS custom properties |
| `styles.md` | Spacing scales, layout primitives, responsive patterns, and CSS methodology |
| `setup.md` | Project setup instructions, provider configuration, required CSS imports, and peer dependency requirements |
| `rtl.md` | RTL/LTR bidirectional layout, Persian font setup, per-component RTL rules |

These companion files live alongside `Guidelines.md` in the `/guidelines/` directory and should be consulted for their respective focus areas when building UIs with this design system.

---

## Core Principles

### 1. Use Theme Tokens, Not Raw Values

**DO:**
```tsx
<Box bg="blue.500" color="white" p={4} />
```

**DON'T:**
```tsx
<Box bg="#3182ce" color="#ffffff" padding="16px" />
```

### 2. Build Mobile-First, Responsive

**DO:**
```tsx
<Box fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} />
```

**DON'T:**
```tsx
<Box fontSize="lg" />  // Fixed size, not responsive
```

### 3. Use Semantic Components

**DO:**
```tsx
<Heading as="h1" size="xl">Title</Heading>
<Stack gap={4}>...</Stack>
```

**DON'T:**
```tsx
<Box fontSize="36px" fontWeight="bold">Title</Box>
<Box display="flex" flexDirection="column" gap="16px">...</Box>
```

### 4. Support Light and Dark Mode

**DO:**
```tsx
<Box bg="white" _dark={{ bg: 'gray.800' }} />
```

**DON'T:**
```tsx
<Box bg="white" />  // Breaks in dark mode
```

### 5. Support RTL/LTR Bidirectional Layout

This project is **bilingual (Persian/English)** and must support both RTL and LTR directions.

**DO:**
```tsx
// Use logical properties — they flip automatically in RTL
<Box paddingStart={4} paddingEnd={2} />
<Box marginStart={4} marginEnd={2} />

// Set dir on the root for RTL sections
<Box dir="rtl" textAlign="start" fontFamily="var(--font-persian)">
  متن فارسی
</Box>
```

**DON'T:**
```tsx
// Don't use physical properties — they don't flip in RTL
<Box paddingLeft={4} paddingRight={2} />
<Box marginLeft={4} marginRight={2} />
<Box textAlign="right" />  // Use textAlign="start" instead
```

See `rtl.md` for complete per-component RTL rules.

---

## Chakra UI Version

This project uses **Chakra UI v3**. Key differences from v2:

| v2 | v3 |
|---|---|
| `colorScheme` prop | `colorPalette` prop |
| `spacing` prop on Stack | `gap` prop on Stack |
| `Modal`, `ModalOverlay` | `Dialog`, compound components |
| `isOpen` / `onClose` | `open` / `onOpenChange` |
| `<ChakraProvider theme={theme}>` | `<ChakraProvider value={defaultSystem}>` |
| `extendTheme()` | `createSystem()` / `defineConfig()` |
| Subpackage imports (`@chakra-ui/layout`) | Single package (`@chakra-ui/react`) |
| `VStack spacing={4}` | `VStack gap={4}` |
| `FormControl` / `FormLabel` | `Field.Root` / `Field.Label` |

---

## Quick Reference

### Most Common Components

**Layout:**
- `Box` — generic container
- `Flex` — flexbox layout
- `Grid`, `SimpleGrid` — grid layouts
- `Stack`, `VStack`, `HStack` — stacks with consistent gap
- `Container` — max-width centered container

**Typography:**
- `Heading` — semantic headings (h1-h6)
- `Text` — paragraphs and text

**Interactive:**
- `Dialog` — modal dialog (v3 replaces Modal)
- `Drawer` — slide-in panel
- `Accordion` — collapsible sections
- `Tabs` — tabbed interface

**Data Display:**
- `Table` — data tables
- `List` — lists

See `components.md` for complete component catalog.

### Most Common Tokens

**Colors:**
- Palettes: `gray`, `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`
- Shades: 50 (lightest) to 900 (darkest)
- Example: `blue.500` (brand color), `gray.700` (dark text)

**Spacing:**
- Scale: `1` (4px), `2` (8px), `4` (16px), `6` (24px), `8` (32px), `12` (48px)
- Example: `p={6}` (24px padding), `mt={4}` (16px margin-top)

**Font Sizes:**
- Scale: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`
- Example: `fontSize="lg"` (18px)

See `tokens.md` for complete token reference.

---

## Before Using an Icon

### Critical: Avoid Hallucinating Icon Names

1. **Check `icon-discovery.md`** for available icons
2. **Do NOT guess icon names** — verify the icon exists first
3. **If an icon doesn't exist**, pick a different one and verify

### Verifying Icons

**IMPORTANT:** Consult `icon-discovery.md` for how to search for icons and verify they exist. Do NOT guess icon names.

Available icons include: Check, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Arrow variants, Add, Close, Edit, Delete, Settings, Search, Bell, Calendar, Lock, Star, Warning, Info, and more.

Total: **60 icons** — see `icon-discovery.md` for the complete list.

---

## Common Patterns

### Responsive Card Grid
```tsx
import { SimpleGrid, Box } from '@chakra-ui/react'

<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <Box p={6} shadow="md" borderRadius="lg">Card 1</Box>
  <Box p={6} shadow="md" borderRadius="lg">Card 2</Box>
  <Box p={6} shadow="md" borderRadius="lg">Card 3</Box>
</SimpleGrid>
```

### Form Layout (v3)
```tsx
import { Stack, Field, Input, Button } from '@chakra-ui/react'

<Stack gap={4}>
  <Field.Root>
    <Field.Label>Name</Field.Label>
    <Input placeholder="Enter name" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Input type="email" placeholder="Enter email" />
  </Field.Root>
  <Button colorPalette="blue">Submit</Button>
</Stack>
```

### Page Layout
```tsx
import { Container, Stack, Heading, Text } from '@chakra-ui/react'

<Container maxW="container.lg" py={8}>
  <Stack gap={8}>
    <Heading>Page Title</Heading>
    <Text>Page content</Text>
  </Stack>
</Container>
```

### Dialog (replaces Modal in v3)
```tsx
import { Dialog, Button } from '@chakra-ui/react'

<Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Title</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>Content</Dialog.Body>
      <Dialog.Footer>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

### RTL Bilingual Layout
```tsx
import { Box, Text } from '@chakra-ui/react'

// Wrap RTL content with dir="rtl"
<Box dir="rtl" textAlign="start">
  <Text fontFamily="var(--font-persian)">متن فارسی</Text>
</Box>

// LTR content remains default
<Box>
  <Text>English text</Text>
</Box>
```

---

## General Guidelines

### Layout
- Use Chakra's layout primitives (Box, Flex, Grid, Stack) instead of raw HTML
- Build mobile-first with responsive values
- Use `Container` for max-width constraints
- Use `Stack`/`VStack`/`HStack` with `gap` prop (not `spacing`)
- Use logical CSS properties (`paddingStart`/`paddingEnd`) for RTL support

### Spacing
- Use theme spacing tokens (1, 2, 4, 6, 8, 12, etc.)
- Never use arbitrary pixel values
- Use `gap` prop on Stack components (v3 replaces `spacing`)
- Reference `styles.md` for spacing conventions

### Typography
- Use `Heading` for headings, `Text` for body text
- Match semantic level (h1-h6) to document outline
- Use `size` prop for visual sizing independent of semantic level
- For Persian text, apply `fontFamily="var(--font-persian)"`
- Reference `tokens.md` for typography scale

### Colors
- Use semantic color tokens (e.g., `blue.500`, `gray.700`)
- Support dark mode with `_dark` pseudo prop
- Use `colorPalette` for component theming (v3 — not `colorScheme`)
- Reference `tokens.md` for color palettes

### Components
- Always read `components.md` before using a component
- Use v3 compound component patterns (e.g., `Dialog.Root > Dialog.Content > Dialog.Body`)
- Use `open` / `onOpenChange` props (v3 — not `isOpen` / `onClose`)
- Use appropriate variants and sizes

### Icons
- **Always verify icon exists** in `icon-discovery.md`
- Do NOT guess icon names
- Use semantic icon names when available
- Size icons appropriately for context

### RTL / Bilingual
- Always use logical CSS properties (`paddingStart`, `marginEnd`, etc.)
- Set `dir="rtl"` on RTL containers
- Use `textAlign="start"` instead of `textAlign="right"`
- Read `rtl.md` before building any bilingual or Persian-language UI

---

## When to Use Each File

| Task | File to Consult |
|------|----------------|
| Setting up Chakra UI in a project | `setup.md` |
| Choosing colors, spacing, fonts | `tokens.md` |
| Building layouts, responsive design | `styles.md` |
| Using a specific component | `components.md` |
| Adding icons | `icon-discovery.md` |
| Building RTL or bilingual layouts | `rtl.md` |
| General best practices | `Guidelines.md` (this file) |
