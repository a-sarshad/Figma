# Chakra UI v3 Setup Guide

This guide covers everything needed to set up Chakra UI v3 in your project.

## Package Installation

Chakra UI v3 uses a **single package** — no more subpackages.

```bash
pnpm add @chakra-ui/react @emotion/react
```

For Persian font support (bilingual projects):

```bash
pnpm add @fontsource/vazirmatn
```

---

## Provider Setup

### Basic Setup (v3)

Wrap your application root with `ChakraProvider` using `defaultSystem`:

```tsx
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* Your app content */}
    </ChakraProvider>
  )
}
```

> **v2 → v3 change:** `<ChakraProvider theme={theme}>` → `<ChakraProvider value={defaultSystem}>`

### With Custom System

```tsx
import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        persian: { value: 'Vazirmatn, sans-serif' },
      },
    },
  },
})

function App() {
  return (
    <ChakraProvider value={system}>
      {children}
    </ChakraProvider>
  )
}
```

### With Color Mode (v3)

```tsx
import { ChakraProvider, defaultSystem, ColorModeProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
        {children}
      </ColorModeProvider>
    </ChakraProvider>
  )
}
```

### With RTL / Bilingual Support

```tsx
import { ChakraProvider, defaultSystem, Box } from '@chakra-ui/react'

function App({ lang = 'fa' }) {
  const isRtl = lang === 'fa'

  return (
    <ChakraProvider value={defaultSystem}>
      <Box
        dir={isRtl ? 'rtl' : 'ltr'}
        fontFamily={isRtl ? 'var(--font-persian)' : 'inherit'}
      >
        {children}
      </Box>
    </ChakraProvider>
  )
}
```

---

## Import Patterns

### v3 — Single Package (Recommended)

All components are imported from `@chakra-ui/react`:

```tsx
import {
  Box, Flex, Grid, Stack, HStack, VStack,
  Container, Center, SimpleGrid,
  Heading, Text, Button, Input, Textarea,
  Dialog, Drawer, Accordion, Tabs,
  Table, Badge, Tag, Avatar,
  Progress, Spinner, Skeleton,
  Field, Select, Checkbox, Radio, Switch,
  NumberInput, PinInput, Slider, Rating,
} from '@chakra-ui/react'
```

### v2 → v3 Import Changes

| v2 (subpackage) | v3 (single package) |
|---|---|
| `import { Box } from '@chakra-ui/layout'` | `import { Box } from '@chakra-ui/react'` |
| `import { Modal } from '@chakra-ui/modal'` | `import { Dialog } from '@chakra-ui/react'` |
| `import { Progress } from '@chakra-ui/progress'` | `import { Progress } from '@chakra-ui/react'` |
| `import { useDisclosure } from '@chakra-ui/hooks'` | `import { useDisclosure } from '@chakra-ui/react'` |

---

## Key API Changes: v2 → v3

### colorScheme → colorPalette

```tsx
// v2
<Button colorScheme="blue">Save</Button>

// v3
<Button colorPalette="blue">Save</Button>
```

### spacing → gap on Stack

```tsx
// v2
<VStack spacing={4}>...</VStack>
<HStack spacing={3}>...</HStack>

// v3
<VStack gap={4}>...</VStack>
<HStack gap={3}>...</HStack>
```

### Modal → Dialog (compound components)

```tsx
// v2
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'

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

// v3
import { Dialog } from '@chakra-ui/react'

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

### FormControl → Field (compound components)

```tsx
// v2
import { FormControl, FormLabel, FormErrorMessage, FormHelperText } from '@chakra-ui/react'

<FormControl isInvalid={!!error}>
  <FormLabel>Email</FormLabel>
  <Input type="email" />
  <FormErrorMessage>{error}</FormErrorMessage>
  <FormHelperText>We'll never share your email.</FormHelperText>
</FormControl>

// v3
import { Field, Input } from '@chakra-ui/react'

