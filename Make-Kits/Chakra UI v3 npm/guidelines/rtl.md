# RTL & Bilingual Layout Guidelines

This project supports both **Persian (RTL)** and **English (LTR)** content. All components must work correctly in both directions.

---

## Global RTL Setup

### Root Configuration

Set `dir="rtl"` on the HTML root or the top-level wrapper for Persian pages:

```tsx
// app/layout.tsx (Next.js)
export default function RootLayout({ children, params: { lang } }) {
  const isRtl = lang === 'fa'
  return (
    <html dir={isRtl ? 'rtl' : 'ltr'} lang={lang}>
      <body>{children}</body>
    </html>
  )
}

// Or wrap specific sections
<Box dir="rtl">
  {/* Persian content */}
</Box>
```

### Persian Font

Apply the Persian font to all RTL content:

```tsx
// In your theme or global CSS:
// --font-persian: 'Vazirmatn', sans-serif

<Box dir="rtl" fontFamily="var(--font-persian)">
  متن فارسی
</Box>
```

### Provider with RTL

```tsx
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

function App({ dir = 'rtl' }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box dir={dir} fontFamily={dir === 'rtl' ? 'var(--font-persian)' : 'inherit'}>
        {children}
      </Box>
    </ChakraProvider>
  )
}
```

---

## The Golden Rule: Always Use Logical Properties

**Physical properties** are absolute (left/right) — they do NOT flip in RTL.
**Logical properties** are relative (start/end) — they flip automatically in RTL.

| ❌ Physical (avoid) | ✅ Logical (use) |
|---|---|
| `paddingLeft` / `pl` | `paddingStart` / `ps` |
| `paddingRight` / `pr` | `paddingEnd` / `pe` |
| `marginLeft` / `ml` | `marginStart` / `ms` |
| `marginRight` / `mr` | `marginEnd` / `me` |
| `textAlign="right"` | `textAlign="start"` |
| `textAlign="left"` | `textAlign="end"` |
| `borderLeft` | `borderStart` |
| `borderRight` | `borderEnd` |
| `left={0}` | `insetStart={0}` |
| `right={0}` | `insetEnd={0}` |

```tsx
// ✅ DO — flips automatically in RTL
<Box paddingStart={4} paddingEnd={8} borderStart="2px solid" borderStartColor="blue.500">
  Content
</Box>

// ❌ DON'T — stays left even in RTL
<Box paddingLeft={4} paddingRight={8} borderLeft="2px solid" borderLeftColor="blue.500">
  Content
</Box>
```

---

## Per-Component RTL Rules

### Input

```tsx
// ✅ RTL input
<Input
  dir="rtl"
  textAlign="start"
  fontFamily="var(--font-persian)"
  placeholder="جستجو..."
/>

// ✅ LTR input (e.g., email, URL)
<Input
  dir="ltr"
  textAlign="start"
  placeholder="email@example.com"
/>
```

**Rules:**
- Text inputs: `dir="rtl"`, `textAlign="start"`
- Email/URL/Number fields: always `dir="ltr"` regardless of page direction
- Placeholder aligns automatically with `textAlign="start"`

---

### Select

```tsx
// ✅ RTL select
<Select.Root dir="rtl">
  <Select.Trigger textAlign="start">
    <Select.ValueText placeholder="انتخاب کنید" />
    {/* Chevron icon moves to left side automatically */}
  </Select.Trigger>
  <Select.Content>
    <Select.Item value="a" textAlign="start">گزینه الف</Select.Item>
    <Select.Item value="b" textAlign="start">گزینه ب</Select.Item>
  </Select.Content>
</Select.Root>
```

**Rules:**
- Add `dir="rtl"` to `Select.Root`
- Use `textAlign="start"` on trigger and items
- The chevron icon flips to the left side automatically when `dir="rtl"` is set

---

### NumberInput

```tsx
// ✅ RTL number input — number stays LTR, controls flip
<NumberInput.Root dir="rtl" defaultValue="10">
  <NumberInput.Input
    dir="ltr"         // numbers are always LTR
    textAlign="end"   // align number to the right visually
  />
  <NumberInput.Control>
    {/* Buttons appear on the LEFT side in RTL */}
    <NumberInput.IncrementTrigger />
    <NumberInput.DecrementTrigger />
  </NumberInput.Control>
</NumberInput.Root>
```

**Rules:**
- `NumberInput.Root`: `dir="rtl"` — moves control buttons to left
- `NumberInput.Input`: always `dir="ltr"` — numbers read left-to-right
- `NumberInput.Input`: `textAlign="end"` — number appears on the right side visually

---

### Rating

