import React, { useMemo } from "react";
import {
  Box,
  Stack,
  HStack,
  Text,
  TreeView,
  createTreeCollection,
  SimpleGrid,
  Badge,
  Checkbox,
} from "@chakra-ui/react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Folder,
  FolderOpen,
  File,
} from "lucide-react";
import { Frame, ComponentSection } from "../ui/Frame";
import { useDirection } from "../../context/DirectionContext";

// ── Node type ─────────────────────────────────────────────────────────────────

interface FileNode {
  value: string;
  label: string;
  children?: FileNode[];
}

const collectionOptions = {
  nodeToValue: (n: FileNode) => n.value,
  nodeToString: (n: FileNode) => n.label,
  nodeToChildren: (n: FileNode) => n.children ?? [],
};

// ── Tree data ─────────────────────────────────────────────────────────────────

const projectRootLtr: FileNode = {
  value: "ROOT",
  label: "",
  children: [
    {
      value: "node_modules",
      label: "node_modules",
      children: [
        { value: "zag-js", label: "zag-js" },
        { value: "panda", label: "panda" },
        {
          value: "@types",
          label: "@types",
          children: [
            { value: "react-pkg", label: "react" },
            { value: "react-dom-pkg", label: "react-dom" },
          ],
        },
      ],
    },
    {
      value: "src",
      label: "src",
      children: [
        { value: "app.tsx", label: "app.tsx" },
        { value: "index.ts", label: "index.ts" },
      ],
    },
    { value: "panda.config.ts", label: "panda.config.ts" },
    { value: "package.json", label: "package.json" },
    { value: "renovate.json", label: "renovate.json" },
    { value: "README.md", label: "README.md" },
  ],
};

const projectRootRtl: FileNode = {
  value: "ROOT",
  label: "",
  children: [
    {
      value: "node_modules",
      label: "ماژول‌ها",
      children: [
        { value: "zag-js", label: "zag-js" },
        { value: "panda", label: "panda" },
        {
          value: "@types",
          label: "تایپ‌ها",
          children: [
            { value: "react-pkg", label: "react" },
            { value: "react-dom-pkg", label: "react-dom" },
          ],
        },
      ],
    },
    {
      value: "src",
      label: "src",
      children: [
        { value: "app.tsx", label: "app.tsx" },
        { value: "index.ts", label: "index.ts" },
      ],
    },
    { value: "panda.config.ts", label: "panda.config.ts" },
    { value: "package.json", label: "package.json" },
    { value: "README.md", label: "README.md" },
  ],
};

const sizeRootLtr: FileNode = {
  value: "ROOT",
  label: "",
  children: [
    {
      value: "src-s",
      label: "src",
      children: [
        { value: "app-s", label: "app.tsx" },
        { value: "index-s", label: "index.ts" },
      ],
    },
    {
      value: "node_modules-s",
      label: "node_modules",
      children: [
        { value: "zag-s", label: "zag-js" },
        { value: "panda-s", label: "panda" },
      ],
    },
    { value: "pkg-s", label: "package.json" },
  ],
};

// ── Section ───────────────────────────────────────────────────────────────────

