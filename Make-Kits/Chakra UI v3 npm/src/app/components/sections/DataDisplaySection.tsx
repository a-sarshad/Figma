import {
  Box,
  HStack,
  Stack,
  Wrap,
  Text,
  Table,
  List,
  Progress,
  ProgressCircle,
  Spinner,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  ColorSwatch,
  QrCode,
  Timeline,
  DataList,
  EmptyState,
  VStack,
  Badge,
  Separator,
} from "@chakra-ui/react";
import { Frame, ComponentSection } from "../ui/Frame";
import { useDirection } from "../../context/DirectionContext";
import { Inbox, SearchX, FolderOpen, BellOff, MessageSquare } from "lucide-react";

// ─── Table ────────────────────────────────────────────────────────────────────
export function TableSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const headers = isRtl ? ["نام", "نقش", "وضعیت"] : ["Name", "Role", "Status"];
  const rows = isRtl
    ? [
        ["علی", "مدیر", "فعال"],
        ["سارا", "ویرایشگر", "غیرفعال"],
        ["نیما", "بیننده", "فعال"],
      ]
    : [
        ["Ali", "Admin", "Active"],
        ["Sara", "Editor", "Inactive"],
        ["Nima", "Viewer", "Active"],
      ];

  return (
    <ComponentSection
      id="table"
      title="Table"
      description="Data tables with variants, striping, and column headers."
    >
      {(["line", "outline", "plain"] as const).map((v) => (
        <Frame key={v} title={`Variant: ${v}`}>
          <Table.Root variant={v} size="sm">
            <Table.Header>
              <Table.Row borderColor="border">
                {headers.map((h) => (
                  <Table.ColumnHeader key={h} borderColor="border">{h}</Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map(([n, r, s]) => (
                <Table.Row key={n} borderColor="border">
                  <Table.Cell borderColor="border">{n}</Table.Cell>
                  <Table.Cell borderColor="border">{r}</Table.Cell>
                  <Table.Cell borderColor="border">{s}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Frame>
      ))}
    </ComponentSection>
  );
}

// ─── List ──────────────────────────────────────────────────────────────────────
export function ListSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const ul = isRtl
    ? ["آیتم اول", "آیتم دوم", "آیتم سوم"]
    : ["Unordered item one", "Unordered item two", "Unordered item three"];
  const ol = isRtl
    ? ["آیتم مرتب اول", "آیتم مرتب دوم", "آیتم مرتب سوم"]
    : ["Ordered item one", "Ordered item two", "Ordered item three"];

  return (
    <ComponentSection id="list" title="List" description="Ordered and unordered lists.">
      <Frame title="Unordered & Ordered">
        <Wrap gap={8} align="flex-start">
          <List.Root as="ul">
            {ul.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List.Root>
          <List.Root as="ol" {...(isRtl ? { listStyleType: "persian" } : {})}>
            {ol.map((item) => (
              <List.Item key={item}>{item}</List.Item>
            ))}
          </List.Root>
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Progress ─────────────────────────────────────────────────────────────────
export function ProgressSection() {
  return (
    <ComponentSection
      id="progress"
      title="Progress"
      description="Linear and circular progress indicators."
    >
      <Frame title="Linear Progress">
        <Stack gap={5} maxW="280px">
          {[
            { value: 60, color: "blue", size: "md" as const, label: "60%" },
            { value: 80, color: "green", size: "sm" as const, label: "80% (sm)" },
            { value: 40, color: "orange", size: "lg" as const, label: "40% (lg)" },
            { value: null, color: "purple", size: "md" as const, label: "Indeterminate" },
          ].map(({ value, color, size, label }) => (
            <Box key={label}>
              <Text fontSize="xs" color="fg.muted" mb={1}>{label}</Text>
              <Progress.Root value={value} colorPalette={color} size={size}>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </Box>
          ))}
        </Stack>
      </Frame>

      <Frame title="Circular Progress">
        <Wrap gap={6} align="center">
          {[
            { value: 60, color: "blue", size: "md" as const },
            { value: 80, color: "green", size: "lg" as const },
            { value: 30, color: "red", size: "sm" as const },
            { value: null, color: "orange", size: "md" as const },
          ].map(({ value, color, size }, i) => (
            <ProgressCircle.Root key={i} value={value} colorPalette={color} size={size}>
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
              </ProgressCircle.Circle>
            </ProgressCircle.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Spinner ───────────────────────────────────────────────────────────────────
export function SpinnerSection() {
  return (
    <ComponentSection
      id="spinner"
      title="Spinner"
      description="Loading indicator with sizes and color palettes."
    >
      <Frame title="Sizes">
        <Wrap gap={4} align="center">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Box key={s} textAlign="center">
              <Spinner size={s} colorPalette="blue" />
              <Text fontSize="xs" color="fg.muted" mt={1}>{s}</Text>
            </Box>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={4} align="center">
          {(["blue", "green", "red", "orange", "purple", "teal"] as const).map((c) => (
            <Spinner key={c} colorPalette={c} />
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────────────────
export function SkeletonSection() {
  return (
    <ComponentSection
      id="skeleton"
      title="Skeleton"
      description="Placeholder loading state for content."
    >
      <Frame title="Variants">
        <Stack gap={4} maxW="260px">
          <Skeleton h="20px" borderRadius="md" />
          <SkeletonText noOfLines={3} gap={2} />
          <HStack>
            <SkeletonCircle size="40px" />
            <SkeletonText noOfLines={2} gap={2} flex={1} />
          </HStack>
          <Skeleton h="80px" borderRadius="md" />
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Color Swatch ──────────────────────────────────────────────────────────────
export function ColorSwatchSection() {
  return (
    <ComponentSection
      id="color-swatch"
      title="Color Swatch"
      description="Visual color picker tiles for palette display."
    >
      <Frame title="Palette">
        <Wrap gap={2}>
          {(
            [
              "red.400",
              "orange.400",
              "yellow.400",
              "green.400",
              "teal.400",
              "blue.400",
              "cyan.400",
              "purple.400",
              "pink.400",
              "gray.400",
            ] as const
          ).map((c) => (
            <Box key={c} textAlign="center">
              <ColorSwatch value={c} boxSize={8} borderRadius="md" />
              <Text fontSize="8px" color="fg.muted" mt={0.5} maxW="40px" textAlign="center">
                {c}
              </Text>
            </Box>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}
// ─── QR Code ──────────────────────────────────────────────────────────────────
export function QrCodeSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="qr-code"
      title="QR Code"
      description="QR code generator with sizes, error correction levels and custom colors."
    >
      <Frame title="Sizes">
        <Wrap gap={6} align="flex-end">
          {(["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <Box key={s} textAlign="center">
              <QrCode.Root value="https://chakra-ui.com" size={s}>
                <QrCode.Frame>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
              <Text fontSize="xs" color="fg.muted" mt={1}>{s}</Text>
            </Box>
          ))}
        </Wrap>
      </Frame>

      <Frame title="With Logo Overlay">
        <Wrap gap={6}>
          <Box textAlign="center">
            <QrCode.Root value="https://chakra-ui.com" size="md">
              <QrCode.Frame>
                <QrCode.Pattern />
              </QrCode.Frame>
              <QrCode.Overlay>
                <Box
                  bg="white"
                  borderRadius="sm"
                  p={1}
                  boxSize={6}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box boxSize={4} bg="blue.500" borderRadius="xs" />
                </Box>
              </QrCode.Overlay>
            </QrCode.Root>
            <Text fontSize="xs" color="fg.muted" mt={1}>
              {isRtl ? "با لوگو" : "With logo"}
            </Text>
          </Box>
        </Wrap>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={4}>
          {(["gray", "red", "orange", "green", "teal", "blue", "purple", "pink"] as const).map((c) => (
            <Box key={c} textAlign="center">
              <QrCode.Root value="https://chakra-ui.com" size="sm" colorPalette={c}>
                <QrCode.Frame>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
              <Text fontSize="xs" color="fg.muted" mt={1}>{c}</Text>
            </Box>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Error Correction Levels">
        <Wrap gap={4}>
          {(["L", "M", "Q", "H"] as const).map((level) => (
            <Box key={level} textAlign="center">
              <QrCode.Root
                value="https://chakra-ui.com"
                size="sm"
              >
                <QrCode.Frame>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {level} — {
                  { L: "7%", M: "15%", Q: "25%", H: "30%" }[level]
                }
              </Text>
            </Box>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Use Cases">
        <Wrap gap={6} align="flex-start">
          {[
            {
              label: isRtl ? "لینک وب‌سایت" : "Website URL",
              value: "https://chakra-ui.com",
            },
            {
              label: isRtl ? "آدرس ایمیل" : "Email",
              value: "mailto:hello@example.com",
            },
            {
              label: isRtl ? "شماره تلفن" : "Phone",
              value: "tel:+49123456789",
            },
            {
              label: isRtl ? "متن ساده" : "Plain text",
              value: isRtl ? "سلام دنیا!" : "Hello World!",
            },
          ].map(({ label, value }) => (
            <Box key={label} textAlign="center">
              <QrCode.Root value={value} size="sm">
                <QrCode.Frame>
                  <QrCode.Pattern />
                </QrCode.Frame>
              </QrCode.Root>
              <Text fontSize="xs" color="fg.muted" mt={1} maxW="80px">
                {label}
              </Text>
            </Box>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Timeline ──────────────────────────────────────────────────────────────────
export function TimelineSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  const events = isRtl
    ? [
        { title: "ثبت‌نام کاربر", desc: "حساب جدید ایجاد شد", time: "۱۰ دقیقه پیش", color: "green" },
        { title: "سفارش داده شد", desc: "سفارش #۱۲۳۴ ثبت شد", time: "۲ ساعت پیش", color: "blue" },
        { title: "پرداخت انجام شد", desc: "مبلغ تأیید شد", time: "دیروز", color: "purple" },
        { title: "ارسال شد", desc: "بسته در راه است", time: "۳ روز پیش", color: "orange" },
        { title: "تحویل داده شد", desc: "سفارش دریافت شد", time: "هفته پیش", color: "gray" },
      ]
    : [
        { title: "User registered", desc: "New account created", time: "10 min ago", color: "green" },
        { title: "Order placed", desc: "Order #1234 submitted", time: "2 hours ago", color: "blue" },
        { title: "Payment confirmed", desc: "Amount verified", time: "Yesterday", color: "purple" },
        { title: "Shipped", desc: "Package on its way", time: "3 days ago", color: "orange" },
        { title: "Delivered", desc: "Order received", time: "Last week", color: "gray" },
      ];

  return (
    <ComponentSection
      id="timeline"
      title="Timeline"
      description="Vertical event timeline with indicators, content and connectors."
    >
      <Frame title="Basic Timeline">
        <Timeline.Root maxW="400px">
          {events.map((ev, i) => (
            <Timeline.Item key={i}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator
                  bg={`${ev.color}.500`}
                  color="white"
                  boxSize={3}
                />
              </Timeline.Connector>
              <Timeline.Content pb={i < events.length - 1 ? 6 : 0}>
                <Timeline.Title>
                  <HStack gap={2} justify="space-between" w="full">
                    <Text fontWeight="semibold" fontSize="sm">{ev.title}</Text>
                    <Text fontSize="xs" color="fg.muted">{ev.time}</Text>
                  </HStack>
                </Timeline.Title>
                <Timeline.Description>{ev.desc}</Timeline.Description>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </Frame>

      <Frame title="With Badges">
        <Timeline.Root maxW="360px">
          {[
            { label: isRtl ? "شرو شد" : "Started", badge: isRtl ? "موفق" : "Success", color: "green" },
            { label: isRtl ? "در حال اجرا" : "Running", badge: isRtl ? "در جریان" : "In Progress", color: "blue" },
            { label: isRtl ? "در انتظار" : "Pending", badge: isRtl ? "معلق" : "Pending", color: "orange" },
          ].map((item, i) => (
            <Timeline.Item key={i}>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator bg={`${item.color}.500`} boxSize={3} />
              </Timeline.Connector>
              <Timeline.Content pb={i < 2 ? 5 : 0}>
                <Timeline.Title>
                  <HStack gap={2}>
                    <Text fontSize="sm">{item.label}</Text>
                    <Badge colorPalette={item.color} size="sm">{item.badge}</Badge>
                  </HStack>
                </Timeline.Title>
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── DataList ──────────────────────────────────────────────────────────────────
export function DataListSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  const profileItems = isRtl
    ? [
        { label: "نام", value: "علی احمدی" },
        { label: "ایمیل", value: "ali@example.com" },
        { label: "نقش", value: "مدیر" },
        { label: "وضعیت", value: "فعال", badge: "green" },
        { label: "آخرین ورود", value: "۱۴۰۳/۰۲/۱۲" },
      ]
    : [
        { label: "Name", value: "Ali Ahmadi" },
        { label: "Email", value: "ali@example.com" },
        { label: "Role", value: "Admin" },
        { label: "Status", value: "Active", badge: "green" },
        { label: "Last Login", value: "2024-05-01" },
      ];

  return (
    <ComponentSection
      id="data-list"
      title="DataList"
      description="Key/value data display with optional dividers and badges."
    >
      <Frame title="Vertical (default)">
        <DataList.Root orientation="vertical" maxW="320px">
          {profileItems.map(({ label, value, badge }) => (
            <DataList.Item key={label}>
              <DataList.ItemLabel color="fg.muted" fontSize="xs">{label}</DataList.ItemLabel>
              <DataList.ItemValue>
                {badge ? (
                  <Badge colorPalette={badge} size="sm">{value}</Badge>
                ) : (
                  <Text fontSize="sm">{value}</Text>
                )}
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Frame>

      <Frame title="Horizontal">
        <DataList.Root orientation="horizontal" maxW="360px">
          {profileItems.slice(0, 3).map(({ label, value }) => (
            <DataList.Item key={label}>
              <DataList.ItemLabel color="fg.muted" fontSize="xs" minW="100px">{label}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Text fontSize="sm">{value}</Text>
              </DataList.ItemValue>
            </DataList.Item>
          ))}
        </DataList.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyStateSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="empty-state"
      title="Empty State"
      description="Placeholder screens for empty data with icons, titles, and CTAs."
    >
      <Frame title="Basic">
        <EmptyState.Root maxW="360px">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <Box
                w="48px"
                h="48px"
                bg="bg.subtle"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid"
                borderColor="border"
              >
                <Inbox size={22} />
              </Box>
            </EmptyState.Indicator>
            <VStack gap={1}>
              <EmptyState.Title>
                {isRtl ? "هیچ آیتمی یافت نشد" : "No items found"}
              </EmptyState.Title>
              <EmptyState.Description>
                {isRtl ? "برای شروع یک آیتم جدید اضافه کنید." : "Add a new item to get started."}
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Frame>

      <Frame title="With Actions">
        <EmptyState.Root maxW="360px">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <Box
                w="48px"
                h="48px"
                bg="blue.50"
                _dark={{ bg: "blue.900" }}
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <SearchX size={22} />
              </Box>
            </EmptyState.Indicator>
            <VStack gap={1}>
              <EmptyState.Title>
                {isRtl ? "نتیجه‌ای پیدا نشد" : "No results found"}
              </EmptyState.Title>
              <EmptyState.Description>
                {isRtl
                  ? "جستجوی خود را تغییر دهید یا فیلترها را پاک کنید."
                  : "Try adjusting your search or clear all filters."}
              </EmptyState.Description>
            </VStack>
            <EmptyState.Actions>
              <HStack gap={2}>
                <Box
                  as="button"
                  px={3}
                  py={1.5}
                  bg="blue.500"
                  color="white"
                  borderRadius="md"
                  fontSize="sm"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ bg: "blue.600" }}
                >
                  {isRtl ? "پاک کردن فیلترها" : "Clear filters"}
                </Box>
                <Box
                  as="button"
                  px={3}
                  py={1.5}
                  border="1px solid"
                  borderColor="border"
                  borderRadius="md"
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "bg.subtle" }}
                >
                  {isRtl ? "بازگشت" : "Go back"}
                </Box>
              </HStack>
            </EmptyState.Actions>
          </EmptyState.Content>
        </EmptyState.Root>
      </Frame>

      <Frame title="Variants">
        <Wrap gap={6} align="flex-start">
          {([
            { icon: <FolderOpen size={24} />, title: isRtl ? "پوشه خالی" : "Empty folder", desc: isRtl ? "فایلی وجود ندارد" : "No files here" },
            { icon: <BellOff size={24} />, title: isRtl ? "بدون اعلان" : "No notifications", desc: isRtl ? "همه خوانده شده" : "All caught up" },
            { icon: <MessageSquare size={24} />, title: isRtl ? "بدون پیام" : "No messages", desc: isRtl ? "صندوق خالی است" : "Inbox is empty" },
          ]).map(({ icon, title, desc }) => (
            <EmptyState.Root key={title} maxW="180px">
              <EmptyState.Content>
                <EmptyState.Indicator>
                  {icon}
                </EmptyState.Indicator>
                <VStack gap={1}>
                  <EmptyState.Title fontSize="sm">{title}</EmptyState.Title>
                  <EmptyState.Description fontSize="xs">{desc}</EmptyState.Description>
                </VStack>
              </EmptyState.Content>
            </EmptyState.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}