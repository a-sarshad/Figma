# Chakra UI Style System Guidelines

## CSS Methodology

Chakra UI uses:
- **Style Props**: Theme-aware style properties passed directly to components
- **Emotion**: CSS-in-JS engine for dynamic styling
- **Styled System**: Constraint-based design system utilities

All Chakra components accept style props that reference the theme tokens.

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

## Layout Primitives

### Box
The foundational component. Renders a `<div>` by default with full style props support.

```tsx
import { Box } from '@chakra-ui/layout'

<Box p={4} bg="gray.100" borderRadius="md">
  Content
</Box>
```

**When to use:** Generic container, card wrapper, custom layouts

### Flex
Flexbox container with shorthand props.

```tsx
import { Flex } from '@chakra-ui/layout'

<Flex 
  direction="row"      // flexDirection
  align="center"       // alignItems
  justify="space-between"  // justifyContent
  wrap="wrap"          // flexWrap
  gap={4}              // gap between items
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

### Grid
CSS Grid container with shorthand props.

```tsx
import { Grid, GridItem } from '@chakra-ui/layout'

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

### SimpleGrid
Responsive grid with automatic column count.

```tsx
import { SimpleGrid } from '@chakra-ui/layout'

<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box>Card 3</Box>
</SimpleGrid>
```

**Props:**
- `columns`: number of columns (responsive)
- `spacing`: gap between items
- `minChildWidth`: minimum width per item (auto-columns)

**When to use:** Responsive card grids, product listings

### Stack (VStack, HStack)
Flexbox container with consistent spacing between children.

```tsx
import { Stack, VStack, HStack } from '@chakra-ui/layout'

// Vertical stack
<VStack spacing={4} align="stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

// Horizontal stack
<HStack spacing={3} justify="flex-start">
  <Button>Cancel</Button>
  <Button>Save</Button>
</HStack>

// Responsive stack (vertical on mobile, horizontal on desktop)
<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

**Props:**
- `spacing`: consistent gap between items (default: `0.5rem`)
- `direction`: `row | column | row-reverse | column-reverse`
- `align`: alignment of items
- `justify`: justification of items
- `divider`: element to render between items

**When to use:** Form fields, button groups, lists with consistent spacing

### Container
Centers content with max-width constraint.

```tsx
import { Container } from '@chakra-ui/layout'

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

### Center
Centers children horizontally and vertically.

```tsx
import { Center, Square, Circle } from '@chakra-ui/layout'

<Center h="100vh">
  <Box>Centered content</Box>
</Center>

<Square size="40px" bg="blue.500">
  <Icon />
</Square>

<Circle size="40px" bg="red.500">
  <Icon />
</Circle>
```

**When to use:** Loading states, empty states, icon containers

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

### Form Field Spacing
```tsx
<VStack spacing={4} align="stretch">
  <FormControl>
    <FormLabel>Name</FormLabel>
    <Input />
  </FormControl>
  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input />
  </FormControl>
</VStack>
```

### Section Spacing
```tsx
// Between sections
<VStack spacing={12} align="stretch">
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</VStack>

// Page margins
<Box py={8} px={4}>
  Page content
</Box>
```

### Button Groups
```tsx
<HStack spacing={3}>
  <Button>Cancel</Button>
  <Button colorScheme="blue">Save</Button>
</HStack>
```

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

**Notes:**
- First value applies to base (all sizes)
- Each subsequent value applies to that breakpoint and up
- `null` skips a breakpoint

### Responsive Values (Object Syntax)
```tsx
<Box 
  fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
  p={{ base: 4, md: 6, lg: 8 }}
>
  Responsive sizing
</Box>
```

**Recommended:** Object syntax is more explicit and readable.

### Responsive Layout Examples

#### Mobile-first card grid:
```tsx
<SimpleGrid 
  columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
  spacing={{ base: 4, md: 6 }}
>
  {cards.map(card => <Card key={card.id} />)}
</SimpleGrid>
```

#### Responsive stack direction:
```tsx
<Stack 
  direction={{ base: 'column', md: 'row' }}
  spacing={4}
>
  <Box flex="1">Sidebar</Box>
  <Box flex="3">Main content</Box>
</Stack>
```

