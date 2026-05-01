# Chakra UI Component Usage Guidelines

## Component Categories

Components are organized by function:
- **Layout**: Box, Flex, Grid, Stack, Container, Center
- **Typography**: Heading, Text, Code
- **Overlay**: Modal, Drawer, AlertDialog
- **Disclosure**: Accordion, Tabs
- **Data Display**: Table, List, Badge, Divider
- **Feedback**: Progress, CircularProgress, Spinner
- **Form**: Textarea
- **Other**: CloseButton

---

## Layout Components

### Box

The foundational component. All Chakra components are built on Box.

**Import:**
```tsx
import { Box } from '@chakra-ui/layout'
```

**Props:**
- Extends `HTMLChakraProps<"div">`
- Accepts all Chakra UI style props
- `as` prop to change rendered element

**Usage:**
```tsx
<Box p={4} bg="gray.100" borderRadius="md">
  Generic container
</Box>

<Box as="section" maxW="container.lg">
  Semantic HTML with Box
</Box>
```

**DO:**
- ✅ Use Box for generic containers and wrappers
- ✅ Use `as` prop for semantic HTML
- ✅ Apply style props directly

**DON'T:**
- ❌ Don't use Box when a semantic component exists (use Flex, Grid, etc.)

---

### Flex

Flexbox container with shorthand props.

**Import:**
```tsx
import { Flex } from '@chakra-ui/layout'
```

**Props:**
- `direction`: `"row" | "column" | "row-reverse" | "column-reverse"` (default: `"row"`)
- `align`: `alignItems` shorthand
- `justify`: `justifyContent` shorthand
- `wrap`: `flexWrap` shorthand
- `gap`: spacing between items
- `basis`, `grow`, `shrink`: flex item properties

**Usage:**
```tsx
// Horizontal layout with centered items
<Flex align="center" justify="space-between" p={4}>
  <Box>Left</Box>
  <Box>Right</Box>
</Flex>

// Vertical layout
<Flex direction="column" gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Flex>
```

**DO:**
- ✅ Use for navigation bars, toolbars, header layouts
- ✅ Use shorthand props (`align`, `justify`) for clarity
- ✅ Combine with `gap` for consistent spacing

**DON'T:**
- ❌ Don't use for lists with uniform spacing (use Stack instead)
- ❌ Don't nest excessively (consider Grid for complex layouts)

---

### Grid

CSS Grid container with shorthand props.

**Import:**
```tsx
import { Grid, GridItem } from '@chakra-ui/layout'
```

**Props:**
- `templateColumns`: grid column structure
- `templateRows`: grid row structure
- `gap`, `rowGap`, `columnGap`: spacing
- `autoFlow`, `autoRows`, `autoColumns`: auto-placement

**Usage:**
```tsx
// 3-column grid
<Grid templateColumns="repeat(3, 1fr)" gap={6}>
  <GridItem>1</GridItem>
  <GridItem>2</GridItem>
  <GridItem>3</GridItem>
</Grid>

// Responsive grid
<Grid 
  templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
  gap={4}
>
  {items.map(item => <GridItem key={item.id}>{item.content}</GridItem>)}
</Grid>
```

**DO:**
- ✅ Use for dashboards, card grids, multi-column layouts
- ✅ Use responsive values for mobile-first design
- ✅ Specify `gap` for consistent spacing

**DON'T:**
- ❌ Don't use for simple horizontal/vertical layouts (use Flex or Stack)

---

### SimpleGrid

Auto-responsive grid with automatic column count.

**Import:**
```tsx
import { SimpleGrid } from '@chakra-ui/layout'
```

**Props:**
- `columns`: number of columns (responsive)
- `spacing`: gap between items
- `minChildWidth`: minimum width per item (auto-columns)

**Usage:**
```tsx
// Fixed column count (responsive)
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
  <Box>Card 3</Box>
</SimpleGrid>

// Auto-columns based on min width
<SimpleGrid minChildWidth="250px" spacing={4}>
  <Box>Auto-sized card</Box>
  <Box>Auto-sized card</Box>
</SimpleGrid>
```

