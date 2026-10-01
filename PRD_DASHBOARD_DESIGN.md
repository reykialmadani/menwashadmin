# Product Requirements Document (PRD): Menwash Admin Dashboard & Authentication Experience

**Document Version:** 2.0  
**Status:** Approved for Implementation  
**Target Environment:** Static Web Application (HTML5 / Vanilla CSS3 / Modern ES6+ JavaScript)  
**Author:** UI/UX & Frontend Architecture Team  
**Language:** English  

---

## 1. Executive Summary & Vision

### 1.1 Objective
The purpose of this document is to specify the comprehensive design, visual language, interaction patterns, and technical requirements for the **Menwash Admin Panel**, with particular focus on:
1. A visually stunning, modern **Authentication / Login Experience** featuring a **centered semi-clay (claymorphic) container card** suspended over an organic, multi-layered **vector wave background**.
2. A high-efficiency, data-dense **Operational Dashboard** engineered for laundry outlet administrators to monitor machine statuses, track live cycle executions, review financial transactions, and resolve machine interruptions in real time.

### 1.2 Design Philosophy & Core Aesthetics
* **Tactile Yet Pragmatic (Semi-Clay)**: Moving beyond flat surfaces without the clutter of heavy skeuomorphism. We implement a refined **semi-clay** aesthetic: smooth, soft pillowy radiuses, dual inset inner highlights simulating soft ambient light, paired with deep diffused drop shadows for natural depth.
* **Fluid Vector Backdrop**: The login portal replaces static monochrome radial glows with smooth, multi-tiered SVG vector wave curves rendered in harmonious dark zinc and charcoal tones with subtle ambient gradients.
* **Operational Clarity**: High data legibility, instant visual hierarchy, zero cognitive overload during critical failure incidents (e.g., wash cycle interruptions, emergency bypasses).
* **Deterministic Color System**: Rigorous application of the agreed design system tokens—grounded in sophisticated zinc neutrals and semantic status accents.

---

## 2. Color Palette & Token Architecture

The color palette adheres strictly to the approved design system tokens established for the Menwash Admin suite, maintaining a refined **Dark Charcoal & Zinc scale** complemented by high-visibility status and semantic colors.

### 2.1 Neutral & Brand Ink Palette (Zinc Scale)

| Token Name | Hex Value | Role & Applied Context |
|---|---|---|
| `--terracotta` (Brand Primary) | `#18181B` (`zinc-900`) | Primary button background, active sidebar tab, header ink, high-emphasis text |
| `--maroon` (Brand Dark / Hover) | `#27272A` (`zinc-800`) | Primary button hover state, elevated surface accents, secondary dark badges |
| `--terracotta-light` | `#71717A` (`zinc-500`) | Secondary text, input border focus/hover, inactive tab labels, metadata |
| `--text-faint` | `#A1A1AA` (`zinc-400`) | Input placeholders, disabled controls, subtle breadcrumbs, icon dimming |
| `--border` | `#D4D4D8` (`zinc-300`) | Default component outlines, input boundaries, divider borders |
| `--border-soft` | `#E4E4E7` (`zinc-200`) | Subtle table separators, card borders, light structural rules |
| `--cream` (Surface Tint) | `#F4F4F5` (`zinc-100`) | Dashboard page background, input read-only fill, table header stripe |
| `--surface-pure` | `#FFFFFF` | Core card background, modal body, dropdown containers |

### 2.2 Semantic & Operational Status Palette

Every status color is paired with a dedicated tinted background (`*-bg`) and a high-contrast ink color (`*-ink`) satisfying WCAG 2.1 AA accessibility ratios (≥ 4.5:1).

