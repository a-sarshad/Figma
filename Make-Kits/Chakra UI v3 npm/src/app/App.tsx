import React, { useState, useCallback } from "react";
import {
  ChakraProvider,
  defaultSystem,
  Theme,
  Box,
  Stack,
  Spinner,
  LocaleProvider,
  Portal,
  Toaster,
  Toast,
} from "@chakra-ui/react";
import { toaster } from "./lib/toaster";
import { Sidebar, type Direction, type ColorMode } from "./components/Sidebar";
import { DirectionContext } from "./context/DirectionContext";
import {
  ColorsSection,
  TypographySection,
  SpacingSection,
} from "./components/sections/FoundationsSection";
import {
  ButtonSection,
  BadgeSection,
  TagSection,
  AvatarSection,
  CardSection,
  AlertSection,
  StatSection,
} from "./components/sections/CoreSection";
import {
  InputSection,
  TextareaSection,
  SelectSection,
  CheckboxSection,
  RadioSection,
  SwitchSection,
  SliderSection,
  NumberInputSection,
  PinInputSection,
  RatingSection,
  FileUploadSection,
  ColorPickerSection,
  PasswordInputSection,
  CalendarSection,
  DatePickerSection,
} from "./components/sections/FormsSection";
import {
  TabsSection,
  BreadcrumbSection,
  AccordionSection,
  SegmentedSection,
  StepsSection,
  PaginationSection,
} from "./components/sections/NavigationSection";
import {
  TableSection,
  ListSection,
  ProgressSection,
  SpinnerSection,
  SkeletonSection,
  ColorSwatchSection,
  TimelineSection,
  DataListSection,
  EmptyStateSection,
  QrCodeSection,
} from "./components/sections/DataDisplaySection";
import { TreeViewSection } from "./components/sections/TreeViewSection";
import {
  TooltipSection,
  DialogSection,
  DrawerSection,
  PopoverSection,
  MenuSection,
  HoverCardSection,
} from "./components/sections/OverlaysSection";
import { ToastSection } from "./components/sections/ToastSection";
import { PlacementToasters } from "./components/PlacementToasters";
import {
  LayoutSection,
  SeparatorSection,
  ImageSection,
  LinkSection,
  CloseButtonSection,
} from "./components/sections/UtilitiesSection";

export default function App() {
  const [dir, setDir] = useState<Direction>("ltr");
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [activeSection, setActiveSection] = useState("button");

  const handleNavClick = useCallback((id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <ChakraProvider value={defaultSystem}>
      <LocaleProvider locale={dir === "rtl" ? "fa-IR-u-nu-arabext" : "en-US"}>
        <Theme appearance={colorMode}>
          {/* ── Main Toaster ─────────────────────────────────────── */}
          <Portal>
            <Theme appearance={colorMode}>
            <Toaster toaster={toaster} insetInline={{ mdDown: "auto" }}>
              {(toast) => (
                <Toast.Root width={{ md: "sm" }}>
                  {toast.type === "loading" ? (
                    <Spinner size="sm" color="blue.solid" />
                  ) : (
                    <Toast.Indicator />
                  )}
                  <Stack gap="1" flex="1" maxWidth="100%">
                    {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
                    {toast.description && (
                      <Toast.Description>{toast.description}</Toast.Description>
                    )}
                  </Stack>
                  {toast.action && (
                    <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
                  )}
                  <Toast.CloseTrigger />
                </Toast.Root>
              )}
            </Toaster>
            </Theme>
          </Portal>

          {/* ── Placement Demo Toasters (6 positions) ────────────── */}
          <PlacementToasters colorMode={colorMode} />

          <DirectionContext.Provider value={dir}>
            <Box
              dir={dir}
              fontFamily={dir === "rtl" ? "'Vazirmatn', sans-serif" : undefined}
              display="flex"
              h="100vh"
              overflow="hidden"
              bg="bg"
              color="fg"
            >
              {/* ── Sidebar ─────────────────────────────────────────── */}
              <Sidebar
                dir={dir}
                colorMode={colorMode}
                setDir={setDir}
                setColorMode={setColorMode}
                activeSection={activeSection}
                onNavClick={handleNavClick}
              />

              {/* ── Main Content ─────────────────────────────────────── */}
              <Box flex="1" overflowY="auto" px={10} py={8}>
                {/* FOUNDATIONS */}
                <ColorsSection />
                <TypographySection />
                <SpacingSection />

                {/* CORE */}
                <ButtonSection />
                <BadgeSection />
                <TagSection />
                <AvatarSection />
                <CardSection />
                <AlertSection />
                <StatSection />

                {/* FORMS */}
                <InputSection />
                <TextareaSection />
                <SelectSection />
                <CheckboxSection />
                <RadioSection />
                <SwitchSection />
                <SliderSection />
                <NumberInputSection />
                <PinInputSection />
                <RatingSection />
                <FileUploadSection />
                <ColorPickerSection />
                <PasswordInputSection />
                <CalendarSection />
                <DatePickerSection />

                {/* NAVIGATION */}
                <TabsSection />
                <BreadcrumbSection />
                <AccordionSection />
                <SegmentedSection />
                <StepsSection />
                <PaginationSection />

                {/* DATA DISPLAY */}
                <TableSection />
                <ListSection />
                <ProgressSection />
                <SpinnerSection />
                <SkeletonSection />
                <ColorSwatchSection />
                <QrCodeSection />
                <TimelineSection />
                <DataListSection />
                <EmptyStateSection />
                <TreeViewSection />

                {/* OVERLAYS */}
                <TooltipSection />
                <DialogSection />
                <DrawerSection />
                <PopoverSection />
                <MenuSection />
                <HoverCardSection />
                <ToastSection />

                {/* UTILITIES */}
                <LayoutSection />
                <SeparatorSection />
                <ImageSection />
                <LinkSection />
                <CloseButtonSection />
              </Box>
            </Box>
          </DirectionContext.Provider>
        </Theme>
      </LocaleProvider>
    </ChakraProvider>
  );
}