**DO:**
- ✅ Use for responsive card grids
- ✅ Use `minChildWidth` for fluid layouts
- ✅ Perfect for product listings, galleries

**DON'T:**
- ❌ Don't use when you need precise grid control (use Grid instead)

---

### Stack / VStack / HStack

Flexbox container with consistent spacing between children.

**Import:**
```tsx
import { Stack, VStack, HStack, StackDivider } from '@chakra-ui/layout'
```

**Props:**
- `spacing`: consistent gap between items (default: `"0.5rem"`)
- `direction`: `"row" | "column"` (default: `"column"`)
- `align`: alignment of items
- `justify`: justification of items
- `divider`: element to render between items
- `wrap`: flex wrap behavior

**Variants:**
- `VStack`: Vertical stack (`direction="column"`)
- `HStack`: Horizontal stack (`direction="row"`)

**Usage:**
```tsx
// Vertical stack
<VStack spacing={4} align="stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</VStack>

// Horizontal button group
<HStack spacing={3}>
  <Button>Cancel</Button>
  <Button colorScheme="blue">Save</Button>
</HStack>

// With divider
<VStack divider={<StackDivider borderColor="gray.200" />} spacing={4}>
  <Box>Section 1</Box>
  <Box>Section 2</Box>
</VStack>

// Responsive direction
<Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

**DO:**
- ✅ Use for form fields with consistent spacing
- ✅ Use for button groups
- ✅ Use for lists with uniform gaps
- ✅ Use `divider` prop for visual separation

**DON'T:**
- ❌ Don't use for complex layouts (use Grid or Flex)
- ❌ Don't use when items need different spacing (use Flex with individual margins)

---

### Container

Centers content with max-width constraint.

**Import:**
```tsx
import { Container } from '@chakra-ui/layout'
```

**Props:**
- `maxW`: maximum width (supports container sizes)
- `centerContent`: center children horizontally and vertically

**Container sizes:**
- `container.sm`: 640px
- `container.md`: 768px
- `container.lg`: 1024px
- `container.xl`: 1280px

**Usage:**
```tsx
<Container maxW="container.lg" py={8}>
  Page content constrained to 1024px
</Container>

<Container maxW="container.md" centerContent>
  <Heading>Centered content</Heading>
</Container>
```

**DO:**
- ✅ Use for page content, article layouts
- ✅ Use consistent max widths across pages
- ✅ Combine with padding for breathing room

**DON'T:**
- ❌ Don't nest containers (causes unnecessary constraints)
- ❌ Don't use for full-width layouts

---

### Center / Square / Circle

Centers children horizontally and vertically.

**Import:**
```tsx
import { Center, Square, Circle } from '@chakra-ui/layout'
```

**Props:**
- `Center`: centers content in flex container
- `Square`: equal width/height with optional centering
- `Circle`: circular container with equal dimensions

**Usage:**
```tsx
// Center content
<Center h="100vh">
  <Spinner />
</Center>

// Square icon container
<Square size="40px" bg="blue.500" color="white">
  <CheckIcon />
</Square>

// Circle avatar placeholder
<Circle size="50px" bg="gray.300">
  <Text>AB</Text>
</Circle>
```

**DO:**
- ✅ Use Center for loading states, empty states
- ✅ Use Square/Circle for icon containers, avatars
- ✅ Specify `size` for Square/Circle

**DON'T:**
- ❌ Don't use Center for complex layouts (use Flex with align/justify)

---

## Typography Components

### Heading

Heading component with semantic levels.

**Import:**
```tsx
import { Heading } from '@chakra-ui/layout'
```

**Props:**
- Extends `HTMLChakraProps<"h2">`, `ThemingProps<"Heading">`
- `as`: heading level (`"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`)
- `size`: visual size (independent of semantic level)

**Sizes:** `4xl`, `3xl`, `2xl`, `xl`, `lg`, `md`, `sm`, `xs`

**Usage:**
```tsx
// Semantic h1, visual size xl
<Heading as="h1" size="xl">
  Page Title
</Heading>

// Semantic h3, visual size md
<Heading as="h3" size="md">
  Section Heading
</Heading>

// Responsive sizing
<Heading size={{ base: 'lg', md: 'xl', lg: '2xl' }}>
  Responsive Heading
</Heading>
```

