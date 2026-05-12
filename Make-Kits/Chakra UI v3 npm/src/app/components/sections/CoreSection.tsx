import React from "react";
import { useDirection } from "../../context/DirectionContext";
import {
  Box,
  HStack,
  VStack,
  Stack,
  Wrap,
  Text,
  Badge,
  Button,
  ButtonGroup,
  Avatar,
  AvatarGroup,
  Card,
  Stat,
  Alert,
  Tag,
} from "@chakra-ui/react";
import { Plus, Download, Settings, Check, Tag as TagIcon, User, ChevronDown } from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { toFarsi } from "../../lib/farsi";

// ─── Button ──────────────────────────────────────────────────────────────────
export function ButtonSection() {
  return (
    <ComponentSection
      id="button"
      title="Button"
      description="Interactive button component with variants, sizes, color palettes and states."
    >
      <Frame title="Variants">
        <Wrap gap={3}>
          {(["solid", "outline", "ghost", "subtle", "surface", "plain"] as const).map((v) => (
            <Button key={v} variant={v} colorPalette="teal">
              {v}
            </Button>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Sizes">
        <Wrap gap={3} align="center">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Button key={s} size={s} colorPalette="blue">
              Size {s}
            </Button>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={2}>
          {(["gray", "red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"] as const).map(
            (c) => (
              <Button key={c} colorPalette={c} size="sm">
                {c}
              </Button>
            )
          )}
        </Wrap>
      </Frame>

      <Frame title="With icons & states">
        <Wrap gap={3}>
          <Button colorPalette="teal">
            <Plus size={16} /> New Item
          </Button>
          <Button colorPalette="blue" variant="outline">
            <Download size={16} /> Download
          </Button>
          <Button colorPalette="gray" variant="ghost">
            <Settings size={16} />
          </Button>
          <Button colorPalette="red" variant="subtle" disabled>
            Disabled
          </Button>
          <Button colorPalette="teal" loading loadingText="Loading...">
            Loading
          </Button>
        </Wrap>
      </Frame>

      <Frame title="Button Group">
        <Stack gap={4} align="flex-start">
          <ButtonGroup>
            <Button key="save" colorPalette="blue">Save</Button>
            <Button key="cancel" colorPalette="blue" variant="outline">Cancel</Button>
          </ButtonGroup>
          <ButtonGroup variant="outline" colorPalette="gray">
            <Button key="left">Left</Button>
            <Button key="center">Center</Button>
            <Button key="right">Right</Button>
          </ButtonGroup>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Badge ───────────────────────────────────────────────────────────────────
export function BadgeSection() {
  return (
    <ComponentSection
      id="badge"
      title="Badge"
      description="Small status labels with color palettes and style variants."
    >
      <Frame title="Variants">
        <Wrap gap={3}>
          {(["solid", "outline", "subtle", "surface", "plain"] as const).map((v) => (
            <Badge key={v} variant={v} colorPalette="blue">
              {v}
            </Badge>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Sizes">
        <Wrap gap={3} align="center">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Badge key={s} size={s} colorPalette="teal" variant="solid">
              Size {s}
            </Badge>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={2}>
          {(["gray", "red", "orange", "green", "teal", "blue", "purple", "pink"] as const).map(
            (c) => (
              <Badge key={c} colorPalette={c}>
                {c}
              </Badge>
            )
          )}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
export function TagSection() {
  return (
    <ComponentSection
      id="tag"
      title="Tag"
      description="Compact labels with optional leading element and close trigger."
    >
      <Frame title="Variants with CloseTrigger">
        <Wrap gap={3}>
          {(["solid", "outline", "subtle", "surface"] as const).map((v) => (
            <Tag.Root key={v} variant={v} colorPalette="blue">
              <Tag.StartElement>
                <TagIcon size={12} />
              </Tag.StartElement>
              <Tag.Label>{v}</Tag.Label>
              <Tag.CloseTrigger />
            </Tag.Root>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Sizes">
        <Wrap gap={3}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Tag.Root key={s} size={s} colorPalette="teal">
              <Tag.StartElement>
                <Check size={12} />
              </Tag.StartElement>
              <Tag.Label>Size {s}</Tag.Label>
              <Tag.CloseTrigger />
            </Tag.Root>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Elements">
        <Wrap gap={3}>
          <Tag.Root colorPalette="gray">
            <Tag.Label>Plain</Tag.Label>
          </Tag.Root>
          <Tag.Root colorPalette="green">
            <Tag.StartElement>
              <Check size={12} />
            </Tag.StartElement>
            <Tag.Label>Verified</Tag.Label>
          </Tag.Root>
          <Tag.Root colorPalette="red">
            <Tag.Label>Removable</Tag.Label>
            <Tag.CloseTrigger />
          </Tag.Root>
          <Tag.Root colorPalette="purple">
            <Tag.StartElement>
              <User size={12} />
            </Tag.StartElement>
            <Tag.Label>Admin</Tag.Label>
            <Tag.EndElement>
              <ChevronDown size={12} />
            </Tag.EndElement>
          </Tag.Root>
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Avatar ──────────────────────────────────────────────────────────────────
export function AvatarSection() {
  return (
    <ComponentSection
      id="avatar"
      title="Avatar"
      description="User profile pictures with fallback initials and group stacking."
    >
      <Frame title="Sizes">
        <Wrap gap={4} align="center">
          {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((s) => (
            <VStack key={s} gap={1} align="center">
              <Avatar.Root size={s} colorPalette="blue">
                <Avatar.Fallback name="Ali Rezaei" />
              </Avatar.Root>
              <Text fontSize="xs" color="fg.muted">{s}</Text>
            </VStack>
          ))}
        </Wrap>
      </Frame>

      <Frame title="With Image & Group">
        <Wrap gap={6} align="center">
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
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Card ───────────────────────────────────────────────────────────────────
export function CardSection() {
  return (
    <ComponentSection
      id="card"
      title="Card"
      description="Content containers with header, body, footer and style variants."
    >
      <Frame title="Variants">
        <Wrap gap={4} align="flex-start">
          {(["elevated", "outline", "filled", "subtle"] as const).map((v) => (
            <Card.Root key={v} variant={v} w="200px">
              <Card.Header>
                <Card.Title>Card {v}</Card.Title>
                <Card.Description>Description here</Card.Description>
              </Card.Header>
              <Card.Body>
                <Text fontSize="sm" color="fg.muted">
                  Body content goes here.
                </Text>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" colorPalette="blue">
                  Action
                </Button>
              </Card.Footer>
            </Card.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────────
export function AlertSection() {
  return (
    <ComponentSection
      id="alert"
      title="Alert"
      description="Feedback messages for success, warning, error and informational states."
    >
      <Frame title="Status">
        <Stack gap={3} maxW="360px">
          {(["info", "warning", "success", "error", "neutral"] as const).map((s) => (
            <Alert.Root key={s} status={s}>
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Alert.Title>
                <Alert.Description>This is a {s} alert.</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          ))}
        </Stack>
      </Frame>

      <Frame title="Variants">
        <Stack gap={3} maxW="360px">
          {(["subtle", "surface", "solid", "outline"] as const).map((v) => (
            <Alert.Root key={v} variant={v} status="info">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Variant: {v}</Alert.Title>
              </Alert.Content>
            </Alert.Root>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────
export function StatSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  const stats = isRtl
    ? [
        { label: "درآمد کل",     value: "$45,670", help: "23% نسبت به ماه گذشته",  trend: "up"   },
        { label: "نرخ ریزش",     value: "2.4%",    help: "5% نسبت به ماه گذشته",   trend: "down" },
        { label: "کاربران فعال", value: "12,480",  help: "8% این هفته",             trend: "up"   },
      ]
    : [
        { label: "Total Revenue", value: "$45,670", help: "23% vs last month", trend: "up"   },
        { label: "Churn Rate",    value: "2.4%",    help: "5% vs last month",  trend: "down" },
        { label: "Active Users",  value: "12,480",  help: "8% this week",      trend: "up"   },
      ];

  return (
    <ComponentSection
      id="stat"
      title="Stat"
      description="Numeric metrics with labels, trend indicators and helper text."
    >
      <Frame title="Stat Cards">
        <Wrap gap={6}>
          {stats.map((s) => (
            <Stat.Root key={s.label}>
              <Stat.Label>{s.label}</Stat.Label>
              <Stat.ValueText>{isRtl ? toFarsi(s.value) : s.value}</Stat.ValueText>
              <Stat.HelpText>
                {s.trend === "up" ? <Stat.UpIndicator /> : <Stat.DownIndicator />}
                {isRtl ? toFarsi(s.help) : s.help}
              </Stat.HelpText>
            </Stat.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}