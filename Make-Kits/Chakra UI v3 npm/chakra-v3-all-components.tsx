import {
  ChakraProvider,
  defaultSystem,
  // Layout
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  HStack,
  VStack,
  Wrap,
  WrapItem,
  Separator,
  // Typography
  Heading,
  Text,
  Em,
  Strong,
  Mark,
  Highlight,
  // Feedback
  Alert,
  Badge,
  CircularProgress,
  Progress,
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  // Forms
  Button,
  ButtonGroup,
  IconButton,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  NumberInput,
  PinInput,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
  // Data Display
  Avatar,
  AvatarGroup,
  Card,
  Code,
  Kbd,
  List,
  Stat,
  Table,
  Tag,
  // Overlay
  // (Modals, Drawers need interaction — skip for static render)
  Tooltip,
  // Navigation
  Breadcrumb,
  Link,
  Tabs,
  // Disclosure
  Accordion,
  // Media
  Image,
  // Other
  CloseButton,
  ColorSwatch,
  Float,
  Group,
  Rating,
  SegmentGroup,
} from "@chakra-ui/react";

// ─── Section Header Helper ───────────────────────────────────────────────────
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={12}>
    <Heading size="lg" mb={1} color="gray.500" textTransform="uppercase" letterSpacing="wider" fontSize="xs">
      {title}
    </Heading>
    <Separator mb={6} />
    <Wrap gap={4} align="flex-start">
      {children}
    </Wrap>
  </Box>
);

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box p={10} bg="white" minH="100vh">
        <Heading size="2xl" mb={2}>Chakra UI v3 — All Components</Heading>
        <Text color="gray.500" mb={12}>Complete component kit for Figma Make</Text>

        {/* ── BUTTONS ──────────────────────────────────────────────────── */}
        <Section title="Button — Variants">
          {(["solid", "outline", "ghost", "subtle", "surface", "plain"] as const).map((v) => (
            <Button key={v} variant={v} colorPalette="blue">{v}</Button>
          ))}
        </Section>

        <Section title="Button — Sizes">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Button key={s} size={s} colorPalette="blue">Size {s}</Button>
          ))}
        </Section>

        <Section title="Button — Color Palettes">
          {(["gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"] as const).map((c) => (
            <Button key={c} colorPalette={c}>{c}</Button>
          ))}
        </Section>

        <Section title="Button — States">
          <Button colorPalette="blue">Default</Button>
          <Button colorPalette="blue" disabled>Disabled</Button>
          <Button colorPalette="blue" loading>Loading</Button>
          <Button colorPalette="blue" loading loadingText="Saving...">Loading Text</Button>
        </Section>

        <Section title="Button Group">
          <ButtonGroup>
            <Button colorPalette="blue">Save</Button>
            <Button colorPalette="blue" variant="outline">Cancel</Button>
          </ButtonGroup>
          <ButtonGroup variant="outline" colorPalette="blue">
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Section>

        {/* ── BADGE ────────────────────────────────────────────────────── */}
        <Section title="Badge — Variants">
          {(["solid", "outline", "subtle", "surface", "plain"] as const).map((v) => (
            <Badge key={v} variant={v} colorPalette="blue">{v}</Badge>
          ))}
        </Section>

        <Section title="Badge — Colors">
          {(["gray", "red", "orange", "green", "teal", "blue", "purple", "pink"] as const).map((c) => (
            <Badge key={c} colorPalette={c}>{c}</Badge>
          ))}
        </Section>

        {/* ── TAG ──────────────────────────────────────────────────────── */}
        <Section title="Tag — Variants">
          {(["solid", "outline", "subtle", "surface"] as const).map((v) => (
            <Tag.Root key={v} variant={v} colorPalette="blue">
              <Tag.Label>{v}</Tag.Label>
              <Tag.EndElement><CloseButton size="xs" /></Tag.EndElement>
            </Tag.Root>
          ))}
        </Section>

        <Section title="Tag — Sizes">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Tag.Root key={s} size={s} colorPalette="teal">
              <Tag.Label>Size {s}</Tag.Label>
            </Tag.Root>
          ))}
        </Section>

        {/* ── AVATAR ───────────────────────────────────────────────────── */}
        <Section title="Avatar — Sizes">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <Avatar.Root key={s} size={s} colorPalette="blue">
              <Avatar.Fallback name="Ali Rezaei" />
            </Avatar.Root>
          ))}
        </Section>

        <Section title="Avatar — With Image & Group">
          <Avatar.Root>
            <Avatar.Image src="https://bit.ly/dan-abramov" />
            <Avatar.Fallback name="Dan Abramov" />
          </Avatar.Root>
          <AvatarGroup>
            {["Ali", "Sara", "Dara", "Nima"].map((name) => (
              <Avatar.Root key={name} colorPalette="teal">
                <Avatar.Fallback name={name} />
              </Avatar.Root>
            ))}
          </AvatarGroup>
        </Section>

        {/* ── INPUT ────────────────────────────────────────────────────── */}
        <Section title="Input — Variants">
          <Stack w="260px" gap={3}>
            {(["outline", "filled", "flushed"] as const).map((v) => (
              <Input key={v} variant={v} placeholder={`${v} input`} />
            ))}
          </Stack>
        </Section>

        <Section title="Input — Sizes">
          <Stack w="260px" gap={3}>
            {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
              <Input key={s} size={s} placeholder={`Size ${s}`} />
            ))}
          </Stack>
        </Section>

        <Section title="Input — States">
          <Stack w="260px" gap={3}>
            <Input placeholder="Default" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="Read only" readOnly />
            <Input placeholder="Invalid" invalid />
          </Stack>
        </Section>

        {/* ── TEXTAREA ─────────────────────────────────────────────────── */}
        <Section title="Textarea">
          <Textarea w="280px" placeholder="Enter description..." />
          <Textarea w="280px" placeholder="Disabled" disabled />
        </Section>

        {/* ── SELECT ───────────────────────────────────────────────────── */}
        <Section title="Select">
          <Stack w="220px" gap={3}>
            {(["outline", "filled", "flushed"] as const).map((v) => (
              <Select.Root key={v} collection={{ items: [] } as any}>
                <Select.Trigger variant={v}>
                  <Select.ValueText placeholder={`${v} select`} />
                </Select.Trigger>
              </Select.Root>
            ))}
          </Stack>
        </Section>

        {/* ── CHECKBOX ─────────────────────────────────────────────────── */}
        <Section title="Checkbox">
          <Checkbox.Root defaultChecked colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Checkbox.Label>Checked</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Checkbox.Label>Unchecked</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root disabled colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
            <Checkbox.Label>Disabled</Checkbox.Label>
          </Checkbox.Root>
        </Section>

        <Section title="Checkbox — Sizes & Colors">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Checkbox.Root key={s} size={s} defaultChecked colorPalette="teal">
              <Checkbox.HiddenInput />
              <Checkbox.Control><Checkbox.Indicator /></Checkbox.Control>
              <Checkbox.Label>Size {s}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Section>

        {/* ── RADIO ────────────────────────────────────────────────────── */}
        <Section title="Radio">
          <RadioGroup.Root defaultValue="1" colorPalette="blue">
            <HStack gap={6}>
              {["Option 1", "Option 2", "Option 3"].map((label, i) => (
                <Radio.Root key={i} value={String(i + 1)}>
                  <Radio.HiddenInput />
                  <Radio.Control><Radio.Indicator /></Radio.Control>
                  <Radio.Label>{label}</Radio.Label>
                </Radio.Root>
              ))}
            </HStack>
          </RadioGroup.Root>
        </Section>

        {/* ── SWITCH ───────────────────────────────────────────────────── */}
        <Section title="Switch — Sizes & Colors">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Switch.Root key={s} size={s} defaultChecked colorPalette="blue">
              <Switch.HiddenInput />
              <Switch.Control><Switch.Thumb /></Switch.Control>
              <Switch.Label>Size {s}</Switch.Label>
            </Switch.Root>
          ))}
        </Section>

        {/* ── SLIDER ───────────────────────────────────────────────────── */}
        <Section title="Slider">
          <Box w="200px">
            <Slider.Root defaultValue={[40]} colorPalette="blue">
              <Slider.Track><Slider.Range /></Slider.Track>
              <Slider.Thumb index={0} />
            </Slider.Root>
          </Box>
          <Box w="200px">
            <Slider.Root defaultValue={[20, 70]} colorPalette="teal">
              <Slider.Track><Slider.Range /></Slider.Track>
              <Slider.Thumb index={0} />
              <Slider.Thumb index={1} />
            </Slider.Root>
          </Box>
        </Section>

        {/* ── NUMBER INPUT ─────────────────────────────────────────────── */}
        <Section title="Number Input">
          <NumberInput.Root w="140px" defaultValue="10">
            <NumberInput.Input />
            <NumberInput.Control>
              <NumberInput.IncrementTrigger />
              <NumberInput.DecrementTrigger />
            </NumberInput.Control>
          </NumberInput.Root>
        </Section>

        {/* ── PIN INPUT ────────────────────────────────────────────────── */}
        <Section title="Pin Input">
          <PinInput.Root>
            <PinInput.HiddenInput />
            <PinInput.Control>
              {[0, 1, 2, 3].map((i) => (
                <PinInput.Input key={i} index={i} />
              ))}
            </PinInput.Control>
          </PinInput.Root>
        </Section>

        {/* ── RATING ───────────────────────────────────────────────────── */}
        <Section title="Rating — Sizes">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Rating.Root key={s} size={s} defaultValue={3} count={5} colorPalette="orange">
              <Rating.HiddenInput />
              <Rating.Control>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Rating.Item key={i} index={i + 1}>
                    <Rating.ItemIndicator />
                  </Rating.Item>
                ))}
              </Rating.Control>
            </Rating.Root>
          ))}
        </Section>

        {/* ── ALERT ────────────────────────────────────────────────────── */}
        <Section title="Alert — Status">
          <Stack w="320px" gap={3}>
            {(["info", "warning", "success", "error", "neutral"] as const).map((s) => (
              <Alert.Root key={s} status={s}>
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>{s.charAt(0).toUpperCase() + s.slice(1)}</Alert.Title>
                  <Alert.Description>This is a {s} alert message.</Alert.Description>
                </Alert.Content>
              </Alert.Root>
            ))}
          </Stack>
        </Section>

        <Section title="Alert — Variants">
          <Stack w="320px" gap={3}>
            {(["subtle", "surface", "solid", "outline"] as const).map((v) => (
              <Alert.Root key={v} variant={v} status="info">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title>Variant: {v}</Alert.Title>
                </Alert.Content>
              </Alert.Root>
            ))}
          </Stack>
        </Section>

        {/* ── PROGRESS ─────────────────────────────────────────────────── */}
        <Section title="Progress">
          <Stack w="240px" gap={4}>
            <Progress.Root value={60} colorPalette="blue">
              <Progress.Track><Progress.Range /></Progress.Track>
            </Progress.Root>
            <Progress.Root value={80} colorPalette="green" size="sm">
              <Progress.Track><Progress.Range /></Progress.Track>
            </Progress.Root>
            <Progress.Root value={40} colorPalette="orange" size="lg">
              <Progress.Track><Progress.Range /></Progress.Track>
            </Progress.Root>
            <Progress.Root indeterminate colorPalette="purple">
              <Progress.Track><Progress.Range /></Progress.Track>
            </Progress.Root>
          </Stack>
        </Section>

        {/* ── CIRCULAR PROGRESS ────────────────────────────────────────── */}
        <Section title="Circular Progress">
          <CircularProgress.Root value={60} colorPalette="blue">
            <CircularProgress.Circle>
              <CircularProgress.Track />
              <CircularProgress.Range />
            </CircularProgress.Circle>
          </CircularProgress.Root>
          <CircularProgress.Root value={80} colorPalette="green" size="lg">
            <CircularProgress.Circle>
              <CircularProgress.Track />
              <CircularProgress.Range />
            </CircularProgress.Circle>
          </CircularProgress.Root>
          <CircularProgress.Root indeterminate colorPalette="orange">
            <CircularProgress.Circle>
              <CircularProgress.Track />
              <CircularProgress.Range />
            </CircularProgress.Circle>
          </CircularProgress.Root>
        </Section>

        {/* ── SPINNER ──────────────────────────────────────────────────── */}
        <Section title="Spinner — Sizes & Colors">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Spinner key={s} size={s} colorPalette="blue" />
          ))}
          {(["blue", "green", "red", "orange", "purple"] as const).map((c) => (
            <Spinner key={c} colorPalette={c} />
          ))}
        </Section>

        {/* ── SKELETON ─────────────────────────────────────────────────── */}
        <Section title="Skeleton">
          <Stack w="220px" gap={3}>
            <Skeleton h="20px" />
            <SkeletonText noOfLines={3} gap={2} />
            <HStack>
              <SkeletonCircle size="40px" />
              <SkeletonText noOfLines={2} gap={2} flex={1} />
            </HStack>
          </Stack>
        </Section>

        {/* ── CARD ─────────────────────────────────────────────────────── */}
        <Section title="Card — Variants">
          {(["elevated", "outline", "filled", "subtle"] as const).map((v) => (
            <Card.Root key={v} variant={v} w="200px">
              <Card.Header>
                <Card.Title>Card {v}</Card.Title>
                <Card.Description>Description here</Card.Description>
              </Card.Header>
              <Card.Body>
                <Text fontSize="sm" color="gray.500">Body content goes here.</Text>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" colorPalette="blue">Action</Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </Section>

        {/* ── STAT ─────────────────────────────────────────────────────── */}
        <Section title="Stat">
          <Stat.Root>
            <Stat.Label>Total Revenue</Stat.Label>
            <Stat.ValueText>$45,670</Stat.ValueText>
            <Stat.HelpText>
              <Stat.UpIndicator /> 23% vs last month
            </Stat.HelpText>
          </Stat.Root>
          <Stat.Root>
            <Stat.Label>Churn Rate</Stat.Label>
            <Stat.ValueText>2.4%</Stat.ValueText>
            <Stat.HelpText>
              <Stat.DownIndicator /> 5% vs last month
            </Stat.HelpText>
          </Stat.Root>
        </Section>

        {/* ── TABLE ────────────────────────────────────────────────────── */}
        <Section title="Table — Variants">
          {(["line", "outline", "plain"] as const).map((v) => (
            <Table.Root key={v} variant={v} size="sm" w="320px">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Role</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[["Ali", "Admin", "Active"], ["Sara", "Editor", "Inactive"]].map(([n, r, s]) => (
                  <Table.Row key={n}>
                    <Table.Cell>{n}</Table.Cell>
                    <Table.Cell>{r}</Table.Cell>
                    <Table.Cell>{s}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          ))}
        </Section>

        {/* ── LIST ─────────────────────────────────────────────────────── */}
        <Section title="List">
          <List.Root as="ul">
            <List.Item>Unordered item one</List.Item>
            <List.Item>Unordered item two</List.Item>
            <List.Item>Unordered item three</List.Item>
          </List.Root>
          <List.Root as="ol">
            <List.Item>Ordered item one</List.Item>
            <List.Item>Ordered item two</List.Item>
            <List.Item>Ordered item three</List.Item>
          </List.Root>
        </Section>

        {/* ── TABS ─────────────────────────────────────────────────────── */}
        <Section title="Tabs — Variants">
          {(["line", "soft-rounded", "enclosed", "plain"] as const).map((v) => (
            <Tabs.Root key={v} variant={v} defaultValue="tab1" colorPalette="blue">
              <Tabs.List>
                <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="tab1"><Text p={3} fontSize="sm">Content 1</Text></Tabs.Content>
              <Tabs.Content value="tab2"><Text p={3} fontSize="sm">Content 2</Text></Tabs.Content>
              <Tabs.Content value="tab3"><Text p={3} fontSize="sm">Content 3</Text></Tabs.Content>
            </Tabs.Root>
          ))}
        </Section>

        {/* ── ACCORDION ────────────────────────────────────────────────── */}
        <Section title="Accordion — Variants">
          {(["outline", "elevated", "contained", "plain"] as const).map((v) => (
            <Accordion.Root key={v} variant={v} w="280px">
              <Accordion.Item value="a">
                <Accordion.ItemTrigger>Section One</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content for section one.</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
              <Accordion.Item value="b">
                <Accordion.ItemTrigger>Section Two</Accordion.ItemTrigger>
                <Accordion.ItemContent>
                  <Accordion.ItemBody>Content for section two.</Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            </Accordion.Root>
          ))}
        </Section>

        {/* ── BREADCRUMB ───────────────────────────────────────────────── */}
        <Section title="Breadcrumb">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item><Breadcrumb.Link href="#">Home</Breadcrumb.Link></Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item><Breadcrumb.Link href="#">Components</Breadcrumb.Link></Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item><Breadcrumb.CurrentLink>Button</Breadcrumb.CurrentLink></Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Section>

        {/* ── TOOLTIP ──────────────────────────────────────────────────── */}
        <Section title="Tooltip">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button colorPalette="blue">Hover me</Button>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>This is a tooltip</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip.Root>
        </Section>

        {/* ── SEGMENTED CONTROL ────────────────────────────────────────── */}
        <Section title="Segmented Control">
          <SegmentGroup.Root defaultValue="list" size="md" colorPalette="blue">
            <SegmentGroup.Indicator />
            {["Grid", "List", "Table"].map((item) => (
              <SegmentGroup.Item key={item} value={item.toLowerCase()}>
                <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            ))}
          </SegmentGroup.Root>
        </Section>

        {/* ── COLOR SWATCH ─────────────────────────────────────────────── */}
        <Section title="Color Swatch">
          {(["red.400", "orange.400", "yellow.400", "green.400", "teal.400", "blue.400", "purple.400", "pink.400"] as const).map((c) => (
            <ColorSwatch.Root key={c} value={c} size="md">
              <ColorSwatch.Area />
            </ColorSwatch.Root>
          ))}
        </Section>

        {/* ── TYPOGRAPHY ───────────────────────────────────────────────── */}
        <Section title="Typography — Heading Sizes">
          <Stack gap={2}>
            {(["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs"] as const).map((s) => (
              <Heading key={s} size={s}>Heading {s}</Heading>
            ))}
          </Stack>
        </Section>

        <Section title="Typography — Text & Inline">
          <Stack gap={2}>
            <Text fontSize="lg">Large text example</Text>
            <Text fontSize="md">Medium text example</Text>
            <Text fontSize="sm" color="gray.500">Small muted text</Text>
            <Text><Strong>Bold text</Strong> and <Em>italic text</Em></Text>
            <Text>
              <Mark bg="yellow.200" px={1}>Highlighted text</Mark> in a sentence
            </Text>
            <Code px={2} py={1}>const x = 42</Code>
            <Text>Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open</Text>
          </Stack>
        </Section>

        {/* ── LAYOUT HELPERS ───────────────────────────────────────────── */}
        <Section title="Layout — Stack & Grid">
          <HStack gap={2} bg="gray.50" p={4} borderRadius="md">
            {["A", "B", "C"].map((l) => (
              <Box key={l} bg="blue.100" p={3} borderRadius="sm" fontWeight="bold">{l}</Box>
            ))}
          </HStack>
          <SimpleGrid columns={3} gap={2} w="200px">
            {Array.from({ length: 6 }).map((_, i) => (
              <Box key={i} bg="teal.100" p={3} borderRadius="sm" textAlign="center">{i + 1}</Box>
            ))}
          </SimpleGrid>
        </Section>

        {/* ── SEPARATOR ────────────────────────────────────────────────── */}
        <Section title="Separator">
          <Box w="300px">
            <Separator />
            <HStack mt={4} gap={4}>
              <Box flex={1}><Separator /></Box>
              <Text fontSize="sm" color="gray.400">OR</Text>
              <Box flex={1}><Separator /></Box>
            </HStack>
          </Box>
        </Section>

        {/* ── CLOSE BUTTON ─────────────────────────────────────────────── */}
        <Section title="Close Button — Sizes">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <CloseButton key={s} size={s} />
          ))}
        </Section>

        {/* ── IMAGE ────────────────────────────────────────────────────── */}
        <Section title="Image">
          <Image
            src="https://bit.ly/2Z4KKcF"
            alt="Sample"
            borderRadius="md"
            boxSize="120px"
            objectFit="cover"
          />
          <Image
            src="https://bit.ly/2Z4KKcF"
            alt="Rounded"
            borderRadius="full"
            boxSize="80px"
            objectFit="cover"
          />
        </Section>

        {/* ── LINK ─────────────────────────────────────────────────────── */}
        <Section title="Link">
          <Link href="#" colorPalette="blue">Default link</Link>
          <Link href="#" colorPalette="blue" variant="underline">Underline link</Link>
          <Link href="#" colorPalette="blue" variant="plain">Plain link</Link>
        </Section>

      </Box>
    </ChakraProvider>
  );
}