| Status State | Base Token | Background Token (`*-bg`) | Foreground Ink (`*-ink`) | Context of Use |
|---|---|---|---|---|
| **Available / Idle (OK)** | `#16A34A` (`green-600`) | `#DCFCE7` (`green-100`) | `#14532D` (`green-900`) | Ready machines, completed transactions, success toasts |
| **Running / In-Progress** | `#3B82F6` (`blue-500`) | `#DBEAFE` (`blue-100`) | `#1E3A8A` (`blue-900`) | Active washing/drying cycles, QRIS payment method badge |
| **Warning / Attention** | `#F59E0B` (`amber-500`) | `#FEF3C7` (`amber-100`) | `#78350F` (`amber-900`) | Combo cycles, Cash payment method badge, maintenance due |
| **Error / Interrupted** | `#EF4444` (`red-500`) | `#FEE2E2` (`red-100`) | `#7F1D1D` (`red-900`) | Stopped machines, emergency cycle errors, alert banners |
| **Offline / Inactive** | `#6B7280` (`gray-500`) | `#F3F4F6` (`gray-100`) | `#1F2937` (`gray-800`) | Unpowered machines, disconnected sensors |

### 2.3 Dark Theme & Canvas Shell Tokens

Used across the admin sidebar and login page backdrop:

```css
:root {
  --sidebar-1: #18181B;        /* Deep zinc anchor */
  --sidebar-2: #27272A;        /* Elevated dark surface */
  --sidebar-text: #FAFAFA;     /* High-contrast dark-mode typography */
  --sidebar-text-dim: #A1A1AA; /* Muted nav items and captions */
  --page-bg: #F4F4F5;          /* Crisp light work surface */
  --card-bg: #FFFFFF;
}
```

---

## 3. Typography & Iconography Standards

### 3.1 Font Family Hierarchy
1. **Display & Heading Font**: `Sora`, sans-serif (`weights: 600, 700`)  
   *Used for:* Page headings, KPI values, modal titles, and login card header. Provides crisp geometry and highly legible numeric characters for Rupiah currency and statistics.
2. **Body & UI Font**: `Plus Jakarta Sans`, sans-serif (`weights: 400, 500, 600`)  
   *Used for:* Form inputs, table content, standard button text, descriptions, and labels.
3. **Monospace Font**: `JetBrains Mono`, monospace (`weights: 500`)  
   *Used for:* Transaction IDs (`MW-284719`), real-time live clock countdowns, machine codes, and machine serial numbers.

### 3.2 Iconography System
* **Source:** **HugeIcons** (Stroke Rounded, `1.5px` stroke width).
* **Behavior:** Icons always inherit ambient text color using `stroke="currentColor"`, except inside color-coded status badges where they adopt the corresponding `*-ink` token.
* **Standard Sizes:**
  * Micro (Badge, sub-labels): `14px - 16px`
  * Action Buttons & Nav items: `18px - 20px`
  * Stat Card Header & Alerts: `20px - 24px`
  * Hero / Success Illustration anchors: `28px - 32px`

---

## 4. The Semi-Clay & Vector Wave Design Specification

The centerpiece of the redesign is the synthesis of **Claymorphism (Semi-Clay)** with an organic **Vector Wave Environment**.

### 4.1 Semi-Clay (Claymorphic) Physical Model
Unlike flat cards or glossy glassmorphism, **Semi-Clay** treats the UI surface like a smooth, tactile matte substance. It achieves elevation through three coordinated light simulations:
1. **Primary Drop Shadow**: Diffused exterior ambient shadow giving physical altitude off the canvas.
2. **Inner Top-Left Highlight**: Soft, semi-opaque white inset shadow simulating an overhead key light shining on the curved surface.
3. **Inner Bottom-Right Tint**: Subtle dark inset shadow simulating a bevel or contact shadow at the rounded edge.
4. **Matte Boundary**: Ultra-fine border with low alpha ensuring crisp separation across varying background contrast points.

#### Exact Semi-Clay CSS Implementation Token
```css
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

/* Optional Interactive Semi-Clay Hover (for clickable cards) */
.card-semi-clay-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 24px 48px -12px rgba(0, 0, 0, 0.32),
    0 10px 20px -5px rgba(0, 0, 0, 0.18),
    inset 0 4px 7px rgba(255, 255, 255, 0.95),
    inset 0 -3px 6px rgba(0, 0, 0, 0.06);
}
```

