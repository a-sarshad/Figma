import React from "react";
import {
  Box,
  HStack,
  Stack,
  VStack,
  Wrap,
  Text,
  Button,
  Badge,
  Separator,
  Grid,
} from "@chakra-ui/react";
import { toaster } from "../../lib/toaster";
import { placementToasters, type PlacementKey } from "../../lib/placementToasters";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
  Undo2,
  Loader,
} from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { useDirection } from "../../context/DirectionContext";

// ─── Helpers ──────────────────────────────────────────────────────────────────
interface ToastPreviewProps {
  status: "success" | "error" | "warning" | "info" | "neutral";
  title: string;
  description?: string;
  action?: string;
  isRtl?: boolean;
}

const statusConfig = {
  success: { color: "green",  icon: <CheckCircle size={16} /> },
  error:   { color: "red",    icon: <AlertCircle size={16} /> },
  warning: { color: "orange", icon: <AlertTriangle size={16} /> },
  info:    { color: "blue",   icon: <Info size={16} /> },
  neutral: { color: "gray",   icon: null },
  loading: { color: "blue",   icon: <Loader size={16} /> },
};

function ToastPreview({ status, title, description, action, isRtl }: ToastPreviewProps) {
  const cfg = statusConfig[status];
  return (
    <Box
      bg="white"
      _dark={{ bg: "gray.800" }}
      borderRadius="lg"
      boxShadow="md"
      p={4}
      w="320px"
      border="1px solid"
      borderColor="border"
    >
      <HStack gap={3} justify="space-between" align="flex-start">
        <HStack gap={3} align="flex-start" flex={1}>
          {cfg.icon && (
            <Box color={`${cfg.color}.500`} mt="2px" flexShrink={0}>
              {cfg.icon}
            </Box>
          )}
          <VStack gap={0.5} align="flex-start" flex={1}>
            <Text fontWeight="semibold" fontSize="sm">{title}</Text>
            {description && (
              <Text fontSize="xs" color="fg.muted">{description}</Text>
            )}
          </VStack>
          {action && (
            <Box
              as="button"
              fontSize="xs"
              color={`${cfg.color}.600`}
              fontWeight="semibold"
              flexShrink={0}
              cursor="pointer"
            >
              {action}
            </Box>
          )}
        </HStack>
        <Box color="fg.subtle" flexShrink={0}><X size={14} /></Box>
      </HStack>
    </Box>
  );
}

function ToastPreviewDark({ title, description, isRtl }: { title: string; description?: string; isRtl?: boolean }) {
  return (
    <Box
      bg="gray.900"
      color="white"
      borderRadius="lg"
      boxShadow="lg"
      p={4}
      w="320px"
    >
      <HStack gap={3} justify="space-between">
        <VStack gap={0.5} align="flex-start" flex={1}>
          <Text fontWeight="semibold" fontSize="sm">{title}</Text>
          {description && <Text fontSize="xs" color="gray.400">{description}</Text>}
        </VStack>
        <Box color="gray.400" flexShrink={0}><X size={14} /></Box>
      </HStack>
    </Box>
  );
}

