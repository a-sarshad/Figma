# Chakra UI v3 Style System Guidelines

## CSS Methodology

Chakra UI v3 uses:
- **Style Props**: Theme-aware style properties passed directly to components
- **Emotion**: CSS-in-JS engine for dynamic styling
- **Recipe System**: Variant-based component styling (replaces v2 theme functions)

All Chakra components accept style props that reference the theme tokens.

> **v3 note:** Import everything from `@chakra-ui/react` — subpackage imports no longer exist.

---

## Spacing Scale

Based on **4px increments** (1 unit = 0.25rem = 4px):

| Token | Pixels | Rem | Use Case |
|-------|--------|-----|----------|
| `px` | 1px | - | Borders, hairlines |
| `0.5` | 2px | 0.125rem | Tight spacing |
| `1` | 4px | 0.25rem | Minimal spacing |
| `2` | 8px | 0.5rem | Compact spacing |
| `3` | 12px | 0.75rem | Small spacing |
| `4` | 16px | 1rem | Standard spacing |
| `5` | 20px | 1.25rem | Medium spacing |
| `6` | 24px | 1.5rem | Large spacing |
| `8` | 32px | 2rem | Section spacing |
| `10` | 40px | 2.5rem | Large section spacing |
| `12` | 48px | 3rem | Major section spacing |
| `16` | 64px | 4rem | Hero spacing |
| `20+` | 80px+ | 5rem+ | Extra large spacing |

---

## Layout Primitives

### Box
The foundational component. Renders a `<div>` by default with full style props support.

```tsx
import { Box } from '@chakra-ui/react'

<Box p={4} bg="gray.100" borderRadius="md">
  Content
</Box>
```

**When to use:** Generic container, card wrapper, custom layouts

---

### Flex
Flexbox container with shorthand props.

```tsx
import { Flex } from '@chakra-ui/react'

<Flex
  direction="row"
  align="center"
  justify="space-between"
  wrap="wrap"
  gap={4}
>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>
```

**Props:**
- `direction`: `row | column | row-reverse | column-reverse`
- `align`: `flex-start | center | flex-end | stretch | baseline`
- `justify`: `flex-start | center | flex-end | space-between | space-around | space-evenly`
- `wrap`: `nowrap | wrap | wrap-reverse`
- `gap`: spacing between flex items

**When to use:** Horizontal/vertical layouts, navigation bars, toolbars

---

### Grid
CSS Grid container with shorthand props.

```tsx
import { Grid, GridItem } from '@chakra-ui/react'

<Grid
  templateColumns="repeat(3, 1fr)"
  gap={6}
>
  <GridItem>1</GridItem>
  <GridItem>2</GridItem>
  <GridItem>3</GridItem>
</Grid>
```

**Props:**
- `templateColumns`, `templateRows`: grid structure
- `gap`, `rowGap`, `columnGap`: spacing
- `autoFlow`, `autoRows`, `autoColumns`: automatic placement

**When to use:** Multi-column layouts, dashboards, card grids

---

### SimpleGrid
Responsive grid with automatic column count.

```tsx
import { SimpleGrid } from '@chakra-ui/react'

<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box>Card 3</Box>
</SimpleGrid>
```

**Props:**
- `columns`: number of columns (responsive)
- `gap`: spacing between items (v3 — replaces `spacing`)
- `minChildWidth`: minimum width per item (auto-columns)

**When to use:** Responsive card grids, product listings

---

### Stack / VStack / HStack

Flexbox container with consistent gap between children.

```tsx
import { Stack, VStack, HStack } from '@chakra-ui/react'

// Vertical stack
<VStack gap={4} align="stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

// Horizontal stack
<HStack gap={3}>
  <Button>Cancel</Button>
  <Button colorPalette="blue">Save</Button>
</HStack>

// Responsive direction
<Stack direction={{ base: 'column', md: 'row' }} gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

**Props:**
- `gap`: consistent gap between items — **use `gap` in v3, not `spacing`**
- `direction`: `row | column | row-reverse | column-reverse`
- `align`: alignment of items
- `justify`: justification of items

> **v2 → v3:** `spacing` prop was renamed to `gap` on Stack components.

**When to use:** Form fields, button groups, lists with consistent spacing

---

### Container
Centers content with max-width constraint.

```tsx
import { Container } from '@chakra-ui/react'