**DO:**
- ✅ Match semantic level to document outline (h1 → h2 → h3)
- ✅ Use `size` for visual consistency
- ✅ One h1 per page

**DON'T:**
- ❌ Don't skip heading levels (h1 → h3)
- ❌ Don't use headings for non-heading text (use Text with fontWeight)

---

### Text

Paragraph and text component.

**Import:**
```tsx
import { Text } from '@chakra-ui/layout'
```

**Props:**
- Extends `HTMLChakraProps<"p">`, `ThemingProps<"Text">`
- `as`: element type
- `align`: text alignment
- `decoration`: text decoration
- `casing`: text transform
- `noOfLines`: truncate to N lines

**Usage:**
```tsx
// Basic paragraph
<Text>Body content</Text>

// Truncate
<Text noOfLines={2}>
  Long text that will be truncated to 2 lines with ellipsis
</Text>

// Styled text
<Text fontSize="lg" fontWeight="semibold" color="gray.700">
  Emphasized text
</Text>

// As span
<Text as="span" color="blue.500">
  Inline text
</Text>
```

**DO:**
- ✅ Use for body text, descriptions, labels
- ✅ Use `noOfLines` for truncation
- ✅ Use semantic color tokens

**DON'T:**
- ❌ Don't use for headings (use Heading)
- ❌ Don't apply heading styles to Text

---

## Overlay Components

### Modal

Accessible modal dialog.

**Import:**
```tsx
import { 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  ModalCloseButton 
} from '@chakra-ui/modal'
```

**Props:**
- `isOpen: boolean` (required)
- `onClose: () => void` (required)
- `size`: `"xs" | "sm" | "md" | "lg" | "xl" | "full"` (default: `"md"`)
- `isCentered`: center modal vertically
- `scrollBehavior`: `"inside" | "outside"` (default: `"outside"`)
- `motionPreset`: `"slideInBottom" | "slideInRight" | "scale" | "none"`
- `closeOnOverlayClick`: close on backdrop click (default: `true`)
- `closeOnEsc`: close on Escape key (default: `true`)
- `trapFocus`: trap focus inside modal (default: `true`)
- `initialFocusRef`, `finalFocusRef`: control focus

**Composition:**
Modal > ModalOverlay + ModalContent > (ModalHeader + ModalCloseButton + ModalBody + ModalFooter)

**Usage:**
```tsx
import { useDisclosure } from '@chakra-ui/hooks'

function Example() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Modal content
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
```

**DO:**
- ✅ Use for confirmations, forms, detailed views
- ✅ Include ModalOverlay for backdrop
- ✅ Provide ModalCloseButton for accessibility
- ✅ Use appropriate size for content

**DON'T:**
- ❌ Don't use for critical warnings (use AlertDialog)
- ❌ Don't nest modals
- ❌ Don't omit onClose handler

---

### Drawer

Slide-in panel from screen edge.

**Import:**
```tsx
import { 
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerHeader, 
  DrawerBody, 
  DrawerFooter,
  DrawerCloseButton 
} from '@chakra-ui/modal'
```

**Props:**
- Extends Modal props
- `placement`: `"top" | "right" | "bottom" | "left"` (default: `"right"`)
- `isFullHeight`: occupy full viewport height

