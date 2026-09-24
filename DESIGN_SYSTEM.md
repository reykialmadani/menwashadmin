# 📘 IOFI Design System — Kitab Desain (Portable Design Bible)

**Aplikasi Asal**: `iofi` (IRISURVEY — Platform Survei Berskala Internasional)
**Versi**: 1.0
**Tanggal**: 24 September 2026
**Tujuan**: Menjadi **referensi tunggal (single source of truth)** untuk seluruh keputusan visual, tipografi, warna, spacing, komponen UI, dan pola layout yang dipakai di project IOFI — serta dapat **diporting ke project lain** sebagai kitab desain.

---

## Daftar Isi

- [1. Brand Identity](#1-brand-identity)
- [2. Color Palette](#2-color-palette)
  - [2.1 Brand Colors (Custom)](#21-brand-colors-custom)
  - [2.2 Semantic / Design Token Colors (shadcn/ui Neutral)](#22-semantic--design-token-colors-shadcnui-neutral)
  - [2.3 Dark Mode Tokens](#23-dark-mode-tokens)
  - [2.4 Status / Feedback Colors](#24-status--feedback-colors)
  - [2.5 Opacity Scale Pattern](#25-opacity-scale-pattern)
- [3. Typography](#3-typography)
  - [3.1 Font Families](#31-font-families)
  - [3.2 Font Size Scale](#32-font-size-scale)
  - [3.3 Font Weight Scale](#33-font-weight-scale)
  - [3.4 Usage Map](#34-usage-map)
- [4. Spacing & Sizing](#4-spacing--sizing)
- [5. Border Radius System](#5-border-radius-system)
- [6. Shadow & Elevation](#6-shadow--elevation)
- [7. Icon System](#7-icon-system)
- [8. Layout Patterns](#8-layout-patterns)
- [9. Component Library Catalog](#9-component-library-catalog)
  - [9.1 Button](#91-button)
  - [9.2 Input / Text Field](#92-input--text-field)
  - [9.3 Select / Dropdown](#93-select--dropdown)
  - [9.4 Table](#94-table)
  - [9.5 Pagination](#95-pagination)
  - [9.6 Date Filter / Calendar](#96-date-filter--calendar)
  - [9.7 Card](#97-card)
  - [9.8 Modal / Dialog](#98-modal--dialog)
  - [9.9 Badge / Status Chip](#99-badge--status-chip)
  - [9.10 Avatar](#910-avatar)
  - [9.11 Breadcrumb](#911-breadcrumb)
  - [9.12 Search Bar](#912-search-bar)
  - [9.13 Sidebar Navigation](#913-sidebar-navigation)
  - [9.14 Dropdown Menu (Action Menu)](#914-dropdown-menu-action-menu)
  - [9.15 Tabs](#915-tabs)
  - [9.16 Toast / Notification](#916-toast--notification)
- [10. Animation & Transition](#10-animation--transition)
- [11. Responsive Breakpoints](#11-responsive-breakpoints)
- [12. Reusable Tailwind Utility Classes](#12-reusable-tailwind-utility-classes)
- [13. File Organization](#13-file-organization)
- [14. Porting Guide (Untuk Project Lain)](#14-porting-guide-untuk-project-lain)

---

## 1. Brand Identity

| Elemen | Nilai |
|---|---|
| **Nama Produk** | IRISURVEY |
| **Font Logo** | Fjalla One (400) — ALL CAPS, `tracking-wide` |
| **Warna Logo Text** | `#242220` (gelap) di atas putih |
| **Logo Institusi** | SVG (`/logo-indekstat.svg`) — disajikan di bawah logo teks |
| **Favicon** | SVG (`/favicon.svg`) |
| **Tagline** | "Platform Survei Indekstat" |
| **Bahasa Antarmuka** | Bahasa Indonesia (ID) — `<html lang="id">` |

---

## 2. Color Palette

### 2.1 Brand Colors (Custom)

Warna-warna kunci yang menjadi identitas visual IOFI dan dipakai secara langsung (inline hex) di komponen:

| Token | Hex | Fungsi | Pemakaian |
|---|---|---|---|
| **Brand Primary** | `#0D2040` | Warna utama brand | Header tabel, sidebar active, CTA button, pagination active, badge, avatar bg |
| **Accent Brown** | `#B2775F` | Aksen sekunder hangat | Button "Survei Management", filter aktif, chart accent, marker peta |
| **Text Primary** | `#242220` | Teks utama gelap | Judul halaman, header, body text, label |
| **Dark Action** | `#21222D` | Tombol aksi primer gelap | "Tambah Data" CTA button |
| **Info Blue Banner** | `#CFE0F7` | Banner info / session | Step wizard banner, info callout |
| **Accent Gold** | `#F5CB1F` | Elemen dekoratif / branding | Footer, ornamen |

#### Variasi Opacity yang Sering Dipakai

```
#0D2040        → Solid (sidebar active, table header, primary button)
#0D2040/90     → Hover state primary button
#0D2040/10     → Background highlight (icon container, date range fill)
#0D2040/5      → Subtle hover background (sidebar item, menu hover)
#0D2040/3      → Very subtle hover
#0D2040/[0.03] → Notifikasi belum dibaca bg

#242220        → Solid text
#242220/80     → Secondary text
#242220/70     → Icon default
#242220/60     → Muted text / subtitle
#242220/50     → Placeholder / breadcrumb inactive
#242220/40     → Very muted (ellipsis, timestamp)
#242220/35     → Input placeholder
#242220/30     → Breadcrumb separator
#242220/20     → Tree line connector
#242220/15     → Border subtle (form input, card)
#242220/10     → Border very subtle (table container, dropdown, divider)

#000000/56     → Sidebar inactive text
#000000/40     → Overlay lighter

black/20       → Standard border
black/40       → Mobile overlay
black/5        → Hover subtle on white
```

### 2.2 Semantic / Design Token Colors (shadcn/ui Neutral)

Token CSS variables yang di-set di `:root` dan dipakai oleh shadcn/ui components:

```css
:root {
  --radius: 0.625rem;                     /* 10px base radius */
  --background: oklch(1 0 0);             /* #FFFFFF — page bg */
  --foreground: oklch(0.145 0 0);         /* ~#242220 — primary text */
  --card: oklch(1 0 0);                   /* White */
  --card-foreground: oklch(0.145 0 0);    /* Dark text */
  --popover: oklch(1 0 0);               /* White */
  --popover-foreground: oklch(0.145 0 0); /* Dark text */
  --primary: oklch(0.205 0 0);            /* ~#333 — cva button default */
  --primary-foreground: oklch(0.985 0 0); /* Near-white */
  --secondary: oklch(0.97 0 0);           /* ~#F5F5F5 */
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);              /* ~#F5F5F5 */
  --muted-foreground: oklch(0.556 0 0);   /* ~#8E8E8E */
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325); /* Red */
  --border: oklch(0.922 0 0);             /* ~#EBEBEB */
  --input: oklch(0.922 0 0);              /* ~#EBEBEB */
  --ring: oklch(0.708 0 0);              /* ~#B3B3B3 */
}
```

### 2.3 Dark Mode Tokens

```css
.dark {
  --background: oklch(0.145 0 0);         /* Near-black */
  --foreground: oklch(0.985 0 0);         /* Near-white */
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

> Dark mode diaktifkan via class strategy: `@custom-variant dark (&:is(.dark *));`

### 2.4 Status / Feedback Colors

| Status | Background | Text | Border | Penggunaan |
|---|---|---|---|---|
| **Aktif / Sukses** | `bg-emerald-100` | `text-emerald-700` | — | Badge status aktif |
| **Pending / Warning** | `bg-amber-100` | `text-amber-700` | — | Badge status pending |
| **Kadaluarsa / Error** | `bg-red-100` | `text-red-700` | `border-red-200` | Badge expired, destructive action |
| **Info** | `#CFE0F7` | `text-[#0D2040]` | — | Session banner, info callout |
| **Destructive** | `bg-destructive` / `bg-red-600` | `text-white` | — | Delete button, error state |

### 2.5 Opacity Scale Pattern

Pola opacity yang konsisten dipakai di seluruh codebase:

| Level | Opacity | Kegunaan Tipikal |
|---|---|---|
| **Solid** | `100%` | Text utama, background solid, border tebal |
| **Strong** | `/80` – `/90` | Hover state tombol, secondary text |
| **Medium** | `/50` – `/70` | Muted text, icon default, placeholder |
| **Light** | `/20` – `/40` | Border, separator, divider, tree lines |
| **Subtle** | `/10` – `/15` | Card border, container outline |
| **Whisper** | `/3` – `/5` | Hover background, unread notification bg |

---

## 3. Typography

### 3.1 Font Families

| Token | Font | Style | Berat | Format | Penggunaan |
|---|---|---|---|---|---|
| `--font-sans` | **DM Sans** | Variable | 400–700 | woff2 | **Font utama** — body text, label, heading konten |
| `--font-inter` | **Inter** | Static | 400, 500, 600 | woff2 | **Font sekunder** — sidebar nav item, menu dropdown, keterangan teknis |
| — | **Fjalla One** | Static | 400 | woff2 | **Font branding** — logo "IRISURVEY" saja |

#### Deklarasi CSS

```css
@font-face {
  font-family: "DM Sans";
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url("/fonts/dm-sans-variable.woff2") format("woff2");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400; /* + 500, 600 separate declarations */
  font-display: swap;
  src: url("/fonts/inter-400.woff2") format("woff2");
}

@font-face {
  font-family: "Fjalla One";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("/fonts/fjalla-one-400.woff2") format("woff2");
}
```

#### Tailwind Theme

```css
@theme {
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-inter: "Inter", system-ui, sans-serif;
}
```

### 3.2 Font Size Scale

Base font-size di-set ke **87.5%** (= 14px dari default 16px) di `<html>`, sehingga semua unit `rem` terskala proporsional:

```css
html { font-size: 87.5%; }
```

| Class Tailwind | Ukuran Asli | Ukuran Efektif (x0.875) | Penggunaan |
|---|---|---|---|
| `text-[10px]` | 10px | 10px (fixed) | Micro text, "by" label |
| `text-[11px]` | 11px | 11px (fixed) | Config panel label, weekday header |
| `text-xs` | 0.75rem | ~10.5px | Sidebar nav, badge, pagination info, filter |
| `text-sm` | 0.875rem | ~12.25px | Body text, button, table cell, menu item |
| `text-base` | 1rem | 14px | XL breakpoint button, toolbar |
| `text-lg` | 1.125rem | ~15.75px | OTP input |
| `text-xl` | 1.25rem | ~17.5px | Section heading |
| `text-2xl` | 1.5rem | ~21px | Page title, sidebar brand |
| `text-3xl` | 1.875rem | ~26.25px | XL sidebar brand |
| `text-4xl` | 2.25rem | ~31.5px | XL page title |
| `text-[2.75rem]` | 44px | ~38.5px | 2XL page title |

### 3.3 Font Weight Scale

| Weight | Class | Penggunaan |
|---|---|---|
| **300** (Light) | `font-light` | Button secondary text, pagination info, search input |
| **400** (Regular) | `font-normal` | Body text, table cell, form input |
| **500** (Medium) | `font-medium` | Nav link, breadcrumb active, menu item, button |
| **600** (Semibold) | `font-semibold` | Config panel section title |
| **700** (Bold) | `font-bold` | Stat number, heading emphasis |
| **800** (Extrabold) | `font-extrabold` | Jarang dipakai (hero CTA) |

### 3.4 Usage Map

| Konteks | Font | Size | Weight | Color |
|---|---|---|---|---|
| Logo "IRISURVEY" | Fjalla One | `text-2xl` / `text-3xl` | 400 | `#242220` |
| Sidebar nav item | Inter | `text-xs` / `xl:text-sm` | medium | `#000000/56` (inactive), `white` (active) |
| Page title | DM Sans | `text-2xl` / `xl:text-4xl` | medium | `#242220` |
| Page subtitle | DM Sans | `text-sm` | normal | `#242220/60` |
| Table header | DM Sans | `text-xs` | medium / semibold | `white` (on `#0D2040`) |
| Table cell | DM Sans | `text-sm` | normal | `#242220` |
| Button primary | DM Sans | `text-sm` | medium | `white` |
| Form label | DM Sans | `text-sm` | medium | `#242220` |
| Input text | DM Sans | `text-sm` | normal | `#242220` |
| Input placeholder | DM Sans | `text-sm` | normal | `#242220/35` |
| Breadcrumb | DM Sans | `text-xs` / `sm:text-sm` | normal/medium | `#242220/50` -> `#0D2040` |

---

## 4. Spacing & Sizing

### Base Scale (Tailwind defaults, scaled by 87.5% html font-size)

| Token | rem | Effective px | Penggunaan Umum |
|---|---|---|---|
| `gap-1` | 0.25rem | ~3.5px | Pagination button gap |
| `gap-1.5` | 0.375rem | ~5.25px | Breadcrumb segment gap |
| `gap-2` | 0.5rem | ~7px | Button icon gap, tab gap |
| `gap-3` | 0.75rem | ~10.5px | Sidebar item gap, card content gap |
| `gap-4` | 1rem | ~14px | Form field group gap |
| `gap-6` | 1.5rem | ~21px | Section gap, fieldset gap |
| `gap-7` | 1.75rem | ~24.5px | Field group gap |

### Common Padding Patterns

| Pattern | Penggunaan |
|---|---|
| `px-3 py-2` / `xl:px-4 xl:py-2.5` | Sidebar nav link |
| `px-4 py-2.5` | Menu item, dropdown item |
| `px-3 h-10` / `xl:px-5 xl:h-12` | Toolbar button (search, filter, sort) |
| `px-4 h-10` / `xl:px-6 xl:h-12` | CTA button ("Tambah Data") |
| `p-4` / `xl:p-6` | Sidebar header area |
| `p-6 md:p-8 xl:p-10` | Settings card container |
| `px-6 py-5 md:px-8 md:py-6` | Modal body |

### Sidebar Width

```css
--sidebar-width: clamp(180px, 16vw, 256px);
```

Fluid width: menyempit di laptop kecil (min 180px), maksimal 256px di layar lebar.

### Common Heights

| Elemen | Height |
|---|---|
| Toolbar button | `h-10` / `xl:h-12` |
| Form input | `h-9` (shadcn) / `h-10` - `h-11` (custom) |
| Pagination button | `size-8` / `sm:size-9` |
| Modal action button | `h-11` |
| Table row | ~`py-3` - `py-4` (no fixed height) |

---

## 5. Border Radius System

| Token | Value | Class | Penggunaan |
|---|---|---|---|
| `--radius-sm` | `calc(0.625rem - 4px)` = 6px | `rounded-sm` | Checkbox |
| `--radius-md` | `calc(0.625rem - 2px)` = 8px | `rounded-md` | Input, small button |
| `--radius-lg` | `0.625rem` = 10px | `rounded-lg` | Date cell, select item, calendar button |
| `--radius-xl` | `calc(0.625rem + 4px)` = 14px | `rounded-xl` | Sidebar nav, toolbar button, search input, table container, dropdown menu, card subtle |
| — | 16px | `rounded-2xl` | Card utama, modal, form container, CTA button |
| — | ~28px | `rounded-[28px]` | Beranda widget card (stat card besar) |
| — | ~30px | `rounded-tl-[30px] rounded-br-[30px]` | Login carousel glassmorphism card |
| — | 9999px | `rounded-full` | Avatar, badge dot, icon container circle |

> **Aturan praktis**: Semakin besar dan semakin "standalone" sebuah elemen (card, modal), semakin besar radius-nya. Item di dalam container (button, input) menggunakan radius lebih kecil.

---

## 6. Shadow & Elevation

| Level | Class | Penggunaan |
|---|---|---|
| **Level 0** | No shadow | Flat elements, inline components |
| **Level 1** | `shadow-xs` | Input, small button |
| **Level 2** | `shadow-sm` | Card, settings container |
| **Level 3** | `shadow-lg` | Dropdown menu, notification panel, popover |
| **Level 4** | `shadow-xl` | Modal overlay content |
| **Blur** | `backdrop-blur-[30px]` | Login carousel glassmorphism panel |

### Common Border Patterns

```
border border-black/20           -> Standard toolbar button border
border border-[#242220]/10       -> Table container, dropdown menu, card subtle
border border-[#242220]/15       -> Form input (modal context)
border border-slate-200          -> shadcn/ui default component border
border border-black/5            -> Very subtle card (beranda widget)
border-2 border-[#242220]/15     -> Placeholder / dashed border
```

---

## 7. Icon System

| Property | Value |
|---|---|
| **Library** | [HugeIcons](https://hugeicons.com/) (free tier) |
| **Package** | `@hugeicons/core-free-icons` + `@hugeicons/react` |
| **Import Pattern** | Tree-shaken ESM: `import XxxIcon from '@hugeicons/core-free-icons/dist/esm/XxxIcon'` |
| **Render Component** | `<HugeiconsIcon icon={XxxIcon} className="size-5" />` |
| **Default Size** | `size-5` (20px) — nav icons, toolbar |
| **Small Size** | `size-4` (16px) — pagination arrows, inline indicators |
| **Large Size** | `size-6` - `size-8` — stat card, empty state |

### Icons yang Sering Dipakai

| Konteks | Icon |
|---|---|
| Home / Beranda | `Home01Icon` |
| Dashboard | `DashboardCircleIcon` |
| User | `UserIcon` |
| Database / Master | `DatabaseIcon` |
| Settings | `Setting06Icon` |
| Notification | `Notification01Icon` |
| Logout | `Logout01Icon` |
| Search | `Search01Icon` |
| Sort | `ArrowUpDown01Icon` |
| Arrow Left/Right | `ArrowLeft01Icon` / `ArrowRight01Icon` |
| Arrow Down (chevron) | `ArrowDown01Icon` |
| Add / Plus | `PlusSignIcon` |
| Delete | `Delete02Icon` |
| More options | `MoreHorizontalSquare01Icon` |
| Close | `Cancel01Icon` |
| Checkmark | `Checkmark01Icon` |
| Shuffle / Randomize | `ShuffleIcon` |
| Bot / AI | `BotIcon` |
| Mail | `Mail01Icon` |
| Send | `SentIcon` |

---

## 8. Layout Patterns

### 8.1 Shell Layout (Sidebar + Main)

```
+------------+---------------------------------------+
|  SIDEBAR   |  MAIN CONTENT AREA                    |
|  (aside)   |  +------------------------------+     |
|            |  | HEADER (title + breadcrumb +  |     |
|  Logo      |  | avatar + notification)        |     |
|  Nav Items |  +------------------------------+     |
|  + Sub     |  |                              |     |
|  + Sub     |  | PAGE CONTENT (scrollable)    |     |
|  |         |  | +---------------------------+|     |
|  Footer    |  | | Cards / Tables / Forms    ||     |
|  (profile) |  | +---------------------------+|     |
|            |  |                              |     |
+------------+--+------------------------------+-----+
```

```html
<div class="flex h-svh overflow-hidden bg-white">
  <aside class="fixed lg:static w-64 lg:w-[var(--sidebar-width)] bg-white">
    <!-- sidebar content -->
  </aside>
  <div class="flex flex-1 flex-col overflow-hidden">
    <header class="flex items-center px-4 py-3 xl:px-8">
      <!-- header content -->
    </header>
    <main class="flex-1 overflow-y-auto px-4 py-6 xl:px-8">
      <!-- page content -->
    </main>
  </div>
</div>
```

### 8.2 Full Page Layout (Editor / Form Builder)

Untuk halaman yang membutuhkan seluruh layar (SurveyJS editor, dashboard builder):

```html
<main class="h-svh overflow-y-auto overscroll-contain bg-white">
  <!-- Full-width content tanpa sidebar -->
</main>
```

### 8.3 Stat Card Grid (Beranda)

```
rounded-[28px] bg-white p-7 shadow-sm border border-black/5
```

Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`

### 8.4 Data Table Page Pattern

```
+---------------------------------------------+
| Stat Card (Total Data: 125)   [Action Btn]  |  <- Summary card
+---------------------------------------------+
| Title: "Riwayat Data"                       |
| +-------+ +------+ +--------------+        |
| | Search| |Sort  | |+ Tambah Data |        |  <- Toolbar
| +-------+ +------+ +--------------+        |
| +---------------------------------------+  |
| | TABLE with bg-[#0D2040] header        |  |  <- Data table
| | ...rows...                            |  |
| +---------------------------------------+  |
| Showing 1-10 of 125     [< 1 2 3 ... >] |  <- Pagination
+---------------------------------------------+
```

---

## 9. Component Library Catalog

### 9.1 Button

#### Variants

| Variant | Class Pattern | Penggunaan |
|---|---|---|
| **Primary (Brand)** | `bg-[#0D2040] text-white hover:bg-[#0D2040]/90 rounded-xl` | CTA utama, submit, modal confirm |
| **Primary (Dark)** | `bg-[#21222D] text-white hover:bg-[#21222D]/90 rounded-2xl` | "Tambah Data" action |
| **Accent Brown** | `bg-[#B2775F] text-white hover:bg-[#B2775F]/90 rounded-2xl` | "Survei Management" link |
| **Outline** | `border border-black/20 bg-white text-[#242220] hover:bg-[#0D2040]/5 rounded-xl` | Toolbar button (sort, filter, date) |
| **Ghost** | `text-[#242220]/80 hover:bg-[#0D2040]/5` | Menu item, sidebar child link |
| **Destructive** | `bg-red-600 text-white hover:bg-red-700` | Delete confirmation |
| **Cancel** | `border border-[#242220]/15 text-[#242220]/70 hover:bg-[#0D2040]/3 rounded-2xl` | Modal cancel button |

#### Sizes

| Size | Height | Padding | Font |
|---|---|---|---|
| **xs** | `h-6` | `px-2` | `text-xs` |
| **sm** | `h-8` | `px-3` | `text-xs` - `text-sm` |
| **md** (default) | `h-9` - `h-10` | `px-4` | `text-sm` |
| **lg** | `h-10` - `h-12` | `px-6` | `text-sm` - `text-base` |
| **icon** | `size-9` | — | — |

#### Focus Ring Pattern

```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D2040]/30
```

### 9.2 Input / Text Field

```
h-9 w-full rounded-md border border-input bg-transparent px-3 py-1
text-sm text-foreground placeholder:text-muted-foreground
shadow-xs transition-[color,box-shadow] outline-none
focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50
disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
```

#### Custom Modal Input

```
h-11 w-full rounded-2xl border border-[#242220]/15 px-4
font-sans text-[#242220] text-sm placeholder:text-[#242220]/35
outline-none transition-colors
focus:border-[#0D2040]/50 focus:ring-2 focus:ring-[#0D2040]/10
```

#### Search Input (with icon)

```
h-10 w-full rounded-xl border border-black/20 bg-white
py-2 pr-4 pl-11 text-sm font-light text-[#242220]
placeholder:text-[#242220]/40 focus:border-[#0D2040]/50
focus:ring-2 focus:ring-[#0D2040]/10
xl:h-12
```

### 9.3 Select / Dropdown

Komponen terpusat di `shared/ui/select.tsx` (Radix UI based):

- **Trigger**: Rounded-lg, border slate-200, teks slate-700
- **Content**: `rounded-xl`, shadow-lg, border slate-200, animate-in/out
- **Viewport**: `max-h-48 overflow-y-auto` (menampilkan **maksimal 5 item**, sisanya scroll)
- **Item active**: `bg-[#0D2040]/10 font-medium text-[#0D2040]`
- **Item hover**: `focus:bg-[#0D2040]/10`
- **Checkmark indicator**: HugeIcons `Checkmark01Icon`

### 9.4 Table

#### Header Row

```
bg-[#0D2040] text-white
```

| Property | Value |
|---|---|
| Header cell | `px-4 py-3 text-xs font-medium text-white uppercase tracking-wider` |
| First header | `rounded-tl-xl` |
| Last header | `rounded-tr-xl` |
| Body cell | `px-4 py-3 text-sm text-[#242220]` |
| Row border | `border-b border-[#242220]/10` |
| Row hover | `hover:bg-[#0D2040]/[0.02]` |

#### Table Container

```
overflow-x-auto rounded-xl border border-[#242220]/10
```

### 9.5 Pagination

```
+--------------------------------------------------+
| Menampilkan 1-10 dari 125 data    [Baris v 10]   |
|                                                  |
|                     [<] [1] [2] [3] ... [13] [>] |
+--------------------------------------------------+
```

| Elemen | Style |
|---|---|
| Page button | `size-8 sm:size-9 rounded-lg border border-black/20 text-sm font-light text-[#242220]` |
| Active page | `border-transparent bg-[#0D2040] text-white font-normal` |
| Hover | `hover:bg-[#0D2040]/5` |
| Disabled | `disabled:opacity-40` |
| Info text | `text-xs sm:text-sm text-[#242220]/50` |

### 9.6 Date Filter / Calendar

- **Trigger button**: `rounded-xl border border-black/20 h-10 xl:h-12 text-sm font-light`
- **Calendar popover**: Custom-built, bukan radix/shadcn calendar
- **Selected date**: `bg-[#0D2040] text-white rounded-lg`
- **Date range fill**: `bg-[#0D2040]/10 text-[#0D2040]`
- **Apply button**: `bg-[#0D2040] text-white rounded-lg`
- **Cancel button**: `border border-black bg-white rounded-lg`
- **Active filter chip**: `bg-[#B2775F] text-white`

### 9.7 Card

#### Standard Card

```
rounded-2xl border border-[#242220]/10 bg-white p-6 shadow-sm md:p-8 xl:p-10
```

#### Stat Widget Card (Beranda)

```
rounded-[28px] bg-white p-7 shadow-sm border border-black/5
```

#### Info Banner Card

```
rounded-xl bg-[#CFE0F7] px-5 py-4
```

### 9.8 Modal / Dialog

```
/* Overlay */
fixed inset-0 z-50 bg-black/60

/* Content */
mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl

/* Title */
text-lg font-semibold text-[#242220]

/* Action row */
flex gap-3

/* Cancel button */
flex-1 h-11 rounded-2xl border border-[#242220]/15 text-[#242220]/70

/* Confirm button */
flex-1 h-11 rounded-2xl bg-[#0D2040] text-white
```

### 9.9 Badge / Status Chip

```
inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium
```

| Status | Background | Text |
|---|---|---|
| Aktif | `bg-emerald-100` | `text-emerald-700` |
| Pending | `bg-amber-100` | `text-amber-700` |
| Kadaluarsa | `bg-red-100` | `text-red-700` |
| Default | `bg-slate-100` | `text-slate-600` |

### 9.10 Avatar

```
flex items-center justify-center rounded-full bg-[#0D2040] font-medium text-white
```

| Size | Class |
|---|---|
| sm | `size-8 text-xs` |
| md | `size-10 text-sm` |
| lg | `size-12 text-base` |

Fallback: Inisial nama (1-2 huruf kapital).

### 9.11 Breadcrumb

```
mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5

/* Separator */
text-[#242220]/30 text-xs select-none  ->  " . "

/* Inactive segment */
text-[#242220]/50 text-xs sm:text-sm

/* Clickable segment */
text-[#242220]/50 text-xs transition-colors hover:text-[#242220]

/* Active (last) segment */
font-medium text-[#0D2040] text-xs sm:text-sm
```

### 9.12 Search Bar

```html
<div class="relative">
  <HugeiconsIcon icon={Search01Icon}
    class="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[#242220]/50" />
  <input
    class="h-10 w-full rounded-xl border border-black/20 bg-white
           py-2 pr-4 pl-11 text-sm font-light text-[#242220]
           placeholder:text-[#242220]/40
           focus:border-[#0D2040]/50 focus:ring-2 focus:ring-[#0D2040]/10
           xl:h-12" />
</div>
```

### 9.13 Sidebar Navigation

```
/* Nav item (inactive) */
flex items-center gap-3 rounded-xl px-3 py-2 font-inter font-medium text-xs
text-[#000000]/56 transition-colors hover:bg-[#0D2040]/5
xl:px-4 xl:py-2.5 xl:text-sm

/* Nav item (active) */
bg-[#0D2040] text-white

/* Submenu child tree connector */
before:border-[#242220]/20 before:border-b-2 before:border-l-2 before:rounded-bl-xl
```

### 9.14 Dropdown Menu (Action Menu)

```
absolute z-50 mt-2 w-52 overflow-hidden rounded-xl
border border-[#242220]/10 bg-white py-1 shadow-lg

/* Menu item */
flex w-full items-center justify-between px-4 py-2.5
text-left text-sm transition-colors
text-[#242220]/70 hover:bg-[#0D2040]/3

/* Active item */
bg-[#0D2040]/5 font-medium text-[#0D2040]
```

### 9.15 Tabs

```
/* Tab container */
flex w-fit gap-2 rounded-xl bg-slate-50 p-1.5

/* Tab button (inactive) */
flex items-center gap-2 rounded-xl px-4 py-2.5 font-medium text-sm
text-slate-500 transition-colors

/* Tab button (active) */
bg-white text-[#0D2040] shadow-sm
```

### 9.16 Toast / Notification

Library: **Sonner** (`sonner` package)
Digunakan via `toast()`, `toast.success()`, `toast.error()` tanpa custom styling (mengikuti default Sonner yang sudah clean).

---

## 10. Animation & Transition

### Standard Transitions

| Class | Penggunaan |
|---|---|
| `transition-colors` | Button hover, nav hover, menu hover |
| `transition-transform duration-200` | Sidebar slide, chevron rotate |
| `transition-all` | Button general |
| `transition-[color,box-shadow]` | Input focus |

### Animations

| Name | Properties | Penggunaan |
|---|---|---|
| `region-fade-in` | `opacity 0->1, translateY(8px)->0, scale(0.98->1)` | Regional insights section transition |
| `animate-in fade-in-50 zoom-in-95` | Tailwind animate plugin | Select/dropdown content appear |
| `animate-out fade-out-0 zoom-out-95` | Tailwind animate plugin | Select/dropdown content disappear |
| `slide-in-from-top-2` | Radix transition | Popover entrance direction |

### Chevron Rotation

```
transition-transform duration-200
/* Open */  rotate-180
/* Closed */ rotate-0
```

---

## 11. Responsive Breakpoints

Menggunakan Tailwind defaults:

| Prefix | Min-width | Penggunaan |
|---|---|---|
| (none) | 0px | Mobile-first base |
| `sm:` | 640px | Pagination horizontal, info text size up |
| `md:` | 768px | Grid 2-col, card padding increase |
| `lg:` | 1024px | Sidebar visible (static), grid 3-4 col |
| `xl:` | 1280px | Font size up, padding increase, sidebar wider |
| `2xl:` | 1536px | Page title max size |

### Key Responsive Behaviors

- **Sidebar**: Hidden (off-screen drawer) on `<lg`, static on `>=lg`
- **Toolbar buttons**: `h-10` -> `xl:h-12`, text `text-sm` -> `xl:text-base`
- **Sidebar nav text**: `text-xs` -> `xl:text-sm`
- **Pagination button**: `size-8` -> `sm:size-9`
- **Card padding**: `p-6` -> `md:p-8` -> `xl:p-10`
- **Page title**: `text-2xl` -> `xl:text-4xl` -> `2xl:text-[2.75rem]`

---

## 12. Reusable Tailwind Utility Classes

Class gabungan yang paling sering dipakai sebagai `const` di codebase dan bisa di-copy ke project lain:

```ts
// Toolbar button (search, filter, sort, date)
const SHARED_BTN =
  'inline-flex shrink-0 items-center gap-2 rounded-xl border border-black/20 bg-white px-3 h-10 text-sm font-light text-[#242220] transition-colors hover:bg-[#0D2040]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D2040]/30 select-none xl:px-5 xl:h-12 xl:text-base';

// Pagination page button
const PAGE_BTN =
  'inline-flex size-8 items-center justify-center rounded-lg border border-black/20 bg-white text-sm font-light text-[#242220] transition-colors hover:bg-[#0D2040]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D2040]/30 disabled:pointer-events-none disabled:opacity-40 select-none sm:size-9';

// Modal action buttons
const MODAL_BTN_CANCEL =
  'h-10 flex-1 rounded-lg border border-black bg-white text-xs font-medium text-[#242220] transition-colors hover:bg-black/5';

const MODAL_BTN_APPLY =
  'h-10 flex-1 rounded-lg bg-[#0D2040] text-xs font-medium text-white transition-colors hover:bg-[#0D2040]/90 disabled:opacity-40 disabled:cursor-not-allowed';

// Config panel control
const controlClass =
  'w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50 disabled:text-slate-400';
```

---

## 13. File Organization

```
src/
+-- index.css                     <- @import "tailwindcss", @font-face, CSS tokens
+-- shared/
|   +-- ui/                       <- Komponen UI terpusat (single source of truth)
|   |   +-- button.tsx            <- CVA variants (default/destructive/outline/ghost/link)
|   |   +-- input.tsx             <- Base input with shadcn/ui patterns
|   |   +-- select.tsx            <- Master dropdown (Radix based, max 5 items + scroll)
|   |   +-- pagination.tsx        <- Table pagination with page size selector
|   |   +-- date-filter.tsx       <- Custom calendar + range picker
|   |   +-- field.tsx             <- FieldSet, FieldGroup, FieldLabel, FieldError, etc.
|   |   +-- label.tsx             <- Base label
|   |   +-- checkbox.tsx          <- Radix checkbox
|   |   +-- separator.tsx         <- Horizontal divider
|   |   +-- avatar-profil.tsx     <- Avatar with initials fallback
|   +-- lib/
|   |   +-- utils.ts              <- cn() helper (clsx + tailwind-merge)
|   +-- hooks/
+-- widgets/
|   +-- layout/
|       +-- DashboardLayout.tsx   <- Shell layout (sidebar + header + outlet)
+-- public/
    +-- fonts/                    <- Self-hosted woff2 files
        +-- dm-sans-variable.woff2
        +-- inter-400.woff2
        +-- inter-500.woff2
        +-- inter-600.woff2
        +-- fjalla-one-400.woff2
```

---

## 14. Porting Guide (Untuk Project Lain)

Untuk membawa design system ini ke project baru:

### Step 1: Copy Font Files

Copy folder `public/fonts/` beserta ke-5 file `.woff2` ke project baru.

### Step 2: Copy CSS Foundation

Copy isi `src/index.css`:
- `@font-face` declarations (DM Sans, Inter, Fjalla One)
- `@theme` block (font-sans, font-inter)
- `:root` CSS variables (semantic tokens)
- `.dark` variant (jika butuh dark mode)
- `html { font-size: 87.5%; }` (opsional — adjust density)

### Step 3: Copy Utility Function

```ts
// shared/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### Step 4: Copy Shared UI Components

Copy file-file dari `shared/ui/` yang dibutuhkan. Dependencies:
- `radix-ui` — untuk Select, Checkbox
- `class-variance-authority` — untuk Button variants
- `clsx` + `tailwind-merge` — untuk `cn()` helper
- `@hugeicons/core-free-icons` + `@hugeicons/react` — untuk ikon

### Step 5: Ganti Brand Colors

Cari-dan-ganti hex values berikut jika ingin rebrand:
- `#0D2040` -> Brand primary baru
- `#B2775F` -> Accent baru
- `#242220` -> Text primary baru (biasanya tidak perlu ganti)
- `#21222D` -> Dark action button baru
- `#CFE0F7` -> Info banner baru

### Step 6: Ganti Branding

- Logo SVG di `public/`
- Font logo Fjalla One -> font brand baru (atau tetap pakai)
- Teks "IRISURVEY" di sidebar -> nama produk baru

---

> **Prinsip Utama Design System IOFI:**
> 1. **Konsistensi** — Semua warna, radius, spacing, dan komponen mengacu ke token yang terdefinisi, bukan ad-hoc.
> 2. **Density** — UI dioptimalkan untuk dashboard data-heavy (font-size 87.5%, compact spacing).
> 3. **Responsiveness** — Mobile-first, tapi dioptimalkan untuk penggunaan desktop (sidebar + data tables).
> 4. **Centralization** — Komponen UI di `shared/ui/` adalah single source of truth; perubahan di satu tempat merambat ke seluruh app.