<Container maxW="container.lg">
  Content constrained to 1024px
</Container>
```

**Max widths:**
- `container.sm`: 640px
- `container.md`: 768px
- `container.lg`: 1024px
- `container.xl`: 1280px

**When to use:** Page content, article layouts, centered sections

---

### Center / Square / Circle
Centers children horizontally and vertically.

```tsx
import { Center } from '@chakra-ui/react'

<Center h="100vh">
  <Spinner />
</Center>
```

**When to use:** Loading states, empty states, icon containers

---

## Common Spacing Patterns

### Card Padding
```tsx
// Small card
<Box p={4}>Content</Box>

// Medium card
<Box p={6}>Content</Box>

// Large card
<Box p={8}>Content</Box>
```

### Form Field Spacing (v3)
```tsx
import { Stack, Field, Input } from '@chakra-ui/react'

<Stack gap={4}>
  <Field.Root>
    <Field.Label>Name</Field.Label>
    <Input placeholder="Enter name" />
  </Field.Root>
  <Field.Root>
    <Field.Label>Email</Field.Label>
    <Input type="email" />
  </Field.Root>
</Stack>
```

### Section Spacing
```tsx
// Between sections
<VStack gap={12} align="stretch">
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</VStack>

// Page margins
<Box py={8} px={4}>
  Page content
</Box>
```

### Button Groups (v3)
```tsx
<HStack gap={3}>
  <Button variant="ghost">Cancel</Button>
  <Button colorPalette="blue">Save</Button>
</HStack>
```

---

## Logical Properties (RTL-safe)

Always use **logical properties** instead of physical left/right — they automatically flip in RTL.

| Physical (❌ avoid) | Logical (✅ use) |
|---|---|
| `paddingLeft` / `pl` | `paddingStart` / `ps` |
| `paddingRight` / `pr` | `paddingEnd` / `pe` |
| `marginLeft` / `ml` | `marginStart` / `ms` |
| `marginRight` / `mr` | `marginEnd` / `me` |
| `borderLeft` | `borderStart` |
| `borderRight` | `borderEnd` |
| `textAlign="left"` | `textAlign="start"` |
| `textAlign="right"` | `textAlign="end"` |

```tsx
// ✅ Correct — works in both RTL and LTR
<Box paddingStart={4} paddingEnd={8} marginStart={2}>
  <Text textAlign="start">Content</Text>
</Box>

// ❌ Wrong — breaks in RTL
<Box paddingLeft={4} paddingRight={8} marginLeft={2}>
  <Text textAlign="left">Content</Text>
</Box>
```

See `rtl.md` for full bilingual setup and per-component RTL rules.

---

## Responsive Patterns

### Breakpoints
```
base: 0px        (mobile first)
sm: 30em         (480px)
md: 48em         (768px)
lg: 62em         (992px)
xl: 80em         (1280px)
2xl: 96em        (1536px)
```

### Responsive Values (Object Syntax — Recommended)
```tsx
<Box
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: 4, md: 6, lg: 8 }}
>
  Responsive sizing
</Box>
```

### Responsive Values (Array Syntax)
```tsx
// [base, sm, md, lg, xl, 2xl]
<Box
  fontSize={['sm', 'md', 'lg', 'xl']}
  p={[4, 6, 8]}
>
  Responsive sizing
</Box>
```

### Hide/Show by Breakpoint
```tsx
// Hide on mobile, show on desktop
<Box display={{ base: 'none', md: 'block' }}>
  Desktop only
</Box>

// Show on mobile, hide on desktop
<Box display={{ base: 'block', md: 'none' }}>
  Mobile only
</Box>

// Using utility props (v3)
<Box hideBelow="md">Hidden below medium</Box>
<Box hideFrom="lg">Hidden from large and up</Box>
```

---

## Style Props Categories

### Margin & Padding
```tsx
<Box
  m={4}           // all sides
  mt={2}          // top
  mb={6}          // bottom
  mx={8}          // horizontal
  my={4}          // vertical
  ps={4}          // padding-start (RTL-safe, use instead of pl)
  pe={2}          // padding-end (RTL-safe, use instead of pr)
  p={6}