#### Hide/show by breakpoint:
```tsx
// Hide on mobile, show on desktop
<Box display={{ base: 'none', md: 'block' }}>
  Desktop only
</Box>

// Show on mobile, hide on desktop
<Box display={{ base: 'block', md: 'none' }}>
  Mobile only
</Box>

// Using utility props
<Box hideBelow="md">Hidden below medium</Box>
<Box hideFrom="lg">Hidden from large and up</Box>
```

## Style Props Categories

### Margin & Padding
```tsx
<Box 
  m={4}           // all sides
  mt={2}          // top
  mr={4}          // right
  mb={6}          // bottom
  ml={4}          // left
  mx={8}          // horizontal (left + right)
  my={4}          // vertical (top + bottom)
  p={6}           // padding (same pattern)
/>
```

**Logical properties (RTL-friendly):**
```tsx
<Box 
  marginStart={4}  // left in LTR, right in RTL
  marginEnd={2}    // right in LTR, left in RTL
  paddingInline={4}  // horizontal
  paddingBlock={2}   // vertical
/>
```

### Layout
```tsx
<Box 
  w="100%"           // width
  h="200px"          // height
  maxW="container.lg"  // max width
  minH="100vh"       // min height
  display="flex"
  overflow="hidden"
/>
```

### Flexbox
```tsx
<Flex 
  direction="row"
  align="center"
  justify="space-between"
  wrap="wrap"
  gap={4}
>
  <Box flex="1" />      // flex-grow
  <Box flexBasis="50%" />
</Flex>
```

### Position
```tsx
<Box 
  position="relative"
  top={0}
  right={0}
  zIndex={10}
/>

<Box 
  position="absolute"
  inset={0}  // top, right, bottom, left all 0
/>
```

## Combining Design System with Custom Styles

### Using `sx` Prop (Theme-aware)
```tsx
<Box 
  sx={{
    bg: 'gray.100',
    _hover: {
      bg: 'gray.200',
    },
    '& > p': {
      color: 'gray.700',
    },
  }}
>
  Custom styles
</Box>
```

**Use `sx` when:**
- You need pseudo-selectors beyond simple `_hover`, `_focus`
- You need child selectors
- You want theme token access in custom CSS

### Using `css` Prop (Emotion)
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

**Use `css` when:**
- You need raw CSS values (gradients, transforms)
- Style doesn't map to a theme token
- Maximum flexibility needed

### Creating Custom Components
```tsx
import { chakra } from '@chakra-ui/system'

// Extend an HTML element
const CustomButton = chakra('button', {
  baseStyle: {
    bg: 'blue.500',
    color: 'white',
    px: 4,
    py: 2,
    borderRadius: 'md',
  },
})

// Use it
<CustomButton _hover={{ bg: 'blue.600' }}>
  Click me
</CustomButton>
```

## DO / DON'T

### ✅ DO
```tsx
// Use layout primitives appropriately
<VStack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

// Use consistent spacing from theme
<Box p={6} mt={8} />

// Use responsive values for mobile-first design
<Box fontSize={{ base: 'sm', md: 'md' }} />

// Use logical properties for RTL support
<Box paddingStart={4} marginEnd={2} />
```

### ❌ DON'T
```tsx
// Don't use arbitrary values
<Box padding="17px" marginTop="23px" />

// Don't use raw CSS when theme tokens exist
<Box css={{ padding: '16px' }} />  // Use p={4} instead

// Don't break responsive by using fixed pixel widths
<Box width="800px" />  // Use maxW="container.md" instead

// Don't use br tags for spacing
<Box>
  Content<br /><br />
  More content
</Box>
// Use VStack or margin instead
```

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

### Centered Content Container
```tsx
<Container maxW="container.lg" py={12}>
  <VStack spacing={8} align="stretch">
    <Heading>Page Title</Heading>
    <Text>Content</Text>
  </VStack>
</Container>
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

## Accessibility Considerations

### Screen Reader Only
```tsx
<Box srOnly>
  Screen reader only text
</Box>

// Focusable but visually hidden
<Box srOnly="focusable">
  Skip to content
</Box>
```

### Focus Styles
```tsx
<Box 
  _focus={{ 
    outline: 'none', 
    shadow: 'outline' 
  }}
>
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
