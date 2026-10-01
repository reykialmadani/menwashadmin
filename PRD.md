# Product Requirements Document (PRD): Menwash Admin Dashboard & Authentication Experience

**Document Title:** Menwash Admin Panel — UI/UX Design & Technical Architecture  
**File Reference:** `PRD.md`  
**Version:** 2.0.0  
**Status:** Approved for Implementation  
**Language:** English  
**Target Environment:** Static Web Application (HTML5 / Vanilla CSS3 / Modern ES6+ JavaScript)  

---

## 1. Product Overview & Vision

### 1.1 Executive Summary
The **Menwash Admin Panel** serves as the central operational cockpit for laundromat outlet managers and on-duty supervisors. The system enables real-time monitoring of commercial washing and drying machines, immediate intervention during operational anomalies (e.g., interrupted wash cycles), audit trail tracking for multi-channel transactions (QRIS, Cash, and Dummy Restarts), and rapid manual machine activation.

This PRD establishes the unified visual design language, interface geometry, interaction models, and styling tokens for:
1. **The Authentication Experience (`login.html`)**: A modern, immersive gateway centered around a tactile **Semi-Clay (claymorphic) container card** elevated above a fluid, multi-layered **Vector Wave background**.
2. **The Operational Command Dashboard (`dashboard.html`)**: A high-density, real-time monitoring workspace optimized for operational clarity, rapid decision-making, and frictionless task execution.

### 1.2 Core Design Principles
* **Tactile Elevation (Semi-Clay)**: Replaces flat, border-heavy containers with warm, pillowy 3D claymorphic surfaces characterized by soft dual inner light reflections and deep diffused ground shadows.
* **Organic Fluidity (Vector Waves)**: Introduces dynamic, multi-layered SVG bezier curves in dark charcoal gradients, evoking the elemental nature of water and laundry cycles while maintaining an understated, executive atmosphere.
* **Cognitive Ergonomics**: High data contrast, clear typography hierarchy, and deliberate semantic coloring to guarantee that critical errors (e.g., wash halts) are recognized and resolved in seconds.
* **Deterministic Design Tokens**: Strict adherence to the agreed zinc neutral scale and status color tokens, avoiding arbitrary values across screens.

---

## 2. Design System Tokens & Color Architecture

The application implements a modern **Zinc Neutral Scale** paired with high-visibility semantic status colors. All token names remain backward-compatible with the existing codebase while enforcing the revised visual standards.

### 2.1 Neutral & Ink Palette

| Token Name | Hex Code | Visual Classification | Applied UI Role |
|---|---|---|---|
| `--terracotta` | `#18181B` | Zinc 900 (Brand Primary) | Primary buttons, active sidebar tab, top-level headings, dominant text |
| `--maroon` | `#27272A` | Zinc 800 (Brand Dark) | Primary button hover state, elevated card surfaces, dark badge fills |
| `--terracotta-light`| `#71717A` | Zinc 500 (Muted Ink) | Secondary descriptions, input borders on hover, inactive tab labels |
| `--text-faint` | `#A1A1AA` | Zinc 400 (Subtle Ink) | Placeholders, disabled states, breadcrumb delimiters, inactive icons |
| `--border` | `#D4D4D8` | Zinc 300 (Border Base) | Standard input outlines, table cell borders, structural dividing rules |
| `--border-soft` | `#E4E4E7` | Zinc 200 (Subtle Border) | Card exterior borders, light table rows, secondary separators |
| `--cream` | `#F4F4F5` | Zinc 100 (Surface Tint) | App canvas background, table head striping, readonly field backgrounds |
| `--card-bg` | `#FFFFFF` | Pure White | Elevated card containers, modals, flyouts, and form surfaces |

### 2.2 Semantic & Operational Status Palette

Each status state includes a baseline hue, an ultra-soft background tint (`*-bg`), and a WCAG 2.1 AA compliant text/icon ink color (`*-ink` with contrast ratio ≥ 4.5:1).

| Status State | Base Token | Background Token (`*-bg`) | Ink Token (`*-ink`) | Applied Meaning & Context |
|---|---|---|---|---|
| **Available / Idle (OK)** | `#16A34A` | `#DCFCE7` | `#14532D` | Ready machines, completed cycles, successful authorizations |
| **Running / In-Progress** | `#3B82F6` | `#DBEAFE` | `#1E3A8A` | Active washing/drying cycles, QRIS transaction badges |
| **Warning / Attention** | `#F59E0B` | `#FEF3C7` | `#78350F` | Combo cycles (wash+dry), Cash transactions, maintenance notices |
| **Error / Halt (Danger)** | `#EF4444` | `#FEE2E2` | `#7F1D1D` | Stalled machines, cycle failures, urgent alert banners |
| **Offline / Disconnected**| `#6B7280` | `#F3F4F6` | `#1F2937` | Unpowered units, disabled relays, network disconnects |

