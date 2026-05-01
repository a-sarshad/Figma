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

## Companion guideline files

| File | Focus |
|---|---|
| `components.md` | Component imports, props/API surfaces, variants, composition patterns, and usage examples |
| `icon-discovery.md` | Icon naming convention, import path, available sizes, and how to search for icons |
| `tokens.md` | Design tokens, color/typography/shadow/border tokens, theming, and CSS custom properties |
| `styles.md` | Spacing scales, layout primitives, responsive patterns, and CSS methodology |
| `setup.md` | Project setup instructions, provider configuration, required CSS imports, and peer dependency requirements |

These companion files live alongside `Guidelines.md` in the `/guidelines/` directory and should be consulted for their respective focus areas when building UIs with this design system.

---

## Core Principles

### 1. Use Theme Tokens, Not Raw Values

**DO:**
```tsx
<Box bg=”blue.500” color=”white” p={4} />
```

**DON'T:**
```tsx
<Box bg=”#3182ce” color=”#ffffff” padding=”16px” />
```

### 2. Build Mobile-First, Responsive

**DO:**
```tsx
<Box fontSize={{ base: 'sm', md: 'md', lg: 'lg' }} />
```

**DON'T:**
```tsx
<Box fontSize=”lg” />  // Fixed size, not responsive
```

### 3. Use Semantic Components

**DO:**
```tsx
<Heading as=”h1” size=”xl”>Title</Heading>
<VStack spacing={4}>...</VStack>
```

**DON'T:**
```tsx
<Box fontSize=”36px” fontWeight=”bold”>Title</Box>
<Box display=”flex” flexDirection=”column” gap=”16px”>...</Box>
```

### 4. Support Light and Dark Mode

**DO:**
```tsx
<Box bg=”white” _dark={{ bg: 'gray.800' }} />
```

**DON'T:**
```tsx
<Box bg=”white” />  // Breaks in dark mode
```

---

## Quick Reference

### Most Common Components

**Layout:**
- `Box` — generic container
- `Flex` — flexbox layout
- `Grid`, `SimpleGrid` — grid layouts
- `VStack`, `HStack` — vertical/horizontal stacks with consistent spacing
- `Container` — max-width centered container

**Typography:**
- `Heading` — semantic headings (h1-h6)
- `Text` — paragraphs and text

**Interactive:**
- `Modal`, `Drawer` — overlays
- `Accordion` — collapsible sections
- `Tabs` — tabbed interface

**Data Display:**
- `Table` — data tables
- `List`, `OrderedList`, `UnorderedList` — lists

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
- Example: `fontSize=”lg”` (18px)

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
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  <Box p={6} shadow=”md” borderRadius=”lg”>Card 1</Box>
  <Box p={6} shadow=”md” borderRadius=”lg”>Card 2</Box>
  <Box p={6} shadow=”md” borderRadius=”lg”>Card 3</Box>
</SimpleGrid>
```

### Form Layout
```tsx
<VStack spacing={4} align=”stretch”>
  <FormControl>
    <FormLabel>Name</FormLabel>
    <Input placeholder=”Enter name” />
  </FormControl>
  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input type=”email” placeholder=”Enter email” />
  </FormControl>
  <Button colorScheme=”blue”>Submit</Button>
</VStack>
```

### Page Layout
```tsx
<Container maxW=”container.lg” py={8}>
  <VStack spacing={8} align=”stretch”>
    <Heading>Page Title</Heading>
    <Text>Page content</Text>
  </VStack>
</Container>
```

### Modal Dialog
```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Title</ModalHeader>
    <ModalCloseButton />
    <ModalBody>Content</ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

## General Guidelines

### Layout
* Use Chakra's layout primitives (Box, Flex, Grid, Stack) instead of raw HTML
* Build mobile-first with responsive values
* Use `Container` for max-width constraints
* Use `VStack`/`HStack` for consistent spacing

### Spacing
* Use theme spacing tokens (1, 2, 4, 6, 8, 12, etc.)
* Never use arbitrary pixel values
* Use Stack components for uniform gaps
* Reference `styles.md` for spacing conventions

### Typography
* Use `Heading` for headings, `Text` for body text
* Match semantic level (h1-h6) to document outline
* Use `size` prop for visual sizing independent of semantic level
* Reference `tokens.md` for typography scale

### Colors
* Use semantic color tokens (e.g., `blue.500`, `gray.700`)
* Support dark mode with `_dark` pseudo prop
* Use `colorScheme` for component theming
* Reference `tokens.md` for color palettes

### Components
* Always read `components.md` before using a component
* Use composition patterns correctly (e.g., Modal > ModalContent > ModalBody)
* Provide required props (e.g., `isOpen` and `onClose` for Modal)
* Use appropriate variants and sizes

### Icons
* **Always verify icon exists** in `icon-discovery.md`
* Do NOT guess icon names
* Use semantic icon names when available
* Size icons appropriately for context

---

## When to Use Each File

| Task | File to Consult |
|------|----------------|
| Setting up Chakra UI in a project | `setup.md` |
| Choosing colors, spacing, fonts | `tokens.md` |
| Building layouts, responsive design | `styles.md` |
| Using a specific component | `components.md` |
| Adding icons | `icon-discovery.md` |
| General best practices | `Guidelines.md` (this file) |
