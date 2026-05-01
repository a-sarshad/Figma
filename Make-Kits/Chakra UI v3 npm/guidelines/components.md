# Chakra UI v3 Component Usage Guidelines

> **All imports are from `@chakra-ui/react`** — no subpackages in v3.
> **Use `colorPalette`** instead of v2's `colorScheme`.
> **Use `gap`** instead of v2's `spacing` on Stack components.

---

## Component Categories

- **Layout**: Box, Flex, Grid, SimpleGrid, Stack, Container, Center
- **Typography**: Heading, Text, Code, Kbd, Em, Strong, Mark
- **Overlay**: Dialog (Modal), Drawer
- **Disclosure**: Accordion, Tabs
- **Data Display**: Table, List, Badge, Tag, Avatar, Card, Stat, Separator
- **Feedback**: Progress, CircularProgress, Spinner, Skeleton
- **Form**: Field, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, NumberInput, PinInput, Rating, SegmentGroup, FileUpload
- **Navigation**: Breadcrumb, Link, Menu, Tabs
- **Other**: CloseButton, ColorSwatch, Tooltip, Popover

---

## Layout Components

### Box

The foundational component.

```tsx
import { Box } from '@chakra-ui/react'

<Box p={4} bg="gray.100" borderRadius="md">
  Generic container
</Box>

<Box as="section" maxW="container.lg">
  Semantic HTML with Box
</Box>
```

**DO:**
- ✅ Use for generic containers and wrappers
- ✅ Use `as` prop for semantic HTML
- ✅ Use logical spacing props (`paddingStart`, `paddingEnd`)

**DON'T:**
- ❌ Don't use `paddingLeft`/`paddingRight` — use `paddingStart`/`paddingEnd`

---

### Flex

```tsx
import { Flex } from '@chakra-ui/react'

<Flex align="center" justify="space-between" gap={4}>
  <Box>Left</Box>
  <Box>Right</Box>
</Flex>
```

---

### Grid / SimpleGrid

```tsx
import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react'

// Explicit grid
<Grid templateColumns="repeat(3, 1fr)" gap={6}>
  <GridItem>1</GridItem>
  <GridItem>2</GridItem>
</Grid>

// Responsive auto-grid
<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
  <Box>Card 1</Box>
  <Box>Card 2</Box>
</SimpleGrid>
```

---

### Stack / VStack / HStack

```tsx
import { Stack, VStack, HStack } from '@chakra-ui/react'

// v3: use gap (not spacing)
<VStack gap={4} align="stretch">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</VStack>

<HStack gap={3}>
  <Button variant="ghost">Cancel</Button>
  <Button colorPalette="blue">Save</Button>
</HStack>

// Responsive direction
<Stack direction={{ base: 'column', md: 'row' }} gap={4}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>
```

> **v2 → v3:** `spacing` → `gap`

---

### Container

```tsx
import { Container } from '@chakra-ui/react'

<Container maxW="container.lg" py={8}>
  Page content constrained to 1024px
</Container>
```

Container sizes: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)

---

### Center

```tsx
import { Center } from '@chakra-ui/react'

<Center h="100vh">
  <Spinner />
</Center>
```

---

## Typography Components

### Heading

```tsx
import { Heading } from '@chakra-ui/react'

<Heading as="h1" size="xl">Page Title</Heading>
<Heading as="h3" size="md">Section Heading</Heading>

// Responsive
<Heading size={{ base: 'lg', md: 'xl', lg: '2xl' }}>
  Responsive Heading
</Heading>

// RTL
<Heading as="h1" size="xl" dir="rtl" textAlign="start"
  fontFamily="var(--font-persian)">
  عنوان صفحه
</Heading>
```

Sizes: `4xl`, `3xl`, `2xl`, `xl`, `lg`, `md`, `sm`, `xs`

---

### Text

```tsx
import { Text } from '@chakra-ui/react'

<Text>Body content</Text>
<Text noOfLines={2}>Truncated text...</Text>
<Text fontSize="lg" fontWeight="semibold" color="gray.700">Emphasized</Text>
```

---

## Form Components

### Field (replaces FormControl in v3)

