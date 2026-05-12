import React from "react";
import {
  Box,
  HStack,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Em,
  Strong,
  Mark,
  Code,
  Kbd,
  ColorSwatch,
  Separator,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Frame, ComponentSection } from "../ui/Frame";

const COLORS = [
  "gray", "red", "orange", "yellow", "green",
  "teal", "blue", "cyan", "purple", "pink",
] as const;
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export function ColorsSection() {
  return (
    <ComponentSection
      id="colors"
      title="Colors"
      description="Chakra UI color palettes — 10 shades per hue, 50 (lightest) to 900 (darkest)."
    >
      <Frame title="Color Palettes">
        <Stack gap={3}>
          {COLORS.map((color) => (
            <Box key={color}>
              <Text fontSize="xs" color="fg.muted" mb={1} fontWeight="medium">
                {color}
              </Text>
              <HStack gap={1} flexWrap="wrap">
                {SHADES.map((shade) => (
                  <Box key={shade} textAlign="center">
                    <Box
                      bg={`${color}.${shade}`}
                      w="28px"
                      h="28px"
                      borderRadius="md"
                      border="1px solid"
                      borderColor="border"
                    />
                    <Text fontSize="8px" color="fg.muted" mt={0.5}>
                      {shade}
                    </Text>
                  </Box>
                ))}
              </HStack>
            </Box>
          ))}
        </Stack>
      </Frame>

      <Frame title="Semantic Tokens">
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={3}>
          {[
            { token: "bg", label: "bg" },
            { token: "bg.subtle", label: "bg.subtle" },
            { token: "bg.muted", label: "bg.muted" },
            { token: "bg.emphasized", label: "bg.emphasized" },
          ].map(({ token, label }) => (
            <Box key={token}>
              <Box
                bg={token}
                h="36px"
                borderRadius="md"
                border="1px solid"
                borderColor="border"
              />
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {label}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Frame>
    </ComponentSection>
  );
}

export function TypographySection() {
  return (
    <ComponentSection
      id="typography"
      title="Typography"
      description="Heading scale, text variants, and inline elements."
    >
      <Frame title="Heading Sizes">
        <Stack gap={2} align="flex-start">
          {(["6xl", "5xl", "4xl", "3xl", "2xl", "xl", "lg", "md", "sm", "xs"] as const).map(
            (s) => (
              <Heading key={s} size={s}>
                Heading {s}
              </Heading>
            )
          )}
        </Stack>
      </Frame>

      <Frame title="Text Styles">
        <Stack gap={3} align="flex-start">
          <Text fontSize="lg">Large text — body copy at 18px</Text>
          <Text fontSize="md">Medium text — default body at 16px</Text>
          <Text fontSize="sm" color="fg.muted">
            Small muted text — supplementary information
          </Text>
          <Text fontSize="xs" color="fg.subtle">
            Extra small — captions, labels, metadata
          </Text>
        </Stack>
      </Frame>

      <Frame title="Inline Elements">
        <Stack gap={3} align="flex-start">
          <Text>
            <Strong>Bold text</Strong> and <Em>italic text</Em> inline
          </Text>
          <Text>
            <Mark bg="yellow.200" px={1}>
              Highlighted
            </Mark>{" "}
            text in a sentence
          </Text>
          <Code px={2} py={1}>
            const answer = 42
          </Code>
          <Text>
            Press <Kbd>⌘</Kbd> + <Kbd>K</Kbd> to open command palette
          </Text>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

export function SpacingSection() {
  const spacingTokens = [1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24] as const;
  const sizeTokens = [4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48] as const;

  return (
    <ComponentSection
      id="spacing"
      title="Spacing & Sizing"
      description="Chakra spacing scale: each token = 4px × n."
    >
      <Frame title="Spacing Scale">
        <Stack gap={2} align="flex-start">
          {spacingTokens.map((t) => (
            <HStack key={t} gap={4} align="center">
              <Text
                fontSize="xs"
                color="fg.muted"
                w="8"
                textAlign="end"
                fontFamily="mono"
              >
                {t}
              </Text>
              <Box bg="teal.400" h="12px" borderRadius="sm" w={`${t * 4}px`} />
              <Text fontSize="xs" color="fg.muted">
                {t * 4}px
              </Text>
            </HStack>
          ))}
        </Stack>
      </Frame>

      <Frame title="Sizes">
        <Stack gap={3} align="flex-start">
          {sizeTokens.map((t) => (
            <HStack key={t} gap={4} align="center">
              <Text
                fontSize="xs"
                color="fg.muted"
                w="8"
                textAlign="end"
                fontFamily="mono"
              >
                {t}
              </Text>
              <Box
                bg="purple.400"
                w={`${t * 4}px`}
                h={`${t * 4}px`}
                borderRadius="md"
                flexShrink={0}
              />
              <Text fontSize="xs" color="fg.muted">
                {t * 4}px × {t * 4}px
              </Text>
            </HStack>
          ))}
        </Stack>
      </Frame>

      <Frame title="Border Radius">
        <HStack gap={4} flexWrap="wrap">
          {(["sm", "md", "lg", "xl", "2xl", "full"] as const).map((r) => (
            <Box key={r} textAlign="center">
              <Box
                w="48px"
                h="48px"
                bg="blue.400"
                border="2px solid"
                borderColor="blue.600"
                borderRadius={r}
              />
              <Text fontSize="xs" color="fg.muted" mt={1}>
                {r}
              </Text>
            </Box>
          ))}
        </HStack>
      </Frame>
    </ComponentSection>
  );
}