### 4.2 Multi-Tiered Vector Wave Background Specification
The background utilizes a series of smoothly undulating SVG bezier wave layers, arranged in depth order to create visual depth behind the central login card:
* **Base Gradient Canvas**: Radial gradient originating from top-left (`#27272A` to `#0F0F12`).
* **Wave Layer 1 (Far Background)**: Large slow wave curve rendered in `#27272A` with `0.25` opacity.
* **Wave Layer 2 (Mid-ground)**: Contrasting wave curve rendered in `#3F3F46` with `0.18` opacity, introducing harmonic oscillation.
* **Wave Layer 3 (Foreground Wave Floor)**: Sweeping bottom-anchored wave curve in `#18181B` with `0.65` opacity, grounding the viewport.
* **Floating Ambient Orbs**: Subtle blurred elliptical spheres behind the wave paths to give a soft, low-contrast backlight glow directly behind the card.

---

## 5. Page Specifications

### 5.1 Authentication / Login Page (`login.html`)

#### 5.1.1 Viewport & Layout Geometry
* **Container Alignment**: Full viewport (`100vw × 100vh`), with `display: flex; align-items: center; justify-content: center;`.
* **Card Width**: `420px` fixed desktop width (`max-width: 92vw` on mobile screens).
* **Position**: Perfectly centered horizontally and vertically, floating above the vector wave canvas.

#### 5.1.2 Header & Brand Mark
* **Brand Asset**: Official SVG logo mark (`logo.svg`) displayed in a clean circular or rounded badge with soft elevation.
* **Application Title**: `"Menwash Admin"` in `Sora`, 20px, Semi-Bold (`font-weight: 600`), text color `#18181B`.
* **Subtitle**: `"Outlet Operational Command Panel"` in `Plus Jakarta Sans`, 13px, text color `--terracotta-light` (`#71717A`).

#### 5.1.3 Form Architecture & Field Controls
The login form contains three strictly structured fields with interactive feedback states:
1. **Outlet Identification Code (`outlet_code`)**:
   * *Type:* Text input (`value="CDW-01"`), styled as `readonly` with a subtle lock icon.
   * *Visual:* Light gray tint background (`#F4F4F5`), indicating a bound physical terminal.
2. **Administrator Username (`admin_username`)**:
   * *Type:* Text input.
   * *Placeholder:* `"e.g. Rani Admin"`.
   * *Validation:* Required field, autofocus on initial load.
3. **Password / PIN (`password`)**:
   * *Type:* `password`.
   * *Placeholder:* `"••••••••"`.
   * *Accessory:* Show/Hide toggle button featuring HugeIcons `view` / `view-off` stroke icon.

#### 5.1.4 Primary Action & Footer
* **Submit Action Button**: Full-width button (`.btn .btn-primary .btn-block`) styled in `#18181B` with soft hover lightening to `#27272A`.
* **Tactile Button Press Effect**: `transform: translateY(1px)` with reduced drop shadow on `:active`.
* **Support Microcopy**: Centered caption: `"Forgot password? Contact your regional outlet supervisor."` in `--text-faint` (`#A1A1AA`).
* **Environment Footnote**: Fixed subtle footer under the card: `"Menwash Admin v2.4 · Cendrawasih Laundry Terminal"`.

---

### 5.2 Main Dashboard Page (`dashboard.html`)

Upon successful login, the administrator transitions to the operational dashboard structured around an efficient, responsive three-tier layout:

```
┌────────────────────────────────────────────────────────────────────────┐
│  SIDEBAR (256px)  │  TOPBAR: Outlet Name · Live Clock · Quick Actions  │
│  - Brand Logo     ├────────────────────────────────────────────────────┤
│  - Main Nav       │  1. Real-Time Status & Emergency Alert Strip       │
│  - Machine Nav    │  2. Key Performance Metric Cards (4 Grid)          │
│  - Activity Nav   │  3. Live Active Cycles & Machine Pulse Grid        │
│  - Outlet Status  │  4. Revenue Breakdown & Historical Activity Table  │
└────────────────────────────────────────────────────────────────────────┘
```