**Usage:**
```tsx
<Drawer isOpen={isOpen} placement="right" onClose={onClose}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>Drawer Title</DrawerHeader>
    <DrawerBody>
      Drawer content
    </DrawerBody>
    <DrawerFooter>
      <Button onClick={onClose}>Close</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

**DO:**
- ✅ Use for navigation menus, filters, settings panels
- ✅ Choose placement based on content context
- ✅ Right/left for navigation, top/bottom for filters

**DON'T:**
- ❌ Don't use for critical decisions (use Modal or AlertDialog)
- ❌ Don't use left placement in LTR without good reason

---

## Disclosure Components

### Accordion

Collapsible content panels.

**Import:**
```tsx
import { 
  Accordion, 
  AccordionItem, 
  AccordionButton, 
  AccordionPanel,
  AccordionIcon 
} from '@chakra-ui/accordion'
```

**Props:**
- `allowMultiple`: allow multiple items open (default: `false`)
- `allowToggle`: allow closing all items (default: `false`)
- `index`: controlled expanded index
- `defaultIndex`: initial expanded index
- `onChange`: callback on expand/collapse

**Composition:**
Accordion > AccordionItem > (AccordionButton + AccordionPanel)

**Usage:**
```tsx
// Controlled single expansion
<Accordion>
  <AccordionItem>
    <AccordionButton>
      <Box flex="1" textAlign="left">
        Section 1
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      Content for section 1
    </AccordionPanel>
  </AccordionItem>
  
  <AccordionItem>
    <AccordionButton>
      <Box flex="1" textAlign="left">
        Section 2
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel>
      Content for section 2
    </AccordionPanel>
  </AccordionItem>
</Accordion>

// Allow multiple open
<Accordion allowMultiple>
  {/* items */}
</Accordion>

// Default expanded
<Accordion defaultIndex={[0]}>
  {/* items */}
</Accordion>
```

**DO:**
- ✅ Use for FAQs, grouped content, settings sections
- ✅ Include AccordionIcon for visual affordance
- ✅ Keep button content concise
- ✅ Use allowMultiple for independent sections

**DON'T:**
- ❌ Don't use for navigation (use Tabs or Menu)
- ❌ Don't nest accordions
- ❌ Don't hide critical content in accordions

---

### Tabs

Tabbed interface for content sections.

**Import:**
```tsx
import { Tabs, TabList, Tab, TabPanels, TabPanel, TabIndicator } from '@chakra-ui/tabs'
```

**Props:**
- `orientation`: `"horizontal" | "vertical"` (default: `"horizontal"`)
- `variant`: `"line" | "enclosed" | "enclosed-colored" | "soft-rounded" | "solid-rounded" | "unstyled"`
- `size`: `"sm" | "md" | "lg"`
- `index`: controlled selected tab
- `defaultIndex`: initial selected tab
- `isFitted`: stretch tabs to full width
- `align`: `"start" | "center" | "end"`
- `isLazy`: defer rendering until selected
- `isManual`: require click to activate (not arrow keys)

**Composition:**
Tabs > (TabList > Tab[]) + (TabPanels > TabPanel[])

**Usage:**
```tsx
<Tabs>
  <TabList>
    <Tab>One</Tab>
    <Tab>Two</Tab>
    <Tab>Three</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
      <p>Panel 1</p>
    </TabPanel>
    <TabPanel>
      <p>Panel 2</p>
    </TabPanel>
    <TabPanel>
      <p>Panel 3</p>
    </TabPanel>
  </TabPanels>
</Tabs>

// With variants
<Tabs variant="enclosed">
  {/* ... */}
</Tabs>

// Fitted tabs
<Tabs isFitted>
  {/* ... */}
</Tabs>

// Lazy loading
<Tabs isLazy>
  {/* ... */}
</Tabs>
```

**DO:**
- ✅ Use for organizing related content
- ✅ Keep tab labels short and descriptive
- ✅ Use `isLazy` for performance with heavy content
- ✅ Match TabPanel count to Tab count

**DON'T:**
- ❌ Don't use for sequential steps (use Stepper)
- ❌ Don't use more than ~7 tabs (consider navigation)
- ❌ Don't hide critical actions in tabs

---

## Data Display Components

### Table

Accessible data table.

**Import:**
```tsx
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/table'
```

**Props:**
- `variant`: `"simple" | "striped" | "unstyled"`
- `size`: `"sm" | "md" | "lg"`
- `colorScheme`: color scheme for striped variant
- `layout`: `"auto" | "fixed"` (CSS table-layout)
- `Th/Td`: `isNumeric` for right-aligned numeric cells

**Composition:**
Table > (Thead > Tr > Th) + (Tbody > Tr > Td)

**Usage:**
```tsx
<TableContainer>
  <Table variant="simple" size="md">
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Email</Th>
        <Th isNumeric>Age</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>John Doe</Td>
        <Td>john@example.com</Td>
        <Td isNumeric>30</Td>
      </Tr>
      <Tr>
        <Td>Jane Smith</Td>
        <Td>jane@example.com</Td>
        <Td isNumeric>25</Td>
      </Tr>
    </Tbody>
  </Table>