### 2.3 Dark Theme Anchor Tokens (Sidebar & Login Backdrop)
```css
:root {
  --sidebar-1: #18181B;        /* Deep zinc anchor */
  --sidebar-2: #27272A;        /* Elevated dark surface */
  --sidebar-text: #FAFAFA;     /* High-contrast dark typography */
  --sidebar-text-dim: #A1A1AA; /* Muted nav items and captions */
  --page-bg: #F4F4F5;          /* Dashboard canvas background */
}
```

---

## 3. Typography & Iconography Specifications

### 3.1 Font Families & Roles
1. **Display & Heading**: `Sora`, sans-serif (`weights: 600, 700`)
   - Applied to: Page titles, section headings, KPI quantitative figures, login brand headers.
   - Purpose: Geometric legibility, crisp rendering of numeric digits and Rupiah currency.
2. **Body & Interface**: `Plus Jakarta Sans`, sans-serif (`weights: 400, 500, 600`)
   - Applied to: Navigation links, body copy, form labels, table cells, modal descriptions.
   - Purpose: High readability at standard font sizes (12px – 15px) with balanced optical spacing.
3. **Monospace & Numerical Data**: `JetBrains Mono`, monospace (`weights: 500`)
   - Applied to: Transaction IDs (`MW-284719`), machine serials, live clock pills, PIN inputs.
   - Purpose: Tabular alignment and unambiguous character discrimination (e.g., `0` vs `O`, `1` vs `l`).

### 3.2 Iconography System
* **Icon Library**: **HugeIcons** (Stroke Rounded, consistent `1.5px` stroke weight).
* **Color Inheritance**: All icons default to `stroke="currentColor"` to dynamically match contextual typography and status tokens.
* **Standard Dimensional Grid**:
  - `14px – 16px`: Mini chips, sub-labels, pagination arrows.
  - `18px – 20px`: Sidebar navigation items, standard buttons, topbar actions.
  - `22px – 24px`: KPI card header badges, running cycle machine indicators.
  - `28px – 32px`: Hero modals, empty state illustrations, alert banners.

---

## 4. Visual Architecture: Semi-Clay & Vector Wave

### 4.1 Semi-Clay (Claymorphic) Physical Model
The **Semi-Clay** aesthetic creates a tactile, slightly inflated matte 3D surface without resorting to harsh glossy reflections. It combines four coordinated lighting planes:
1. **Primary Ground Shadow**: Ambient diffused drop shadow casting downward depth.
2. **Proximity Shadow**: Shorter, tighter drop shadow providing sharp baseline grounding.
3. **Top-Left Light Inset (Highlight)**: High-luminance semi-translucent inner shadow simulating top-down directional studio lighting along the curved border.
4. **Bottom-Right Dark Inset (Bevel)**: Subtle dark inner shadow simulating corner occlusion and physical thickness.

```css
/* Semi-Clay Surface Specification */
.card-semi-clay {
  background: #FFFFFF;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    /* 1. Deep ambient ground shadow */
    0 20px 40px -15px rgba(0, 0, 0, 0.28),
    /* 2. Soft proximity drop shadow */
    0 8px 16px -6px rgba(0, 0, 0, 0.16),
    /* 3. Top-left light reflection (tactile inflation) */
    inset 0 3px 6px rgba(255, 255, 255, 0.90),
    /* 4. Bottom-right subtle bevel compression */
    inset 0 -3px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Semi-Clay Interactive Hover Effect */
.card-semi-clay:hover {
  transform: translateY(-2px);
  box-shadow:
    0 26px 48px -12px rgba(0, 0, 0, 0.32),
    0 10px 20px -5px rgba(0, 0, 0, 0.18),
    inset 0 4px 7px rgba(255, 255, 255, 0.95),
    inset 0 -3px 6px rgba(0, 0, 0, 0.06);
}

/* Semi-Clay Active Press Effect */
.card-semi-clay:active {
  transform: translateY(1px);
  box-shadow:
    0 12px 24px -8px rgba(0, 0, 0, 0.22),
    0 4px 8px -3px rgba(0, 0, 0, 0.12),
    inset 0 2px 4px rgba(255, 255, 255, 0.80),
    inset 0 -2px 4px rgba(0, 0, 0, 0.08);
}
```