<Field.Root invalid={!!error}>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.ErrorText>{error}</Field.ErrorText>
  <Field.HelperText>We'll never share your email.</Field.HelperText>
</Field.Root>
```

### extendTheme → createSystem

```tsx
// v2
import { extendTheme } from '@chakra-ui/react'
const theme = extendTheme({ colors: { brand: { 500: '#0ea5e9' } } })
<ChakraProvider theme={theme}>

// v3
import { createSystem, defaultConfig } from '@chakra-ui/react'
const system = createSystem(defaultConfig, {
  theme: { tokens: { colors: { brand: { 500: { value: '#0ea5e9' } } } } }
})
<ChakraProvider value={system}>
```

### useDisclosure (open state)

```tsx
// v2 — isOpen / onOpen / onClose
const { isOpen, onOpen, onClose } = useDisclosure()
<Modal isOpen={isOpen} onClose={onClose}>

// v3 — open / onOpen / onClose (same hook, different prop names on component)
const { open, onOpen, onClose } = useDisclosure()
<Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # ChakraProvider + dir/font setup
│   └── page.tsx
├── components/
│   └── *.tsx               # Your components
├── theme/
│   └── system.ts           # Custom createSystem config (optional)
└── styles/
    └── fonts.css           # Persian font import
```

### Minimum Working Example (v3)

```tsx
// app/layout.tsx
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ChakraProvider value={defaultSystem}>
          {children}
        </ChakraProvider>
      </body>
    </html>
  )
}

// app/page.tsx
import { Box, Heading, Text, Button } from '@chakra-ui/react'

export default function Page() {
  return (
    <Box p={8} dir="rtl" fontFamily="var(--font-persian)">
      <Heading mb={4}>سلام دنیا</Heading>
      <Text mb={6}>اپلیکیشن آماده است!</Text>
      <Button colorPalette="blue">شروع کنید</Button>
    </Box>
  )
}
```

---

## Persian Font Setup

```css
/* styles/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');

:root {
  --font-persian: 'Vazirmatn', sans-serif;
}

[dir="rtl"] {
  font-family: var(--font-persian);
}
```

Or with `@fontsource/vazirmatn`:

```tsx
// app/layout.tsx
import '@fontsource/vazirmatn/400.css'
import '@fontsource/vazirmatn/500.css'
import '@fontsource/vazirmatn/700.css'
```

---

## Common Setup Issues

### Issue: "Cannot find module '@chakra-ui/layout'"
**Cause:** v2 subpackage — no longer exists in v3.
**Solution:** Import everything from `@chakra-ui/react`
```bash
pnpm add @chakra-ui/react@latest
```

### Issue: "colorScheme is not a valid prop"
**Cause:** v2 prop name.
**Solution:** Use `colorPalette` instead of `colorScheme`

### Issue: "spacing is not working on Stack"
**Cause:** v2 prop name.
**Solution:** Use `gap` instead of `spacing`

### Issue: "Modal is not exported"
**Cause:** Modal was renamed to Dialog in v3.
**Solution:**
```tsx
import { Dialog } from '@chakra-ui/react'
// Use Dialog.Root, Dialog.Content, etc.
```

### Issue: "ChakraProvider theme prop not working"
**Cause:** v2 API.
**Solution:**
```tsx
// v3 correct usage
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
<ChakraProvider value={defaultSystem}>
```

---

## TypeScript Support

Chakra UI v3 is fully typed. No additional setup needed.

```tsx
import type { BoxProps, FlexProps, ButtonProps } from '@chakra-ui/react'

interface CustomCardProps extends BoxProps {
  title: string
  description: string
}
```

---

## Next Steps

After setup:

1. **Read `tokens.md`** — Colors, spacing, typography tokens
2. **Read `components.md`** — How to use Chakra v3 components
3. **Read `styles.md`** — Layout patterns and responsive design
4. **Read `rtl.md`** — RTL and bilingual setup
5. **Read `icon-discovery.md`** — Before using any icons
