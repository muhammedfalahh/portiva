# 🌐 Portiva — Modern Bento Micro-Website Engine & Visual Builder

<p align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layout-grid.svg" width="64" height="64" alt="Portiva Logo" />
</p>

<p align="center">
  <strong>Beyond Monotonous Links-in-Bio: The Visual Micro-Website Engine for Creators & Businesses</strong>
</p>

<p align="center">
  <a href="#-about-portiva">About</a> •
  <a href="#-live-demo--video-walkthrough">Video Demo</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-template-ecosystem">Templates</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started--how-to-run">Quick Start</a> •
  <a href="#-project-structure">Architecture</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React_19-blue?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Zustand-orange?style=for-the-badge" alt="Zustand" />
</p>

---

## 📹 Live Demo & Video Walkthrough

> ### 🎥 Watch Portiva in Action
> 
> Check out the complete screen recording demonstrating the website, visual builder, template switcher, and live editing:
> 
> 🔗 **[👉 Click Here to Watch the Video Walkthrough on Google Drive 👈](https://drive.google.com/file/d/1UlP186rk80APxbJmwPWwQ9cKQOXJIygQ/view?usp=sharing)**
> 
> *Walkthrough highlights: interactive landing page, template selector, on-canvas visual editing, theme/palette customization, and responsive multi-device previews.*

---

## 📖 About Portiva

### 💡 What is Portiva?
**Portiva** is a high-performance visual website engine that lets creators, freelancers, and local small businesses create agency-grade micro-websites and modular **Bento-grid** portfolios in under 60 seconds — with **zero coding required**.

### 🚫 The Problem: Outdated Link-in-Bio Tools
Traditional link-in-bio tools (like Linktree, Beacons, and standard profile aggregators) are rigid, single-column stacks of plain rectangular buttons. They look generic, dilute brand identity, and fail to turn visitors into paying customers or clients.

### ✨ The Solution: The Bento-Grid Micro-Website
Portiva transforms that outdated format into an **editorial, interactive Bento grid**:
- **Rich Media & Visual Hierarchy**: Feature YouTube embeds, high-resolution photography, client testimonials, and product showcases in balanced, tactile card layouts.
- **Conversion-Ready for Real Businesses**: Direct WhatsApp inquiries, pre-filled ordering carts, booking links, and call buttons that drive real sales.
- **Canva/Framer-Style Visual Canvas**: Click any text, button, or image directly on canvas to edit content, change color palettes, tweak typography, or swap layouts in real time.

```
  Traditional Link-in-Bio               Portiva Bento Micro-Website
 ┌──────────────────────┐             ┌───────────────────────────────────┐
 │     [ Avatar ]       │             │    [ Profile & Brand Header ]     │
 │     @username        │             ├─────────────────┬─────────────────┤
 │                      │  ─────────► │ [ Media Card ]  │ [ WhatsApp CTA] │
 │  [ Button Link 1 ]   │   UPGRADE   ├─────────────────┴─────────────────┤
 │  [ Button Link 2 ]   │             │ [ Dynamic Catalog / Portfolio ]   │
 │  [ Button Link 3 ]   │             ├─────────────────┬─────────────────┤
 └──────────────────────┘             │ [ Socials / Map]│ [ Review Badge ]│
                                      └─────────────────┴─────────────────┘
```

---

## ✨ Key Features

- 🍱 **Modular Bento Grid System**: Asymmetrical, dynamic card grid layouts that naturally guide visitors' eyes to your highest-value content and call-to-actions.
- 🎨 **100% Visual On-Canvas Editor**:
  - Direct inline text editing
  - Instant image upload and aspect-ratio adjustment
  - Custom color themes, backgrounds, and font pairings
  - Real-time undo/redo and canvas zoom controls
- 🛍️ **WhatsApp Ordering & Lead Generation**: Pre-configured WhatsApp catalog widget that packages user selections into instant, pre-filled WhatsApp checkout chats.
- 📱 **True Multi-Device Responsive Design**: Seamless layout adaptations across mobile phones (320px+), tablets, and desktop displays.
- ⚡ **Cutting-Edge Performance**:
  - Edge SSR & ISR (Incremental Static Regeneration) for lightning-fast page loads
  - Automatic client-side image compression (WebP under 150KB)
  - Zero-egress asset delivery via Cloudflare R2
- 🔒 **Enterprise-Grade Architecture**: Powered by Supabase PostgreSQL with strict Row Level Security (RLS) policies and Next.js 16 App Router.

---

## 🏛️ Template Ecosystem

Portiva includes handcrafted, niche-specific templates built for different industries — each with curated typography, color harmony, and conversion components:

| Template | Industry / Niche | Key Visual Style & Highlights |
|---|---|---|
| **BentoBio** | Digital Creators & Influencers | Flagship Bento grid, media cards, social badges, WhatsApp conversion |
| **AuraSalon** | Luxury Salons & Beauty Spas | High-fashion serif typography, service pricing, booking CTAs |
| **CafeCloud** | Cafes, Bakeries & Restaurants | Warm artisanal tones, digital menu, location and hours card |
| **AutoDrive** | Automotive Dealerships & Showrooms | Bold cinematic dark surfaces, vehicle inventory showcase, test drive CTAs |
| **EstatePrime** | Real Estate Agents & Architecture | Architectonic layout, property listings, floorplan previews |
| **ApexFit** | Fitness Studios & Personal Trainers | Kinetic, high-energy layout, class schedules, membership tiers |
| **MentorX** | Educators, Coaches & Course Creators | Trustworthy structured layout, student testimonials, course enrollments |
| **Nitec** | Developers & UI/UX Designers | Obsidian dark mode, tech stack badges, GitHub & project links |
| **SnapMaster** | Photographers & Videographers | Gallery-first visual layout, full-bleed media previews, booking inquiries |
| **StudioNova** | Creative Agencies & Design Studios | Swiss minimal design, client case studies, service deliverables |
| **LuxeUniversal** | Premium E-Commerce & Boutiques | Editorial luxury aesthetic, featured product grids, direct inquiry checkout |
| **Aurik** | Minimal Editorial Portfolios | Clean typography, essential links, distraction-free aesthetics |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Frontend Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing throughout)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS Custom Property design tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Smooth springs and micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand) (Workspace canvas state, undo/redo, theme cascades)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with RLS policies and JSONB layout storage)
- **Object Storage**: [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (S3-compatible, edge media hosting)

---

## 🚀 Getting Started / How to Run

Follow these step-by-step instructions to get Portiva up and running on your local machine.

### 1. Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.18.0 or v20+ recommended)
- [Git](https://git-scm.com/)
- A package manager: `npm` (bundled with Node), `pnpm`, `yarn`, or `bun`

---

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/portiva.git
cd portiva
```

---

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

---

### 4. Configure Environment Variables

Create a `.env.local` file in the root of the project by copying the provided example:

```bash
cp .env.local.example .env.local
```

Open `.env.local` in your editor and configure your credentials:

```env
# ── Supabase Configuration ───────────────────────────────────────────────────
# Get these from your Supabase dashboard: Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-or-publishable-key
SUPABASE_SECRET_KEY=your-supabase-service-role-secret-key

# ── Cloudflare R2 Configuration (Optional for initial local UI exploration) ────
# Get these from: Cloudflare Dashboard -> R2 -> Manage R2 API Tokens
NEXT_PUBLIC_R2_UPLOAD_URL=https://your-account-id.r2.cloudflarestorage.com/portiva-assets
NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.yourdomain.com
R2_AUTH_TOKEN=your-r2-api-token

# ── App URL ──────────────────────────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> 💡 **Tip for Local Testing**: You can start the app and explore the landing page and visual canvas editor immediately even before setting up Supabase or R2! The app gracefully handles offline builder state and local previewing.

---

### 5. Run the Development Server

```bash
npm run dev
```

The application will start on:
👉 **[http://localhost:3000](http://localhost:3000)**

---

### 6. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server with Webpack |
| `npm run build` | Builds the production-ready bundle |
| `npm run start` | Boots the compiled production server |
| `npm run lint` | Runs ESLint to inspect code quality |

---

## 🗺️ Key Application Routes

Once the local server is running, you can explore the following pages:

- **`http://localhost:3000/`** — **Landing Page**: Showcase of Portiva's capabilities, interactive template browser, and feature overviews.
- **`http://localhost:3000/dashboard`** — **Creator Studio & Visual Builder**: The visual workspace where you can customize layouts, switch templates, edit cards, and tweak theme settings in real time.
- **`http://localhost:3000/[username]`** — **Public Profile Route**: The edge-rendered public Bento micro-website for any registered user handle.

---

## 📂 Project Structure

```
portiva/
├── .env.local.example              # Template environment variables
├── package.json                    # Project dependencies and run scripts
├── next.config.ts                  # Next.js configuration
├── supabase/
│   └── migrations/                 # PostgreSQL migrations (schemas, RLS, theme tables)
└── src/
    ├── app/                        # Next.js App Router
    │   ├── page.tsx                # Marketing landing page & template showcase
    │   ├── layout.tsx              # Global root layout & font definitions
    │   ├── globals.css             # Tailwind v4 theme tokens & custom CSS variables
    │   ├── dashboard/              # Creator Studio & visual builder route
    │   ├── [username]/             # Public dynamic micro-site profile route (ISR)
    │   └── api/upload/             # Cloudflare R2 edge upload proxy route
    ├── components/
    │   ├── engine/                 # Core Visual Builder Engine
    │   │   ├── useWorkspaceStore.ts# Centralized Zustand state engine
    │   │   ├── WorkspaceContainer  # Canvas wrapper, sidebar, and viewport shell
    │   │   ├── InspectorSidebar.tsx# Canva/Framer-style property customization panel
    │   │   ├── BentoCustomizer.tsx # Grid card management and layout organizer
    │   │   ├── EditableElement.tsx # Inline text/image/style editing primitive
    │   │   └── ThemeProvider.tsx   # Dynamic CSS custom property injection
    │   ├── templates/              # Industry-specific micro-website templates
    │   │   ├── BentoBio.tsx        # Flagship creator Bento grid
    │   │   ├── AuraSalon.tsx       # Luxury salon template
    │   │   ├── CafeCloud.tsx       # Cafe & dining template
    │   │   ├── AutoDrive.tsx       # Automotive dealership template
    │   │   ├── EstatePrime.tsx     # Real estate micro-site
    │   │   └── ...                 # Additional niche templates
    │   └── widgets/                # Specialized business conversion components
    │       └── WhatsAppCatalog.tsx # WhatsApp instant ordering modal
    ├── lib/                        # Core utilities & database schema typings
    │   ├── database.types.ts       # TypeScript database interfaces
    │   ├── theme.types.ts          # Theme config & style override typings
    │   └── supabase/               # Browser and Server Supabase clients
    └── utils/
        └── AssetPipeline.ts        # Client-side image WebP compression utility
```

---

## 🎨 How the Visual Builder Works

1. **Pick a Template**: Browse curated templates crafted for your specific industry or aesthetic preference.
2. **Click & Edit**: Tap directly on any headline, subtitle, image, or card to edit it on canvas.
3. **Customize Themes**: Adjust primary/accent colors, backgrounds, card borders, and font pairings with live preview.
4. **Add Conversion Widgets**: Insert WhatsApp catalog ordering, social links, video embeds, and portfolio galleries.
5. **Preview Across Devices**: Toggle between mobile, tablet, and desktop viewports to ensure pixel-perfect presentation.
6. **Publish**: Launch your fast, edge-hosted micro-website with a single click.

---

## 🤝 Contributing

Contributions, feedback, and feature suggestions are always welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.

---

<p align="center">
  Crafted with care for modern creators and small businesses.
</p>