#### 5.2.1 Global Navigation Shell (Unified via `layout.js`)
* **Collapsible Sidebar**:
  * Width: `256px` fixed on desktop, collapsing to an icon-rail on tablets (`≤1024px`), off-canvas drawer on mobile (`≤768px`).
  * Dark theme aesthetic (`#18181B`), separating navigation groups: **Primary**, **Machines**, and **Transactions & Logs**.
  * Active state highlighted with soft white text and elevated indicator pill.
  * Real-time machine interruption count badge (pill badge with `--err` color) next to "Machine Issues".
* **Persistent Topbar**:
  * Sticky top alignment with backdrop blur (`rgba(255,255,255,0.92)`).
  * Real-time digital clock pill (`JetBrains Mono`, displaying `HH:mm:ss WIB`).
  * **Primary Header CTA**: `"+ Activate Cash Machine"` button invoking the modal wizard directly from any view.
  * Current logged-in administrator avatar chip with role title (`"Shift Leader"`).

#### 5.2.2 Key Performance Indicators (KPI Stat Cards)
Arranged in a 4-column responsive grid:
1. **Active Machines**: `7 / 12 machines` (Visual progress bar segmented by active vs available machines).
2. **Today's Total Transactions**: `48 Completed` (Delta metric: `+12 compared to yesterday`).
3. **Estimated Gross Revenue**: `Rp 612.000` (Dual color mini-bar: QRIS 71% in `--busy` blue vs Cash 29% in `--amber`).
4. **Active Interruption Warnings**: `1 Alert` (Red-tinted alert card with pulsating indicator badge).

#### 5.2.3 Emergency Alert Strip
* When an active machine exception occurs (e.g., Wash Cycle stopped mid-run at Minute 18), a high-priority alert strip expands below the KPI metrics.
* **Contents**: Interrupted machine ID (`Washer #04`), Transaction reference (`MW-284688`), remaining cycle time, and direct quick-action button: `"Restart with Dummy Balance"`.

#### 5.2.4 Real-time Running Cycles Grid ("Siklus Sedang Berjalan")
* Dedicated horizontal card grid showcasing active washing/drying runs.
* Each card includes:
  * Machine identifier & cycle badge (`"Washer #03"`, `"Combo Cycle"`).
  * Countdown timer in large numerals with remaining minutes.
  * Multi-stage linear progress bar (Wash → Rinse → Spin → Dry).
  * Transaction token & payment method badge.

#### 5.2.5 Transaction & Activity Ledger
* Modern table view enclosed within a rounded card container.
* Comprehensive toolbar with integrated live client-side search bar and payment-type filter chips (`All`, `QRIS`, `Cash`, `Dummy Restart`).
* Compact table headers with uppercase tracked metadata (`ID TRANSAKSI`, `MESIN`, `WAKTU`, `LAYANAN`, `TOTAL`, `STATUS`).

---

## 6. Functional & Interaction Specifications

### 6.1 Form Interaction States (Login Page)

| Component | Default State | Focused State | Error / Invalid State |
|---|---|---|---|
| **Text Input** | Background `#FFFFFF`, Border `1.5px solid #D4D4D8`, Text `#18181B` | Border `1.5px solid #18181B`, Shadow `0 0 0 3px rgba(24,24,27,0.08)` | Border `1.5px solid #EF4444`, Background `#FEF3C7` tint |
| **Password Toggle** | HugeIcon `view` in `#71717A`, cursor pointer | Icon color `#18181B` | Reverts to default on focus lost |
| **Login CTA Button** | Solid `#18181B`, White text, Soft elevation | Background `#27272A`, translateY(-1px) | Disabled state: `#A1A1AA`, cursor `not-allowed` |

### 6.2 Animation & Micro-Interaction Guidelines
1. **Page Entrance Animation**:
   * Central Semi-Clay card fades in with subtle scale transition (`opacity: 0; transform: scale(0.96) translateY(12px)` to `opacity: 1; transform: scale(1) translateY(0)` over `360ms ease-out`).
   * Vector wave curves enter with smooth staggered horizontal translation.
2. **Card Hover & Focus Dynamics**:
   * Interactive clay cards apply subtle translateY(-2px) and shadow bloom over `200ms cubic-bezier(0.16, 1, 0.3, 1)`.
3. **Validation Feedback**:
   * Incorrect credentials trigger a gentle horizontal 6px keyframe shake animation (`shake 300ms ease-in-out`) and display an inline alert chip.