```tsx
import { Field, Input } from '@chakra-ui/react'

// Basic field
<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input type="email" placeholder="Enter email" />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
</Field.Root>

// With validation
<Field.Root invalid={!!error}>
  <Field.Label>Email</Field.Label>
  <Input type="email" />
  <Field.ErrorText>{error}</Field.ErrorText>
</Field.Root>

// Required field
<Field.Root required>
  <Field.Label>Name <Field.RequiredIndicator /></Field.Label>
  <Input placeholder="Enter name" />
</Field.Root>
```

> **v2 → v3:** `FormControl`/`FormLabel`/`FormErrorMessage` → `Field.Root`/`Field.Label`/`Field.ErrorText`

---

### Input

```tsx
import { Input } from '@chakra-ui/react'

// Variants
<Input variant="outline" placeholder="Outline" />
<Input variant="filled" placeholder="Filled" />
<Input variant="flushed" placeholder="Flushed" />

// Sizes
<Input size="xs" />
<Input size="sm" />
<Input size="md" />
<Input size="lg" />
<Input size="xl" />

// States
<Input disabled placeholder="Disabled" />
<Input readOnly placeholder="Read only" />
<Input invalid placeholder="Invalid" />

// RTL text input
<Input dir="rtl" textAlign="start" fontFamily="var(--font-persian)"
  placeholder="جستجو..." />

// LTR-only inputs (email, URL, numbers — always LTR)
<Input dir="ltr" type="email" placeholder="email@example.com" />
```

---

### Textarea

```tsx
import { Textarea } from '@chakra-ui/react'

<Textarea placeholder="Enter description..." resize="vertical" />

// RTL
<Textarea dir="rtl" textAlign="start" fontFamily="var(--font-persian)"
  placeholder="توضیحات..." />
```

---

### Select (v3 compound components)

```tsx
import { Select, createListCollection } from '@chakra-ui/react'

const items = createListCollection({
  items: [
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b' },
    { label: 'Option C', value: 'c' },
  ],
})

<Select.Root collection={items}>
  <Select.Trigger>
    <Select.ValueText placeholder="Select option" />
  </Select.Trigger>
  <Select.Positioner>
    <Select.Content>
      {items.items.map((item) => (
        <Select.Item key={item.value} item={item}>
          {item.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Positioner>
</Select.Root>

// RTL select — add dir="rtl" to root
<Select.Root collection={items} dir="rtl">
  <Select.Trigger textAlign="start">
    <Select.ValueText placeholder="انتخاب کنید" />
  </Select.Trigger>
  <Select.Positioner>
    <Select.Content>
      {items.items.map((item) => (
        <Select.Item key={item.value} item={item} textAlign="start">
          {item.label}
        </Select.Item>
      ))}
    </Select.Content>
  </Select.Positioner>
</Select.Root>
```

---

### Checkbox

```tsx
import { Checkbox } from '@chakra-ui/react'

<Checkbox.Root defaultChecked colorPalette="blue">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label>Accept terms</Checkbox.Label>
</Checkbox.Root>

// RTL
<Checkbox.Root dir="rtl" colorPalette="blue">
  <Checkbox.HiddenInput />
  <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
  <Checkbox.Label fontFamily="var(--font-persian)">پذیرش شرایط</Checkbox.Label>
</Checkbox.Root>
```

Sizes: `sm`, `md`, `lg`

---

### Radio

```tsx
import { RadioGroup, Radio } from '@chakra-ui/react'

<RadioGroup.Root defaultValue="1" colorPalette="blue">
  <HStack gap={6}>
    <Radio.Root value="1">
      <Radio.HiddenInput />
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Label>Option 1</Radio.Label>
    </Radio.Root>
    <Radio.Root value="2">
      <Radio.HiddenInput />
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Label>Option 2</Radio.Label>
    </Radio.Root>
  </HStack>
</RadioGroup.Root>

// RTL
<RadioGroup.Root dir="rtl" defaultValue="1" colorPalette="blue">
  <Stack gap={3}>
    <Radio.Root value="1">
      <Radio.HiddenInput />
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Label fontFamily="var(--font-persian)">گزینه اول</Radio.Label>
    </Radio.Root>
  </Stack>
</RadioGroup.Root>
```

---

### Switch

