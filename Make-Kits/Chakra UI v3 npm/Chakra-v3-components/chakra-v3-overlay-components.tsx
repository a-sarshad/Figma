import {
  ChakraProvider,
  defaultSystem,
  Box,
  Button,
  Text,
  HStack,
  VStack,
  Stack,
  Heading,
  Input,
  Separator,
  Wrap,
  // Dialog (Modal)
  Dialog,
  // Drawer
  Drawer,
  // Popover
  Popover,
  // Menu
  Menu,
  // Toast — rendered as static box
  // DatePicker
  DatePicker,
  // ColorPicker
  ColorPicker,
  // FileUpload
  FileUpload,
} from "@chakra-ui/react";

// ─── Section Header ───────────────────────────────────────────────────────────
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mb={16}>
    <Heading
      size="xs"
      mb={1}
      color="gray.400"
      textTransform="uppercase"
      letterSpacing="wider"
    >
      {title}
    </Heading>
    <Separator mb={6} />
    <Wrap gap={8} align="flex-start">
      {children}
    </Wrap>
  </Box>
);

// ─── Static overlay shell (simulates open modal/drawer/popover) ───────────────
const OverlayShell = ({
  w = "400px",
  h,
  children,
  label,
  bg = "white",
  shadow = "2xl",
  borderRadius = "lg",
}: {
  w?: string;
  h?: string;
  children: React.ReactNode;
  label: string;
  bg?: string;
  shadow?: string;
  borderRadius?: string;
}) => (
  <Box position="relative">
    <Text fontSize="xs" color="gray.400" mb={2}>{label}</Text>
    {/* Simulated backdrop */}
    <Box
      w={w}
      h={h ?? "auto"}
      bg="blackAlpha.200"
      borderRadius={borderRadius}
      p={4}
      border="1px dashed"
      borderColor="gray.200"
      position="relative"
    >
      <Box bg={bg} borderRadius={borderRadius} boxShadow={shadow} overflow="hidden">
        {children}
      </Box>
    </Box>
  </Box>
);

