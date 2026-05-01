# Chakra UI Setup Guide

This guide covers everything needed to set up Chakra UI in your project.

## Package Installation

**CRITICAL**: You MUST explicitly install every package listed below as a direct dependency, exactly as written.

Rules:
- Even if a package is already available as a transitive dependency (i.e., installed by another package), you MUST still add it as a direct dependency. Transitive availability does NOT count as installed.
- Use the **exact** package name shown. Packages with similar names (e.g., `@scope-a/foo` vs `@scope-b/foo`, or `foo` vs `foo-core`) are **different packages** and are NOT interchangeable. Never substitute one for another.
- Do not skip any package. Do not reorder, rename, or omit any entry.

### Core Packages

```bash
pnpm add @chakra-ui/charts@3.35.0 \
  @chakra-ui/next-js@2.4.2 \
  @chakra-ui/storybook-addon@5.2.5 \
  @chakra-ui/utils@2.2.2 \
  @chakra-ui/accordion@2.3.1 \
  @chakra-ui/anatomy@2.3.4 \
  @chakra-ui/close-button@2.1.1 \
  @chakra-ui/control-box@2.1.0 \
  @chakra-ui/css-reset@2.3.0 \
  @chakra-ui/hooks@2.4.2 \
  @chakra-ui/icons@2.2.4 \
  @chakra-ui/layout@2.3.1 \
  @chakra-ui/modal@2.3.1 \
  @chakra-ui/progress@2.2.0 \
  @chakra-ui/react-utils@2.0.11 \
  @chakra-ui/system@2.6.2 \
  @chakra-ui/table@2.1.0 \
  @chakra-ui/tabs@3.0.0 \
  @chakra-ui/textarea@2.1.2 \
  @chakra-ui/theme@3.4.6 \
  @chakra-ui/transition@2.1.0
```

### Peer Dependencies (REQUIRED)

Chakra UI requires Emotion for styling. Install these peer dependencies:

```bash
pnpm add @emotion/react@11.14.0 @emotion/styled@11.14.1
```

**These are not optional** — Chakra UI will not work without them.

---

## Provider Setup

### Basic Setup

Wrap your application root with `ChakraProvider`:

```tsx
import { ChakraProvider } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'

function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Your app content */}
    </ChakraProvider>
  )
}
```

### With CSS Reset

Include Chakra's CSS reset for consistent cross-browser styling:

```tsx
import { ChakraProvider } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'
import { CSSReset } from '@chakra-ui/css-reset'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      {/* Your app content */}
    </ChakraProvider>
  )
}
```

### With Color Mode Support

Enable light/dark mode:

```tsx
import { ChakraProvider, ColorModeScript } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'

// In your index.html or _document (Next.js), add before <div id="root">:
<ColorModeScript initialColorMode={theme.config.initialColorMode} />

// In your App component:
function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* Your app content */}
    </ChakraProvider>
  )
}
```

---

## Theme Configuration

### Using Default Theme

Import and use Chakra's default theme:

```tsx
import { ChakraProvider } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'

<ChakraProvider theme={theme}>
  {/* app */}
</ChakraProvider>
```

### Custom Theme (Optional)

Extend the default theme with custom values:

```tsx
import { ChakraProvider, extendTheme } from '@chakra-ui/system'
import { theme as baseTheme } from '@chakra-ui/theme'

const customTheme = extendTheme({
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      900: '#0c4a6e',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
}, baseTheme)

<ChakraProvider theme={customTheme}>
  {/* app */}
</ChakraProvider>
```

---

## Import Patterns

### Individual Component Imports

**Recommended** — import only what you need:

```tsx
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { Modal, ModalContent, ModalBody } from '@chakra-ui/modal'
```

### Package-Specific Imports

Components are organized by package. Import from the specific package:

| Component Type | Package |
|----------------|---------|
| Layout (Box, Flex, Grid, Stack, Container, etc.) | `@chakra-ui/layout` |
| Icons | `@chakra-ui/icons` |
| Modal, Drawer, AlertDialog | `@chakra-ui/modal` |
| Accordion | `@chakra-ui/accordion` |
| Tabs | `@chakra-ui/tabs` |
| Table | `@chakra-ui/table` |
| Progress, CircularProgress | `@chakra-ui/progress` |
| Textarea | `@chakra-ui/textarea` |
| CloseButton | `@chakra-ui/close-button` |
| System (ChakraProvider, hooks, utilities) | `@chakra-ui/system` |
| Theme | `@chakra-ui/theme` |
| CSS Reset | `@chakra-ui/css-reset` |
| Hooks (useDisclosure, useColorMode, etc.) | `@chakra-ui/hooks` |

---

## Project Structure

### Typical File Structure

```
src/
├── app/
│   ├── App.tsx              # Root component with ChakraProvider
│   └── components/
│       └── *.tsx            # Your components
├── theme/
│   └── index.ts             # Custom theme (optional)
└── main.tsx                 # Entry point
```

### Example App.tsx

```tsx
import { ChakraProvider } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'
import { CSSReset } from '@chakra-ui/css-reset'
import { Box, Container, VStack, Heading } from '@chakra-ui/layout'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading>My Chakra UI App</Heading>
          <Box p={6} shadow="md" borderRadius="lg">
            Content here
          </Box>
        </VStack>
      </Container>
    </ChakraProvider>
  )
}

export default App
```

---

## Common Setup Issues

### Issue: "Cannot find module '@chakra-ui/system'"

**Solution:** Install the package explicitly:
```bash
pnpm add @chakra-ui/system@2.6.2
```

### Issue: "Emotion not found" or style props not working

**Solution:** Install Emotion peer dependencies:
```bash
pnpm add @emotion/react@11.14.0 @emotion/styled@11.14.1
```

### Issue: Icons not rendering

**Solution:** Install icons package:
```bash
pnpm add @chakra-ui/icons@2.2.4
```

### Issue: Components not styled correctly

**Solution:** Ensure `ChakraProvider` wraps your entire app and includes the theme:
```tsx
<ChakraProvider theme={theme}>
  {/* All components must be inside */}
</ChakraProvider>
```

---

## TypeScript Support

Chakra UI is written in TypeScript and includes type definitions. No additional setup needed.

### Type Imports

```tsx
import type { BoxProps, FlexProps } from '@chakra-ui/layout'
import type { ButtonProps } from '@chakra-ui/button'

// Extending component props
interface CustomCardProps extends BoxProps {
  title: string
  description: string
}
```

---

## Next Steps

After setup:

1. **Read `tokens.md`** — Learn about colors, spacing, typography tokens
2. **Read `components.md`** — Learn how to use Chakra components
3. **Read `styles.md`** — Learn layout patterns and responsive design
4. **Read `icon-discovery.md`** — Before using any icons

---

## Minimum Working Example

```tsx
// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// app/App.tsx
import { ChakraProvider } from '@chakra-ui/system'
import { theme } from '@chakra-ui/theme'
import { CSSReset } from '@chakra-ui/css-reset'
import { Box, Heading, Text } from '@chakra-ui/layout'

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box p={8}>
        <Heading mb={4}>Hello Chakra UI</Heading>
        <Text>Your app is ready!</Text>
      </Box>
    </ChakraProvider>
  )
}
```
