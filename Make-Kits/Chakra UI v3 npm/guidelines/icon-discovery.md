# Chakra UI Icon Discovery and Usage

## Icon Package

**Package**: `@chakra-ui/icons`  
**Import path**: `import { IconName } from '@chakra-ui/icons'`

## Export Naming Convention

All Chakra UI icons follow the pattern `{PascalCaseName}Icon`.

### Examples from actual exports:
- `CheckIcon`
- `ChevronDownIcon`
- `ChevronLeftIcon`
- `ChevronRightIcon`
- `ChevronUpIcon`
- `ArrowBackIcon`
- `ArrowForwardIcon`
- `ArrowUpIcon`
- `ArrowDownIcon`
- `ArrowLeftIcon`
- `ArrowRightIcon`
- `AddIcon`
- `CloseIcon`
- `EditIcon`
- `DeleteIcon`
- `SettingsIcon`
- `SearchIcon`
- `CopyIcon`
- `DownloadIcon`
- `ExternalLinkIcon`
- `EmailIcon`
- `PhoneIcon`
- `BellIcon`
- `CalendarIcon`
- `TimeIcon`
- `ViewIcon`
- `ViewOffIcon`
- `LockIcon`
- `UnlockIcon`
- `StarIcon`
- `WarningIcon`
- `InfoIcon`
- `QuestionIcon`
- `HamburgerIcon`
- `SpinnerIcon`

## Available Icons (Complete List)

Based on package.json exports, the following icons are available:
- Add, ArrowBack, ArrowDown, ArrowForward, ArrowLeft, ArrowRight, ArrowUp, ArrowUpDown
- AtSign, Attachment, Bell, Calendar, Chat, Check, CheckCircle
- ChevronDown, ChevronLeft, ChevronRight, ChevronUp
- Close, Copy, Delete, Download, DragHandle, Edit, Email, ExternalLink
- Hamburger, Info, InfoOutline, Link, Lock, Minus, Moon
- NotAllowed, Phone, PlusSquare, Question, QuestionOutline
- React, Repeat, RepeatClock, Search, Search2, Settings
- SmallAdd, SmallClose, Spinner, Star, Sun, Time
- TriangleDown, TriangleUp, Unlock, UpDown
- View, ViewOff, Warning, WarningTwo

Total: **60 icons**

## Icon Component API

All icon components are React components that accept standard SVG props plus Chakra UI style props.

```tsx
import { CheckIcon } from '@chakra-ui/icons'

<CheckIcon w={6} h={6} color="green.500" />
```

### Common Props
- `w`, `h` (or `boxSize`): icon size (responsive values supported)
- `color`: icon color (references theme colors)
- All Chakra UI style props (margin, padding, etc.)

## File Naming Convention

Icon files use PascalCase names matching their exports:
- File: `/node_modules/@chakra-ui/icons/dist/types/Check.d.ts`
- Export: `CheckIcon`

## Icon Directory Location

**Type definitions**: `/node_modules/@chakra-ui/icons/dist/types/`  
**Source files**: `/node_modules/@chakra-ui/icons/dist/esm/` or `/dist/cjs/`

## How to Find Icons at Code-Generation Time

**CRITICAL: Avoid hallucinating icon names by following this process:**

### Step 1: Check Icon Count
Before listing or searching, verify the number of icons:
```bash
ls /workspaces/default/code/node_modules/@chakra-ui/icons/dist/types/*.d.ts | wc -l
```

### Step 2: Search by Keyword
Use targeted Glob patterns with descriptive keywords:
```bash
# Find chevron icons
ls /workspaces/default/code/node_modules/@chakra-ui/icons/dist/types/*Chevron*.d.ts

# Find arrow icons
ls /workspaces/default/code/node_modules/@chakra-ui/icons/dist/types/*Arrow*.d.ts

# Find notification-related icons
ls /workspaces/default/code/node_modules/@chakra-ui/icons/dist/types/*{Bell,Email,Chat}*.d.ts
```

### Step 3: Verify Export Name
Read the type file to confirm the exact export name:
```bash
cat /workspaces/default/code/node_modules/@chakra-ui/icons/dist/types/Check.d.ts
# Output: export declare const CheckIcon: ...
```

### DO NOT
- ❌ Guess icon names based on common UI patterns
- ❌ Assume an icon exists without verification
- ❌ List the entire directory without checking size first
- ❌ Use Grep to search icon file contents (filenames are sufficient)
- ❌ Dump hundreds of results into context

### DO
- ✅ Search by semantic keyword (chevron, arrow, bell, etc.)
- ✅ Verify the icon exists before using it
- ✅ Use the complete list above as reference
- ✅ Suggest alternative icons if the desired one doesn't exist

## Usage Examples

### Basic Icon
```tsx
import { CheckIcon } from '@chakra-ui/icons'

<CheckIcon />
```

### Sized Icon
```tsx
import { SearchIcon } from '@chakra-ui/icons'

<SearchIcon w={5} h={5} />
<SearchIcon boxSize={6} />
```

### Colored Icon
```tsx
import { WarningIcon } from '@chakra-ui/icons'

<WarningIcon color="red.500" />
<WarningIcon color="orange.400" />
```

### Icon in Button
```tsx
import { AddIcon } from '@chakra-ui/icons'
import { Button } from '@chakra-ui/layout'

<Button leftIcon={<AddIcon />}>
  Add Item
</Button>
```

### Responsive Icon
```tsx
import { BellIcon } from '@chakra-ui/icons'

<BellIcon 
  boxSize={{ base: 4, md: 5, lg: 6 }}
  color={{ base: 'gray.600', _dark: 'gray.400' }}
/>
```

## Icon Size Reference

Common icon sizes using Chakra's spacing scale:
- **Extra small**: `w={3} h={3}` or `boxSize={3}` (12px)
- **Small**: `w={4} h={4}` or `boxSize={4}` (16px)
- **Medium**: `w={5} h={5}` or `boxSize={5}` (20px)
- **Large**: `w={6} h={6}` or `boxSize={6}` (24px)
- **Extra large**: `w={8} h={8}` or `boxSize={8}` (32px)

## Creating Custom Icons

If you need an icon not in the Chakra UI set, use the `createIcon` utility:

```tsx
import { createIcon } from '@chakra-ui/icons'

const CustomIcon = createIcon({
  displayName: 'CustomIcon',
  viewBox: '0 0 24 24',
  path: (
    <path
      fill="currentColor"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
    />
  ),
})
```

## Common Icon Categories

### Navigation
ArrowBack, ArrowForward, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ExternalLink, Link, Hamburger

### Actions
Add, Edit, Delete, Copy, Download, Close, Search, Settings, DragHandle, Repeat, RepeatClock

### Status/Feedback
Check, CheckCircle, Warning, WarningTwo, Info, InfoOutline, Question, QuestionOutline, NotAllowed

### Communication
Email, Phone, Chat, Bell, AtSign, Attachment

### UI Controls
View, ViewOff, Lock, Unlock, Moon, Sun, Plus Square, Minus, SmallAdd, SmallClose

### Indicators
Star, Spinner, Time, Calendar, TriangleUp, TriangleDown, UpDown, ArrowUpDown

### Other
React (React logo)