export default function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <Box p={10} bg="gray.50" minH="100vh">
        <Heading size="2xl" mb={2}>Chakra UI v3 — Overlay Components</Heading>
        <Text color="gray.500" mb={12}>
          All components rendered in open/visible state for Figma Make
        </Text>

        {/* ── DIALOG (MODAL) ─────────────────────────────────────────── */}
        <Section title="Dialog (Modal)">

          {/* Size variants */}
          {(["xs", "sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <OverlayShell
              key={size}
              label={`Dialog — size: ${size}`}
              w={size === "full" ? "500px" : size === "xl" ? "480px" : size === "lg" ? "420px" : size === "md" ? "360px" : size === "sm" ? "300px" : "260px"}
            >
              <Box p={6}>
                <HStack justify="space-between" mb={4}>
                  <Heading size="md">Dialog Title</Heading>
                  <Box w={6} h={6} borderRadius="sm" bg="gray.200" /> {/* close btn */}
                </HStack>
                <Separator mb={4} />
                <Text fontSize="sm" color="gray.600" mb={6}>
                  This is the dialog body. Use it to display important information
                  or gather user input before proceeding.
                </Text>
                <Separator mb={4} />
                <HStack justify="flex-end" gap={3}>
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button colorPalette="blue" size="sm">Confirm</Button>
                </HStack>
              </Box>
            </OverlayShell>
          ))}

          {/* Role variants */}
          {(["alertdialog", "dialog"] as const).map((role) => (
            <OverlayShell key={role} label={`Dialog — role: ${role}`} w="360px">
              <Box p={6}>
                <Heading size="md" mb={2} color={role === "alertdialog" ? "red.600" : "gray.800"}>
                  {role === "alertdialog" ? "⚠️ Delete Item?" : "Confirm Action"}
                </Heading>
                <Text fontSize="sm" color="gray.600" mb={6}>
                  {role === "alertdialog"
                    ? "This action cannot be undone. Are you sure?"
                    : "Please confirm you want to proceed with this action."}
                </Text>
                <HStack justify="flex-end" gap={3}>
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button colorPalette={role === "alertdialog" ? "red" : "blue"} size="sm">
                    {role === "alertdialog" ? "Delete" : "Confirm"}
                  </Button>
                </HStack>
              </Box>
            </OverlayShell>
          ))}
        </Section>

        {/* ── DRAWER ─────────────────────────────────────────────────── */}
        <Section title="Drawer">
          {(["start", "end", "top", "bottom"] as const).map((placement) => {
            const isHorizontal = placement === "start" || placement === "end";
            return (
              <OverlayShell
                key={placement}
                label={`Drawer — placement: ${placement}`}
                w={isHorizontal ? "320px" : "420px"}
                h={isHorizontal ? "480px" : undefined}
                borderRadius="md"
              >
                <Box
                  p={6}
                  h={isHorizontal ? "480px" : undefined}
                  display="flex"
                  flexDirection="column"
                >
                  <HStack justify="space-between" mb={4}>
                    <Heading size="md">Drawer Title</Heading>
                    <Box w={6} h={6} borderRadius="sm" bg="gray.200" />
                  </HStack>
                  <Separator mb={4} />
                  <Stack gap={3} flex={1}>
                    <Text fontSize="sm" color="gray.600">Drawer body content goes here.</Text>
                    <Input placeholder="Example input" size="sm" />
                    <Input placeholder="Another field" size="sm" />
                  </Stack>
                  <Separator mt={4} mb={4} />
                  <HStack justify="flex-end" gap={3}>
                    <Button variant="ghost" size="sm">Cancel</Button>
                    <Button colorPalette="blue" size="sm">Save</Button>
                  </HStack>
                </Box>
              </OverlayShell>
            );
          })}

          {/* Size variants */}
          {(["xs", "sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <OverlayShell
              key={`drawer-size-${size}`}
              label={`Drawer — size: ${size}`}
              w={size === "full" ? "500px" : size === "xl" ? "480px" : size === "lg" ? "400px" : size === "md" ? "320px" : size === "sm" ? "260px" : "220px"}
              h="300px"
            >
              <Box p={5} h="300px">
                <Heading size="sm" mb={2}>Size: {size}</Heading>
                <Text fontSize="sm" color="gray.500">Drawer content</Text>
              </Box>
            </OverlayShell>
          ))}
        </Section>

        {/* ── POPOVER ────────────────────────────────────────────────── */}
        <Section title="Popover">

          {/* Basic popover */}
          <OverlayShell label="Popover — basic" w="280px">
            <Box p={4}>
              <Heading size="sm" mb={2}>Popover Title</Heading>
              <Text fontSize="sm" color="gray.600">
                This is a popover body with some description text.
              </Text>
              <HStack mt={4} justify="flex-end" gap={2}>
                <Button size="xs" variant="ghost">Cancel</Button>
                <Button size="xs" colorPalette="blue">Apply</Button>
              </HStack>
            </Box>
          </OverlayShell>

          {/* Placement variants */}
          {(["top", "bottom", "left", "right"] as const).map((p) => (
            <OverlayShell key={p} label={`Popover — placement: ${p}`} w="240px">
              <Box p={4}>
                <Text fontSize="xs" color="gray.400" mb={1}>Opens {p}</Text>
                <Text fontSize="sm">Popover content here.</Text>
              </Box>
            </OverlayShell>
          ))}

          {/* Info / form popover */}
          <OverlayShell label="Popover — with form" w="280px">
            <Box p={4}>
              <Heading size="sm" mb={3}>Edit Profile</Heading>
              <Stack gap={3}>
                <Input placeholder="First name" size="sm" />
                <Input placeholder="Last name" size="sm" />
              </Stack>
              <HStack mt={4} justify="flex-end" gap={2}>
                <Button size="xs" colorPalette="blue">Save</Button>
              </HStack>
            </Box>
          </OverlayShell>
        </Section>

        {/* ── MENU ───────────────────────────────────────────────────── */}
        <Section title="Menu">

          {/* Basic menu */}
          <OverlayShell label="Menu — basic" w="200px" shadow="lg" borderRadius="md">
            <Box py={2}>
              {["Profile", "Settings", "Billing", "Help"].map((item) => (
                <Box
                  key={item}
                  px={4}
                  py={2}
                  fontSize="sm"
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                >
                  {item}
                </Box>
              ))}
              <Separator my={1} />
              <Box px={4} py={2} fontSize="sm" color="red.500" cursor="pointer" _hover={{ bg: "red.50" }}>
                Sign out
              </Box>
            </Box>
          </OverlayShell>

          {/* Menu with icons */}
          <OverlayShell label="Menu — with icons" w="220px" shadow="lg" borderRadius="md">
            <Box py={2}>
              {[
                { label: "Edit", icon: "✏️" },
                { label: "Duplicate", icon: "📋" },
                { label: "Share", icon: "🔗" },
                { label: "Archive", icon: "📦" },
              ].map(({ label, icon }) => (
                <HStack key={label} px={4} py={2} fontSize="sm" cursor="pointer" _hover={{ bg: "gray.50" }} gap={3}>
                  <Text>{icon}</Text>
                  <Text>{label}</Text>
                </HStack>
              ))}
              <Separator my={1} />
              <HStack px={4} py={2} fontSize="sm" color="red.500" cursor="pointer" gap={3}>
                <Text>🗑️</Text>
                <Text>Delete</Text>
              </HStack>
            </Box>
          </OverlayShell>

          {/* Context menu */}
          <OverlayShell label="Menu — with groups" w="220px" shadow="lg" borderRadius="md">
            <Box py={2}>
              <Text px={4} py={1} fontSize="xs" color="gray.400" fontWeight="semibold">
                ACCOUNT
              </Text>
              {["Profile", "Settings"].map((item) => (
                <Box key={item} px={4} py={2} fontSize="sm" cursor="pointer" _hover={{ bg: "gray.50" }}>
                  {item}
                </Box>
              ))}
              <Separator my={1} />
              <Text px={4} py={1} fontSize="xs" color="gray.400" fontWeight="semibold">
                CONTENT
              </Text>
              {["New Post", "Drafts"].map((item) => (
                <Box key={item} px={4} py={2} fontSize="sm" cursor="pointer" _hover={{ bg: "gray.50" }}>
                  {item}
                </Box>
              ))}
            </Box>
          </OverlayShell>

          {/* With checkmarks */}
          <OverlayShell label="Menu — with checkmarks" w="200px" shadow="lg" borderRadius="md">
            <Box py={2}>
              {[
                { label: "Option A", checked: true },
                { label: "Option B", checked: false },
                { label: "Option C", checked: true },
              ].map(({ label, checked }) => (
                <HStack key={label} px={4} py={2} fontSize="sm" cursor="pointer" _hover={{ bg: "gray.50" }} gap={3}>
                  <Text color={checked ? "blue.500" : "transparent"}>✓</Text>
                  <Text>{label}</Text>
                </HStack>
              ))}
            </Box>
          </OverlayShell>
        </Section>

        {/* ── TOAST ──────────────────────────────────────────────────── */}
        <Section title="Toast (Notification)">
          {(["info", "success", "warning", "error"] as const).map((status) => {
            const colors: Record<string, string> = {
              info: "blue",
              success: "green",
              warning: "orange",
              error: "red",
            };
            const icons: Record<string, string> = {
              info: "ℹ️",
              success: "✅",
              warning: "⚠️",
              error: "❌",
            };
            return (
              <Box
                key={status}
                bg="white"
                borderRadius="md"
                boxShadow="lg"
                p={4}
                w="320px"
                borderLeft="4px solid"
                borderLeftColor={`${colors[status]}.400`}
              >
                <HStack justify="space-between" align="flex-start">
                  <HStack gap={3} align="flex-start">
                    <Text>{icons[status]}</Text>
                    <Box>
                      <Text fontWeight="semibold" fontSize="sm">
                        {status.charAt(0).toUpperCase() + status.slice(1)} message
                      </Text>
                      <Text fontSize="xs" color="gray.500" mt={0.5}>
                        This is a {status} toast notification.
                      </Text>
                    </Box>
                  </HStack>
                  <Box w={4} h={4} bg="gray.200" borderRadius="sm" flexShrink={0} />
                </HStack>
              </Box>
            );
          })}

          {/* Toast with action */}
          <Box bg="gray.800" borderRadius="md" boxShadow="lg" p={4} w="320px" color="white">
            <HStack justify="space-between">
              <Box>
                <Text fontWeight="semibold" fontSize="sm">File deleted</Text>
                <Text fontSize="xs" color="gray.400" mt={0.5}>report-q3.pdf was moved to trash.</Text>
              </Box>
              <Button size="xs" variant="outline" colorPalette="gray" color="white" borderColor="gray.600">
                Undo
              </Button>
            </HStack>
          </Box>

          {/* Toast positions */}
          <Box>
            <Text fontSize="xs" color="gray.400" mb={3}>Toast — placement positions</Text>
            <Box position="relative" w="400px" h="260px" bg="gray.100" borderRadius="lg" border="1px dashed" borderColor="gray.300">
              {[
                { label: "top-start", top: "8px", left: "8px" },
                { label: "top", top: "8px", left: "50%", transform: "translateX(-50%)" },
                { label: "top-end", top: "8px", right: "8px" },
                { label: "bottom-start", bottom: "8px", left: "8px" },
                { label: "bottom", bottom: "8px", left: "50%", transform: "translateX(-50%)" },
                { label: "bottom-end", bottom: "8px", right: "8px" },
              ].map(({ label, ...pos }) => (
                <Box
                  key={label}
                  position="absolute"
                  bg="blue.500"
                  color="white"
                  fontSize="9px"
                  px={2}
                  py={1}
                  borderRadius="sm"
                  fontWeight="medium"
                  style={pos as any}
                >
                  {label}
                </Box>
              ))}
            </Box>
          </Box>
        </Section>

        {/* ── DATE PICKER ────────────────────────────────────────────── */}
        <Section title="Date Picker">
          <DatePicker.Root>
            <DatePicker.Control>
              <DatePicker.Input />
              <DatePicker.Trigger />
            </DatePicker.Control>
            <DatePicker.Positioner>
              <DatePicker.Content>
                <DatePicker.View view="day">
                  <DatePicker.Context>
                    {(datePicker) => (
                      <>
                        <DatePicker.ViewControl>
                          <DatePicker.PrevTrigger />
                          <DatePicker.ViewTrigger>
                            <DatePicker.RangeText />
                          </DatePicker.ViewTrigger>
                          <DatePicker.NextTrigger />
                        </DatePicker.ViewControl>
                        <DatePicker.Table>
                          <DatePicker.TableHead>
                            <DatePicker.TableRow>
                              {datePicker.weekDays.map((wd, i) => (
                                <DatePicker.TableHeader key={i}>
                                  {wd.short}
                                </DatePicker.TableHeader>
                              ))}
                            </DatePicker.TableRow>
                          </DatePicker.TableHead>
                          <DatePicker.TableBody>
                            {datePicker.weeks.map((week, i) => (
                              <DatePicker.TableRow key={i}>
                                {week.map((day, j) => (
                                  <DatePicker.TableCell key={j} value={day}>
                                    <DatePicker.TableCellTrigger>
                                      {day.day}
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                          </DatePicker.TableBody>
                        </DatePicker.Table>
                      </>
                    )}
                  </DatePicker.Context>
                </DatePicker.View>
              </DatePicker.Content>
            </DatePicker.Positioner>
          </DatePicker.Root>
        </Section>

        {/* ── COLOR PICKER ───────────────────────────────────────────── */}
        <Section title="Color Picker">
          <ColorPicker.Root defaultValue="#3B82F6">
            <ColorPicker.HiddenInput />
            <ColorPicker.Control>
              <ColorPicker.ChannelInput channel="hex" />
              <ColorPicker.Trigger />
            </ColorPicker.Control>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.Area>
                  <ColorPicker.AreaBackground />
                  <ColorPicker.AreaThumb />
                </ColorPicker.Area>
                <HStack mt={3} gap={3}>
                  <ColorPicker.EyeDropperTrigger />
                  <Stack gap={2} flex={1}>
                    <ColorPicker.ChannelSlider channel="hue">
                      <ColorPicker.ChannelSliderTrack />
                      <ColorPicker.ChannelSliderThumb />
                    </ColorPicker.ChannelSlider>
                    <ColorPicker.ChannelSlider channel="alpha">
                      <ColorPicker.TransparencyGrid />
                      <ColorPicker.ChannelSliderTrack />
                      <ColorPicker.ChannelSliderThumb />
                    </ColorPicker.ChannelSlider>
                  </Stack>
                  <ColorPicker.Swatch>
                    <ColorPicker.SwatchBackground />
                    <ColorPicker.SwatchIndicator />
                  </ColorPicker.Swatch>
                </HStack>
                <ColorPicker.SwatchGroup mt={3}>
                  {["red", "orange", "yellow", "green", "teal", "blue", "purple", "pink"].map((c) => (
                    <ColorPicker.SwatchTrigger key={c} value={c}>
                      <ColorPicker.Swatch value={c}>
                        <ColorPicker.SwatchBackground />
                      </ColorPicker.Swatch>
                    </ColorPicker.SwatchTrigger>
                  ))}
                </ColorPicker.SwatchGroup>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </ColorPicker.Root>
        </Section>

        {/* ── FILE UPLOAD ────────────────────────────────────────────── */}
        <Section title="File Upload">

          {/* Default */}
          <FileUpload.Root w="300px">
            <FileUpload.Dropzone>
              <FileUpload.DropzoneContent>
                <Text fontSize="sm" fontWeight="medium">Drop files here</Text>
                <Text fontSize="xs" color="gray.500">or click to browse</Text>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.HiddenInput />
          </FileUpload.Root>

          {/* With trigger button */}
          <FileUpload.Root w="240px">
            <FileUpload.Trigger asChild>
              <Button variant="outline" colorPalette="blue" w="full">
                Upload Files
              </Button>
            </FileUpload.Trigger>
            <FileUpload.HiddenInput />
          </FileUpload.Root>

          {/* With item list (after upload) */}
          <FileUpload.Root w="300px">
            <FileUpload.Dropzone>
              <FileUpload.DropzoneContent>
                <Text fontSize="sm">Attach files</Text>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.ItemGroup mt={3}>
              {["report.pdf", "avatar.png"].map((name) => (
                <FileUpload.Item key={name} file={{ name, size: 24000 } as File}>
                  <FileUpload.ItemPreview />
                  <FileUpload.ItemName />
                  <FileUpload.ItemSizeText />
                  <FileUpload.ItemDeleteTrigger />
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
            <FileUpload.HiddenInput />
          </FileUpload.Root>
        </Section>

      </Box>
    </ChakraProvider>
  );
}