```tsx
// ✅ RTL rating — stars fill from right to left
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

**Rules:**
- Add `dir="rtl"` to `Rating.Root`
- Stars automatically render right-to-left and fill from the right

---

### Tabs

```tsx
// ✅ RTL tabs — tab list starts from right
<Tabs.Root dir="rtl" defaultValue="tab1" colorPalette="blue">
  <Tabs.List>
    {/* First tab appears on the RIGHT */}
    <Tabs.Trigger value="tab1">برگه ۱</Tabs.Trigger>
    <Tabs.Trigger value="tab2">برگه ۲</Tabs.Trigger>
    <Tabs.Trigger value="tab3">برگه ۳</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">محتوای برگه اول</Tabs.Content>
  <Tabs.Content value="tab2">محتوای برگه دوم</Tabs.Content>
  <Tabs.Content value="tab3">محتوای برگه سوم</Tabs.Content>
</Tabs.Root>
```

**Rules:**
- Add `dir="rtl"` to `Tabs.Root`
- Tab list automatically starts from the right
- Active indicator moves in the correct direction

---

### Accordion

```tsx
// ✅ RTL accordion — title on right, chevron on left
<Accordion.Root dir="rtl" variant="outline">
  <Accordion.Item value="a">
    <Accordion.ItemTrigger>
      {/* With dir="rtl": text is on right, icon is on left */}
      <Accordion.ItemIndicator />  {/* icon — appears on LEFT */}
      <Box flex={1} textAlign="start">بخش اول</Box>
    </Accordion.ItemTrigger>
    <Accordion.ItemContent>
      <Accordion.ItemBody textAlign="start">
        محتوای بخش اول در اینجا قرار دارد.
      </Accordion.ItemBody>
    </Accordion.ItemContent>
  </Accordion.Item>
</Accordion.Root>
```

**Rules:**
- Add `dir="rtl"` to `Accordion.Root`
- Place `Accordion.ItemIndicator` BEFORE the text in JSX — in RTL it will appear on the left
- Use `textAlign="start"` on trigger text and body

---

### Breadcrumb

```tsx
// ✅ RTL breadcrumb — items start from right, separator flips
<Breadcrumb.Root dir="rtl">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">خانه</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />   {/* separator automatically flips direction */}
    <Breadcrumb.Item>
      <Breadcrumb.Link href="#">کامپوننت‌ها</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.CurrentLink>دکمه</Breadcrumb.CurrentLink>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

**Rules:**
- Add `dir="rtl"` to `Breadcrumb.Root`
- The separator (`/` or `>`) automatically appears between items in the correct direction
- If using a custom separator icon (like ChevronRight), swap it with ChevronLeft for RTL

---

### Menu

```tsx
// ✅ RTL menu
<Menu.Root dir="rtl">
  <Menu.Trigger asChild>
    <Button>منو</Button>
  </Menu.Trigger>
  <Menu.Positioner>
    <Menu.Content>
      <Menu.Item value="profile" textAlign="start">پروفایل</Menu.Item>
      <Menu.Item value="settings" textAlign="start">تنظیمات</Menu.Item>
      <Menu.Separator />
      <Menu.Item value="logout" textAlign="start" color="red.500">خروج</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
</Menu.Root>
```

**Rules:**
- Add `dir="rtl"` to `Menu.Root`
- Use `textAlign="start"` on menu items
- Menu opens from the correct side automatically

---

### Dialog (Modal)

```tsx
// ✅ RTL dialog
<Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content dir="rtl" textAlign="start" fontFamily="var(--font-persian)">
      <Dialog.Header>
        <Dialog.Title>عنوان دیالوگ</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        محتوای دیالوگ در اینجا قرار دارد.
      </Dialog.Body>
      <Dialog.Footer justifyContent="flex-start">
        {/* In RTL, flex-start = visual right side */}
        <Button colorPalette="blue">تایید</Button>
        <Button variant="ghost" onClick={() => setOpen(false)}>انصراف</Button>
      </Dialog.Footer>
      <Dialog.CloseTrigger />
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

**Rules:**
- Add `dir="rtl"` and `textAlign="start"` to `Dialog.Content`
- Close button automatically moves to the correct corner
- Use logical justify values in footer

---

### Drawer

```tsx
// ✅ RTL drawer — placement is logical
// For RTL navigation drawer: use placement="start" (appears on RIGHT in RTL)
// For RTL settings panel: use placement="end" (appears on LEFT in RTL)

<Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
  <Drawer.Backdrop />
  <Drawer.Positioner>
    <Drawer.Content dir="rtl" textAlign="start" fontFamily="var(--font-persian)">
      <Drawer.Header>
        <Drawer.Title>منوی ناوبری</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        محتوا
      </Drawer.Body>
      <Drawer.CloseTrigger />
    </Drawer.Content>
  </Drawer.Positioner>
</Drawer.Root>
```

**Rules:**
- Use `placement="start"` for main nav (right side in RTL)
- Use `placement="end"` for secondary panels (left side in RTL)
- Never use `placement="left"` or `placement="right"` — use logical values

---

### Checkbox & Radio

```tsx
// ✅ RTL checkbox — label on left, box on right
<Checkbox.Root dir="rtl" colorPalette="blue">
  <Checkbox.HiddenInput />
  <Checkbox.Control>
    <Checkbox.Indicator />
  </Checkbox.Control>
  <Checkbox.Label fontFamily="var(--font-persian)">پذیرش شرایط</Checkbox.Label>