```tsx
import { Switch } from '@chakra-ui/react'

<Switch.Root defaultChecked colorPalette="blue">
  <Switch.HiddenInput />
  <Switch.Control><Switch.Thumb /></Switch.Control>
  <Switch.Label>Enable notifications</Switch.Label>
</Switch.Root>
```

Sizes: `sm`, `md`, `lg`

---

### Slider

```tsx
import { Slider } from '@chakra-ui/react'

// Single value
<Slider.Root defaultValue={[40]} colorPalette="blue">
  <Slider.Track><Slider.Range /></Slider.Track>
  <Slider.Thumb index={0} />
</Slider.Root>

// Range slider
<Slider.Root defaultValue={[20, 70]} colorPalette="blue">
  <Slider.Track><Slider.Range /></Slider.Track>
  <Slider.Thumb index={0} />
  <Slider.Thumb index={1} />
</Slider.Root>

// RTL — fills from right
<Slider.Root dir="rtl" defaultValue={[40]} colorPalette="blue">
  <Slider.Track><Slider.Range /></Slider.Track>
  <Slider.Thumb index={0} />
</Slider.Root>
```

---

### NumberInput

```tsx
import { NumberInput } from '@chakra-ui/react'

<NumberInput.Root defaultValue="10" min={0} max={100}>
  <NumberInput.Input />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>

// RTL — controls move to left, number stays LTR
<NumberInput.Root dir="rtl" defaultValue="10">
  <NumberInput.Input dir="ltr" textAlign="end" />
  <NumberInput.Control>
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

---

### Rating

```tsx
import { Rating } from '@chakra-ui/react'

<Rating.Root defaultValue={3} count={5} colorPalette="orange">
  <Rating.HiddenInput />
  <Rating.Control>
    {Array.from({ length: 5 }).map((_, i) => (
      <Rating.Item key={i} index={i + 1}>
        <Rating.ItemIndicator />
      </Rating.Item>
    ))}
  </Rating.Control>
</Rating.Root>

// RTL — stars fill from right
<Rating.Root dir="rtl" defaultValue={3} count={5} colorPalette="orange">
  <Rating.HiddenInput />
  <Rating.Control>
    {Array.from({ length: 5 }).map((_, i) => (
      <Rating.Item key={i} index={i + 1}>
        <Rating.ItemIndicator />
      </Rating.Item>
    ))}
  </Rating.Control>
</Rating.Root>
```

Sizes: `xs`, `sm`, `md`, `lg`, `xl`

---

### PinInput

```tsx
import { PinInput } from '@chakra-ui/react'

<PinInput.Root>
  <PinInput.HiddenInput />
  <PinInput.Control>
    {[0, 1, 2, 3].map((i) => (
      <PinInput.Input key={i} index={i} />
    ))}
  </PinInput.Control>
</PinInput.Root>
```

> Pin inputs are always `dir="ltr"` — OTP codes read left to right.

---

## Overlay Components

### Dialog (replaces Modal in v3)

```tsx
import { Dialog, Button } from '@chakra-ui/react'

function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              Dialog content here.
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button colorPalette="blue">Confirm</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}
```

Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `full`

> **v2 → v3:** `Modal` → `Dialog`, `isOpen`/`onClose` → `open`/`onOpenChange`

**RTL Dialog:**
```tsx
<Dialog.Content dir="rtl" textAlign="start" fontFamily="var(--font-persian)">
  ...
</Dialog.Content>
```

---

### Drawer

```tsx
import { Drawer, Button } from '@chakra-ui/react'

<Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content>
      <Drawer.Header>
        <Drawer.Title>Drawer Title</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>Content</Drawer.Body>
      <Drawer.Footer>
        <Button onClick={() => setOpen(false)}>Close</Button>
      </Drawer.Footer>
      <Drawer.CloseTrigger />
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

Placement: `start` | `end` | `top` | `bottom`

> **RTL rule:** Use `placement="start"` for nav drawers (appears on RIGHT in RTL). Never use `placement="left"` or `placement="right"`.

---

## Disclosure Components

### Accordion

