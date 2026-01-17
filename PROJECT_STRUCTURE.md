# 📂 FUTUREWEAR - Project Structure

## 🎨 Visual Layout Map

```
┌─────────────────────────────────────────────────┐
│  NAVBAR (Sticky)                                │
│  [FUTUREWEAR] [Collection] [About] [Drops] [🛒] │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              HERO SECTION                       │
│                                                 │
│          ╔═════════════════╗                    │
│          ║  F U T U R E    ║                    │
│          ║  W E A R        ║ (Animated Letters) │
│          ╚═════════════════╝                    │
│                                                 │
│     [🌐 3D Floating Background]                 │
│                                                 │
│  [Explore Collection →] [Watch Film]            │
│                 ⬇ (Scroll)                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  MARQUEE BANNER (Infinite Scroll →)             │
│  NEW COLLECTION — DROP 01 — #05783A — NEW...   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  PRODUCT SECTION (Horizontal Scroll)            │
│  Latest Collection                              │
│                                                 │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐       │
│  │IMG │  │IMG │  │IMG │  │IMG │  │IMG │  →    │
│  │    │  │    │  │    │  │    │  │    │       │
│  └────┘  └────┘  └────┘  └────┘  └────┘       │
│  Name    Name    Name    Name    Name          │
│  $299    $499    $349    $129    $199          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  MARQUEE BANNER (Infinite Scroll ←)             │
│  ...FUTURE WEAR — PREMIUM STREETWEAR — FUTURE  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FEATURES SECTION                               │
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │  ⚡     │  │  🛡️     │  │  ✨     │        │
│  │  Fast   │  │ Premium │  │ Limited │        │
│  │Delivery │  │ Quality │  │  Drops  │        │
│  └─────────┘  └─────────┘  └─────────┘        │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  CTA SECTION (Newsletter)                       │
│                                                 │
│      🎯 Join The Movement                       │
│                                                 │
│   Be Part of the FUTURE                         │
│                                                 │
│  [Email Input] [Subscribe →]                    │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FOOTER                                         │
│                                                 │
│  FUTUREWEAR        Shop      Support            │
│  Description       Links     Links              │
│  [📱 🐦 📺]                                     │
│                                                 │
│  © 2025 FUTUREWEAR  |  Privacy  |  Terms        │
└─────────────────────────────────────────────────┘
```

## 📁 File Organization

```
thob/
├── 📱 app/
│   ├── layout.tsx          ← Root layout (fonts, providers)
│   ├── page.tsx            ← Main landing page
│   ├── globals.css         ← Global styles & grid
│   └── favicon.ico
│
├── 🎨 components/
│   ├── SmoothScroll.tsx    ← Lenis wrapper
│   ├── Navbar.tsx          ← Navigation (230 lines)
│   ├── Hero.tsx            ← Hero section (132 lines)
│   ├── Marquee.tsx         ← Infinite scroll text (37 lines)
│   ├── ProductSection.tsx  ← Horizontal scroll (118 lines)
│   ├── FeaturesSection.tsx ← Features grid (71 lines)
│   ├── CTASection.tsx      ← Newsletter (116 lines)
│   ├── Footer.tsx          ← Footer (90 lines)
│   └── KineticText.tsx     ← Scroll-reactive text (45 lines)
│
├── 📄 Documentation/
│   ├── README.md           ← Main documentation
│   ├── QUICK_START.md      ← Quick start guide
│   ├── FEATURES.md         ← Feature documentation
│   └── PROJECT_STRUCTURE.md ← This file
│
├── ⚙️ Config/
│   ├── package.json        ← Dependencies
│   ├── tsconfig.json       ← TypeScript config
│   ├── next.config.ts      ← Next.js config
│   ├── postcss.config.mjs  ← PostCSS config
│   └── eslint.config.mjs   ← ESLint config
│
└── 📦 public/              ← Static assets
```

## 🎯 Component Hierarchy

```
RootLayout
└── SmoothScroll Provider
    └── Home Page
        ├── Navbar
        │   ├── Logo
        │   ├── Desktop Menu
        │   ├── Cart Icon
        │   └── Mobile Menu
        │
        ├── Hero
        │   ├── 3D Background (placeholder)
        │   ├── Animated Title
        │   ├── Description
        │   ├── CTA Buttons
        │   └── Scroll Indicator
        │
        ├── Marquee (→)
        │
        ├── ProductSection
        │   ├── Section Header
        │   └── Product Cards × 5 (duplicated)
        │       ├── Image Placeholder
        │       ├── Hover Overlay
        │       ├── Product Name
        │       └── Price
        │
        ├── Marquee (←)
        │
        ├── FeaturesSection
        │   └── Feature Cards × 3
        │       ├── Icon
        │       ├── Title
        │       └── Description
        │
        ├── CTASection
        │   ├── Background Gradients
        │   ├── Floating Shapes
        │   ├── Heading
        │   └── Email Form
        │
        └── Footer
            ├── Brand Info
            ├── Social Links
            ├── Navigation Links
            └── Legal Links
```