### 4.2 Multi-Layered Vector Wave Background
The authentication canvas replaces flat dark backgrounds with an organic, multi-tiered SVG wave environment:
* **Base Gradient Canvas**: Diagonal dark fill transitioning from `#27272A` at the top-left to `#0F0F12` at the bottom-right.
* **Wave Layer 1 (Distant Swell)**: Gentle broad curve filled with a dark zinc linear gradient (`#27272A` at 70% opacity down to `#18181B` at 95% opacity).
* **Wave Layer 2 (Mid-ground Tide)**: Secondary oscillating bezier curve in `#3F3F46` (30% opacity) adding fluid depth and counter-motion.
* **Wave Layer 3 (Foreground Shelf)**: Sweeping bottom wave curve in solid `#18181B` that anchors the lower third of the viewport.
* **Ambient Glow Orbs**: Soft, blurred elliptical radial lights positioned behind the wave horizon to project gentle illumination behind the central card.

---

## 5. Detailed Page Specifications

### 5.1 Authentication Page (`login.html`)

```
┌────────────────────────────────────────────────────────────┐
│                    VECTOR WAVE CANVAS                      │
│                                                            │
│                  ┌──────────────────────┐                  │
│                  │   [Brand Logo Badge] │                  │
│                  │    MENWASH ADMIN     │                  │
│                  │ Operational Terminal │                  │
│                  │                      │                  │
│                  │ [ Outlet Code: CDW ] │                  │
│                  │ [ Admin Username   ] │                  │
│                  │ [ Password: •••• 👁 ] │                  │
│                  │                      │                  │
│                  │ [ Masuk ke Dashboard]│                  │
│                  │  Lupa kata sandi?    │                  │
│                  └──────────────────────┘                  │
│                                                            │
│       Menwash Admin v2.4 · Cendrawasih Outlet Terminal     │
└────────────────────────────────────────────────────────────┘
```

#### 5.1.1 Viewport & Card Geometry
* **Layout**: Full-screen flexbox container (`height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center; overflow: hidden;`).
* **Card Container**:
  - Class: `.card-semi-clay`
  - Dimensions: Fixed desktop width `420px`, responsive max-width `92vw`.
  - Internal Padding: `36px 32px` on desktop, `28px 20px` on mobile.
  - Border Radius: `24px`.

#### 5.1.2 Header Elements
1. **Brand Mark**: `logo.svg` enclosed in a centered 64×64px circular container with subtle inner clay reflection.
2. **Title**: `"Menwash Admin"` in `Sora`, 20px, bold (weight: 700), color `#18181B`.
3. **Subtitle**: `"Outlet Operational Command Panel"` in `Plus Jakarta Sans`, 13px, color `#71717A`.

#### 5.1.3 Form Fields & States
1. **Outlet Identifier (`outlet_code`)**:
   - Pre-filled: `"CDW-01"` (Cendrawasih Outlet 01).
   - State: `readonly` with a locked padlock icon.
   - Styling: Subtle zinc tint background (`#F4F4F5`), non-editable indicator cursor.
2. **Admin Username (`admin_username`)**:
   - Field Type: `text`.
   - Placeholder: `"e.g. Rani Admin"`.
   - Validation: Required field, auto-focused on initial page load.
3. **Password / Security Key (`password`)**:
   - Field Type: `password`.
   - Placeholder: `"••••••••"`.
   - Interactive Accessory: Eye toggle icon button (HugeIcons `view` / `view-off`) allowing administrators to inspect typed credentials.
4. **Submit CTA Button (`#btnLogin`)**:
   - Label: `"Masuk ke Dashboard"`.
   - Style: Full-width `.btn .btn-primary .btn-block`, background `#18181B`, hover `#27272A`.
   - Height: `46px`, border-radius: `12px`, font-weight: `600`.

#### 5.1.4 Support Microcopy & Footer
* Helper note below button: `"Lupa kata sandi? Hubungi penanggung jawab outlet."` (`#A1A1AA`, 12px).
* Footer caption pinned to bottom viewport: `"Menwash Admin Panel · Outlet Laundry Cendrawasih"` (`#71717A`, 12px).

---

### 5.2 Operational Command Dashboard (`dashboard.html`)