</TableContainer>
```

**DO:**
- ✅ Use TableContainer for responsive scrolling
- ✅ Use `isNumeric` for numeric columns
- ✅ Use semantic `Thead`, `Tbody`, `Tfoot`
- ✅ Use striped variant for readability

**DON'T:**
- ❌ Don't use for layout (use Grid or Flex)
- ❌ Don't omit Thead (accessibility)

---

### List / OrderedList / UnorderedList

Semantic list components.

**Import:**
```tsx
import { List, OrderedList, UnorderedList, ListItem, ListIcon } from '@chakra-ui/layout'
```

**Props:**
- `spacing`: space between list items
- `styleType`: list marker style
- `stylePosition`: `"inside" | "outside"`

**Usage:**
```tsx
// Unordered list
<UnorderedList spacing={2}>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
  <ListItem>Item 3</ListItem>
</UnorderedList>

// Ordered list
<OrderedList spacing={3}>
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
</OrderedList>

// List with icons
<List spacing={3}>
  <ListItem>
    <ListIcon as={CheckIcon} color="green.500" />
    Feature 1
  </ListItem>
  <ListItem>
    <ListIcon as={CheckIcon} color="green.500" />
    Feature 2
  </ListItem>
</List>
```

**DO:**
- ✅ Use semantic list types (OrderedList for sequences)
- ✅ Use spacing prop for consistency
- ✅ Use ListIcon for visual enhancement

**DON'T:**
- ❌ Don't use for navigation (use dedicated navigation components)
- ❌ Don't use `ul`/`ol` directly (use Chakra components)

---

### Divider

Visual separator.

**Import:**
```tsx
import { Divider } from '@chakra-ui/layout'
```

**Props:**
- `orientation`: `"horizontal" | "vertical"`
- `variant`: theme variant

**Usage:**
```tsx
// Horizontal divider
<VStack spacing={4}>
  <Box>Section 1</Box>
  <Divider />
  <Box>Section 2</Box>
</VStack>

// Vertical divider
<HStack spacing={4}>
  <Box>Left</Box>
  <Divider orientation="vertical" h="20px" />
  <Box>Right</Box>
</HStack>
```

**DO:**
- ✅ Use for visual separation between sections
- ✅ Use within Stack components
- ✅ Specify height for vertical dividers

**DON'T:**
- ❌ Don't overuse (consider spacing instead)

---

## Feedback Components

### Progress

Linear progress indicator.

**Import:**
```tsx
import { Progress, ProgressLabel } from '@chakra-ui/progress'
```

**Props:**
- `value`: progress value (undefined = indeterminate)
- `min`, `max`: range (default: 0-100)
- `size`: `"xs" | "sm" | "md" | "lg"`
- `colorScheme`: progress color
- `hasStripe`: striped appearance
- `isAnimated`: animate stripes
- `isIndeterminate`: indeterminate state

**Usage:**
```tsx
// Determinate progress
<Progress value={60} size="sm" colorScheme="green" />

// Indeterminate progress
<Progress size="xs" isIndeterminate />

// With stripes
<Progress value={80} size="md" colorScheme="blue" hasStripe isAnimated />
```

**DO:**
- ✅ Use for file uploads, loading states
- ✅ Show percentage when space allows
- ✅ Use indeterminate for unknown duration

**DON'T:**
- ❌ Don't use for instant operations (use Spinner)
- ❌ Don't use multiple progress bars in same view

---

### CircularProgress

Circular progress indicator.

**Import:**
```tsx
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/progress'
```

**Props:**
- `value`: progress value
- `size`: pixel size (e.g., `"60px"`)
- `thickness`: stroke thickness (default: `"10px"`)
- `color`: progress color
- `trackColor`: background track color
- `capIsRound`: rounded stroke caps
- `isIndeterminate`: spinning animation

**Usage:**
```tsx
// Determinate circular progress
<CircularProgress value={40} color="blue.500" size="100px" thickness="10px">
  <CircularProgressLabel>40%</CircularProgressLabel>