/>
```

### Layout
```tsx
<Box
  w="100%"
  h="200px"
  maxW="container.lg"
  minH="100vh"
  display="flex"
  overflow="hidden"
/>
```

### Position
```tsx
<Box
  position="relative"
  top={0}
  zIndex={10}
/>

<Box
  position="absolute"
  inset={0}
/>

// RTL-safe positioning
<Box
  position="absolute"
  insetStart={0}   // left in LTR, right in RTL
  insetEnd="auto"
/>
```

---

## Custom Styles

### Using `css` Prop
```tsx
<Box
  css={{
    background: 'linear-gradient(to right, red, blue)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }}
>
  Raw CSS
</Box>
```

### Creating Custom Components (v3)
```tsx
import { chakra } from '@chakra-ui/react'

const CustomButton = chakra('button', {
  base: {
    bg: 'blue.500',
    color: 'white',
    px: 4,
    py: 2,
    borderRadius: 'md',
    _hover: { bg: 'blue.600' },
  },
})
```

---

## DO / DON'T

### ✅ DO
```tsx
// Use gap (not spacing) on Stack in v3
<VStack gap={4}>
  <Box>Item 1</Box>
</VStack>

// Use logical properties for RTL support
<Box paddingStart={4} marginEnd={2} />

// Use responsive values
<Box fontSize={{ base: 'sm', md: 'md' }} />

// Use colorPalette (not colorScheme) in v3
<Button colorPalette="blue">Save</Button>

// Import from single package
import { Box, Flex, Stack } from '@chakra-ui/react'
```

### ❌ DON'T
```tsx
// Don't use spacing on Stack (v2 API)
<VStack spacing={4}>...</VStack>

// Don't use physical properties
<Box paddingLeft={4} paddingRight={8} />

// Don't use colorScheme (v2 API)
<Button colorScheme="blue">Save</Button>

// Don't use subpackage imports (v2)
import { Box } from '@chakra-ui/layout'

// Don't use arbitrary values
<Box padding="17px" marginTop="23px" />
```

---

## Common Patterns

### Card with Shadow and Hover
```tsx
<Box
  p={6}
  shadow="md"
  borderRadius="lg"
  _hover={{ shadow: 'lg' }}
  transition="box-shadow 0.2s"
>
  Card content
</Box>
```

### Sticky Header
```tsx
<Box
  position="sticky"
  top={0}
  zIndex={10}
  bg="white"
  _dark={{ bg: 'gray.900' }}
  shadow="sm"
>
  Header content
</Box>
```

### Full-height Layout
```tsx
<Flex direction="column" minH="100vh">
  <Box as="header" p={4}>Header</Box>
  <Box flex="1" p={8}>Main content</Box>
  <Box as="footer" p={4}>Footer</Box>
</Flex>
```

### Two-Column Layout (Sidebar + Main)
```tsx
<Flex gap={6}>
  <Box w="250px" display={{ base: 'none', md: 'block' }}>
    Sidebar
  </Box>
  <Box flex="1">
    Main content
  </Box>
</Flex>
```

### RTL Page Layout
```tsx
<Box dir="rtl" fontFamily="var(--font-persian)">
  <Container maxW="container.lg" py={8}>
    <Stack gap={8}>
      <Heading textAlign="start">عنوان صفحه</Heading>
      <Text textAlign="start">محتوای صفحه</Text>
    </Stack>
  </Container>
</Box>
```

---

## Accessibility

### Screen Reader Only
```tsx
<Box srOnly>
  Screen reader only text
</Box>
```

### Focus Styles
```tsx
<Box _focus={{ outline: 'none', shadow: 'outline' }}>
  Focusable element
</Box>
```

### Semantic HTML with `as` Prop
```tsx
<Box as="nav">Navigation</Box>
<Box as="main">Main content</Box>
<Box as="aside">Sidebar</Box>
<Box as="article">Article</Box>
```