</Checkbox.Root>

// ✅ RTL radio group
<RadioGroup.Root dir="rtl" defaultValue="1" colorPalette="blue">
  <Stack gap={3}>
    <Radio.Root value="1">
      <Radio.HiddenInput />
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Label fontFamily="var(--font-persian)">گزینه اول</Radio.Label>
    </Radio.Root>
    <Radio.Root value="2">
      <Radio.HiddenInput />
      <Radio.Control><Radio.Indicator /></Radio.Control>
      <Radio.Label fontFamily="var(--font-persian)">گزینه دوم</Radio.Label>
    </Radio.Root>
  </Stack>
</RadioGroup.Root>
```

**Rules:**
- Add `dir="rtl"` to root component
- Label automatically appears on the left, control on the right

---

### Switch

```tsx
// ✅ RTL switch — label on left, toggle on right
<Switch.Root dir="rtl" colorPalette="blue">
  <Switch.HiddenInput />
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Label fontFamily="var(--font-persian)">حالت تاریک</Switch.Label>
</Switch.Root>
```

---

### Slider

```tsx
// ✅ RTL slider — fills from right
<Slider.Root dir="rtl" defaultValue={[40]} colorPalette="blue">
  <Slider.Track>
    <Slider.Range />  {/* fills from right in RTL */}
  </Slider.Track>
  <Slider.Thumb index={0} />
</Slider.Root>
```

---

### Table

```tsx
// ✅ RTL table
<Table.Root dir="rtl">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader textAlign="start">نام</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="start">نقش</Table.ColumnHeader>
      <Table.ColumnHeader textAlign="end">سن</Table.ColumnHeader>  {/* numeric: end */}
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell textAlign="start">علی رضایی</Table.Cell>
      <Table.Cell textAlign="start">مدیر</Table.Cell>
      <Table.Cell textAlign="end">۳۲</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

**Rules:**
- Add `dir="rtl"` to `Table.Root`
- Use `textAlign="start"` for text columns
- Use `textAlign="end"` for numeric columns (right-aligned visually in both directions)

---

## Bilingual Component Pattern

When a single component must switch between RTL and LTR:

```tsx
interface BilingualProps {
  dir?: 'rtl' | 'ltr'
  children: React.ReactNode
}

function BilingualWrapper({ dir = 'rtl', children }: BilingualProps) {
  return (
    <Box
      dir={dir}
      textAlign="start"
      fontFamily={dir === 'rtl' ? 'var(--font-persian)' : 'inherit'}
    >
      {children}
    </Box>
  )
}

// Usage
<BilingualWrapper dir="rtl">
  <Heading>عنوان فارسی</Heading>
</BilingualWrapper>

<BilingualWrapper dir="ltr">
  <Heading>English Title</Heading>
</BilingualWrapper>
```

---

## DO / DON'T Summary

### ✅ DO
```tsx
// Use logical properties
<Box paddingStart={4} paddingEnd={8} />

// Use textAlign="start" not "right"
<Text textAlign="start">متن</Text>

// Set dir on root components
<Tabs.Root dir="rtl">...</Tabs.Root>
<Accordion.Root dir="rtl">...</Accordion.Root>

// Keep numbers LTR even in RTL context
<NumberInput.Input dir="ltr" />

// Use logical placement for Drawer
<Drawer.Root placement="start">...</Drawer.Root>

// Use Persian font for RTL text
<Box fontFamily="var(--font-persian)">متن فارسی</Box>
```

### ❌ DON'T
```tsx
// Don't use physical properties
<Box paddingLeft={4} paddingRight={8} />

// Don't use textAlign="right"
<Text textAlign="right">متن</Text>

// Don't forget dir on components that need it
<Tabs.Root>...</Tabs.Root>  // Missing dir="rtl"

// Don't use physical Drawer placement
<Drawer.Root placement="right">...</Drawer.Root>

// Don't mix font families without dir context
<Text>متن فارسی</Text>  // Missing fontFamily
```

---

## Quick Checklist for RTL Components

Before shipping any bilingual component, verify:

- [ ] Root element has `dir="rtl"`
- [ ] All text uses `textAlign="start"` (not `"right"`)
- [ ] Persian text has `fontFamily="var(--font-persian)"`
- [ ] All spacing uses logical props (`paddingStart`, `marginEnd`, etc.)
- [ ] Number/email/URL inputs have `dir="ltr"`
- [ ] Drawer uses `placement="start"` or `placement="end"` (not left/right)
- [ ] Icons that indicate direction are correct (ChevronLeft ↔ ChevronRight)
- [ ] Rating stars fill from the right
- [ ] Slider fills from the right
- [ ] Accordion chevron appears on the left side
