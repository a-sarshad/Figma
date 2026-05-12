import React, { useState } from "react";
import {
  Box,
  HStack,
  Stack,
  Wrap,
  Text,
  Button,
  IconButton,
  Input,
  Avatar,
  Badge,
  Separator,
  Tooltip,
  Dialog,
  Drawer,
  Popover,
  Menu,
  HoverCard,
  Portal,
  Field,
} from "@chakra-ui/react";
import {
  Settings,
  User,
  CreditCard,
  LogOut,
  Edit,
  Copy,
  Trash2,
  Share2,
  ChevronDown,
  ExternalLink,
  MoreHorizontal,
  Check,
} from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { useDirection } from "../../context/DirectionContext";

// ─── Tooltip ──────────────────────────────────────────────────────────────────
export function TooltipSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="tooltip"
      title="Tooltip"
      description="Contextual information displayed on hover."
    >
      <Frame title="Placements">
        <Wrap gap={3} align="center">
          {(["top", "bottom", "start", "end"] as const).map((placement) => {
            const physicalPlacement = isRtl
              ? placement === "start" ? "right"
              : placement === "end"   ? "left"
              : placement
              : placement === "start" ? "left"
              : placement === "end"   ? "right"
              : placement;
            return (
              <Tooltip.Root key={placement} positioning={{ placement: physicalPlacement as any }}>
                <Tooltip.Trigger asChild>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    {placement}
                  </Button>
                </Tooltip.Trigger>
                <Portal>
                  <Tooltip.Positioner>
                    <Tooltip.Content>
                      {isRtl ? `ابزارک ${placement}` : `Tooltip on ${placement}`}
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Portal>
              </Tooltip.Root>
            );
          })}
        </Wrap>
      </Frame>

      <Frame title="Default">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Button colorPalette="blue">
              {isRtl ? "روی من نگه دار" : "Hover me"}
            </Button>
          </Tooltip.Trigger>
          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Content>
                {isRtl ? "این یک ابزارک است" : "This is a tooltip"}
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Dialog ───────────────────────────────────────────────────────────────────
export function DialogSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggle = (key: string, val: boolean) =>
    setOpenMap((p) => ({ ...p, [key]: val }));

  return (
    <ComponentSection
      id="dialog"
      title="Dialog"
      description="Modal dialog with sizes, scroll behavior and alert variant."
    >
      {/* Sizes */}
      <Frame title="Sizes">
        <Wrap gap={3}>
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <Box key={size}>
              <Button
                size="sm"
                variant="outline"
                colorPalette="blue"
                onClick={() => toggle(`size-${size}`, true)}
              >
                {size}
              </Button>
              <Dialog.Root
                open={openMap[`size-${size}`]}
                onOpenChange={(e) => toggle(`size-${size}`, e.open)}
                size={size}
              >
                <Portal>
                  <Dialog.Backdrop />
                  <Dialog.Positioner>
                    <Dialog.Content>
                      <Dialog.Header>
                        <Dialog.Title>
                          {isRtl ? `دیالوگ — اندازه ${size}` : `Dialog — size ${size}`}
                        </Dialog.Title>
                      </Dialog.Header>
                      <Dialog.Body>
                        <Text fontSize="sm" color="fg.muted">
                          {isRtl
                            ? "این محتوای دیالوگ است. می‌توانید هر محتوایی را اینجا قرار دهید."
                            : "This is the dialog body. Place any content here."}
                        </Text>
                      </Dialog.Body>
                      <Dialog.Footer>
                        <Button variant="ghost" onClick={() => toggle(`size-${size}`, false)}>
                          {isRtl ? "انصراف" : "Cancel"}
                        </Button>
                        <Button colorPalette="blue" onClick={() => toggle(`size-${size}`, false)}>
                          {isRtl ? "تایید" : "Confirm"}
                        </Button>
                      </Dialog.Footer>
                      <Dialog.CloseTrigger />
                    </Dialog.Content>
                  </Dialog.Positioner>
                </Portal>
              </Dialog.Root>
            </Box>
          ))}
        </Wrap>
      </Frame>

      {/* Alert / Destructive */}
      <Frame title="Destructive (Alert)">
        <Button
          colorPalette="red"
          variant="outline"
          onClick={() => toggle("alert", true)}
        >
          {isRtl ? "حذف آیتم" : "Delete item"}
        </Button>
        <Dialog.Root
          open={openMap["alert"]}
          onOpenChange={(e) => toggle("alert", e.open)}
          role="alertdialog"
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    {isRtl ? "آیا مطمئن هستید؟" : "Are you sure?"}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Text fontSize="sm" color="fg.muted">
                    {isRtl
                      ? "این عملیات قابل بازگشت نیست. آیا می‌خواهید ادامه دهید؟"
                      : "This action cannot be undone. Do you want to proceed?"}
                  </Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="ghost" onClick={() => toggle("alert", false)}>
                    {isRtl ? "انصراف" : "Cancel"}
                  </Button>
                  <Button colorPalette="red" onClick={() => toggle("alert", false)}>
                    {isRtl ? "حذف" : "Delete"}
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger />
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Frame>

      {/* With Form */}
      <Frame title="With Form">
        <Button
          colorPalette="teal"
          onClick={() => toggle("form", true)}
        >
          {isRtl ? "ویرایش پروفایل" : "Edit profile"}
        </Button>
        <Dialog.Root
          open={openMap["form"]}
          onOpenChange={(e) => toggle("form", e.open)}
        >
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>
                    {isRtl ? "ویرایش پروفایل" : "Edit Profile"}
                  </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <Stack gap={4}>
                    <Field.Root>
                      <Field.Label>{isRtl ? "نام" : "Name"}</Field.Label>
                      <Input placeholder={isRtl ? "نام خود را وارد کنید" : "Enter your name"} />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label>{isRtl ? "ایمیل" : "Email"}</Field.Label>
                      <Input dir="ltr" type="email" placeholder="email@example.com" />
                    </Field.Root>
                  </Stack>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="ghost" onClick={() => toggle("form", false)}>
                    {isRtl ? "انصراف" : "Cancel"}
                  </Button>
                  <Button colorPalette="blue" onClick={() => toggle("form", false)}>
                    {isRtl ? "ذخیره" : "Save"}
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger />
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Drawer ───────────────────────────────────────────────────────────────────
export function DrawerSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggle = (key: string, val: boolean) =>
    setOpenMap((p) => ({ ...p, [key]: val }));

  return (
    <ComponentSection
      id="drawer"
      title="Drawer"
      description="Slide-in panel from screen edges with logical placement."
    >
      {/* Placements */}
      <Frame title="Placements">
        <Wrap gap={3}>
          {(["start", "end", "top", "bottom"] as const).map((placement) => (
            <Box key={placement}>
              <Button
                size="sm"
                variant="outline"
                colorPalette="blue"
                onClick={() => toggle(`pl-${placement}`, true)}
              >
                {placement}
              </Button>
              <Drawer.Root
                open={openMap[`pl-${placement}`]}
                onOpenChange={(e) => toggle(`pl-${placement}`, e.open)}
                placement={placement}
              >
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>
                          {isRtl ? `کشو — ${placement}` : `Drawer — ${placement}`}
                        </Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Text fontSize="sm" color="fg.muted">
                          {isRtl
                            ? "محتوای کشو در اینجا قرار می‌گیرد."
                            : "Drawer content goes here."}
                        </Text>
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Button variant="ghost" onClick={() => toggle(`pl-${placement}`, false)}>
                          {isRtl ? "بستن" : "Close"}
                        </Button>
                        <Button colorPalette="blue" onClick={() => toggle(`pl-${placement}`, false)}>
                          {isRtl ? "ذخیره" : "Save"}
                        </Button>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger />
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </Box>
          ))}
        </Wrap>
      </Frame>

      {/* Sizes */}
      <Frame title="Sizes">
        <Wrap gap={3}>
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <Box key={size}>
              <Button
                size="sm"
                variant="outline"
                colorPalette="teal"
                onClick={() => toggle(`sz-${size}`, true)}
              >
                {size}
              </Button>
              <Drawer.Root
                open={openMap[`sz-${size}`]}
                onOpenChange={(e) => toggle(`sz-${size}`, e.open)}
                size={size}
                placement="end"
              >
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title>
                          {isRtl ? `اندازه ${size}` : `Size ${size}`}
                        </Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Stack gap={3}>
                          <Field.Root>
                            <Field.Label>{isRtl ? "نام" : "Name"}</Field.Label>
                            <Input placeholder={isRtl ? "نام خود را وارد کنید" : "Enter name"} />
                          </Field.Root>
                          <Field.Root>
                            <Field.Label>{isRtl ? "ایمیل" : "Email"}</Field.Label>
                            <Input dir="ltr" placeholder="email@example.com" />
                          </Field.Root>
                        </Stack>
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Button variant="ghost" onClick={() => toggle(`sz-${size}`, false)}>
                          {isRtl ? "انصراف" : "Cancel"}
                        </Button>
                        <Button colorPalette="blue" onClick={() => toggle(`sz-${size}`, false)}>
                          {isRtl ? "ذخیره" : "Save"}
                        </Button>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger />
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
            </Box>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Popover ──────────────────────────────────────────────────────────────────
export function PopoverSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="popover"
      title="Popover"
      description="Floating content panel with various placements and content types."
    >
      <Frame title="Basic">
        <Wrap gap={4} align="center">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button size="sm" variant="outline" colorPalette="blue">
                {isRtl ? "باز کن" : "Open"}
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow>
                    <Popover.ArrowTip borderColor="border" />
                  </Popover.Arrow>
                  <Popover.Header>
                    <Popover.Title>
                      {isRtl ? "عنوان پاپ‌اور" : "Popover Title"}
                    </Popover.Title>
                  </Popover.Header>
                  <Popover.Body>
                    <Text fontSize="sm">
                      {isRtl
                        ? "این محتوای ��اپ‌اور است."
                        : "This is the popover body content."}
                    </Text>
                  </Popover.Body>
                  <Popover.Footer>
                    <HStack gap={2} justify="flex-end">
                      <Popover.CloseTrigger asChild>
                        <Button variant="ghost" size="sm">{isRtl ? "بستن" : "Close"}</Button>
                      </Popover.CloseTrigger>
                      <Button colorPalette="blue" size="sm">{isRtl ? "اعمال" : "Apply"}</Button>
                    </HStack>
                  </Popover.Footer>
                  <Popover.CloseTrigger />
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Wrap>
      </Frame>

      <Frame title="Placements">
        <Wrap gap={3} align="center">
          {(["top", "bottom", "start", "end"] as const).map((placement) => {
            // Portal renders outside dir="rtl" container → Floating UI treats start/end as LTR.
            // Fix: map logical → physical based on current direction.
            const physicalPlacement = isRtl
              ? placement === "start" ? "right"
              : placement === "end"   ? "left"
              : placement
              : placement === "start" ? "left"
              : placement === "end"   ? "right"
              : placement;
            return (
              <Popover.Root key={placement} positioning={{ placement: physicalPlacement as any }}>
                <Popover.Trigger asChild>
                  <Button size="sm" variant="outline" colorPalette="gray">
                    {placement}
                  </Button>
                </Popover.Trigger>
                <Portal>
                  <Popover.Positioner>
                    <Popover.Content maxW="200px">
                      <Popover.Arrow>
                        <Popover.ArrowTip borderColor="border" />
                      </Popover.Arrow>
                      <Popover.Body>
                        <Text fontSize="sm">
                          {isRtl ? `پاپ‌اور ${placement}` : `Popover on ${placement}`}
                        </Text>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            );
          })}
        </Wrap>
      </Frame>

      <Frame title="With Form">
        <Popover.Root>
          <Popover.Trigger asChild>
            <Button size="sm" colorPalette="teal">
              <Edit size={14} />
              {isRtl ? "ویرایش" : "Edit"}
            </Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Arrow>
                  <Popover.ArrowTip borderColor="border" />
                </Popover.Arrow>
                <Popover.Header>
                  <Popover.Title>{isRtl ? "ویرایش پروفایل" : "Edit Profile"}</Popover.Title>
                </Popover.Header>
                <Popover.Body>
                  <Stack gap={3}>
                    <Field.Root>
                      <Field.Label fontSize="sm">{isRtl ? "نام" : "Name"}</Field.Label>
                      <Input size="sm" placeholder={isRtl ? "نام خود را وارد کنید" : "Enter name"} />
                    </Field.Root>
                    <Field.Root>
                      <Field.Label fontSize="sm">{isRtl ? "ایمیل" : "Email"}</Field.Label>
                      <Input size="sm" dir="ltr" placeholder="email@example.com" />
                    </Field.Root>
                  </Stack>
                </Popover.Body>
                <Popover.Footer>
                    <HStack gap={2} justify="flex-end">
                      <Popover.CloseTrigger asChild>
                        <Button variant="ghost" size="sm">{isRtl ? "انصراف" : "Cancel"}</Button>
                      </Popover.CloseTrigger>
                      <Button colorPalette="blue" size="sm">{isRtl ? "ذخیره" : "Save"}</Button>
                    </HStack>
                  </Popover.Footer>
                  <Popover.CloseTrigger />
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────
export function MenuSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="menu"
      title="Menu"
      description="Dropdown menu with groups, icons, checkmarks and keyboard navigation."
    >
      <Frame title="Basic">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" colorPalette="gray" size="sm">
              {isRtl ? "منو" : "Menu"} <ChevronDown size={14} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">
                  <User size={14} />
                  {isRtl ? "پروفایل" : "Profile"}
                </Menu.Item>
                <Menu.Item value="settings">
                  <Settings size={14} />
                  {isRtl ? "تنظیمات" : "Settings"}
                </Menu.Item>
                <Menu.Item value="billing">
                  <CreditCard size={14} />
                  {isRtl ? "پرداخت" : "Billing"}
                </Menu.Item>
                <Menu.Separator borderColor="border" />
                <Menu.Item value="logout" color="red.500">
                  <LogOut size={14} />
                  {isRtl ? "خروج" : "Sign out"}
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Frame>

      <Frame title="With Groups">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" colorPalette="blue" size="sm">
              {isRtl ? "گروه‌بندی" : "Grouped"} <ChevronDown size={14} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel>
                    {isRtl ? "حساب کاربری" : "Account"}
                  </Menu.ItemGroupLabel>
                  <Menu.Item value="profile">
                    <User size={14} />
                    {isRtl ? "پروفایل" : "Profile"}
                  </Menu.Item>
                  <Menu.Item value="settings">
                    <Settings size={14} />
                    {isRtl ? "تنظیمات" : "Settings"}
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Separator borderColor="border" />
                <Menu.ItemGroup>
                  <Menu.ItemGroupLabel>
                    {isRtl ? "محتوا" : "Content"}
                  </Menu.ItemGroupLabel>
                  <Menu.Item value="edit">
                    <Edit size={14} />
                    {isRtl ? "ویرایش" : "Edit"}
                  </Menu.Item>
                  <Menu.Item value="duplicate">
                    <Copy size={14} />
                    {isRtl ? "کپی" : "Duplicate"}
                  </Menu.Item>
                  <Menu.Item value="share">
                    <Share2 size={14} />
                    {isRtl ? "اشتراک‌گذاری" : "Share"}
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Separator borderColor="border" />
                <Menu.Item value="delete" color="red.500">
                  <Trash2 size={14} />
                  {isRtl ? "حذف" : "Delete"}
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Frame>

      <Frame title="Context Menu (3-dot trigger)">
        <Menu.Root>
          <Menu.Trigger asChild>
            <IconButton
              size="sm"
              variant="ghost"
              colorPalette="gray"
              aria-label="More options"
            >
              <MoreHorizontal size={16} />
            </IconButton>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="edit">
                  <Edit size={14} />
                  {isRtl ? "ویرایش" : "Edit"}
                </Menu.Item>
                <Menu.Item value="copy">
                  <Copy size={14} />
                  {isRtl ? "کپی" : "Copy"}
                </Menu.Item>
                <Menu.Item value="share">
                  <Share2 size={14} />
                  {isRtl ? "اشتراک" : "Share"}
                </Menu.Item>
                <Menu.Separator borderColor="border" />
                <Menu.Item value="delete" color="red.500">
                  <Trash2 size={14} />
                  {isRtl ? "حذف" : "Delete"}
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Frame>

      <Frame title="With Checkmarks">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" colorPalette="teal" size="sm">
              {isRtl ? "فیلتر" : "Filter"} <ChevronDown size={14} />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {[
                  { label: isRtl ? "گزینه الف" : "Option A", checked: true },
                  { label: isRtl ? "گزینه ب" : "Option B", checked: false },
                  { label: isRtl ? "گزینه ج" : "Option C", checked: true },
                  { label: isRtl ? "گزینه د" : "Option D", checked: false },
                ].map(({ label, checked }) => (
                  <Menu.Item key={label} value={label}>
                    <Box w={4}>
                      {checked && <Check size={12} />}
                    </Box>
                    {label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── HoverCard ────────────────────────────────────────────────────────────────
export function HoverCardSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="hover-card"
      title="HoverCard"
      description="Rich preview card shown on hover, ideal for user profiles and link previews."
    >
      <Frame title="User Profile Preview">
        <Wrap gap={6} align="center">
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Button variant="ghost" colorPalette="blue" size="sm">
                @ali_rezaei
              </Button>
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content maxW="280px">
                  <HoverCard.Arrow />
                  <HStack gap={3} mb={3}>
                    <Avatar.Root size="md" colorPalette="blue">
                      <Avatar.Fallback name="Ali Rezaei" />
                    </Avatar.Root>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        {isRtl ? "علی رضایی" : "Ali Rezaei"}
                      </Text>
                      <Text fontSize="xs" color="fg.muted">@ali_rezaei</Text>
                    </Box>
                  </HStack>
                  <Text fontSize="sm" color="fg.muted" mb={3}>
                    {isRtl
                      ? "توسعه‌دهنده فرانت‌اند. علاقه‌مند به طراحی UI و تجربه کاربری."
                      : "Frontend developer. Passionate about UI design and user experience."}
                  </Text>
                  <HStack gap={4}>
                    <Box textAlign="center">
                      <Text fontWeight="bold" fontSize="sm">128</Text>
                      <Text fontSize="xs" color="fg.muted">
                        {isRtl ? "دنبال‌کننده" : "Following"}
                      </Text>
                    </Box>
                    <Box textAlign="center">
                      <Text fontWeight="bold" fontSize="sm">2.4k</Text>
                      <Text fontSize="xs" color="fg.muted">
                        {isRtl ? "دنبال‌شونده" : "Followers"}
                      </Text>
                    </Box>
                  </HStack>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
        </Wrap>
      </Frame>

      <Frame title="Link Preview">
        <Wrap gap={4} align="center">
          <HoverCard.Root>
            <HoverCard.Trigger asChild>
              <Button
                variant="ghost"
                colorPalette="blue"
                size="sm"
                textDecoration="underline"
              >
                <ExternalLink size={12} />
                chakra-ui.com
              </Button>
            </HoverCard.Trigger>
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content maxW="300px">
                  <HoverCard.Arrow />
                  <Box mb={2}>
                    <Badge colorPalette="teal" size="sm" mb={2}>
                      {isRtl ? "وب‌سایت" : "Website"}
                    </Badge>
                    <Text fontWeight="semibold" fontSize="sm">Chakra UI</Text>
                    <Text fontSize="xs" color="fg.muted" dir="ltr">
                      https://chakra-ui.com
                    </Text>
                  </Box>
                  <Separator mb={2} />
                  <Text fontSize="sm" color="fg.muted">
                    {isRtl
                      ? "کتابخانه کامپوننت‌های React با پشتیبانی از RTL و تم‌بندی."
                      : "A simple, modular and accessible component library for React."}
                  </Text>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal>
          </HoverCard.Root>
        </Wrap>
      </Frame>

      <Frame title="Placements">
        <Wrap gap={3}>
          {(["top", "bottom", "start", "end"] as const).map((placement) => (
            <HoverCard.Root key={placement} positioning={{ placement }}>
              <HoverCard.Trigger asChild>
                <Button size="sm" variant="outline" colorPalette="gray">
                  {placement}
                </Button>
              </HoverCard.Trigger>
              <Portal>
                <HoverCard.Positioner>
                  <HoverCard.Content maxW="180px">
                    <HoverCard.Arrow />
                    <Text fontSize="sm">
                      {isRtl ? `پیش‌نمایش ${placement}` : `Preview on ${placement}`}
                    </Text>
                  </HoverCard.Content>
                </HoverCard.Positioner>
              </Portal>
            </HoverCard.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}