```
┌──────────────┬────────────────────────────────────────────────────────┐
│  SIDEBAR     │ TOPBAR: Outlet Cendrawasih · [14:28:05 WIB] · [+ Aktif]│
│  [Logo]      ├────────────────────────────────────────────────────────┤
│  • Utama     │ ⚠️ [Alert Strip: Mesin #04 terhenti · MW-284688 · [Fix]]│
│  • Mesin     ├────────────────────────────────────────────────────────┤
│    - Semua   │ [ KPI: 7/12 Aktif ] [ KPI: 48 Transaksi ]              │
│    - Gangguan│ [ KPI: Rp 612rb   ] [ KPI: 1 Gangguan   ]              │
│  • Transaksi ├────────────────────────────────────────────────────────┤
│  • Progress  │ SIKLUS SEDANG BERJALAN:                                │
│              │ [ Cuci #03 · 9m ] [ Kering #02 · 14m ] [ Cuci #01 · 22m]│
│  [Status:    ├────────────────────────────────────────────────────────┤
│   Outlet OK] │ AKTIVITAS TRANSAKSI TERBARU:                           │
│              │ [🔍 Cari Transaksi...] [Semua | QRIS | Tunai | Dummy]  │
│              │ [ MW-284719 · Cuci #03 · 14:15 · QRIS · Rp 15.000 · OK]│
└──────────────┴────────────────────────────────────────────────────────┘
```

#### 5.2.1 Application Shell Architecture
* **Global Sidebar (`#layoutSidebar`)**:
  - Rendered dynamically via `assets/layout.js` to ensure single-source-of-truth across all administrative pages.
  - Desktop width: `256px`. Tablet width (`≤1024px`): Collapses into an icon-rail. Mobile (`≤768px`): Off-canvas drawer with overlay.
  - Grouped into three semantic sections: **Utama** (Dashboard), **Mesin** (Semua Mesin, Mesin Gangguan with badge), **Aktivitas & Transaksi** (Transaksi, Progress Siklus).
  - Bottom widget displaying live outlet operational health: `"Outlet Cendrawasih · 11/12 Mesin Siap"`.
* **Sticky Topbar (`#layoutTopbar`)**:
  - Fixed height: `64px`, sticky position with `backdrop-filter: blur(12px)`.
  - Outlet title and breadcrumb trail.
  - Digital Clock Pill: Live running time rendered in `JetBrains Mono` (`HH:mm:ss WIB`).
  - **Primary Action Button**: `"+ Aktifkan Mesin Tunai"`, opening the quick machine activation modal.
  - Administrator profile chip (Avatar initial, Name, Role badge `"Shift Supervisor"`).

#### 5.2.2 Emergency Alert Strip (`.alert-strip`)
* **Trigger Condition**: Displayed dynamically whenever one or more machines report an error or unexpected stoppage.
* **Layout**: Horizontal banner styled in error tint (`#FEE2E2` background, `#EF4444` border accent).
* **Contents**:
  - Danger alert icon (HugeIcons `alert-02`).
  - Incident details: `"Mesin Cuci #04 terhenti (menit 18) · Transaksi MW-284688 · Menunggu kompensasi"`.
  - Quick action button: `"Restart Dummy"`, linking straight to `dummy-restart.html` with pre-filled machine parameters.

#### 5.2.3 KPI Metric Cards (`.stat-grid`)
Four-card responsive grid:
1. **Active Machines Metric**:
   - Value: `"7 / 12 mesin"`.
   - Subtitle: `"5 mesin tersedia"`.
   - Progress bar: 58.3% fill in `--busy` (`#3B82F6`).
2. **Daily Transactions**:
   - Value: `"48"`.
   - Delta indicator: `"+12 dari kemarin"` with green upward trend icon.
3. **Estimated Revenue**:
   - Value: `"Rp 612rb"`.
   - Subtitle: `"QRIS 34 · Tunai 14"`.
   - Split progress bar: 70.8% QRIS (`--busy`) / 29.2% Cash (`--amber`).
4. **Active Issues Card**:
   - Value: `"1"`.
   - Subtitle: `"Perlu tindakan segera"`.
   - Visual: Pulsing red indicator chip (`--err-bg` / `--err-ink`).

#### 5.2.4 Real-time Running Cycles Grid (`.run-grid`)
* Highlights ongoing wash and dry cycles currently inside machines.
* **Card Details**:
  - Machine name & type tag: `"Cuci #03"`, Badge: `"⇄ Kombo"` (`#FEF3C7` / `#78350F`).
  - Remaining time: `"9 menit"` in large `Sora` numbers.
  - Phase progress indicator bar: `"Cuci + Kering · 78%"`.
  - Associated transaction code and payment method: `"MW-284719 · QRIS"`.