---

## 7. Responsive Breakpoints & Device Adaptability

| Viewport Category | Width Threshold | Layout Adaptation Rules |
|---|---|---|
| **Desktop / Widescreen** | `≥ 1280px` | Centered 420px semi-clay login card. Full sidebar (256px) on dashboard; 4-column KPI grid; 3-column running cycle grid. |
| **Laptop / Compact Desktop** | `1024px – 1279px` | Centered 400px card. Sidebar adapts to mini-rail or collapsible layout. 2-column KPI grid. |
| **Tablet** | `768px – 1023px` | Centered 380px card. Vector waves scaled to maintain wave crests within visible bounds. Dashboard topbar moves quick-actions to overflow menu. |
| **Mobile** | `< 768px` | Login card width set to `calc(100vw - 32px)`, padding reduced to 20px. Background waves adjusted to vertical orientation. Dashboard sidebar converts to slide-in drawer. |

---

## 8. Technical Architecture & File Layout

The implementation builds upon the zero-framework static architecture of the `menwash-admin` repository:

```
menwash-admin/
├── assets/
│   ├── admin.css           # Core styling tokens, semi-clay definitions, wave animations
│   ├── admin.js            # Global event handlers, mock session management
│   ├── icons.js            # HugeIcons inline SVG library
│   └── layout.js           # Shared sidebar & topbar renderer
├── dashboard.html          # Operational admin command center
├── login.html              # Dedicated authentication view with wave background & semi-clay card
├── logo.svg                # Master vector brand logo
├── PRD_DASHBOARD_DESIGN.md # This specification document
└── DESIGN_SYSTEM.md        # Reference design bible
```

### 8.1 Vector Wave Implementation Code Snippet (for `login.html`)
```html
<div class="wave-canvas" aria-hidden="true">
  <svg class="wave-svg" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
    <defs>
      <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#27272A" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#18181B" stop-opacity="0.95"/>
      </linearGradient>
      <linearGradient id="waveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#3F3F46" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#18181B" stop-opacity="0.6"/>
      </linearGradient>
    </defs>
    <!-- Background Wave Layer 1 -->
    <path d="M0,320 C320,180 540,460 900,280 C1200,140 1360,240 1440,260 L1440,900 L0,900 Z" fill="url(#waveGrad1)"/>
    <!-- Foreground Wave Layer 2 -->
    <path d="M0,520 C380,420 620,680 1020,480 C1280,360 1380,440 1440,470 L1440,900 L0,900 Z" fill="url(#waveGrad2)"/>
  </svg>
</div>
```

---

## 9. Non-Functional Requirements & Compliance

1. **Accessibility (WCAG 2.1 AA)**:
   * All form controls include persistent labels and distinct focus indicators (`:focus-visible`).
   * Inverted text on dark sidebar and status badges complies with minimum 4.5:1 contrast standards.
2. **Performance**:
   * Zero external render-blocking scripts; purely native CSS transitions and SVG paths.
   * Total login page bundle size under 80KB (including inline SVG icons and brand assets).
3. **Cross-Browser Compatibility**:
   * Seamless rendering on Chromium-based browsers (Chrome, Edge, Brave), Firefox 115+, and Safari 16+.
4. **Security & Session Hygiene**:
   * Password input obscured by default with toggle option.
   * `autocomplete="current-password"` enabled for credential manager compliance.

---

## 10. Summary Checklist for Implementation

- [x] Adopt Zinc color scale (`#18181B`, `#27272A`, `#71717A`, `#F4F4F5`) with semantic status indicators.
- [x] Configure typography hierarchy: `Sora` for headings/KPIs, `Plus Jakarta Sans` for body, `JetBrains Mono` for clocks & codes.
- [x] Apply `.card-semi-clay` CSS styling to the login card with dual inset light reflections and soft elevation.
- [x] Center login card precisely on viewport with responsive safety margins.
- [x] Build multi-layered vector wave SVG background with dark gradient transitions.
- [x] Standardize Dashboard shell with shared sidebar, sticky topbar, live clock pill, and KPI metric grid.