export function TreeViewSection() {
  const dir = useDirection();
  const isRtl = dir === "rtl";

  // Chevron direction matches reading direction
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;

  // ── Render: plain folder/file icons ────────────────────────────────────────
  const renderNode = React.useCallback(
    ({ node, nodeState }: { node: FileNode; nodeState: { isBranch: boolean; expanded: boolean }; indexPath: number[] }) => {
      if (nodeState.isBranch) {
        return (
          <TreeView.BranchControl>
            <TreeView.BranchTrigger>
              {isRtl ? (
                // RTL: pick icon based on expanded state (BranchIndicator rotates wrong way in RTL)
                <Box display="inline-flex" flexShrink={0} alignItems="center">
                  {nodeState.expanded ? <ChevronDown size={14} /> : <ChevronLeft size={14} />}
                </Box>
              ) : (
                <TreeView.BranchIndicator>
                  <ChevronRight size={14} />
                </TreeView.BranchIndicator>
              )}
            </TreeView.BranchTrigger>
            {nodeState.expanded ? <FolderOpen size={14} /> : <Folder size={14} />}
            <TreeView.BranchText>{node.label}</TreeView.BranchText>
          </TreeView.BranchControl>
        );
      }
      return (
        <TreeView.Item>
          <File size={14} />
          <TreeView.ItemText>{node.label}</TreeView.ItemText>
        </TreeView.Item>
      );
    },
    [ChevronIcon, isRtl]
  );

  // ── Render: with Chakra Checkbox
  const renderNodeWithCheckbox = React.useCallback(
    ({
      node,
      nodeState,
    }: {
      node: FileNode;
      nodeState: { isBranch: boolean; expanded: boolean; checked: boolean | "indeterminate" };
      indexPath: number[];
    }) => {
      const checkedVal =
        nodeState.checked === "indeterminate"
          ? "indeterminate"
          : nodeState.checked === true
          ? true
          : false;

      const chakraCheckbox = (
        <TreeView.NodeCheckbox>
          <Checkbox.Root
            size="sm"
            colorPalette="teal"
            checked={checkedVal}
            // visual only — TreeView.NodeCheckbox owns the click
            pointerEvents="none"
            tabIndex={-1}
          >
            <Checkbox.HiddenInput tabIndex={-1} />
            <Checkbox.Control />
          </Checkbox.Root>
        </TreeView.NodeCheckbox>
      );

      if (nodeState.isBranch) {
        return (
          <TreeView.BranchControl>
            <TreeView.BranchTrigger>
              {isRtl ? (
                <Box display="inline-flex" flexShrink={0} alignItems="center">
                  {nodeState.expanded ? <ChevronDown size={14} /> : <ChevronLeft size={14} />}
                </Box>
              ) : (
                <TreeView.BranchIndicator>
                  <ChevronRight size={14} />
                </TreeView.BranchIndicator>
              )}
            </TreeView.BranchTrigger>
            {chakraCheckbox}
            {nodeState.expanded ? <FolderOpen size={14} /> : <Folder size={14} />}
            <TreeView.BranchText>{node.label}</TreeView.BranchText>
          </TreeView.BranchControl>
        );
      }
      return (
        <TreeView.Item>
          {chakraCheckbox}
          <File size={14} />
          <TreeView.ItemText>{node.label}</TreeView.ItemText>
        </TreeView.Item>
      );
    },
    [isRtl]
  );

  const projectCollection = useMemo(
    () =>
      createTreeCollection<FileNode>({
        rootNode: isRtl ? projectRootRtl : projectRootLtr,
        ...collectionOptions,
      }),
    [isRtl]
  );

  const sizeCollection = useMemo(
    () =>
      createTreeCollection<FileNode>({ rootNode: sizeRootLtr, ...collectionOptions }),
    []
  );

  // ── Labels ──────────────────────────────────────────────────────────────────
  const labels = isRtl
    ? {
        title: "Tree View",
        description: "نمایش داده‌های درختی سلسله‌مراتبی با پشتیبانی از انتخاب و چک‌باکس",
        default: "پیش‌فرض",
        defaultDesc: "ساختار فایل پروژه با آیکون‌های پوشه/فایل و خطوط فرورفتگی",
        variants: "وریانت‌ها",
        variantsDesc: "انتخاب subtle (پیش‌فرض) و solid",
        sizes: "اندازه‌ها",
        sizesDesc: "xs، sm و md",
        checkboxes: "با چک‌باکس",
        checkboxesDesc: "چک‌باکس Chakra سه‌حالته (checked / indeterminate / unchecked) با انتشار حالت",
        colorPalettes: "رنگ‌بندی‌ها",
        colorPalettesDesc: "colorPalette‌های مختلف برای نود انتخاب‌شده",
        animated: "انیمیشن محتوا",
        animatedDesc: "animateContent=true برای بازشدن/بستن شاخه‌ها",
        projectExplorer: "مرورگر پروژه",
        projectStructure: "ساختار پروژه",
      }
    : {
        title: "Tree View",
        description: "Hierarchical data display with expand/collapse, selection, and checkbox support",
        default: "Default",
        defaultDesc: "Project file structure with folder/file icons and indent guides",
        variants: "Variants",
        variantsDesc: "subtle (default) and solid selection styles",
        sizes: "Sizes",
        sizesDesc: "xs, sm, and md sizes",
        checkboxes: "With Checkboxes",
        checkboxesDesc: "Chakra tri-state checkboxes (checked / indeterminate / unchecked) with cascading state",
        colorPalettes: "Color Palettes",
        colorPalettesDesc: "Different colorPalette values for selected node highlight",
        animated: "Animated Content",
        animatedDesc: "animateContent=true for smooth branch open/close",
        projectExplorer: "Project Explorer",
        projectStructure: "Project Structure",
      };

  const palettes = ["teal", "blue", "purple", "orange", "red", "green"];

  return (
    <ComponentSection
      id="tree-view"
      title={labels.title}
      description={labels.description}
    >
      {/* ── Default ─────────────────────────────────────────────────────────── */}
      <Frame title={labels.default}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.defaultDesc}
        </Text>
        <Box maxW="320px">
          <TreeView.Root
            dir={dir}
            collection={projectCollection}
            defaultExpandedValue={["node_modules", "src"]}
            size="md"
            variant="subtle"
            colorPalette="teal"
          >
            <TreeView.Label
              fontWeight="medium"
              fontSize="xs"
              color="fg.muted"
              mb={1}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {labels.projectStructure}
            </TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
                render={renderNode as any}
                indentGuide={<TreeView.BranchIndentGuide />}
              />
            </TreeView.Tree>
          </TreeView.Root>
        </Box>
      </Frame>

      {/* ── Variants ────────────────────────────────────────────────────────── */}
      <Frame title={labels.variants}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.variantsDesc}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
          {(["subtle", "solid"] as const).map((variant) => (
            <Box key={variant}>
              <HStack mb={3} gap={2} align="center">
                <Badge colorPalette="teal" variant="subtle" size="sm" fontFamily="mono">
                  variant="{variant}"
                </Badge>
              </HStack>
              <TreeView.Root
                dir={dir}
                collection={sizeCollection}
                defaultExpandedValue={["src-s"]}
                defaultSelectedValue={["src-s"]}
                variant={variant}
                size="md"
                colorPalette="teal"
              >
                <TreeView.Tree>
                  <TreeView.Node
                    render={renderNode as any}
                    indentGuide={<TreeView.BranchIndentGuide />}
                  />
                </TreeView.Tree>
              </TreeView.Root>
            </Box>
          ))}
        </SimpleGrid>
      </Frame>

      {/* ── Sizes ───────────────────────────────────────────────────────────── */}
      <Frame title={labels.sizes}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.sizesDesc}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={8}>
          {(["xs", "sm", "md"] as const).map((size) => (
            <Box key={size}>
              <HStack mb={3} gap={2} align="center">
                <Badge colorPalette="gray" variant="subtle" size="sm" fontFamily="mono">
                  size="{size}"
                </Badge>
              </HStack>
              <TreeView.Root
                dir={dir}
                collection={sizeCollection}
                defaultExpandedValue={["src-s", "node_modules-s"]}
                size={size}
                variant="subtle"
                colorPalette="teal"
              >
                <TreeView.Tree>
                  <TreeView.Node
                    render={renderNode as any}
                    indentGuide={<TreeView.BranchIndentGuide />}
                  />
                </TreeView.Tree>
              </TreeView.Root>
            </Box>
          ))}
        </SimpleGrid>
      </Frame>

      {/* ── With Chakra Checkboxes ───────────────────────────────────────────── */}
      <Frame title={labels.checkboxes}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.checkboxesDesc}
        </Text>
        <Box maxW="340px">
          <TreeView.Root
            dir={dir}
            collection={projectCollection}
            defaultExpandedValue={["node_modules", "src"]}
            defaultCheckedValue={["app.tsx", "index.ts", "src"]}
            selectionMode="multiple"
            size="md"
            variant="subtle"
            colorPalette="teal"
          >
            <TreeView.Label
              fontWeight="medium"
              fontSize="xs"
              color="fg.muted"
              mb={1}
              textTransform="uppercase"
              letterSpacing="wider"
            >
              {labels.projectExplorer}
            </TreeView.Label>
            <TreeView.Tree>
              <TreeView.Node
                render={renderNodeWithCheckbox as any}
                indentGuide={<TreeView.BranchIndentGuide />}
              />
            </TreeView.Tree>
          </TreeView.Root>
        </Box>
      </Frame>

      {/* ── Color Palettes ──────────────────────────────────────────────────── */}
      <Frame title={labels.colorPalettes}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.colorPalettesDesc}
        </Text>
        <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} gap={6}>
          {palettes.map((palette) => (
            <Box key={palette}>
              <Badge colorPalette={palette} variant="subtle" size="sm" mb={2} fontFamily="mono">
                {palette}
              </Badge>
              <TreeView.Root
                dir={dir}
                collection={sizeCollection}
                defaultExpandedValue={["src-s"]}
                defaultSelectedValue={["src-s"]}
                size="sm"
                variant="subtle"
                colorPalette={palette}
              >
                <TreeView.Tree>
                  <TreeView.Node
                    render={renderNode as any}
                    indentGuide={<TreeView.BranchIndentGuide />}
                  />
                </TreeView.Tree>
              </TreeView.Root>
            </Box>
          ))}
        </SimpleGrid>
      </Frame>

      {/* ── Animated Content ────────────────────────────────────────────────── */}
      <Frame title={labels.animated}>
        <Text fontSize="xs" color="fg.muted" mb={4}>
          {labels.animatedDesc}
        </Text>
        <Box maxW="280px">
          <TreeView.Root
            dir={dir}
            collection={projectCollection}
            defaultExpandedValue={["src"]}
            size="md"
            variant="subtle"
            colorPalette="teal"
            animateContent
          >
            <TreeView.Tree>
              <TreeView.Node
                render={renderNode as any}
                indentGuide={<TreeView.BranchIndentGuide />}
              />
            </TreeView.Tree>
          </TreeView.Root>
        </Box>
      </Frame>
    </ComponentSection>
  );
}