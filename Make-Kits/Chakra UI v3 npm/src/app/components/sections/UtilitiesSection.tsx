import React from "react";
import {
  Box,
  HStack,
  Stack,
  SimpleGrid,
  Wrap,
  Text,
  Separator,
  CloseButton,
  Image,
  Link,
} from "@chakra-ui/react";
import { Frame, ComponentSection } from "../ui/Frame";
import { useDirection } from "../../context/DirectionContext";

// ─── Layout ───────────────────────────────────────────────────────────────────
export function LayoutSection() {
  return (
    <ComponentSection
      id="layout"
      title="Layout"
      description="Flexbox and grid layout primitives."
    >
      <Frame title="HStack">
        <HStack gap={2} bg="bg.subtle" p={4} borderRadius="md">
          {["A", "B", "C"].map((l) => (
            <Box key={l} bg="blue.100" _dark={{ bg: "blue.900" }} p={3} borderRadius="sm" fontWeight="bold">
              {l}
            </Box>
          ))}
        </HStack>
      </Frame>

      <Frame title="SimpleGrid">
        <SimpleGrid columns={3} gap={2} maxW="260px">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box
              key={i}
              bg="teal.100"
              _dark={{ bg: "teal.900" }}
              p={3}
              borderRadius="sm"
              textAlign="center"
            >
              {i + 1}
            </Box>
          ))}
        </SimpleGrid>
      </Frame>
    </ComponentSection>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────
export function SeparatorSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="separator"
      title="Separator"
      description="Horizontal or vertical dividing line."
    >
      <Frame title="Horizontal">
        <Box maxW="320px">
          <Separator />
          <HStack mt={4} gap={4}>
            <Box flex={1}>
              <Separator />
            </Box>
            <Text fontSize="sm" color="fg.muted">
              {isRtl ? "یا" : "OR"}
            </Text>
            <Box flex={1}>
              <Separator />
            </Box>
          </HStack>
        </Box>
      </Frame>
    </ComponentSection>
  );
}

// ─── Image ────────────────────────────────────────────────────────────────────
export function ImageSection() {
  return (
    <ComponentSection id="image" title="Image" description="Responsive image with object-fit.">
      <Frame title="Shapes">
        <HStack gap={4} align="center">
          <Box textAlign="center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
              alt="Landscape"
              borderRadius="md"
              boxSize="100px"
              objectFit="cover"
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>rounded</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
              alt="Circle"
              borderRadius="full"
              boxSize="80px"
              objectFit="cover"
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>full</Text>
          </Box>
          <Box textAlign="center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80"
              alt="Square"
              boxSize="80px"
              objectFit="cover"
            />
            <Text fontSize="xs" color="fg.muted" mt={1}>square</Text>
          </Box>
        </HStack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Link ──────────────────────────────────────────────────────────────────────
export function LinkSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection id="link" title="Link" description="Navigational anchor element.">
      <Frame title="Variants">
        <HStack gap={6} flexWrap="wrap">
          <Link href="#" colorPalette="blue">
            {isRtl ? "لینک پیش‌فرض" : "Default link"}
          </Link>
          <Link href="#" colorPalette="blue" variant="underline">
            {isRtl ? "لینک زیرخط‌دار" : "Underline link"}
          </Link>
          <Link href="#" colorPalette="blue" variant="plain">
            {isRtl ? "لینک ساده" : "Plain link"}
          </Link>
        </HStack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Close Button ─────────────────────────────────────────────────────────────
export function CloseButtonSection() {
  return (
    <ComponentSection
      id="close-button"
      title="Close Button"
      description="Accessible dismiss trigger in various sizes."
    >
      <Frame title="Sizes">
        <HStack gap={4} align="center">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Box key={s} textAlign="center">
              <CloseButton size={s} />
              <Text fontSize="xs" color="fg.muted" mt={1}>{s}</Text>
            </Box>
          ))}
        </HStack>
      </Frame>
    </ComponentSection>
  );
}