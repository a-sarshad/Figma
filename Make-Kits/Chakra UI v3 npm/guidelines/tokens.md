# Chakra UI Design Tokens and CSS Guidelines

## Token Format

Chakra UI uses a **theme-aware token system** accessed through:
1. **Style props**: Direct token references in JSX (recommended)
2. **useToken hook**: Programmatic token access
3. **CSS custom properties**: Via Emotion's styling engine

## Color Tokens

### Base Colors

**Utility colors:**
- `transparent` - transparent
- `current` - currentColor
- `black` - #000000
- `white` - #FFFFFF

**Opacity variants:**
- `whiteAlpha.{50-900}` - white with varying opacity
- `blackAlpha.{50-900}` - black with varying opacity

### Color Palettes

Each palette has shades from 50 (lightest) to 900 (darkest):

**Neutral:** `gray`

**Primary colors:**
- `red` - Error, danger, destructive actions
- `orange` - Warning, attention
- `yellow` - Caution, highlight
- `green` - Success, positive actions
- `teal` - Alternative primary
- `blue` - Primary, info, links
- `cyan` - Alternative accent
- `purple` - Alternative primary
- `pink` - Alternative accent

### Semantic Color Usage

```tsx
// Text colors
<Text color="gray.700" _dark={{ color: 'gray.200' }}>
  Body text
</Text>

// Background colors
<Box bg="blue.500" _hover={{ bg: 'blue.600' }}>
  Primary button
</Box>

// Border colors
<Box borderColor="gray.200" borderWidth="1px">
  Card
</Box>

// Status colors
<Badge colorScheme="green">Success</Badge>
<Badge colorScheme="red">Error</Badge>
<Badge colorScheme="orange">Warning</Badge>
<Badge colorScheme="blue">Info</Badge>
```

### Color Scale Reference

| Shade | Use Case |
|-------|----------|
| 50 | Lightest backgrounds, subtle hover states |
| 100-200 | Light backgrounds, disabled states |
| 300-400 | Borders, dividers, muted text |
| 500 | Primary brand color, default button state |
| 600 | Hover states for primary elements |
| 700-800 | Active states, dark text on light backgrounds |
| 900 | Darkest text, headings |

## Typography Tokens

### Font Families

```tsx
fontFamily="heading"  // System font stack optimized for headings
fontFamily="body"     // System font stack for body text
fontFamily="mono"     // Monospace font for code
```

### Font Sizes

From smallest to largest:
```
3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
```

**Common mappings:**
- `xs` (12px) - Small labels, captions
- `sm` (14px) - Body text, form inputs
- `md` (16px) - Default body text
- `lg` (18px) - Emphasized text
- `xl` (20px) - Section headings
- `2xl` (24px) - Page headings
- `3xl-9xl` - Hero headings, display text

### Font Weights

```
hairline: 100
thin: 200
light: 300
normal: 400
medium: 500
semibold: 600
bold: 700
extrabold: 800
black: 900
```

### Line Heights

```
normal, none, shorter, short, base, tall, taller
3, 4, 5, 6, 7, 8, 9, 10
```

**Semantic values:**
- `shorter` - Tight, for headings
- `short` - Compact
- `base` - Default body text
- `tall` - Comfortable reading
- `taller` - Extra spacious

### Letter Spacing

```
tighter, tight, normal, wide, wider, widest
```

### Typography Usage Examples

```tsx
// Heading
<Heading 
  fontSize="2xl" 
  fontWeight="bold" 
  lineHeight="shorter"
>
  Page Title
</Heading>

// Body text
<Text 
  fontSize="md" 
  fontWeight="normal" 
  lineHeight="tall"
>
  Body content with comfortable reading spacing
</Text>

// Small caption
<Text 
  fontSize="xs" 
  fontWeight="medium" 
  color="gray.600"
>
  Caption text
</Text>

// Responsive font size
<Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
  Responsive Heading
</Heading>
```

## Spacing Tokens

Spacing values based on 4px (1 unit = 0.25rem):

```
px: 1px
0.5: 2px    (0.125rem)
1: 4px      (0.25rem)
1.5: 6px    (0.375rem)
2: 8px      (0.5rem)
2.5: 10px   (0.625rem)
3: 12px     (0.75rem)
3.5: 14px   (0.875rem)
4: 16px     (1rem)
5: 20px     (1.25rem)
6: 24px     (1.5rem)
7: 28px     (1.75rem)
8: 32px     (2rem)
9: 36px     (2.25rem)
10: 40px    (2.5rem)
12: 48px    (3rem)
14: 56px    (3.5rem)
16: 64px    (4rem)
20: 80px    (5rem)
24: 96px    (6rem)
28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96
```

### Spacing Usage

