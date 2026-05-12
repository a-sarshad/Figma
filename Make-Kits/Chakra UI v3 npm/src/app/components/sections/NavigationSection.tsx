import React, { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  Stack,
  Wrap,
  Text,
  Badge,
  Tabs,
  Breadcrumb,
  Accordion,
  SegmentGroup,
  Avatar,
  Steps,
  Button,
  IconButton,
} from "@chakra-ui/react";
import {
  ChevronRight,
  ChevronLeft,
  Ellipsis,
  Tag as TagIcon,
  BarChart2,
  Settings,
  LayoutGrid,
  Columns2,
  List as ListIcon,
  User,
  FileText,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { toFarsi } from "../../lib/farsi";
import { useDirection } from "../../context/DirectionContext";

// ─── Tabs ─────────────────────────────────────────────────────────────────────
export function TabsSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const tabs = isRtl
    ? ["برگه ۱", "برگه ۲", "برگه ۳"]
    : ["Tab 1", "Tab 2", "Tab 3"];
  const content = isRtl
    ? ["محتوای برگه اول", "محتوای برگه دوم", "محتوای برگه سوم"]
    : ["Content for Tab 1", "Content for Tab 2", "Content for Tab 3"];

  return (
    <ComponentSection
      id="tabs"
      title="Tabs"
      description="Tabbed interface with variants, sizes and lazy loading support."
    >
      <Frame title="Variants">
        <Stack gap={8} align="flex-start">
          {(["line", "enclosed", "plain"] as const).map((v) => (
            <Box key={v} w="100%" maxW="420px">
              <Text fontSize="xs" color="fg.muted" mb={2}>{v}</Text>
              <Tabs.Root variant={v} defaultValue="tab1" colorPalette="blue">
                <Tabs.List>
                  {tabs.map((t, i) => (
                    <Tabs.Trigger key={i} value={`tab${i + 1}`}>
                      {t}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                {content.map((c, i) => (
                  <Tabs.Content key={i} value={`tab${i + 1}`}>
                    <Text p={3} fontSize="sm">{c}</Text>
                  </Tabs.Content>
                ))}
              </Tabs.Root>
            </Box>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────
export function BreadcrumbSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  const items = isRtl
    ? [
        { label: "خانه", href: "#" },
        { label: "کامپوننت‌ها", href: "#" },
        { label: "دکمه", current: true },
      ]
    : [
        { label: "Home", href: "#" },
        { label: "Components", href: "#" },
        { label: "Button", current: true },
      ];

  return (
    <ComponentSection
      id="breadcrumb"
      title="Breadcrumb"
      description="Navigation trail showing current page location."
    >
      <Frame title="Default — with ChevronRight separator (auto-flips in RTL)">
        <Stack gap={4} align="flex-start">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              {items.map((item, i) => (
                <React.Fragment key={i}>
                  <Breadcrumb.Item>
                    {item.current ? (
                      <Breadcrumb.CurrentLink>{item.label}</Breadcrumb.CurrentLink>
                    ) : (
                      <Breadcrumb.Link href={item.href}>{item.label}</Breadcrumb.Link>
                    )}
                  </Breadcrumb.Item>
                  {i < items.length - 1 && (
                    <Breadcrumb.Separator>
                      <ChevronRight size={12} />
                    </Breadcrumb.Separator>
                  )}
                </React.Fragment>
              ))}
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Stack>
      </Frame>

      <Frame title="Sizes">
        <Stack gap={3} align="flex-start">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Breadcrumb.Root key={s} size={s}>
              <Breadcrumb.List>
                {items.map((item, i) => (
                  <React.Fragment key={i}>
                    <Breadcrumb.Item>
                      {item.current ? (
                        <Breadcrumb.CurrentLink>{item.label}</Breadcrumb.CurrentLink>
                      ) : (
                        <Breadcrumb.Link href={item.href}>{item.label}</Breadcrumb.Link>
                      )}
                    </Breadcrumb.Item>
                    {i < items.length - 1 && (
                      <Breadcrumb.Separator>
                        <ChevronRight size={12} />
                      </Breadcrumb.Separator>
                    )}
                  </React.Fragment>
                ))}
              </Breadcrumb.List>
            </Breadcrumb.Root>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────
export function AccordionSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const items = isRtl
    ? [
        { value: "a", label: "بخش اول", body: "محتوای بخش اول در اینجا قرار دارد." },
        { value: "b", label: "بخش دوم", body: "محتوای بخش دوم در اینجا قرار دارد." },
        { value: "c", label: "بخش سوم", body: "محتوای بخش سوم در اینجا قرار دارد." },
      ]
    : [
        { value: "a", label: "Section One", body: "Content for section one." },
        { value: "b", label: "Section Two", body: "Content for section two." },
        { value: "c", label: "Section Three", body: "Content for section three." },
      ];

  return (
    <ComponentSection
      id="accordion"
      title="Accordion"
      description="Collapsible sections for progressive disclosure of content."
    >
      <Frame title="Variants">
        <Wrap gap={6} align="flex-start">
          {(["outline", "subtle", "enclosed", "plain"] as const).map((v) => (
            <Box key={v}>
              <Text fontSize="xs" color="fg.muted" mb={2}>{v}</Text>
              <Accordion.Root
                variant={v}
                w="260px"
                collapsible
                defaultValue={["a"]}
                {...(v === "enclosed" ? { borderColor: "border" } : {})}
              >
                {items.map(({ value, label, body }) => (
                  <Accordion.Item
                    key={value}
                    value={value}
                    {...(v === "outline" || v === "enclosed"
                      ? { borderColor: "border" }
                      : {})}
                  >
                    <Accordion.ItemTrigger>
                      <Box as="span" flex="1" textAlign="start">
                        {label}
                      </Box>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Accordion.ItemBody>{body}</Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </Box>
          ))}
        </Wrap>
      </Frame>

      <Frame title="Multiple open">
        <Accordion.Root variant="enclosed" w="380px" multiple borderColor="border">
          {["Alpha", "Beta", "Gamma"].map((label) => (
            <Accordion.Item key={label} value={label} borderColor="border">
              <Accordion.ItemTrigger>
                <Box as="span" flex="1" textAlign="start">
                  {label}
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  {isRtl
                    ? `محتوا برای ${label}. چند آیتم می‌توانند همزمان باز باشند.`
                    : `Content for ${label}. Multiple items can be open at once.`}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Frame>

      <Frame title="With Avatar">
        <Accordion.Root variant="outline" w="480px" collapsible>
          {[
            {
              name: "Alex",
              badge: null,
              img: "https://images.unsplash.com/photo-1680104073282-8462cdf70b6a?w=80&q=80",
            },
            {
              name: "Benji",
              badge: isRtl ? "برترین" : "Top Rated",
              img: "https://images.unsplash.com/photo-1628619487925-e9b8fc4c6b08?w=80&q=80",
            },
            {
              name: "Charlie",
              badge: null,
              img: "https://images.unsplash.com/photo-1634595705439-93ddc4909c9e?w=80&q=80",
            },
          ].map(({ name, badge, img }) => (
            <Accordion.Item key={name} value={name} borderColor="border">
              <Accordion.ItemTrigger>
                <HStack flex="1" gap={3}>
                  <Avatar.Root size="sm" shape="rounded">
                    <Avatar.Image src={img} alt={name} />
                    <Avatar.Fallback name={name} />
                  </Avatar.Root>
                  <Text fontWeight="medium">{name}</Text>
                  {badge && (
                    <Badge colorPalette="green" variant="subtle" size="sm">
                      🏆 {badge}
                    </Badge>
                  )}
                </HStack>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>
                  {isRtl
                    ? `اطلاعات پروفایل و فعالیت ${name}.`
                    : `Profile details and activity for ${name}.`}
                </Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Frame>

      <Frame title="With Icon">
        <Accordion.Root variant="plain" w="400px" collapsible defaultValue={["info"]}>
          {[
            {
              value: "info",
              label: isRtl ? "اطلاعات محصول" : "Product Info",
              icon: <TagIcon size={16} />,
              content: isRtl
                ? "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ."
                : "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
            {
              value: "stats",
              label: isRtl ? "آمار" : "Stats",
              icon: <BarChart2 size={16} />,
              content: isRtl
                ? "کاربران فعال ماهانه: ۱۲,۴۰۰. نرخ تبدیل: ۳.۲٪."
                : "Monthly active users: 12,400. Conversion rate: 3.2%.",
            },
            {
              value: "settings",
              label: isRtl ? "تنظیمات" : "Settings",
              icon: <Settings size={16} />,
              content: isRtl
                ? "اعلان‌ها، حریم خصوصی و گزینه‌های نمایش را پیکربندی کنید."
                : "Configure notifications, privacy, and display options.",
            },
          ].map(({ value, label, icon, content }) => (
            <Accordion.Item key={value} value={value}>
              <Accordion.ItemTrigger>
                <HStack flex="1" gap={2}>
                  <Box color="fg.muted">{icon}</Box>
                  <Text fontWeight="bold">{label}</Text>
                </HStack>
              </Accordion.ItemTrigger>
              <Accordion.ItemContent>
                <Accordion.ItemBody>{content}</Accordion.ItemBody>
              </Accordion.ItemContent>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Frame>
    </ComponentSection>
  );
}

// ─── Segmented Control ────────────────────────────────────────────────────────
export function SegmentedSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  return (
    <ComponentSection
      id="segmented"
      title="Segmented Control"
      description="Toggle between mutually exclusive options."
    >
      <Frame title="Sizes">
        <Stack gap={4} align="flex-start">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <HStack key={s} gap={3} align="center">
              <Text fontSize="xs" color="fg.muted" w="6" textAlign="end">{s}</Text>
              <SegmentGroup.Root size={s} defaultValue="react">
                <SegmentGroup.Indicator />
                {["React", "Vue", "Solid"].map((item) => (
                  <SegmentGroup.Item key={item} value={item.toLowerCase()}>
                    <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
                    <SegmentGroup.ItemHiddenInput />
                  </SegmentGroup.Item>
                ))}
              </SegmentGroup.Root>
            </HStack>
          ))}
        </Stack>
      </Frame>

      <Frame title="With Icons">
        <Stack gap={4} align="flex-start">
          <SegmentGroup.Root defaultValue="table" size="md">
            <SegmentGroup.Indicator />
            {[
              { value: "table", icon: <LayoutGrid size={14} />, label: isRtl ? "جدول" : "Table" },
              { value: "board", icon: <Columns2 size={14} />, label: isRtl ? "بورد" : "Board" },
              { value: "list", icon: <ListIcon size={14} />, label: isRtl ? "لیست" : "List" },
            ].map(({ value, icon, label }) => (
              <SegmentGroup.Item key={value} value={value}>
                <SegmentGroup.ItemText>
                  <HStack gap={1.5}>
                    {icon}
                    <span>{label}</span>
                  </HStack>
                </SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            ))}
          </SegmentGroup.Root>

          <SegmentGroup.Root defaultValue="board" size="md">
            <SegmentGroup.Indicator />
            {[
              { value: "table", icon: <LayoutGrid size={16} /> },
              { value: "board", icon: <Columns2 size={16} /> },
              { value: "list", icon: <ListIcon size={16} /> },
            ].map(({ value, icon }) => (
              <SegmentGroup.Item key={value} value={value}>
                <SegmentGroup.ItemText>{icon}</SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            ))}
          </SegmentGroup.Root>
        </Stack>
      </Frame>

      <Frame title="Color Palettes">
        <Wrap gap={3}>
          {(["gray", "blue", "teal", "green", "purple", "orange", "red"] as const).map((c) => (
            <SegmentGroup.Root key={c} colorPalette={c} bg="colorPalette.50" _dark={{ bg: "colorPalette.950" }} defaultValue="a">
              <SegmentGroup.Indicator />
              {["A", "B", "C"].map((item) => (
                <SegmentGroup.Item key={item} value={item.toLowerCase()}>
                  <SegmentGroup.ItemText
                    _checked={{ color: "colorPalette.fg", fontWeight: "medium" }}
                  >
                    {item}
                  </SegmentGroup.ItemText>
                  <SegmentGroup.ItemHiddenInput />
                </SegmentGroup.Item>
              ))}
            </SegmentGroup.Root>
          ))}
        </Wrap>
      </Frame>

      <Frame title="States">
        <Stack gap={3} align="flex-start">
          <SegmentGroup.Root defaultValue="a" disabled>
            <SegmentGroup.Indicator />
            {["Option A", "Option B", "Option C"].map((item) => (
              <SegmentGroup.Item key={item} value={item.split(" ")[1].toLowerCase()}>
                <SegmentGroup.ItemText>{item}</SegmentGroup.ItemText>
                <SegmentGroup.ItemHiddenInput />
              </SegmentGroup.Item>
            ))}
          </SegmentGroup.Root>
          <SegmentGroup.Root defaultValue="a">
            <SegmentGroup.Indicator />
            <SegmentGroup.Item value="a">
              <SegmentGroup.ItemText>{isRtl ? "فعال" : "Enabled"}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="b" disabled>
              <SegmentGroup.ItemText>{isRtl ? "غیرفعال" : "Disabled"}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="c">
              <SegmentGroup.ItemText>{isRtl ? "فعال" : "Enabled"}</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          </SegmentGroup.Root>
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────
export function StepsSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";
  const [triggerStep, setTriggerStep] = React.useState(1);

  const incompleteStyle = { _incomplete: { borderColor: "border" } };

  const StepNum = ({ index }: { index: number }) =>
    isRtl ? <>{toFarsi(index + 1)}</> : <Steps.Number />;

  const basicSteps = isRtl
    ? [
        { value: "account", title: "حساب کاربری", description: "اطلاعات اولیه" },
        { value: "profile", title: "پروفایل", description: "تکمیل پروفایل" },
        { value: "payment", title: "پرداخت", description: "اطلاعات پرداخت" },
        { value: "confirm", title: "تایید", description: "بررسی نهایی" },
      ]
    : [
        { value: "account", title: "Account", description: "Basic info" },
        { value: "profile", title: "Profile", description: "Complete profile" },
        { value: "payment", title: "Payment", description: "Billing details" },
        { value: "confirm", title: "Confirm", description: "Final review" },
      ];

  const iconSteps = [
    { value: "account", icon: <User size={16} /> },
    { value: "profile", icon: <FileText size={16} /> },
    { value: "payment", icon: <CreditCard size={16} /> },
    { value: "confirm", icon: <CheckCircle size={16} /> },
  ];

  return (
    <ComponentSection
      id="steps"
      title="Steps"
      description="Multi-step process indicator with variants, sizes and icon support."
    >
      <Frame title="Variants — solid / subtle">
        <Stack gap={8} w="100%" maxW="560px">
          {(["solid", "subtle"] as const).map((v) => (
            <Box key={v}>
              <Text fontSize="xs" color="fg.muted" mb={3}>{v}</Text>
              <Steps.Root defaultStep={0} count={3} variant={v}>
                <Steps.List>
                  {(isRtl
                    ? ["مرحله ۱", "مرحله ۲", "مرحله ۳"]
                    : ["Step 1", "Step 2", "Step 3"]
                  ).map((title, i) => (
                    <Steps.Item key={i} index={i} title={title}>
                      <Steps.Indicator {...incompleteStyle}>
                        <Steps.Status
                          complete={<CheckCircle size={14} />}
                          incomplete={<StepNum index={i} />}
                          current={<StepNum index={i} />}
                        />
                      </Steps.Indicator>
                      <Steps.Title />
                      <Steps.Separator />
                    </Steps.Item>
                  ))}
                </Steps.List>
              </Steps.Root>
            </Box>
          ))}
        </Stack>
      </Frame>

      <Frame title="Trigger — interactive Prev / Next">
        <Steps.Root
          step={triggerStep}
          count={basicSteps.slice(0, 3).length}
          w="100%"
          maxW="520px"
          onStepChange={(e) => setTriggerStep(e.step)}
        >
          <Steps.List>
            {basicSteps.slice(0, 3).map((step, i) => (
              <Steps.Item key={step.value} index={i} title={step.title}>
                <Steps.Trigger>
                  <Steps.Indicator {...incompleteStyle}>
                    <Steps.Status
                      complete={<CheckCircle size={14} />}
                      incomplete={<StepNum index={i} />}
                      current={<StepNum index={i} />}
                    />
                  </Steps.Indicator>
                </Steps.Trigger>
                <Steps.Title />
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
          <Box mt={3}>
            <Text fontSize="sm" color="fg.muted" mb={3}>
              {isRtl
                ? `توضیحات مرحله ${triggerStep + 1}`
                : `Step ${triggerStep + 1} description`}
            </Text>
            <HStack gap={2}>
              <Button
                size="sm"
                variant="outline"
                disabled={triggerStep === 0}
                onClick={() => setTriggerStep((s) => Math.max(0, s - 1))}
              >
                {isRtl ? "قبلی" : "Prev"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={triggerStep === 2}
                onClick={() => setTriggerStep((s) => Math.min(2, s + 1))}
              >
                {isRtl ? "بعدی" : "Next"}
              </Button>
            </HStack>
          </Box>
        </Steps.Root>
      </Frame>

      <Frame title="Horizontal — step 2 active">
        <Steps.Root defaultStep={1} count={basicSteps.length} w="100%" maxW="520px">
          <Steps.List>
            {basicSteps.map((step, i) => (
              <Steps.Item key={step.value} index={i} title={step.title}>
                <Steps.Indicator {...incompleteStyle}>
                  <Steps.Status
                    complete={<CheckCircle size={14} />}
                    incomplete={<StepNum index={i} />}
                    current={<StepNum index={i} />}
                  />
                </Steps.Indicator>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      </Frame>

      <Frame title="With Title & Description">
        <Steps.Root
          defaultStep={1}
          count={basicSteps.length}
          w="100%"
          maxW="560px"
          orientation="horizontal"
          dir={dir}
        >
          <Steps.List>
            {basicSteps.map((step, i) => (
              <Steps.Item key={step.value} index={i}>
                <Steps.Indicator {...incompleteStyle}>
                  <Steps.Status
                    complete={<CheckCircle size={14} />}
                    incomplete={<StepNum index={i} />}
                    current={<StepNum index={i} />}
                  />
                </Steps.Indicator>
                <Box>
                  <Steps.Title fontFamily={isRtl ? "var(--font-persian)" : undefined}>
                    {step.title}
                  </Steps.Title>
                  <Steps.Description fontFamily={isRtl ? "var(--font-persian)" : undefined}>
                    {step.description}
                  </Steps.Description>
                </Box>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      </Frame>

      <Frame title="With Icons">
        <Steps.Root defaultStep={2} count={iconSteps.length} w="100%" maxW="480px" colorPalette="blue">
          <Steps.List>
            {iconSteps.map((step, i) => (
              <Steps.Item key={step.value} index={i}>
                <Steps.Indicator {...incompleteStyle}>
                  <Steps.Status
                    complete={step.icon}
                    incomplete={step.icon}
                    current={step.icon}
                  />
                </Steps.Indicator>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>
        </Steps.Root>
      </Frame>

      <Frame title="Vertical">
        {/* Custom vertical stepper — built with layout primitives for reliable
            LTR and RTL rendering. Chakra's Steps component relies on
            position:absolute for the vertical separator which doesn't work
            without a fixed-height ancestor context. */}
        <Box dir={dir} w="220px">
          {basicSteps.map((step, i) => {
            const activeStep = 1;
            const isComplete = i < activeStep;
            const isCurrent = i === activeStep;
            const isLast = i === basicSteps.length - 1;

            return (
              <Flex key={step.value} gap={3} alignItems="flex-start">
                {/* Left/Right column (flips in RTL): indicator circle + connector line */}
                <Flex
                  direction="column"
                  alignItems="center"
                  alignSelf="stretch"
                  flexShrink={0}
                >
                  <Box
                    w="10"
                    h="10"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    bg={isComplete ? "teal.500" : isCurrent ? "teal.100" : "bg.muted"}
                    borderWidth={isComplete ? "0" : "2px"}
                    borderStyle="solid"
                    borderColor={isCurrent ? "teal.500" : "border"}
                    color={isComplete ? "white" : isCurrent ? "teal.700" : "fg"}
                    fontWeight="medium"
                    fontSize="sm"
                  >
                    {isComplete ? (
                      <CheckCircle size={14} />
                    ) : isRtl ? (
                      toFarsi(i + 1)
                    ) : (
                      i + 1
                    )}
                  </Box>

                  {/* Connector line */}
                  {!isLast && (
                    <Box
                      flex="1"
                      w="2px"
                      mt="1"
                      minH="8"
                      bg={isComplete ? "teal.500" : "border"}
                    />
                  )}
                </Flex>

                {/* Title + description */}
                <Box pt="1.5" pb={isLast ? 0 : 6} flex="1">
                  <Text
                    fontWeight="medium"
                    fontSize="sm"
                    color="fg"
                    fontFamily={isRtl ? "var(--font-persian)" : undefined}
                  >
                    {step.title}
                  </Text>
                  <Text
                    fontSize="xs"
                    color="fg.muted"
                    fontFamily={isRtl ? "var(--font-persian)" : undefined}
                  >
                    {step.description}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Frame>

      <Frame title="Sizes">
        <Stack gap={8} w="100%" maxW="480px">
          {(["sm", "md", "lg"] as const).map((s) => (
            <Box key={s}>
              <Text fontSize="xs" color="fg.muted" mb={2}>{s}</Text>
              <Steps.Root defaultStep={1} count={3} size={s} colorPalette="blue">
                <Steps.List>
                  {["one", "two", "three"].map((v, i) => (
                    <Steps.Item key={v} index={i}>
                      <Steps.Indicator {...incompleteStyle}>
                        <Steps.Status
                          complete={<CheckCircle size={12} />}
                          incomplete={<StepNum index={i} />}
                          current={<StepNum index={i} />}
                        />
                      </Steps.Indicator>
                      <Steps.Separator />
                    </Steps.Item>
                  ))}
                </Steps.List>
              </Steps.Root>
            </Box>
          ))}
        </Stack>
      </Frame>

      <Frame title="Color Palettes">
        <Stack gap={5} w="100%" maxW="480px">
          {(["blue", "teal", "green", "purple", "orange", "red"] as const).map((c) => (
            <Steps.Root key={c} defaultStep={1} count={4} colorPalette={c}>
              <Steps.List>
                {["a", "b", "c", "d"].map((v, i) => (
                  <Steps.Item key={v} index={i}>
                    <Steps.Indicator {...incompleteStyle}>
                      <Steps.Status
                        complete={<CheckCircle size={14} />}
                        incomplete={<StepNum index={i} />}
                        current={<StepNum index={i} />}
                      />
                    </Steps.Indicator>
                    <Steps.Separator />
                  </Steps.Item>
                ))}
              </Steps.List>
            </Steps.Root>
          ))}
        </Stack>
      </Frame>
    </ComponentSection>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────

/**
 * Always returns exactly 7 slots when total > 7, so the row width never shifts.
 *
 * Patterns (total = 10, siblings = 1):
 *   near start  → [1][2][3][4][5][…][10]
 *   middle      → [1][…][4][5][6][…][10]
 *   near end    → [1][…][6][7][8][9][10]
 */
function buildPages(
  current: number,
  total: number
): Array<{ type: "page" | "ellipsis"; value: number }> {
  // Small totals: show every page
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => ({ type: "page", value: i + 1 }));
  }

  const leftSibling = Math.max(current - 1, 1);
  const rightSibling = Math.min(current + 1, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  // near start: [1,2,3,4,5,…,last]
  if (!showLeftEllipsis && showRightEllipsis) {
    return [
      ...Array.from({ length: 5 }, (_, i) => ({ type: "page" as const, value: i + 1 })),
      { type: "ellipsis", value: -1 },
      { type: "page", value: total },
    ];
  }

  // near end: [1,…,last-4,last-3,last-2,last-1,last]
  if (showLeftEllipsis && !showRightEllipsis) {
    return [
      { type: "page", value: 1 },
      { type: "ellipsis", value: -1 },
      ...Array.from({ length: 5 }, (_, i) => ({ type: "page" as const, value: total - 4 + i })),
    ];
  }

  // middle: [1,…,current-1,current,current+1,…,last]
  return [
    { type: "page", value: 1 },
    { type: "ellipsis", value: -1 },
    { type: "page", value: leftSibling },
    { type: "page", value: current },
    { type: "page", value: rightSibling },
    { type: "ellipsis", value: -2 },
    { type: "page", value: total },
  ];
}

// xs=32px  sm=36px  md=40px  lg=44px
const PAGE_BTN_DIMS: Record<"xs" | "sm" | "md" | "lg", string> = {
  xs: "8",
  sm: "9",
  md: "10",
  lg: "11",
};

interface PaginationControlProps {
  count?: number;
  pageSize?: number;
  initialPage?: number;
  normalVariant?: "ghost" | "outline";
  currentVariant?: "outline" | "solid";
  size?: "xs" | "sm" | "md" | "lg";
  gap?: number;
  isRtl?: boolean;
}

function PaginationControl({
  count = 100,
  pageSize = 10,
  initialPage = 3,
  normalVariant = "ghost",
  currentVariant = "outline",
  size = "sm",
  gap = 1,
  isRtl = false,
}: PaginationControlProps) {
  const [current, setCurrent] = React.useState(initialPage);
  const total = Math.ceil(count / pageSize);
  const pages = buildPages(current, total);
  const dim = PAGE_BTN_DIMS[size];

  return (
    <HStack gap={gap}>
      <IconButton
        variant={normalVariant}
        colorPalette="gray"
        size={size}
        h={dim}
        w={dim}
        aria-label={isRtl ? "قبلی" : "Previous"}
        disabled={current === 1}
        onClick={() => setCurrent((p) => Math.max(1, p - 1))}
      >
        {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </IconButton>

      {pages.map((p) =>
        p.type === "ellipsis" ? (
          <Button
            key={`e${p.value}`}
            variant={normalVariant}
            colorPalette="gray"
            size={size}
            h={dim}
            w={dim}
            minW="0"
            px="0"
            pointerEvents="none"
            cursor="default"
          >
            <Ellipsis size={14} />
          </Button>
        ) : (
          <Button
            key={p.value}
            variant={p.value === current ? currentVariant : normalVariant}
            colorPalette="gray"
            size={size}
            h={dim}
            w={dim}
            minW="0"
            px="0"
            onClick={() => setCurrent(p.value)}
          >
            {isRtl ? toFarsi(p.value) : p.value}
          </Button>
        )
      )}

      <IconButton
        variant={normalVariant}
        colorPalette="gray"
        size={size}
        h={dim}
        w={dim}
        aria-label={isRtl ? "بعدی" : "Next"}
        disabled={current === total}
        onClick={() => setCurrent((p) => Math.min(total, p + 1))}
      >
        {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </IconButton>
    </HStack>
  );
}

function CompactPagination({ isRtl = false }: { isRtl?: boolean }) {
  const [current, setCurrent] = React.useState(3);
  const total = Math.ceil(100 / 10);
  const pages = buildPages(current, total);
  const dim = "9";

  return (
    <HStack
      gap={0}
      display="inline-flex"
      borderWidth="1px"
      borderColor="border"
      borderRadius="md"
      overflow="hidden"
    >
      <IconButton
        variant="ghost"
        colorPalette="gray"
        aria-label={isRtl ? "قبلی" : "Previous"}
        h={dim}
        w={dim}
        borderRadius="0"
        borderEndWidth="1px"
        borderEndColor="border"
        disabled={current === 1}
        onClick={() => setCurrent((p) => Math.max(1, p - 1))}
      >
        {isRtl ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </IconButton>

      {pages.map((p, idx) => {
        const isLastItem = idx === pages.length - 1;
        return p.type === "ellipsis" ? (
          <Button
            key={`e${p.value}`}
            variant="ghost"
            colorPalette="gray"
            h={dim}
            w={dim}
            minW="0"
            px="0"
            borderRadius="0"
            borderEndWidth={isLastItem ? "0" : "1px"}
            borderEndColor="border"
            disabled
          >
            <Ellipsis size={14} />
          </Button>
        ) : (
          <Button
            key={p.value}
            variant={p.value === current ? "solid" : "ghost"}
            colorPalette="gray"
            h={dim}
            w={dim}
            minW="0"
            px="0"
            borderRadius="0"
            borderEndWidth={isLastItem ? "0" : "1px"}
            borderEndColor="border"
            onClick={() => setCurrent(p.value)}
          >
            {isRtl ? toFarsi(p.value) : p.value}
          </Button>
        );
      })}

      <IconButton
        variant="ghost"
        colorPalette="gray"
        aria-label={isRtl ? "بعدی" : "Next"}
        h={dim}
        w={dim}
        borderRadius="0"
        disabled={current === total}
        onClick={() => setCurrent((p) => Math.min(total, p + 1))}
      >
        {isRtl ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </IconButton>
    </HStack>
  );
}

export function PaginationSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  return (
    <ComponentSection
      id="pagination"
      title="Pagination"
      description="Page navigation with variants, sizes and sibling/boundary count control."
    >
      <Frame title="Default">
        <PaginationControl normalVariant="ghost" currentVariant="outline" size="sm" gap={1} isRtl={isRtl} />
      </Frame>

      <Frame title="Variant — button">
        <PaginationControl normalVariant="outline" currentVariant="solid" size="sm" gap={2} isRtl={isRtl} />
      </Frame>

      <Frame title="Sizes">
        <Stack gap={4} align="flex-start">
          {(["xs", "sm", "md", "lg"] as const).map((s) => (
            <Box key={s}>
              <Text fontSize="xs" color="fg.muted" mb={2}>{s}</Text>
              <PaginationControl size={s} gap={1} isRtl={isRtl} />
            </Box>
          ))}
        </Stack>
      </Frame>

      <Frame title="Compact (Attached)">
        <CompactPagination isRtl={isRtl} />
      </Frame>
    </ComponentSection>
  );
}