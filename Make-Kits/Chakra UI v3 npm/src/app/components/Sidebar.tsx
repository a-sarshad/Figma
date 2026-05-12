import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  HStack,
  SegmentGroup,
} from "@chakra-ui/react";
import { Sun, Moon, AlignLeft, AlignRight } from "lucide-react";

export type Direction = "ltr" | "rtl";
export type ColorMode = "light" | "dark";

interface NavItem {
  id: string;
  label: string;
}
interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "FOUNDATIONS",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
      { id: "spacing", label: "Spacing & Sizing" },
    ],
  },
  {
    label: "CORE",
    items: [
      { id: "button", label: "Button" },
      { id: "badge", label: "Badge" },
      { id: "tag", label: "Tag" },
      { id: "avatar", label: "Avatar" },
      { id: "card", label: "Card" },
      { id: "alert", label: "Alert" },
      { id: "stat", label: "Stat" },
    ],
  },
  {
    label: "FORMS",
    items: [
      { id: "input", label: "Input & Field" },
      { id: "textarea", label: "Textarea" },
      { id: "select", label: "Select" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "switch", label: "Switch" },
      { id: "slider", label: "Slider" },
      { id: "number-input", label: "Number Input" },
      { id: "pin-input", label: "Pin Input" },
      { id: "rating", label: "Rating" },
      { id: "file-upload", label: "File Upload" },
      { id: "color-picker", label: "Color Picker" },
      { id: "password-input", label: "Password Input" },
      { id: "calendar", label: "Calendar" },
      { id: "date-picker", label: "Date Picker" },
    ],
  },
  {
    label: "NAVIGATION",
    items: [
      { id: "tabs", label: "Tabs" },
      { id: "breadcrumb", label: "Breadcrumb" },
      { id: "accordion", label: "Accordion" },
      { id: "segmented", label: "Segmented Control" },
      { id: "steps", label: "Steps" },
      { id: "pagination", label: "Pagination" },
    ],
  },
  {
    label: "DATA DISPLAY",
    items: [
      { id: "table", label: "Table" },
      { id: "list", label: "List" },
      { id: "progress", label: "Progress" },
      { id: "spinner", label: "Spinner" },
      { id: "skeleton", label: "Skeleton" },
      { id: "color-swatch", label: "Color Swatch" },
      { id: "qr-code", label: "QR Code" },
      { id: "timeline", label: "Timeline" },
      { id: "data-list", label: "Data List" },
      { id: "empty-state", label: "Empty State" },
      { id: "tree-view", label: "Tree View" },
    ],
  },
  {
    label: "OVERLAYS",
    items: [
      { id: "tooltip", label: "Tooltip" },
      { id: "dialog", label: "Dialog" },
      { id: "drawer", label: "Drawer" },
      { id: "popover", label: "Popover" },
      { id: "menu", label: "Menu" },
      { id: "hover-card", label: "Hover Card" },
      { id: "toast", label: "Toast" },
    ],
  },
  {
    label: "UTILITIES",
    items: [
      { id: "layout", label: "Layout" },
      { id: "separator", label: "Separator" },
      { id: "image", label: "Image" },
      { id: "link", label: "Link" },
      { id: "close-button", label: "Close Button" },
    ],
  },
];

interface SidebarProps {
  dir: Direction;
  colorMode: ColorMode;
  setDir: (d: Direction) => void;
  setColorMode: (m: ColorMode) => void;
  activeSection: string;
  onNavClick: (id: string) => void;
}

export function Sidebar({
  dir,
  colorMode,
  setDir,
  setColorMode,
  activeSection,
  onNavClick,
}: SidebarProps) {
  return (
    <Box
      dir="ltr"
      w="220px"
      flexShrink={0}
      h="100vh"
      overflowY="auto"
      borderEndWidth="1px"
      borderColor="border"
      bg="bg.subtle"
      display="flex"
      flexDirection="column"
    >
      {/* ── Header: Logo + Toggles ────────────────────────────────────── */}
      <Box px={4} pt={4} pb={3} borderBottomWidth="1px" borderColor="border">
        {/* Logo */}
        <HStack gap={2} mb={4} align="center">
          <Flex
            w="28px"
            h="28px"
            bg="teal.400"
            borderRadius="md"
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Text color="white" fontSize="xs" fontWeight="bold" lineHeight={1}>
              C
            </Text>
          </Flex>
          <Heading size="sm" fontWeight="semibold" lineHeight={1}>
            Chakra UI v3
          </Heading>
          <Badge colorPalette="teal" variant="subtle" size="sm">
            v3.0
          </Badge>
        </HStack>

        {/* Light / Dark */}
        <SegmentGroup.Root
          key={`colormode-${dir}`}
          size="sm"
          value={colorMode}
          onValueChange={(e) => setColorMode(e.value as ColorMode)}
          width="100%"
          mb={2}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Item value="light" flex="1">
            <HStack gap={1} justify="center" w="100%" py={1}>
              <Sun size={12} color="#D97706" />
              <span style={{ fontSize: "12px" }}>Light</span>
            </HStack>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
          <SegmentGroup.Item value="dark" flex="1">
            <HStack gap={1} justify="center" w="100%" py={1}>
              <Moon size={12} color="#7C3AED" />
              <span style={{ fontSize: "12px" }}>Dark</span>
            </HStack>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        </SegmentGroup.Root>

        {/* LTR / RTL */}
        <SegmentGroup.Root
          key={`dir-${dir}`}
          size="sm"
          value={dir}
          onValueChange={(e) => setDir(e.value as Direction)}
          width="100%"
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Item value="ltr" flex="1">
            <HStack gap={1} justify="center" w="100%" py={1}>
              <AlignLeft size={12} color="#0D9488" />
              <span style={{ fontSize: "12px" }}>LTR</span>
            </HStack>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
          <SegmentGroup.Item value="rtl" flex="1">
            <HStack gap={1} justify="center" w="100%" py={1}>
              <AlignRight size={12} color="#0D9488" />
              <span style={{ fontSize: "12px" }}>RTL</span>
            </HStack>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        </SegmentGroup.Root>
      </Box>

      {/* ── Navigation ───────────────────────────────────────────────── */}
      <Box dir={dir} flex="1" py={3} overflowY="auto" overscrollBehavior="contain">
        {navGroups.map((group, gi) => (
          <Box key={group.label} mb={2} mt={gi === 0 ? 0 : 5}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              color="teal.500"
              _dark={{ color: "teal.300" }}
              letterSpacing="wider"
              px={4}
              mb={1.5}
              textAlign="start"
            >
              {group.label}
            </Text>
            {group.items.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Box
                  key={item.id}
                  px={3}
                  py={1.5}
                  mx={2}
                  borderRadius="md"
                  cursor="pointer"
                  bg={isActive ? "teal.50" : "transparent"}
                  color={isActive ? "teal.700" : "fg"}
                  _dark={{
                    bg: isActive ? "teal.900" : "transparent",
                    color: isActive ? "teal.300" : "fg",
                  }}
                  _hover={{
                    bg: isActive ? "teal.50" : "bg.muted",
                    _dark: { bg: isActive ? "teal.900" : "bg.muted" },
                  }}
                  onClick={() => onNavClick(item.id)}
                  transition="background 0.15s"
                >
                  <Text
                    fontSize="sm"
                    fontWeight={isActive ? "medium" : "normal"}
                    textAlign="start"
                  >
                    {item.label}
                  </Text>
                </Box>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
}