## 🎨 Style Architecture

```
Tailwind CSS v4
├── Custom Theme (@theme inline)
│   ├── Colors
│   │   ├── brand-green (#05783A)
│   │   └── brand-pink (#E079B7)
│   └── Fonts
│       ├── heading (Syne)
│       └── sans (Inter)
│
├── Global Styles
│   ├── Grid Background
│   ├── Vignette Effect
│   └── Lenis Classes
│
└── Component Styles
    ├── Utility Classes
    ├── Responsive Breakpoints
    └── Dark Mode Variants
```

## 🔄 Animation Flow

```
Page Load
├── Navbar: slides down (y: -100 → 0)
├── Hero Letters: stagger up (y: 100 → 0, opacity: 0 → 1)
├── Hero Description: fade in (delay: 0.8s)
├── Hero Buttons: scale in (delay: 1s)
└── Scroll Indicator: fade in (delay: 1.5s)

Scroll Events
├── Marquee: continuous X translation
├── Products: horizontal scroll (linked to vertical scroll)
├── Features: stagger in on viewport enter
├── CTA: fade in on viewport enter
└── Kinetic Text: skew based on scroll velocity

Hover Interactions
├── Buttons: background slide effect
├── Product Cards: Y lift + overlay fade
├── Social Icons: scale up
└── Links: color transition
```

## 📦 Dependencies Map

```
Production
├── next (Framework)
├── react & react-dom (UI Library)
├── framer-motion (Animations)
├── @studio-freight/react-lenis (Smooth Scroll)
├── @splinetool/react-spline (3D)
└── lucide-react (Icons)

Development
├── typescript (Type Safety)
├── tailwindcss (Styling)
├── @tailwindcss/postcss (Processing)
├── eslint & eslint-config-next (Linting)
├── @types/* (Type Definitions)
```

## 🎯 Data Flow

```
User Interaction → Component State → Animation Trigger → Visual Update

Examples:
1. Scroll Event → Lenis → Smooth Position → useTransform → Product X Position
2. Hover → State Change → Framer Motion → Color/Position Change
3. Load → Initial Animation → Stagger → Letter Reveal
```

## 🚀 Performance Strategy

```
Optimization Layers
├── Next.js
│   ├── App Router (Fast navigation)
│   ├── Font Optimization (Google Fonts)
│   └── Image Optimization (ready for <Image>)
│
├── React
│   ├── Component Lazy Loading (built-in)
│   └── Viewport Detection (whileInView)
│
├── CSS
│   ├── Tailwind Purging (unused styles removed)
│   ├── will-change-transform (GPU acceleration)
│   └── Hardware Acceleration (translate3d)
│
└── JavaScript
    ├── Spring Physics (smooth animations)
    ├── RAF Optimization (Lenis)
    └── Event Throttling (scroll listeners)
```

## 🎨 Color Usage Map

```
brand-green (#05783A)
├── Grid Lines
├── Primary CTA Buttons
├── Hover States
├── Icons & Accents
├── Links
└── Borders

brand-pink (#E079B7)
├── Secondary Accents
├── Button Hover Overlays
├── Gradient Backgrounds
└── Highlighted Text

Background
├── Dark: #000000 (default)
└── Light: #FFFFFF (system preference)
```

---

## 📊 Component Stats

| Component | Lines | Animations | Interactive |
|-----------|-------|------------|-------------|
| Navbar | 230 | ✅ Entry | ✅ Menu Toggle |
| Hero | 132 | ✅ Letters | ✅ Buttons |
| Marquee | 37 | ✅ Infinite | ❌ Static |
| ProductSection | 118 | ✅ Scroll-linked | ✅ Hover |
| FeaturesSection | 71 | ✅ Stagger | ✅ Hover |
| CTASection | 116 | ✅ Floating | ✅ Form |
| Footer | 90 | ✅ Hover | ✅ Links |

**Total**: ~794 lines of component code
**Animation Points**: 15+
**Interactive Elements**: 30+

---

Built with precision and attention to detail ✨
Ready for Awwwards submission 🏆