#### 5.2.5 Recent Activity & Transaction Ledger
* Encapsulated within a white card container (`border-radius: 16px`, `--shadow-card`).
* **Integrated Toolbar**:
  - Live client-side search input with HugeIcons `search-01` (filters by Transaction ID, machine number, or customer name).
  - Quick category filter chips: `Semua`, `QRIS`, `Tunai`, `Dummy Restart`.
* **Table Columns**:
  - `ID TRANSAKSI` (Monospace, e.g., `MW-284719`)
  - `MESIN` (Badge with machine icon)
  - `WAKTU` (Timestamp)
  - `LAYANAN` (Service type: Cuci Reguler, Kering Cepat, Kombo)
  - `TOTAL` (Currency format)
  - `STATUS` (Pill badge: Selesai, Berjalan, Gangguan)
* **Bottom Pagination Bar**:
  - Records counter: `"Menampilkan 1–8 dari 48 data"`.
  - Pagination navigation: Previous, page numbers, Next.

---

## 6. Micro-Interactions & State Transitions

1. **Card Entrance Animation**:
   ```css
   @keyframes clayEntrance {
     0% {
       opacity: 0;
       transform: scale(0.95) translateY(16px);
     }
     100% {
       opacity: 1;
       transform: scale(1) translateY(0);
     }
   }
   .login-card {
     animation: clayEntrance 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
   }
   ```
2. **Vector Wave Gentle Drift**:
   - Background SVG waves feature subtle slow horizontal translations (`transform: translateX(...)` over 18s ease-in-out alternate) to convey a calm, fluid water sensation.
3. **Form Input Focus Glow**:
   - Inputs transition smoothly to `#18181B` border with an outer ring: `box-shadow: 0 0 0 3px rgba(24, 24, 27, 0.08)`.
4. **Button Press Feedback**:
   - Primary action buttons shift down 1px on `:active` with corresponding shadow compression.

---

## 7. Accessibility & Compliance (WCAG 2.1 AA)

* **Contrast Ratios**: All text against light surfaces (`#FFFFFF`, `#F4F4F5`) satisfies a minimum contrast ratio of `4.5:1` (achieving `12.6:1` with `--terracotta` on white). Inverted text on dark sidebar meets `15.8:1`.
* **Keyboard Navigation**:
  - Logical `tabindex` ordering across all login fields and dashboard action bars.
  - Visible focus indicators (`outline: 2px solid #18181B; outline-offset: 2px;`) enabled for keyboard users.
* **Semantic HTML5**: Native `<aside>`, `<main>`, `<header>`, `<nav>`, and `<table>` tags utilized throughout.
* **Form Labels**: Every input retains explicit, visible `<label>` tags with `for` associations.

---

## 8. Technical Architecture & File Directory

The project maintains a zero-framework, static HTML/CSS/JS architecture for maximum speed and portability:

```
c:/uiux/menwash-admin/
├── assets/
│   ├── admin.css           # Core styling tokens, semi-clay styles, wave classes
│   ├── admin.js            # Mock logic, simulation controllers, time handlers
│   ├── icons.js            # HugeIcons inline SVG functions
│   └── layout.js           # Shared sidebar & topbar DOM renderer
├── dashboard.html          # Operational dashboard command center
├── dummy-restart.html      # 4-step compensation restart wizard
├── gangguan.html           # Machine issue management & incident logs
├── login.html              # Authentication screen (Semi-Clay card + Vector Waves)
├── mesin.html              # Complete machine inventory & control drawer
├── progress.html           # Real-time running cycle monitoring
├── transaksi.html          # Full transaction ledger & filter interface
├── logo.svg                # Master Menwash vector logo
├── PRD.md                  # This unified Product Requirements Document
└── DESIGN_SYSTEM.md        # Reference design bible
```

---

## 9. Implementation Checklist

- [x] Create comprehensive `PRD.md` at root specifying the Semi-Clay login and operational Dashboard.
- [ ] Implement `.card-semi-clay` CSS classes in `assets/admin.css`.
- [ ] Add the multi-layered SVG vector wave component to `login.html`.
- [ ] Center the login card vertically and horizontally with responsive safety padding.
- [ ] Update `login.html` form controls with password toggle and readonly outlet badge.
- [ ] Align `dashboard.html` KPI cards, running cycle grid, and activity table to the unified Zinc token system.
