اینجا گزارش کامل من است — بدون هیچ تغییری در کد.

۱. کامپوننت‌هایی که RTL مشکل دارند
FormsSection.tsx
کامپوننت	مشکل
Input	بدون dir="rtl" و textAlign="start" روی <Input> در حالت RTL. فیلد ایمیل هم باید dir="ltr" صریح داشته باشد.
Textarea	بدون dir="rtl" و textAlign="start" در حالت RTL.
Select	بدون dir="rtl" روی Select.Root؛ بدون textAlign="start" روی Select.Trigger و Select.Itemها.
Checkbox	راه‌حل flexDirection="row-reverse" دارد ✓ اما dir="rtl" روی Checkbox.Root ندارد + fontFamily روی Label ندارد.
Radio	راه‌حل flexDirection="row-reverse" دارد ✓ اما dir="rtl" روی RadioGroup.Root ندارد + fontFamily روی ItemText ندارد.
Switch	راه‌حل --switch-x + flexDirection دارد ✓ اما dir="rtl" روی Switch.Root ندارد + fontFamily روی Label ندارد.
Slider	اصلاً dir prop قبول نمی‌کند — در RTL باید dir="rtl" روی Slider.Root باشد تا از راست پر شود.
NumberInput	اصلاً dir prop قبول نمی‌کند — باید dir="rtl" روی Root و dir="ltr" + textAlign="end" روی Input باشد.
Rating	اصلاً dir prop قبول نمی‌کند — باید dir="rtl" روی RatingGroup.Root باشد تا ستاره‌ها از راست پر شوند.
NavigationSection.tsx
کامپوننت	مشکل
Tabs	بدون dir="rtl" روی Tabs.Root — در RTL تب‌ها از راست شروع نمی‌شوند.
Breadcrumb	بدون dir="rtl" روی Breadcrumb.Root. جداکننده ChevronRight در RTL باید ChevronLeft شود.
Accordion	بدون dir="rtl" روی Accordion.Root. طبق گایدلاین: در RTL باید Accordion.ItemIndicator قبل از متن در JSX قرار بگیرد (تا سمت چپ ظاهر شود) — الان همیشه بعد از متن است.
DataDisplaySection.tsx
کامپوننت	مشکل
Table	بدون dir="rtl" روی Table.Root؛ بدون textAlign="start" روی ستون‌های متنی و textAlign="end" برای ستون‌های عددی.
۲. تغییراتی که برنامه دارم
FormsSection.tsx
Input: اضافه کردن dir={isRtl ? "rtl" : undefined} و textAlign={isRtl ? "start" : undefined} به تمام input‌های متنی؛ ایمیل همیشه dir="ltr" باقی بماند.
Textarea: اضافه کردن dir و textAlign="start" در RTL.
Select: اضافه کردن dir={isRtl ? "rtl" : undefined} به Select.Root؛ textAlign="start" به Select.Trigger و Select.Itemها.
Checkbox: اضافه کردن dir={isRtl ? "rtl" : undefined} به Checkbox.Root؛ fontFamily="var(--font-persian)" به Checkbox.Label در RTL.
Radio: اضافه کردن dir={isRtl ? "rtl" : undefined} به RadioGroup.Root؛ fontFamily به RadioGroup.ItemText در RTL.
Switch: اضافه کردن dir={isRtl ? "rtl" : undefined} به Switch.Root؛ fontFamily به Switch.Label در RTL.
Slider: قبول کردن dir prop؛ اضافه کردن dir={isRtl ? "rtl" : undefined} به Slider.Root.
NumberInput: قبول کردن dir prop؛ dir="rtl" روی Root + dir="ltr" و textAlign="end" روی Input در RTL.
Rating: قبول کردن dir prop؛ dir={isRtl ? "rtl" : undefined} روی RatingGroup.Root.
NavigationSection.tsx
Tabs: اضافه کردن dir={isRtl ? "rtl" : undefined} به Tabs.Root.
Breadcrumb: اضافه کردن dir={isRtl ? "rtl" : undefined} به Breadcrumb.Root؛ تغییر separator از ChevronRight به ChevronLeft در RTL.
Accordion: اضافه کردن dir={isRtl ? "rtl" : undefined} به Accordion.Root؛ قرار دادن ItemIndicator به صورت شرطی قبل از متن در RTL.
DataDisplaySection.tsx
Table: اضافه کردن dir={isRtl ? "rtl" : undefined} به Table.Root؛ textAlign="start" به ستون‌های متنی و textAlign="end" به ستون‌های عددی در RTL.