```tsx
import { Accordion } from '@chakra-ui/react'

<Accordion.Root variant="outline">
  <Accordion.Item value="a">
    <Accordion.ItemTrigger>
      Section One
      <Accordion.ItemIndicator />
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody>Content here.</Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>

// RTL — title on right, chevron on left
<Accordion.Root dir="rtl" variant="outline">
  <Accordion.Item value="a">
    <Accordion.ItemTrigger>
      <Accordion.ItemIndicator />  {/* place BEFORE text → appears on LEFT in RTL */}
      <Box flex={1} textAlign="start">بخش اول</Box>
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody textAlign="start">محتوا</Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

Variants: `outline`, `elevated`, `contained`, `plain`

---

### Tabs

```tsx
import { Tabs } from '@chakra-ui/react'

<Tabs.Root defaultValue="tab1" variant="line" colorPalette="blue">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Panel 1</Tabs.Content>
  <Tabs.Content value="tab2">Panel 2</Tabs.Content>
  <Tabs.Content value="tab3">Panel 3</Tabs.Content>
</Tabs.Root>

// RTL — tabs start from right
<Tabs.Root dir="rtl" defaultValue="tab1" colorPalette="blue">
  <Tabs.List>
    <Tabs.Trigger value="tab1">برگه ۱</Tabs.Trigger>
    <Tabs.Trigger value="tab2">برگه ۲</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">محتوای برگه اول</Tabs.Content>
  <Tabs.Content value="tab2">محتوای برگه دوم</Tabs.Content>
</Tabs.Root>
```

Variants: `line`, `enclosed`, `soft-rounded`, `plain`

---

## Data Display Components

### Badge

```tsx
import { Badge } from '@chakra-ui/react'

<Badge colorPalette="green">Active</Badge>
<Badge variant="outline" colorPalette="red">Error</Badge>
<Badge variant="subtle" colorPalette="blue">Info</Badge>
```

Variants: `solid`, `outline`, `subtle`, `surface`, `plain`

---

### Tag

```tsx
import { Tag, CloseButton } from '@chakra-ui/react'

<Tag.Root colorPalette="blue">
  <Tag.Label>React</Tag.Label>
  <Tag.EndElement>
    <CloseButton size="xs" />
  </Tag.EndElement>
</Tag.Root>
```

Sizes: `sm`, `md`, `lg`

---

### Avatar

```tsx
import { Avatar, AvatarGroup } from '@chakra-ui/react'

<Avatar.Root size="md" colorPalette="blue">
  <Avatar.Image src="https://bit.ly/dan-abramov" />
  <Avatar.Fallback name="Dan Abramov" />
</Avatar.Root>

<AvatarGroup>
  <Avatar.Root><Avatar.Fallback name="Ali" /></Avatar.Root>
  <Avatar.Root><Avatar.Fallback name="Sara" /></Avatar.Root>
</AvatarGroup>
```

Sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

---

### Card

```tsx
import { Card } from '@chakra-ui/react'

<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
    <Card.Description>Card description</Card.Description>
  </Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>
    <Button colorPalette="blue">Action</Button>
  </Card.Footer>
</Card.Root>
```

Variants: `elevated`, `outline`, `filled`, `subtle`

---

### Table

```tsx
import { Table } from '@chakra-ui/react'

<Table.Root variant="line" size="md">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Name</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="end">Age</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell textAlign="end">30</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>

// RTL table
<Table.Root dir="rtl" variant="line">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader textAlign="start">نام</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="end">سن</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell textAlign="start">علی رضایی</Table.Cell>
      <Table.Cell textAlign="end">۳۲</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

Variants: `line`, `outline`, `plain`

---

### List

```tsx
import { List } from '@chakra-ui/react'

<List.Root as="ul">
  <List.Item>Item one</List.Item>
  <List.Item>Item two</List.Item>
</List.Root>

<List.Root as="ol">
  <List.Item>First step</List.Item>
  <List.Item>Second step</List.Item>
</List.Root>
```

---

## Feedback Components

### Alert

```tsx
import { Alert } from '@chakra-ui/react'

<Alert.Root status="success">
  <Alert.Indicator />
  <Alert.Content>
    <Alert.Title>Success</Alert.Title>
    <Alert.Description>Operation completed.</Alert.Description>
  </Alert.Content>
</Alert.Root>
```

Status: `info`, `warning`, `success`, `error`, `neutral`
Variants: `subtle`, `surface`, `solid`, `outline`

---