</CircularProgress>

// Indeterminate spinner
<CircularProgress isIndeterminate color="green.300" />
```

**DO:**
- ✅ Use for compact progress displays
- ✅ Show value in label when possible
- ✅ Use for dashboards, widgets

**DON'T:**
- ❌ Don't use when linear progress is clearer

---

## Form Components

### Textarea

Multi-line text input.

**Import:**
```tsx
import { Textarea } from '@chakra-ui/textarea'
```

**Props:**
- Extends `HTMLChakraProps<"textarea">`
- `size`: `"xs" | "sm" | "md" | "lg"`
- `variant`: `"outline" | "filled" | "flushed" | "unstyled"`
- `resize`: `"none" | "both" | "horizontal" | "vertical"`
- `isInvalid`: error state
- `isDisabled`: disabled state
- `focusBorderColor`: border color on focus
- `errorBorderColor`: border color when invalid

**Usage:**
```tsx
<Textarea 
  placeholder="Enter description" 
  size="md"
  resize="vertical"
/>

// With validation
<Textarea 
  isInvalid 
  errorBorderColor="red.300"
  placeholder="This field has an error"
/>

// Custom focus color
<Textarea 
  focusBorderColor="blue.500"
  placeholder="Custom focus color"
/>
```

**DO:**
- ✅ Use for multi-line text input
- ✅ Set appropriate placeholder
- ✅ Use validation states (isInvalid)
- ✅ Control resize behavior

**DON'T:**
- ❌ Don't use for single-line input (use Input)
- ❌ Don't allow both horizontal and vertical resize (confusing UX)

---

## Other Components

### CloseButton

Accessible close button.

**Import:**
```tsx
import { CloseButton } from '@chakra-ui/close-button'
```

**Props:**
- `size`: `"sm" | "md" | "lg"`
- `isDisabled`: disabled state

**Usage:**
```tsx
<CloseButton onClick={() => console.log('closed')} />

// Custom size
<CloseButton size="lg" />
```

**DO:**
- ✅ Use in modals, alerts, toasts
- ✅ Provide onClick handler
- ✅ Include accessible label if context unclear

**DON'T:**
- ❌ Don't use for navigation (use Link or Button)

---

## Icon Usage

For icon components, **always consult `/guidelines/icon-discovery.md`** before using icons.

**Import:**
```tsx
import { CheckIcon, ChevronDownIcon } from '@chakra-ui/icons'
```

**Usage with components:**
```tsx
// In button
<Button leftIcon={<AddIcon />}>Add Item</Button>

// In list
<ListIcon as={CheckIcon} color="green.500" />

// Standalone
<SearchIcon w={5} h={5} color="gray.600" />
```

**DO:**
- ✅ Verify icon exists before using (see icon-discovery.md)
- ✅ Use semantic icon names
- ✅ Size icons appropriately for context

**DON'T:**
- ❌ Don't guess icon names
- ❌ Don't use inconsistent icon sizes

---

## Common Patterns

### Form with validation
```tsx
<VStack spacing={4} align="stretch">
  <FormControl isInvalid={errors.email}>
    <FormLabel>Email</FormLabel>
    <Input type="email" />
    <FormErrorMessage>Email is required</FormErrorMessage>
  </FormControl>
  <Button type="submit" colorScheme="blue">Submit</Button>
</VStack>
```

### Card layout
```tsx
<Box 
  p={6} 
  shadow="md" 
  borderRadius="lg" 
  bg="white"
  _dark={{ bg: 'gray.800' }}
>
  <Heading size="md" mb={4}>Card Title</Heading>
  <Text>Card content</Text>
</Box>
```

### Modal confirmation
```tsx
<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Confirm Action</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      Are you sure you want to proceed?
    </ModalBody>
    <ModalFooter>
      <Button variant="ghost" mr={3} onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme="red" onClick={handleConfirm}>
        Delete
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```