// ─── Toast Section ────────────────────────────────────────────────────────────
export function ToastSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  // ── Interactive triggers ──────────────────────────────────────────────────
  const showSuccess = () =>
    toaster.create({
      title: isRtl ? "عملیات موفق" : "Success",
      description: isRtl ? "تغییرات با موفقیت ذخیره شد." : "Changes saved successfully.",
      type: "success",
    });

  const showError = () =>
    toaster.create({
      title: isRtl ? "خطا رخ داد" : "Error",
      description: isRtl ? "مشکلی پیش آمد. دوباره تلاش کنید." : "Something went wrong. Please try again.",
      type: "error",
    });

  const showWarning = () =>
    toaster.create({
      title: isRtl ? "هشدار" : "Warning",
      description: isRtl ? "این عملیات قابل بازگشت نیست." : "This action cannot be undone.",
      type: "warning",
    });

  const showInfo = () =>
    toaster.create({
      title: isRtl ? "اطلاعات" : "Info",
      description: isRtl ? "نسخه جدید در دسترس است." : "A new version is available.",
      type: "info",
    });

  const showWithAction = () =>
    toaster.create({
      title: isRtl ? "فایل حذف شد" : "File deleted",
      description: isRtl ? "report-q3.pdf به سطل زباله منتقل شد." : "report-q3.pdf was moved to trash.",
      type: "info",
      action: {
        label: isRtl ? "بازگردانی" : "Undo",
        onClick: () => {},
      },
    });

  const showLoading = () => {
    const id = toaster.create({
      title: isRtl ? "در حال پردازش..." : "Processing...",
      type: "loading",
    });
    setTimeout(() => {
      toaster.update(id, {
        title: isRtl ? "پردازش کامل شد" : "Processing complete",
        type: "success",
      });
    }, 2000);
  };

  // ── Placement demo ────────────────────────────────────────────────────────
  const firePlacement = (placement: PlacementKey) => {
    placementToasters[placement].create({
      title: isRtl ? `موقعیت: ${placement}` : `Placement: ${placement}`,
      description: isRtl
        ? placement.includes("start")
          ? "start = راست در RTL"
          : placement.includes("end")
          ? "end = چپ در RTL"
          : undefined
        : placement.includes("start")
        ? "start = left in LTR"
        : placement.includes("end")
        ? "end = right in LTR"
        : undefined,
      type: "info",
    });
  };

  // placement positions for the visual map — flip start/end in RTL
  const placementPositions = isRtl
    ? [
        { label: "top-start",    top: "10px",    right: "10px" },
        { label: "top",          top: "10px",    left: "50%", transform: "translateX(-50%)" },
        { label: "top-end",      top: "10px",    left: "10px" },
        { label: "bottom-start", bottom: "10px", right: "10px" },
        { label: "bottom",       bottom: "10px", left: "50%", transform: "translateX(-50%)" },
        { label: "bottom-end",   bottom: "10px", left: "10px" },
      ]
    : [
        { label: "top-start",    top: "10px",    left: "10px" },
        { label: "top",          top: "10px",    left: "50%", transform: "translateX(-50%)" },
        { label: "top-end",      top: "10px",    right: "10px" },
        { label: "bottom-start", bottom: "10px", left: "10px" },
        { label: "bottom",       bottom: "10px", left: "50%", transform: "translateX(-50%)" },
        { label: "bottom-end",   bottom: "10px", right: "10px" },
      ];

  return (
    <ComponentSection
      id="toast"
      title="Toast & Toaster"
      description="Notification toasts with status types, placements, actions and programmatic API."
    >
      {/* ── Static Previews ────────────────────────────────────────────── */}
      <Frame title="Status Types — Visual Preview">
        <Stack gap={3}>
          <ToastPreview
            status="success"
            title={isRtl ? "عملیات موفق" : "Success"}
            description={isRtl ? "تغییرات با موفقیت ذخیره شد." : "Changes saved successfully."}
            isRtl={isRtl}
          />
          <ToastPreview
            status="error"
            title={isRtl ? "خطا رخ داد" : "Error occurred"}
            description={isRtl ? "مشکلی پیش آمد. دوباره تلاش کنید." : "Something went wrong. Please try again."}
            isRtl={isRtl}
          />
          <ToastPreview
            status="warning"
            title={isRtl ? "هشدار" : "Warning"}
            description={isRtl ? "این عملیات قابل بازگشت نیست." : "This action cannot be undone."}
            isRtl={isRtl}
          />
          <ToastPreview
            status="info"
            title={isRtl ? "اطلاعات" : "Info"}
            description={isRtl ? "نسخه جدید در دسترس است." : "A new version is available."}
            isRtl={isRtl}
          />
          <ToastPreview
            status="neutral"
            title={isRtl ? "اطلاعیه" : "Notification"}
            description={isRtl ? "یک اعلان جدید دارید." : "You have a new notification."}
            isRtl={isRtl}
          />
        </Stack>
      </Frame>

      {/* ── With Action ─────────────────────────────────────────────────── */}
      <Frame title="With Action Button">
        <Stack gap={3}>
          <ToastPreview
            status="neutral"
            title={isRtl ? "فایل حذف شد" : "File deleted"}
            description={isRtl ? "report-q3.pdf به سطل زباله منتقل شد." : "report-q3.pdf was moved to trash."}
            action={isRtl ? "بازگردانی" : "Undo"}
            isRtl={isRtl}
          />
          <ToastPreview
            status="info"
            title={isRtl ? "نسخه جدید موجود است" : "Update available"}
            description={isRtl ? "نسخه ۴.۰ منتشر شده است." : "Version 4.0 has been released."}
            action={isRtl ? "نصب" : "Install"}
            isRtl={isRtl}
          />
          <ToastPreviewDark
            title={isRtl ? "لینک کپی شد" : "Link copied"}
            description={isRtl ? "لینک در کلیپبورد ذخیره شد." : "Link saved to clipboard."}
            isRtl={isRtl}
          />
        </Stack>
      </Frame>

      {/* ── Title Only ──────────────────────────────────────────────────── */}
      <Frame title="Title Only (Compact)">
        <Stack gap={3}>
          {(["success", "error", "warning", "info"] as const).map((status) => (
            <Box
              key={status}
              bg="white"
              _dark={{ bg: "gray.800" }}
              borderRadius="lg"
              boxShadow="md"
              px={4}
              py={3}
              w="280px"
              border="1px solid"
              borderColor="border"
            >
              <HStack gap={3} justify="space-between">
                <HStack gap={2}>
                  <Box color={`${statusConfig[status].color}.500`}>
                    {statusConfig[status].icon}
                  </Box>
                  <Text fontWeight="medium" fontSize="sm">
                    {isRtl
                      ? { success: "موفقیت", error: "خطا", warning: "هشدار", info: "اطلاعات" }[status]
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </HStack>
                <Box color="fg.subtle"><X size={12} /></Box>
              </HStack>
            </Box>
          ))}
        </Stack>
      </Frame>

      {/* ── Loading Toast ────────────────────────────────────────────────── */}
      <Frame title="Loading State">
        <Box
          bg="white"
          _dark={{ bg: "gray.800" }}
          borderRadius="lg"
          boxShadow="lg"
          p={4}
          w="320px"
          border="1px solid"
          borderColor="border"
        >
          <HStack gap={3} justify="space-between">
            <HStack gap={3}>
              <Box color="blue.500" animation="spin 1s linear infinite">
                <Loader size={16} />
              </Box>
              <Box>
                <Text fontWeight="semibold" fontSize="sm">
                  {isRtl ? "در حال پردازش..." : "Processing..."}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {isRtl ? "لطفاً صبر کنید" : "Please wait"}
                </Text>
              </Box>
            </HStack>
            <Box color="fg.subtle"><X size={14} /></Box>
          </HStack>
        </Box>
      </Frame>

      {/* ── Placement Map ────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "موقعیت‌های Toast — RTL-aware" : "Placement Positions — RTL-aware"}>
        <Stack gap={3}>
          <Text fontSize="xs" color="fg.muted">
            {isRtl
              ? "در حالت RTL جهت start/end برعکس می‌شود:"
              : "In RTL mode, start/end directions are flipped:"}
          </Text>
          <Box position="relative" w="400px" h="260px" bg="bg.subtle" borderRadius="lg" border="1px solid" borderColor="border">
            {placementPositions.map(({ label, ...pos }) => {
              const isStart = label.includes("start");
              const isEnd = label.includes("end");
              const bg = isStart ? "purple.500" : isEnd ? "blue.500" : "gray.500";
              return (
                <Box
                  key={label}
                  position="absolute"
                  bg={bg}
                  color="white"
                  fontSize="9px"
                  px={2}
                  py={1}
                  borderRadius="md"
                  fontWeight="medium"
                  whiteSpace="nowrap"
                  style={pos as React.CSSProperties}
                >
                  {label}
                </Box>
              );
            })}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              textAlign="center"
            >
              <Text fontSize="xs" color="fg.subtle">
                {isRtl ? `dir="${dir}"` : `dir="ltr"`}
              </Text>
              <HStack gap={2} mt={1} justify="center">
                <HStack gap={1}>
                  <Box w="8px" h="8px" bg="purple.500" borderRadius="sm" />
                  <Text fontSize="8px" color="fg.subtle">start</Text>
                </HStack>
                <HStack gap={1}>
                  <Box w="8px" h="8px" bg="blue.500" borderRadius="sm" />
                  <Text fontSize="8px" color="fg.subtle">end</Text>
                </HStack>
              </HStack>
            </Box>
          </Box>
        </Stack>
      </Frame>

      {/* ── Placement Interactive Demo ───────────────────────────────────── */}
      <Frame title={isRtl ? "دموی تعاملی موقعیت‌ها (کلیک کنید)" : "Placement Interactive Demo (Click to fire)"}>
        <Stack gap={3}>
          <Text fontSize="xs" color="fg.muted">
            {isRtl
              ? "هر دکمه یک toast در موقعیت مربوطه نشان می‌دهد. در RTL، start و end جابجا می‌شوند:"
              : "Each button fires a toast at its placement. In RTL, start ↔ end are swapped:"}
          </Text>
          <Grid templateColumns="repeat(3, 1fr)" gap={2} w="fit-content">
            {(["top-start", "top", "top-end"] as PlacementKey[]).map((p) => (
              <Button
                key={p}
                size="xs"
                variant="outline"
                colorPalette={p.includes("start") ? "purple" : p.includes("end") ? "blue" : "gray"}
                onClick={() => firePlacement(p)}
              >
                {p}
              </Button>
            ))}
            {(["bottom-start", "bottom", "bottom-end"] as PlacementKey[]).map((p) => (
              <Button
                key={p}
                size="xs"
                variant="outline"
                colorPalette={p.includes("start") ? "purple" : p.includes("end") ? "blue" : "gray"}
                onClick={() => firePlacement(p)}
              >
                {p}
              </Button>
            ))}
          </Grid>
          <HStack gap={3}>
            <HStack gap={1}>
              <Box w="10px" h="10px" bg="purple.500" borderRadius="sm" />
              <Text fontSize="xs" color="fg.muted">
                {isRtl ? "start = راست در RTL" : "start = left in LTR, right in RTL"}
              </Text>
            </HStack>
            <HStack gap={1}>
              <Box w="10px" h="10px" bg="blue.500" borderRadius="sm" />
              <Text fontSize="xs" color="fg.muted">
                {isRtl ? "end = چپ در RTL" : "end = right in LTR, left in RTL"}
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Frame>

      {/* ── Interactive Triggers ─────────────────────────────────────────── */}
      <Frame title="Interactive Triggers (Live)">
        <Stack gap={3}>
          <Text fontSize="xs" color="fg.muted">
            {isRtl
              ? "روی دکمه‌ها کلیک کنید تا toast واقعی نمایش داده شود:"
              : "Click buttons to trigger real toasts:"}
          </Text>
          <Wrap gap={2}>
            <Button size="sm" colorPalette="green" onClick={showSuccess}>
              <CheckCircle size={14} />
              {isRtl ? "موفقیت" : "Success"}
            </Button>
            <Button size="sm" colorPalette="red" onClick={showError}>
              <AlertCircle size={14} />
              {isRtl ? "خطا" : "Error"}
            </Button>
            <Button size="sm" colorPalette="orange" onClick={showWarning}>
              <AlertTriangle size={14} />
              {isRtl ? "هشدار" : "Warning"}
            </Button>
            <Button size="sm" colorPalette="blue" onClick={showInfo}>
              <Info size={14} />
              {isRtl ? "اطلاعات" : "Info"}
            </Button>
            <Button size="sm" colorPalette="gray" variant="outline" onClick={showWithAction}>
              <Undo2 size={14} />
              {isRtl ? "با دکمه عملیات" : "With Action"}
            </Button>
            <Button size="sm" colorPalette="purple" variant="outline" onClick={showLoading}>
              <Loader size={14} />
              {isRtl ? "در حال بارگذاری" : "Loading"}
            </Button>
          </Wrap>
        </Stack>
      </Frame>

      {/* ── API Reference ────────────────────────────────────────────────── */}
      <Frame title="Usage Pattern">
        <Stack gap={2} maxW="420px">
          <Text fontSize="xs" color="fg.muted" fontWeight="semibold">
            {isRtl ? "نحوه استفاده:" : "How to use:"}
          </Text>
          <Box
            bg="gray.900"
            color="gray.100"
            borderRadius="md"
            p={4}
            fontSize="xs"
            fontFamily="mono"
          >
            <Text color="gray.500">{`// 1. Mount Toaster once in your app root`}</Text>
            <Text color="blue.300">{`<Toaster />`}</Text>
            <Text mt={2} color="gray.500">{`// 2. Call toaster.create() anywhere`}</Text>
            <Text color="green.300">{`toaster.create({`}</Text>
            <Text ps={4} color="yellow.300">{`title: "Success",`}</Text>
            <Text ps={4} color="yellow.300">{`description: "Done!",`}</Text>
            <Text ps={4} color="yellow.300">{`type: "success",`}</Text>
            <Text color="green.300">{`});`}</Text>
          </Box>
          <Separator />
          <Wrap gap={2}>
            {(["success", "error", "warning", "info", "loading", "neutral"] as const).map((t) => (
              <Badge key={t} colorPalette={statusConfig[t as keyof typeof statusConfig]?.color ?? "gray"} size="sm">
                {t}
              </Badge>
            ))}
          </Wrap>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}