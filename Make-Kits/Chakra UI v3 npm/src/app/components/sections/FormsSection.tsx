import React, { useState } from "react";
import {
  Box,
  HStack,
  Stack,
  Wrap,
  Text,
  Field,
  Input,
  InputGroup,
  NumberInput,
  PinInput,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Textarea,
  Checkbox,
  RatingGroup,
  FileUpload,
  ColorPicker,
  parseColor,
  createListCollection,
  IconButton,
  Button,
  CloseButton,
  DatePicker,
  Portal,
} from "@chakra-ui/react";
import { Search, Eye, EyeOff, Upload, File, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { toFarsi } from "../../lib/farsi";
import { useDirection } from "../../context/DirectionContext";

type Direction = "ltr" | "rtl";

// ─── Input & Field ────────────────────────────────────────────────────────────
export function InputSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="input"
      title="Input & Field"
      description="Text input with label, helper, error, addons and sizes."
    >
      <Frame title="Field with label + helper">
        <Stack gap={4} maxW="320px">
          <Field.Root>
            <Field.Label>
              {isRtl ? "آدرس ایمیل" : "Email"}{" "}
              <Field.RequiredIndicator />
            </Field.Label>
            <Input
              dir="ltr"
              placeholder="jane@chakra-ui.com"
            />
            <Field.HelperText>
              {isRtl
                ? "ایمیل شما با کسی به اشتراک گذاشته نخواهد شد"
                : "We'll never share your email."}
            </Field.HelperText>
          </Field.Root>
          <Field.Root invalid>
            <Field.Label>
              {isRtl ? "رمز عبور" : "Password"}
            </Field.Label>
            <Input type="password" defaultValue="short" />
            <Field.ErrorText>
              {isRtl
                ? "رمز عبور باید حداقل ۸ کاراکتر باشد"
                : "Password must be at least 8 characters."}
            </Field.ErrorText>
          </Field.Root>
        </Stack>
      </Frame>

      <Frame title="Variants">
        <Stack gap={3} maxW="280px">
          {(["outline", "filled", "flushed"] as const).map((v) => (
            <Input key={v} variant={v} placeholder={`${v} input`} />
          ))}
        </Stack>
      </Frame>

      <Frame title="Sizes & addons">
        <Stack gap={3} maxW="300px">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Input key={s} size={s} placeholder={isRtl ? `اندازه ${s}` : `Size ${s}`} />
          ))}
          <InputGroup startElement={<Search size={14} color="gray" />}>
            <Input placeholder={isRtl ? "جستجوی کامپوننت‌ها..." : "Search components..."} />
          </InputGroup>
        </Stack>
      </Frame>

      <Frame title="States">
        <Stack gap={3} maxW="280px">
          <Input placeholder={isRtl ? "پیش‌فرض" : "Default"} />
          <Input placeholder={isRtl ? "غیرفعال" : "Disabled"} disabled />
          <Input placeholder={isRtl ? "فقط خواندنی" : "Read only"} readOnly />
          <Field.Root invalid>
            <Input placeholder={isRtl ? "نامعتبر" : "Invalid"} />
          </Field.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────
