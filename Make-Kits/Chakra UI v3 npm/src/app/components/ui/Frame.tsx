import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

// ─── Frame ───────────────────────────────────────────────────────────────────
// Bordered demo container with a labelled header, matching the reference design.
export function Frame({
  title,
  children,
  noPad,
}: {
  title: string;
  children: React.ReactNode;
  noPad?: boolean;
}) {
  return (
    <Box
      border="1px solid"
      borderColor="border"
      borderRadius="lg"
      mb={4}
    >
      <Box
        px={4}
        py={2}
        borderBottom="1px solid"
        borderColor="border"
        bg="bg.subtle"
      >
        <Text fontSize="xs" color="fg.muted" fontWeight="medium">
          {title}
        </Text>
      </Box>
      <Box p={noPad ? 0 : 6} bg="bg">
        {children}
      </Box>
    </Box>
  );
}

// ─── ComponentSection ─────────────────────────────────────────────────────────
// A top-level section for one component family: title, description, then frames.
export function ComponentSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Box id={id} mb={16} scrollMarginTop="24px">
      <Heading size="2xl" mb={description ? 1 : 6}>
        {title}
      </Heading>
      {description && (
        <Text color="fg.muted" fontSize="sm" mb={6}>
          {description}
        </Text>
      )}
      {children}
    </Box>
  );
}