### Progress

```tsx
import { Progress } from '@chakra-ui/react'

<Progress.Root value={60} colorPalette="blue">
  <Progress.Track><Progress.Range /></Progress.Track>
</Progress.Root>

// Indeterminate
<Progress.Root indeterminate colorPalette="blue">
  <Progress.Track><Progress.Range /></Progress.Track>
</Progress.Root>
```

Sizes: `xs`, `sm`, `md`, `lg`

---

### CircularProgress

```tsx
import { CircularProgress } from '@chakra-ui/react'

<CircularProgress.Root value={60} colorPalette="blue">
  <CircularProgress.Circle>
    <CircularProgress.Track />
    <CircularProgress.Range />
  </CircularProgress.Circle>
</CircularProgress.Root>
```

---

### Spinner

```tsx
import { Spinner } from '@chakra-ui/react'

<Spinner size="md" colorPalette="blue" />
```

Sizes: `xs`, `sm`, `md`, `lg`, `xl`

---

### Skeleton

```tsx
import { Skeleton, SkeletonText, SkeletonCircle } from '@chakra-ui/react'

<Skeleton h="20px" />
<SkeletonText noOfLines={3} gap={2} />
<SkeletonCircle size="40px" />
```

---

## Navigation Components

### Breadcrumb

```tsx
import { Breadcrumb } from '@chakra-ui/react'

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>Current</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>

// RTL
<Breadcrumb.Root dir="rtl">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">خانه</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>صفحه جاری</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

---

### Menu

```tsx
import { Menu, Button } from '@chakra-ui/react'

<Menu.Root>
  <Menu.Trigger asChild>
    <Button variant="outline">Open Menu</Button>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="profile">Profile</Menu.Item>
      <Menu.Item value="settings">Settings</Menu.Item>
      <Menu.Separator />
      <Menu.Item value="logout" color="red.500">Sign out</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>

// RTL
<Menu.Root dir="rtl">
  <Menu.Trigger asChild>
    <Button>منو</Button>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="profile" textAlign="start">پروفایل</Menu.Item>
      <Menu.Item value="logout" textAlign="start" color="red.500">خروج</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
```

---

## Other Components

### Tooltip

```tsx
import { Tooltip } from '@chakra-ui/react'

<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Positioner>
    <Tooltip.Content>Tooltip text</Tooltip.Content>
  </Tooltip.Positioner>
</Tooltip.Root>
```

---

### Separator

```tsx
import { Separator } from '@chakra-ui/react'

<Separator />                          // horizontal
<Separator orientation="vertical" h="20px" />  // vertical
```

---

### CloseButton

```tsx
import { CloseButton } from '@chakra-ui/react'

<CloseButton size="md" onClick={handleClose} />
```

Sizes: `xs`, `sm`, `md`, `lg`, `xl`

---

## Icon Usage

Consult `icon-discovery.md` before using any icon.

```tsx
import { LuSearch, LuSettings, LuBell } from 'react-icons/lu'
import { Icon } from '@chakra-ui/react'

<Icon asChild w={5} h={5} color="gray.600">
  <LuSearch />
</Icon>

// In button
<Button>
  <Icon asChild><LuSettings /></Icon>
  Settings
</Button>
```

> **v3 note:** Chakra v3 recommends using `react-icons` with the `Icon` wrapper component.

---

## Common Patterns

### Form with validation (v3)
```tsx
<Stack gap={4}>
  <Field.Root invalid={!!errors.email}>
    <Field.Label>Email</Field.Label>
    <Input type="email" />
    <Field.ErrorText>Email is required</Field.ErrorText>
  </Field.Root>
  <Button type="submit" colorPalette="blue">Submit</Button>
</Stack>
```

### Card layout
```tsx
<Card.Root variant="elevated">
  <Card.Header>
    <Card.Title>Card Title</Card.Title>
  </Card.Header>
  <Card.Body>
    <Text>Card content</Text>
  </Card.Body>
</Card.Root>
```

### Confirmation Dialog (v3)
```tsx
<Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Confirm Action</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>Are you sure you want to delete this item?</Dialog.Body>
      <Dialog.Footer>
        <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
        <Button colorPalette="red" onClick={handleDelete}>Delete</Button>
      </Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```