```tsx
// Padding
<Box p={4}>16px padding all sides</Box>
<Box px={6} py={3}>24px horizontal, 12px vertical</Box>

// Margin
<Box mt={8} mb={4}>32px top, 16px bottom</Box>

// Stack spacing (gap between items)
<VStack spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>
```

## Shadow Tokens

```
xs: subtle shadow
sm: small elevation
base: default shadow
md: medium elevation
lg: large elevation
xl: extra large elevation
2xl: prominent elevation
outline: focus ring
inner: inset shadow
none: no shadow
dark-lg: dark mode large shadow
```

### Shadow Usage

```tsx
// Card with shadow
<Box shadow="md" borderRadius="lg" p={6}>
  Card content
</Box>

// Focus state
<Input 
  _focus={{ shadow: 'outline' }}
/>

// Hover elevation
<Box 
  shadow="sm" 
  _hover={{ shadow: 'lg' }}
  transition="box-shadow 0.2s"
>
  Hoverable card
</Box>
```

## Border Tokens

### Border Widths
```
none: 0
1px: 1px
2px: 2px
4px: 4px
8px: 8px
```

### Border Radius
```
none: 0
sm: 0.125rem (2px)
base: 0.25rem (4px)
md: 0.375rem (6px)
lg: 0.5rem (8px)
xl: 0.75rem (12px)
2xl: 1rem (16px)
3xl: 1.5rem (24px)
full: 9999px (pill shape)
```

### Border Usage

```tsx
// Basic border
<Box border="1px" borderColor="gray.200">
  Content
</Box>

// Rounded corners
<Box borderRadius="lg">Card</Box>
<Button borderRadius="full">Pill Button</Button>

// Directional borders
<Box borderBottom="2px" borderColor="blue.500">
  Section with bottom border
</Box>
```

## Size Tokens

### Named Sizes
```
max, min, full
3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl
prose: optimal reading width (~65ch)
```

### Container Sizes
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Size Usage

```tsx
// Component sizing
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Container max width
<Container maxW="container.lg">
  Constrained content
</Container>

// Full width/height
<Box w="full" h="full">
  100% width and height
</Box>
```

## Theming: Light/Dark Mode

Chakra UI supports light and dark mode through the `_dark` pseudo prop.

### Color Mode Usage

```tsx
// Background that adapts to color mode
<Box 
  bg="white" 
  _dark={{ bg: 'gray.800' }}
>
  Content
</Box>

// Text color adaptation
<Text 
  color="gray.800" 
  _dark={{ color: 'gray.100' }}
>
  Adaptive text
</Text>

// Using semantic tokens (recommended)
<Box bg="bg" color="text">
  Uses theme-defined semantic tokens
</Box>
```

### Color Mode Toggle

```tsx
import { useColorMode, IconButton } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'

function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  )
}
```

## Using Tokens Programmatically

### useToken Hook

```tsx
import { useToken } from '@chakra-ui/system'

function Component() {
  // Get single token
  const blue500 = useToken('colors', 'blue.500')
  
  // Get multiple tokens
  const [sm, md, lg] = useToken('space', [4, 6, 8])
  
  // Get responsive tokens
  const sizes = useToken('sizes', ['sm', 'md', 'lg'])
  
  return <Box bg={blue500} p={md} />
}
```

## DO / DON'T

### ✅ DO
```tsx
// Use semantic color tokens
<Text color="gray.700">Text</Text>

// Use spacing scale consistently
<Box p={4} mt={8} />

// Use theme-aware responsive values
<Heading fontSize={{ base: 'xl', md: '2xl' }}>Title</Heading>

// Adapt to dark mode
<Box bg="white" _dark={{ bg: 'gray.800' }}>Content</Box>
```

### ❌ DON'T
```tsx
// Don't use raw hex colors
<Text color="#333333">Text</Text>

// Don't use arbitrary pixel values
<Box padding="13px" marginTop="47px" />

// Don't ignore dark mode
<Box bg="white" color="black">
  This won't work in dark mode
</Box>

// Don't use CSS strings for theme values
<Box fontSize="18px">Use tokens instead</Box>
```

## Accessing Theme in Styled Components

```tsx
import { chakra } from '@chakra-ui/system'

const CustomButton = chakra('button', {
  baseStyle: {
    bg: 'blue.500',
    color: 'white',
    px: 4,
    py: 2,
    borderRadius: 'md',
    _hover: {
      bg: 'blue.600',
    },
  },
})
```

## CSS Reset

Chakra UI provides a CSS reset component:

```tsx
import { CSSReset } from '@chakra-ui/css-reset'

function App() {
  return (
    <>
      <CSSReset />
      {/* Your app */}
    </>
  )
}
```

The CSS reset normalizes browser styles and applies Chakra's base styles.