export function TextareaSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="textarea"
      title="Textarea"
      description="Multi-line text input for longer content."
    >
      <Frame title="Default">
        <Stack gap={3} maxW="320px">
          <Textarea placeholder={isRtl ? "توضیحات خود را وارد کنید..." : "Enter description..."} />
          <Textarea placeholder={isRtl ? "غیرفعال" : "Disabled"} disabled />
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Select ───────────────────────────────────────────────────────────────────
export function SelectSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const options = isRtl
    ? [
        { label: "گزینه الف", value: "a" },
        { label: "گزینه ب", value: "b" },
        { label: "گزینه ج", value: "c" },
      ]
    : [
        { label: "Option A", value: "a" },
        { label: "Option B", value: "b" },
        { label: "Option C", value: "c" },
      ];

  return (
    <ComponentSection
      id="select"
      title="Select"
      description="Dropdown selection with variants and sizes."
    >
      <Frame title="Variants">
        <Stack gap={3} maxW="240px">
          {(["outline", "filled"] as const).map((v) => (
            <Select.Root
              key={v}
              collection={createListCollection({ items: options })}
            >
              <Select.Trigger variant={v}>
                <Select.ValueText
                  placeholder={isRtl ? `انتخاب (${v})` : `${v} select`}
                />
              </Select.Trigger>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {options.map((item) => (
                      <Select.Item key={item.value} item={item}>
                        <Select.ItemText>{item.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
export function CheckboxSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="checkbox"
      title="Checkbox"
      description="Binary input for toggling options, with indeterminate support."
    >
      <Frame title="States">
        <Stack gap={3}>
          <Checkbox.Root defaultChecked colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{isRtl ? "انتخاب شده" : "Checked"}</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{isRtl ? "انتخاب نشده" : "Unchecked"}</Checkbox.Label>
          </Checkbox.Root>
          <Checkbox.Root disabled colorPalette="blue">
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>{isRtl ? "غیرفعال" : "Disabled"}</Checkbox.Label>
          </Checkbox.Root>
        </Stack>
      </Frame>

      <Frame title="Sizes & Colors">
        <HStack gap={6} flexWrap="wrap">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Checkbox.Root key={s} size={s} defaultChecked colorPalette="teal">
              <Checkbox.HiddenInput />
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              <Checkbox.Label>{isRtl ? `اندازه ${s}` : `Size ${s}`}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </HStack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────
export function RadioSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const labels = isRtl ? ["گزینه ۱", "گزینه ۲", "گزینه ۳"] : ["Option 1", "Option 2", "Option 3"];
  return (
    <ComponentSection
      id="radio"
      title="Radio"
      description="Single-selection from a group of options."
    >
      <Frame title="Default">
        <RadioGroup.Root defaultValue="1" colorPalette="blue">
          <HStack gap={6} flexWrap="wrap">
            {labels.map((label, i) => (
              <RadioGroup.Item key={i} value={String(i + 1)}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemControl>
                  <RadioGroup.ItemIndicator />
                </RadioGroup.ItemControl>
                <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Switch ───────────────────────────────────────────────────────────────────
export function SwitchSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="switch"
      title="Switch"
      description="Toggle control for boolean on/off states."
    >
      <Frame title="Sizes & Colors">
        <HStack gap={6} flexWrap="wrap">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Switch.Root key={s} size={s} defaultChecked colorPalette="blue">
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>{isRtl ? `اندازه ${s}` : `Size ${s}`}</Switch.Label>
            </Switch.Root>
          ))}
        </HStack>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={4}>
          {(["blue", "teal", "green", "purple", "red", "orange"] as const).map((c) => (
            <Switch.Root key={c} defaultChecked colorPalette={c}>
              <Switch.HiddenInput />
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <Switch.Label>{c}</Switch.Label>
            </Switch.Root>
          ))}
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────
export function SliderSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const d = isRtl ? "rtl" : "ltr";

  // helper: one complete slider with visible thumb
  const S = ({
    defaultValue = [40],
    colorPalette = "blue",
    variant,
    size,
    disabled,
    readOnly,
    marks,
  }: {
    defaultValue?: number[];
    colorPalette?: string;
    variant?: "outline" | "solid";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    readOnly?: boolean;
    marks?: Array<number | { value: number; label: React.ReactNode }>;
  }) => (
    <Slider.Root
      defaultValue={defaultValue}
      colorPalette={colorPalette as any}
      variant={variant}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      dir={d}
      pb={marks ? 6 : 0}
    >
      <Slider.Control overflow="visible" py={2}>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        {defaultValue.map((_, i) => (
          <Slider.Thumb key={i} index={i}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        ))}
      </Slider.Control>
      {marks && <Slider.Marks marks={marks} />}
    </Slider.Root>
  );

  return (
    <ComponentSection
      id="slider"
      title="Slider"
      description="Range input for selecting numeric values."
    >
      {/* ── Single & Range ───────────────────────────────────────────────── */}
      <Frame title={isRtl ? "تک‌مقداری و بازه‌ای" : "Single & Range"}>
        <Stack gap={8} maxW="320px">
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "تک‌مقداری" : "Single"}</Text>
            {S({ defaultValue: [40], colorPalette: "blue" })}
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "بازه‌ای" : "Range"}</Text>
            {S({ defaultValue: [20, 70], colorPalette: "teal" })}
          </Box>
        </Stack>
      </Frame>

      {/* ── Variants ─────────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "نوع‌ها" : "Variants"}>
        <Stack gap={8} maxW="320px">
          {(["outline", "solid"] as const).map((v) => (
            <Box key={v}>
              <Text fontSize="xs" color="fg.muted" mb={4}>{v}</Text>
              {S({ defaultValue: [55], colorPalette: "blue", variant: v })}
            </Box>
          ))}
        </Stack>
      </Frame>

      {/* ── Color Palettes ────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "رنگ‌ها" : "Color Palettes"}>
        <Stack gap={8} maxW="320px">
          {(["blue", "teal", "green", "purple", "orange", "red"] as const).map((color) => (
            <Box key={color}>
              <Text fontSize="xs" color="fg.muted" mb={4}>{color}</Text>
              {S({ defaultValue: [60], colorPalette: color })}
            </Box>
          ))}
        </Stack>
      </Frame>

      {/* ── Sizes ────────────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "سایزها" : "Sizes"}>
        <Stack gap={8} maxW="320px">
          {(["sm", "md", "lg"] as const).map((size) => (
            <Box key={size}>
              <Text fontSize="xs" color="fg.muted" mb={4}>{size}</Text>
              {S({ defaultValue: [50], colorPalette: "blue", size })}
            </Box>
          ))}
        </Stack>
      </Frame>

      {/* ── With Marks ───────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "با علامت‌گذاری" : "With Marks"}>
        <Stack gap={10} maxW="320px">
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "اعداد" : "Numeric marks"}</Text>
            {S({
              defaultValue: [25],
              colorPalette: "blue",
              marks: [0, 25, 50, 75, 100],
            })}
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "با برچسب" : "Labeled marks"}</Text>
            {S({
              defaultValue: [50],
              colorPalette: "teal",
              marks: [
                { value: 0, label: isRtl ? "کم" : "Low" },
                { value: 50, label: isRtl ? "متوسط" : "Mid" },
                { value: 100, label: isRtl ? "زیاد" : "High" },
              ],
            })}
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "بازه‌ای با علامت" : "Range with marks"}</Text>
            {S({
              defaultValue: [20, 80],
              colorPalette: "purple",
              marks: [0, 20, 40, 60, 80, 100],
            })}
          </Box>
        </Stack>
      </Frame>

      {/* ── States ───────────────────────────────────────────────────────── */}
      <Frame title={isRtl ? "حالت‌ها" : "States"}>
        <Stack gap={8} maxW="320px">
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "غیرفعال" : "Disabled"}</Text>
            {S({ defaultValue: [40], colorPalette: "blue", disabled: true })}
          </Box>
          <Box>
            <Text fontSize="xs" color="fg.muted" mb={4}>{isRtl ? "فقط خواندنی" : "Read only"}</Text>
            {S({ defaultValue: [65], colorPalette: "blue", readOnly: true })}
          </Box>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Number Input ──────────────────────────────────────────────────────────────
export function NumberInputSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const locale = isRtl ? "fa-IR-u-nu-arabext" : undefined;
  return (
    <ComponentSection
      id="number-input"
      title="Number Input"
      description="Numeric input with increment and decrement controls."
    >
      <Frame title="Default">
        <Wrap gap={4}>
          <NumberInput.Root
            w="140px"
            defaultValue="10"
            dir={isRtl ? "rtl" : undefined}
            {...(locale ? { locale } : {})}
          >
            <NumberInput.Input
              {...(isRtl ? { dir: "ltr", textAlign: "end" } : {})}
            />
            <NumberInput.Control borderColor="border">
              <NumberInput.IncrementTrigger borderColor="border" />
              <NumberInput.DecrementTrigger borderColor="border" />
            </NumberInput.Control>
          </NumberInput.Root>
          <NumberInput.Root
            w="140px"
            defaultValue="0"
            min={0}
            max={100}
            dir={isRtl ? "rtl" : undefined}
            {...(locale ? { locale } : {})}
          >
            <NumberInput.Input
              {...(isRtl ? { dir: "ltr", textAlign: "end" } : {})}
            />
            <NumberInput.Control borderColor="border">
              <NumberInput.IncrementTrigger borderColor="border" />
              <NumberInput.DecrementTrigger borderColor="border" />
            </NumberInput.Control>
          </NumberInput.Root>
        </Wrap>
      </Frame>
    </ComponentSection>
  );
}

// ─── Pin Input ─────────────────────────────────────────────────────────────────
export function PinInputSection() {
  return (
    <ComponentSection
      id="pin-input"
      title="Pin Input"
      description="OTP / PIN code entry with auto-focus advancement."
    >
      <Frame title="Default">
        <Stack gap={4}>
          <PinInput.Root>
            <PinInput.HiddenInput />
            <PinInput.Control dir="ltr">
              {[0, 1, 2, 3].map((i) => (
                <PinInput.Input key={i} index={i} />
              ))}
            </PinInput.Control>
          </PinInput.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Rating ─────────────────────────────────────────────────────────────────
export function RatingSection() {
  return (
    <ComponentSection
      id="rating"
      title="Rating"
      description="Star rating input with customizable count and sizes."
    >
      <Frame title="Sizes">
        <Stack gap={3}>
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <HStack key={s} gap={3} align="center">
              <Text fontSize="xs" color="fg.muted" w="6" textAlign="end">{s}</Text>
              <RatingGroup.Root size={s} defaultValue={3} count={5} colorPalette="orange">
                <RatingGroup.HiddenInput />
                <RatingGroup.Control>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RatingGroup.Item key={i} index={i + 1}>
                      <RatingGroup.ItemIndicator />
                    </RatingGroup.Item>
                  ))}
                </RatingGroup.Control>
              </RatingGroup.Root>
            </HStack>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── File Upload ──────────────────────────────────────────────────────────────
export function FileUploadSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="file-upload"
      title="File Upload"
      description="File selection with drag & drop dropzone and button trigger variants."
    >
      <Frame title="Dropzone">
        <HStack gap={4} align="stretch" flexWrap="wrap">
          <FileUpload.Root>
            <FileUpload.Dropzone borderColor="border" minW="200px" flex={1}>
              <Box color="fg.muted">
                <Upload size={24} />
              </Box>
              <FileUpload.DropzoneContent>
                <Text fontWeight="medium" fontSize="sm">
                  {isRtl ? "فایل‌ها را اینجا رها کنید" : "Drop files here"}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {isRtl ? "یا برای انتخاب کلیک کنید" : "or click to browse"}
                </Text>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.HiddenInput />
          </FileUpload.Root>

          <FileUpload.Root maxFiles={3}>
            <FileUpload.Dropzone borderColor="border" minW="200px" flex={1}>
              <FileUpload.DropzoneContent>
                <Text fontSize="sm" fontWeight="medium">
                  {isRtl ? "فایل‌ها را اضافه کنید" : "Attach files"}
                </Text>
                <Text fontSize="xs" color="fg.muted">
                  {isRtl ? "حداکثر ۳ فایل" : "Up to 3 files"}
                </Text>
              </FileUpload.DropzoneContent>
            </FileUpload.Dropzone>
            <FileUpload.HiddenInput />
          </FileUpload.Root>
        </HStack>
      </Frame>

      <Frame title="Button Trigger">
        <Stack gap={3} align="flex-start">
          {(["sm", "md", "lg"] as const).map((s) => (
            <FileUpload.Root key={s}>
              <FileUpload.Trigger asChild>
                <Button size={s} variant="outline" colorPalette="blue">
                  <Upload size={14} />
                  {isRtl ? `آپلود فایل (${s})` : `Upload File (${s})`}
                </Button>
              </FileUpload.Trigger>
              <FileUpload.HiddenInput />
            </FileUpload.Root>
          ))}
        </Stack>
      </Frame>

      <Frame title="With File List">
        <FileUpload.Root maxW="360px" maxFiles={3}>
          <FileUpload.Dropzone borderColor="border">
            <FileUpload.DropzoneContent>
              <Text fontSize="sm" fontWeight="medium">
                {isRtl ? "فایل‌ها را اضافه کنید" : "Attach files"}
              </Text>
              <Text fontSize="xs" color="fg.muted">
                {isRtl ? "حداکثر ۳ فایل" : "Up to 3 files"}
              </Text>
            </FileUpload.DropzoneContent>
          </FileUpload.Dropzone>
          <FileUpload.ItemGroup mt={3}>
            <FileUpload.Context>
              {({ acceptedFiles }) =>
                acceptedFiles.map((file) => (
                  <FileUpload.Item key={file.name} file={file}>
                    <FileUpload.ItemPreview asChild>
                      <File size={16} />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <FileUpload.ItemDeleteTrigger asChild>
                      <CloseButton size="xs" />
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>
                ))
              }
            </FileUpload.Context>
          </FileUpload.ItemGroup>
          <FileUpload.HiddenInput />
        </FileUpload.Root>
      </Frame>

      <Frame title="States">
        <Stack gap={3} maxW="280px">
          <FileUpload.Root>
            <FileUpload.Trigger asChild>
              <Button variant="outline" colorPalette="gray" w="full">
                {isRtl ? "انتخاب فایل" : "Choose file"}
              </Button>
            </FileUpload.Trigger>
            <FileUpload.HiddenInput />
          </FileUpload.Root>
          <FileUpload.Root disabled>
            <FileUpload.Trigger asChild>
              <Button variant="outline" colorPalette="gray" w="full" disabled>
                {isRtl ? "غیرفعال" : "Disabled"}
              </Button>
            </FileUpload.Trigger>
            <FileUpload.HiddenInput />
          </FileUpload.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Color Picker ─────────────────────────────────────────────────────────────
export function ColorPickerSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const presetColors = [
    "#f87171", "#fb923c", "#facc15",
    "#4ade80", "#2dd4bf", "#60a5fa",
    "#c084fc", "#f472b6",
  ];

  return (
    <ComponentSection
      id="color-picker"
      title="Color Picker"
      description="Full-featured color selection with area, sliders, eye dropper and presets."
    >
      <Frame title="Full Picker">
        <ColorPicker.Root defaultValue={parseColor("#3B82F6")} maxW="240px">
          <ColorPicker.HiddenInput />
          <ColorPicker.Control>
            <ColorPicker.ChannelInput channel="hex" />
            <ColorPicker.Trigger />
          </ColorPicker.Control>
          <Portal>
            <ColorPicker.Positioner>
              <ColorPicker.Content>
                <ColorPicker.Area>
                  <ColorPicker.AreaBackground />
                  <ColorPicker.AreaThumb />
                </ColorPicker.Area>
                <HStack mt={3} gap={3}>
                  <ColorPicker.EyeDropperTrigger asChild>
                    <IconButton size="xs" variant="outline" aria-label="Eye dropper">
                      <Eye size={12} />
                    </IconButton>
                  </ColorPicker.EyeDropperTrigger>
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
                  <ColorPicker.ValueSwatch boxSize={8} borderRadius="md" flexShrink={0}>
                    <ColorPicker.SwatchBackground />
                  </ColorPicker.ValueSwatch>
                </HStack>
                <HStack mt={3} gap={2}>
                  <ColorPicker.ChannelInput channel="hex" flex={1} />
                  <ColorPicker.ChannelInput channel="alpha" w="16" />
                </HStack>
              </ColorPicker.Content>
            </ColorPicker.Positioner>
          </Portal>
        </ColorPicker.Root>
      </Frame>

      <Frame title="Inline with Swatches">
        <ColorPicker.Root defaultValue={parseColor("#10B981")} maxW="240px">
          <ColorPicker.HiddenInput />
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <Stack mt={3} gap={2}>
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
          <ColorPicker.SwatchGroup mt={3}>
            {presetColors.map((color) => (
              <ColorPicker.SwatchTrigger key={color} value={color}>
                <ColorPicker.Swatch value={color} boxSize={6} borderRadius="md">
                  <ColorPicker.SwatchBackground />
                </ColorPicker.Swatch>
              </ColorPicker.SwatchTrigger>
            ))}
          </ColorPicker.SwatchGroup>
          <HStack mt={3} gap={2}>
            <ColorPicker.ChannelInput channel="hex" flex={1} />
          </HStack>
        </ColorPicker.Root>
      </Frame>

      <Frame title="Swatch Only">
        <Stack gap={2}>
          <Text fontSize="xs" color="fg.muted">
            {isRtl ? "رنگ پیش‌فرض" : "Preset colors"}
          </Text>
          <ColorPicker.Root defaultValue={parseColor("#8B5CF6")}>
            <ColorPicker.HiddenInput />
            <ColorPicker.SwatchGroup>
              {presetColors.map((color) => (
                <ColorPicker.SwatchTrigger key={color} value={color}>
                  <ColorPicker.Swatch value={color} boxSize={7} borderRadius="md">
                    <ColorPicker.SwatchBackground />
                    <ColorPicker.SwatchIndicator boxSize={3} />
                  </ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
            <HStack mt={3} gap={2}>
              <ColorPicker.ValueSwatch boxSize={8} borderRadius="md" flexShrink={0}>
                <ColorPicker.SwatchBackground />
              </ColorPicker.ValueSwatch>
            </HStack>
          </ColorPicker.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Password Input ───────────────────────────────────────────────────────────
export function PasswordInputSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const [shown, setShown] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setShown((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <ComponentSection
      id="password-input"
      title="Password Input"
      description="Secure text input with show/hide toggle, sizes and validation states."
    >
      <Frame title="Default">
        <Stack gap={3} maxW="300px">
          <Field.Root>
            <Field.Label>{isRtl ? "رمز عبور" : "Password"}</Field.Label>
            <InputGroup
              endElement={
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label={shown["default"] ? "Hide password" : "Show password"}
                  onClick={() => toggle("default")}
                >
                  {shown["default"] ? <EyeOff size={14} /> : <Eye size={14} />}
                </IconButton>
              }
            >
              <Input
                type={shown["default"] ? "text" : "password"}
                placeholder={isRtl ? "رمز عبور خود را وارد کنید" : "Enter your password"}
              />
            </InputGroup>
          </Field.Root>
        </Stack>
      </Frame>

      <Frame title="Sizes">
        <Stack gap={3} maxW="300px">
          {(["sm", "md", "lg"] as const).map((s) => (
            <InputGroup
              key={s}
              size={s}
              endElement={
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label="Toggle password"
                  onClick={() => toggle(s)}
                >
                  {shown[s] ? <EyeOff size={12} /> : <Eye size={12} />}
                </IconButton>
              }
            >
              <Input
                size={s}
                type={shown[s] ? "text" : "password"}
                placeholder={isRtl ? `رمز عبور (${s})` : `Password (${s})`}
              />
            </InputGroup>
          ))}
        </Stack>
      </Frame>

      <Frame title="States">
        <Stack gap={3} maxW="300px">
          <InputGroup
            endElement={
              <IconButton size="xs" variant="ghost" aria-label="Show">
                <Eye size={14} />
              </IconButton>
            }
          >
            <Input
              type="password"
              placeholder={isRtl ? "پیش‌فرض" : "Default"}
            />
          </InputGroup>

          <InputGroup
            endElement={
              <IconButton size="xs" variant="ghost" aria-label="Show" disabled>
                <Eye size={14} />
              </IconButton>
            }
          >
            <Input
              type="password"
              placeholder={isRtl ? "غیرفعال" : "Disabled"}
              disabled
            />
          </InputGroup>

          <Field.Root invalid>
            <InputGroup
              endElement={
                <IconButton size="xs" variant="ghost" aria-label="Show">
                  <Eye size={14} />
                </IconButton>
              }
            >
              <Input
                type="password"
                defaultValue="short"
              />
            </InputGroup>
            <Field.ErrorText>
              {isRtl
                ? "رمز عبور باید حداقل ۸ کاراکتر باشد"
                : "Password must be at least 8 characters."}
            </Field.ErrorText>
          </Field.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}
// ─── Calendar ─────────────────────────────────────────────────────────────────
export function CalendarSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  const prevIcon = isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />;
  const nextIcon = isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />;

  return (
    <ComponentSection
      id="calendar"
      title="Calendar"
      description="Standalone calendar for date display and selection without input field."
    >
      <Frame title="Default">
        <DatePicker.Root open closeOnSelect={false} fixedWeeks maxW="280px">
          <DatePicker.Content position="static" boxShadow="none" p={0}>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>{prevIcon}</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>{nextIcon}</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {api.weekDays.map((wd, i) => (
                            <DatePicker.TableHeader key={i}>
                              {isRtl ? wd.short.charAt(0) : wd.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {api.weeks.map((week, i) => (
                          <DatePicker.TableRow key={i}>
                            {week.map((day, j) => (
                              <DatePicker.TableCell key={j} value={day}>
                                <DatePicker.TableCellTrigger>
                                  {isRtl ? toFarsi(day.day) : day.day}
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
        </DatePicker.Root>
      </Frame>

      <Frame title="Range Selection">
        <DatePicker.Root open closeOnSelect={false} fixedWeeks selectionMode="range" maxW="280px">
          <DatePicker.Content position="static" boxShadow="none" p={0}>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>{prevIcon}</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>{nextIcon}</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {api.weekDays.map((wd, i) => (
                            <DatePicker.TableHeader key={i}>
                              {isRtl ? wd.short.charAt(0) : wd.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {api.weeks.map((week, i) => (
                          <DatePicker.TableRow key={i}>
                            {week.map((day, j) => (
                              <DatePicker.TableCell key={j} value={day}>
                                <DatePicker.TableCellTrigger>
                                  {isRtl ? toFarsi(day.day) : day.day}
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
        </DatePicker.Root>
      </Frame>

      <Frame title="Multiple Selection">
        <DatePicker.Root open closeOnSelect={false} fixedWeeks selectionMode="multiple" maxW="280px">
          <DatePicker.Content position="static" boxShadow="none" p={0}>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(api) => (
                  <>
                    <DatePicker.ViewControl>
                      <DatePicker.PrevTrigger>{prevIcon}</DatePicker.PrevTrigger>
                      <DatePicker.ViewTrigger>
                        <DatePicker.RangeText />
                      </DatePicker.ViewTrigger>
                      <DatePicker.NextTrigger>{nextIcon}</DatePicker.NextTrigger>
                    </DatePicker.ViewControl>
                    <DatePicker.Table>
                      <DatePicker.TableHead>
                        <DatePicker.TableRow>
                          {api.weekDays.map((wd, i) => (
                            <DatePicker.TableHeader key={i}>
                              {isRtl ? wd.short.charAt(0) : wd.short}
                            </DatePicker.TableHeader>
                          ))}
                        </DatePicker.TableRow>
                      </DatePicker.TableHead>
                      <DatePicker.TableBody>
                        {api.weeks.map((week, i) => (
                          <DatePicker.TableRow key={i}>
                            {week.map((day, j) => (
                              <DatePicker.TableCell key={j} value={day}>
                                <DatePicker.TableCellTrigger>
                                  {isRtl ? toFarsi(day.day) : day.day}
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
        </DatePicker.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Shared helper: day-view grid (reused in DatePickerSection) ───────────────
function DayGrid({ api, isRtl }: {
  api: { weekDays: { short: string; long: string }[]; weeks: any[][] };
  isRtl?: boolean;
}) {
  const prevIcon = isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />;
  const nextIcon = isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />;
  return (
    <>
      <DatePicker.ViewControl>
        <DatePicker.PrevTrigger>{prevIcon}</DatePicker.PrevTrigger>
        <DatePicker.ViewTrigger>
          <DatePicker.RangeText />
        </DatePicker.ViewTrigger>
        <DatePicker.NextTrigger>{nextIcon}</DatePicker.NextTrigger>
      </DatePicker.ViewControl>
      <DatePicker.Table>
        <DatePicker.TableHead>
          <DatePicker.TableRow>
            {api.weekDays.map((wd, i) => (
              <DatePicker.TableHeader key={i}>
                {isRtl ? wd.short.charAt(0) : wd.short}
              </DatePicker.TableHeader>
            ))}
          </DatePicker.TableRow>
        </DatePicker.TableHead>
        <DatePicker.TableBody>
          {api.weeks.map((week, i) => (
            <DatePicker.TableRow key={i}>
              {week.map((day: any, j: number) => (
                <DatePicker.TableCell key={j} value={day}>
                  <DatePicker.TableCellTrigger>
                    {isRtl ? toFarsi(day.day) : day.day}
                  </DatePicker.TableCellTrigger>
                </DatePicker.TableCell>
              ))}
            </DatePicker.TableRow>
          ))}
        </DatePicker.TableBody>
      </DatePicker.Table>
    </>
  );
}

// ─── Date Picker ──────────────────────────────────────────────────────────────
export function DatePickerSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="date-picker"
      title="Date Picker"
      description="Date input with calendar popover, range selection and time support."
    >
      {/* ── Sizes ─────────────────────────────────────────────────────────── */}
      <Frame title="Sizes">
        <Stack gap={4} maxW="280px">
          {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
            <Field.Root key={s}>
              <Field.Label>{isRtl ? `اندازه ${s}` : `Select date - ${s}`}</Field.Label>
              <DatePicker.Root size={s}>
                <DatePicker.Control>
                  <InputGroup
                    size={s}
                    endElement={
                      <DatePicker.Trigger asChild>
                        <IconButton variant="ghost" size="xs" aria-label="Open calendar">
                          <Calendar size={13} />
                        </IconButton>
                      </DatePicker.Trigger>
                    }
                  >
                    <DatePicker.Input placeholder={isRtl ? "روز/ماه/سال" : "mm/dd/yyyy"} />
                  </InputGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Context>
                          {(dp) => <DayGrid api={dp} isRtl={isRtl} />}
                        </DatePicker.Context>
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
            </Field.Root>
          ))}
        </Stack>
      </Frame>

      {/* ── Variants ──────────────────────────────────────────────────────── */}
      <Frame title="Variants">
        <Stack gap={4} maxW="280px">
          {(["outline", "subtle", "flushed"] as const).map((v) => (
            <Field.Root key={v}>
              <Field.Label>{isRtl ? `نوع ${v}` : `Select date - ${v}`}</Field.Label>
              <DatePicker.Root>
                <DatePicker.Control>
                  <InputGroup
                    endElement={
                      <DatePicker.Trigger asChild>
                        <IconButton variant="ghost" size="xs" aria-label="Open calendar">
                          <Calendar size={13} />
                        </IconButton>
                      </DatePicker.Trigger>
                    }
                  >
                    <DatePicker.Input
                      variant={v}
                      placeholder={isRtl ? "روز/ماه/سال" : "mm/dd/yyyy"}
                    />
                  </InputGroup>
                </DatePicker.Control>
                <Portal>
                  <DatePicker.Positioner>
                    <DatePicker.Content>
                      <DatePicker.View view="day">
                        <DatePicker.Context>
                          {(dp) => <DayGrid api={dp} isRtl={isRtl} />}
                        </DatePicker.Context>
                      </DatePicker.View>
                    </DatePicker.Content>
                  </DatePicker.Positioner>
                </Portal>
              </DatePicker.Root>
            </Field.Root>
          ))}
        </Stack>
      </Frame>

      {/* ── Range Selection ──────────────────────────────────────────────── */}
      <Frame title="Range Selection">
        <Field.Root>
          <Field.Label>{isRtl ? "انتخاب بازه" : "Select range"}</Field.Label>
          <DatePicker.Root
            selectionMode="range"
            positioning={{ placement: "bottom-start" }}
          >
            <DatePicker.Control>
              <HStack gap={2} flexWrap="nowrap">
                <DatePicker.Input
                  index={0}
                  placeholder={isRtl ? "تاریخ شروع" : "Start date"}
                  maxW="140px"
                />
                {/* Second input with trigger icon as a direct flex sibling (not absolute) */}
                <Box
                  display="flex"
                  alignItems="stretch"
                  borderWidth="1px"
                  borderColor="border"
                  borderRadius="md"
                  maxW="165px"
                  flex={1}
                  overflow="hidden"
                >
                  <DatePicker.Input
                    index={1}
                    placeholder={isRtl ? "تاریخ پایان" : "End date"}
                    border="none"
                    borderRadius={0}
                    flex={1}
                    minW={0}
                    _focusVisible={{ outline: "none", boxShadow: "none" }}
                  />
                  <DatePicker.Trigger asChild>
                    <IconButton
                      variant="ghost"
                      size="xs"
                      aria-label="Open calendar"
                      borderRadius={0}
                      borderStartWidth="1px"
                      borderColor="border"
                      flexShrink={0}
                      px={2}
                      h="auto"
                    >
                      <Calendar size={13} />
                    </IconButton>
                  </DatePicker.Trigger>
                </Box>
              </HStack>
            </DatePicker.Control>
            <Portal>
              <DatePicker.Positioner>
                <DatePicker.Content>
                  <DatePicker.View view="day">
                    <DatePicker.Context>
                      {(dp) => <DayGrid api={dp} isRtl={isRtl} />}
                    </DatePicker.Context>
                  </DatePicker.View>
                </DatePicker.Content>
              </DatePicker.Positioner>
            </Portal>
          </DatePicker.Root>
        </Field.Root>
      </Frame>

      {/* ── Inline (no input trigger) ─────────────────────────────────────── */}
      <Frame title="Inline (no input trigger)">
        <DatePicker.Root open maxW="280px">
          <DatePicker.Content position="static" boxShadow="none" p={0}>
            <DatePicker.View view="day">
              <DatePicker.Context>
                {(dp) => <DayGrid api={dp} isRtl={isRtl} />}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Root>
      </Frame>

      {/* ── States ────────────────────────────────────────────────────────── */}
      <Frame title="States">
        <Stack gap={4} maxW="280px">
          <Field.Root>
            <Field.Label>{isRtl ? "تاریخ پیش‌فرض" : "Default"}</Field.Label>
            <DatePicker.Root>
              <DatePicker.Control>
                <InputGroup
                  endElement={
                    <DatePicker.Trigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Open calendar">
                        <Calendar size={13} />
                      </IconButton>
                    </DatePicker.Trigger>
                  }
                >
                  <DatePicker.Input placeholder={isRtl ? "انتخاب تاریخ" : "Select date"} />
                </InputGroup>
              </DatePicker.Control>
              <Portal>
                <DatePicker.Positioner>
                  <DatePicker.Content>
                    <DatePicker.View view="day">
                      <DatePicker.Context>
                        {(dp) => <DayGrid api={dp} isRtl={isRtl} />}
                      </DatePicker.Context>
                    </DatePicker.View>
                  </DatePicker.Content>
                </DatePicker.Positioner>
              </Portal>
            </DatePicker.Root>
          </Field.Root>

          <Field.Root disabled>
            <Field.Label>{isRtl ? "غیرفعال" : "Disabled"}</Field.Label>
            <DatePicker.Root disabled>
              <DatePicker.Control>
                <InputGroup
                  endElement={
                    <DatePicker.Trigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Open calendar" disabled>
                        <Calendar size={13} />
                      </IconButton>
                    </DatePicker.Trigger>
                  }
                >
                  <DatePicker.Input placeholder={isRtl ? "غیرفعال" : "Disabled"} />
                </InputGroup>
              </DatePicker.Control>
            </DatePicker.Root>
          </Field.Root>

          <Field.Root invalid>
            <Field.Label>{isRtl ? "نامعتبر" : "Invalid"}</Field.Label>
            <DatePicker.Root>
              <DatePicker.Control>
                <InputGroup
                  endElement={
                    <DatePicker.Trigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Open calendar">
                        <Calendar size={13} />
                      </IconButton>
                    </DatePicker.Trigger>
                  }
                >
                  <DatePicker.Input placeholder={isRtl ? "تاریخ نامعتبر" : "Invalid date"} />
                </InputGroup>
              </DatePicker.Control>
            </DatePicker.Root>
            <Field.ErrorText>
              {isRtl ? "لطفاً یک تاریخ معتبر انتخاب کنید" : "Please select a valid date"}
            </Field.ErrorText>
          </Field.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}