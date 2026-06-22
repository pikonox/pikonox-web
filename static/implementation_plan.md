# XiomTech Static Site → Next.js Conversion

Convert the static Plexify/DexignZone Tailwind CSS template (index.html + other pages) into a fully functional Next.js app with React components, rebranded as **XiomTech**, with a **blue color scheme** replacing the original green, and **GSAP** animations.

## User Review Required

> [!IMPORTANT]
> **Color Scheme Change**: The original template uses green (`#B3E719` primary, `#1B4C40` secondary). We'll replace with a professional **blue palette**:
> - **Primary**: `#3B82F6` (bright blue) → `#60A5FA` (light variant)
> - **Secondary**: `#0F172A` (dark navy)
> - **Accent**: `#38BDF8` (sky blue)
> - **Primary dark**: `#1D4ED8`
>
> Is this blue palette acceptable, or do you have specific hex codes in mind?

> [!IMPORTANT]
> **Pages to convert**: The static site has 12+ HTML pages. For this initial conversion, I'll focus on the **homepage (index.html)** with the full component infrastructure. Other pages (about-us, services, blog, contact, teams, work, FAQ, etc.) will use the same component system and can be added incrementally. Should I attempt all pages in this session?

> [!WARNING]
> **External CDN images**: The template references all images from `plexify.dexignzone.com`. These will be kept as remote URLs initially (configured via `next.config.ts` `images.remotePatterns`). You can replace them with local assets later.

## Proposed Changes

### 1. Configuration & Setup

#### [MODIFY] [next.config.ts](file:///e:/XiomTech/XiomTech_v3/client/next.config.ts)
- Add `images.remotePatterns` for `plexify.dexignzone.com`
- Add Font Awesome CDN and other external resource configs

#### [MODIFY] [package.json](file:///e:/XiomTech/XiomTech_v3/client/package.json)
- Add missing dependencies: `swiper`, `@fortawesome/fontawesome-free`, `apexcharts`, `react-apexcharts`

---

### 2. Design System & Global Styles

#### [MODIFY] [globals.css](file:///e:/XiomTech/XiomTech_v3/client/app/globals.css)
- Port the entire Tailwind CSS design token system from `style.css` (custom spacing, typography scale, z-index, breakpoints, border-radius, gradients)
- Replace green primary `#B3E719` → blue `#3B82F6`
- Replace green secondary `#1B4C40` → navy `#0F172A`
- Port all custom animations (`toTopFromBottom`, `toLeftFromRight`, `rotate`, `ripple-1`, `ScaleInOut`, `bounceInUp`)
- Import Google Fonts: Red Hat Display, Roboto, Kaushan Script, Marcellus, Paytone One
- Port custom component styles (`.btn`, `.button--stroke`, `.flairBtn`, `.accordion`, `.swiper`, `.nav`, `.sub-menu`, etc.)

---

### 3. Layout & Shared Components

#### [MODIFY] [layout.tsx](file:///e:/XiomTech/XiomTech_v3/client/app/layout.tsx)
- XiomTech metadata (title, description, OG tags)
- Import Red Hat Display & Roboto fonts
- Dark mode class (`dark`) on HTML
- Font Awesome & LineAwesome CDN links
- Wrap with `PageWrapper` for smooth scroll

#### [NEW] [components/shared/Header.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/shared/Header.tsx)
- Full navigation with dropdown submenus (Pages, Services, Blog, Shop)
- Logo (XiomTech)
- Theme toggle button (dark/light)
- Phone number + CTA button
- Mobile hamburger menu with full sidenav
- Sticky header on scroll

#### [NEW] [components/shared/Footer.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/shared/Footer.tsx)
- Upper footer: CTA section + world map with locations
- Lower footer: Portfolio/Process/About/Contact quick links + social links
- Copyright with XiomTech branding

#### [NEW] [components/shared/PageWrapper.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/shared/PageWrapper.tsx)
- GSAP ScrollSmoother integration
- ScrollTrigger setup
- Scroll-to-top progress button

---

### 4. Homepage Sections (Components)

#### [MODIFY] [page.tsx](file:///e:/XiomTech/XiomTech_v3/client/app/page.tsx)
- Compose all homepage sections

#### [NEW] [components/features/home/HeroBanner.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/HeroBanner.tsx)
- Full hero with Swiper slider (3 banner images)
- Parallax background image
- CTA buttons + video play button
- Counter stats (1M customers, 18+ years)
- Social media sidebar (vertical)
- GSAP headline animation

#### [NEW] [components/features/home/AboutSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/AboutSection.tsx)
- Financial partner section
- Revenue chart (ApexCharts)
- Rotating "Years of Experience" badge
- Team avatars + member count
- Feature checklist

#### [NEW] [components/features/home/ServicesSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/ServicesSection.tsx)
- Swiper carousel of 6 service cards
- Each card: icon SVG, title, image with clip-path hover, feature list
- Hover effect: background gradient reveal

#### [NEW] [components/features/home/TeamSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/TeamSection.tsx)
- "Team Behind Your Success" with parallax BG
- Swiper team member cards with hover-effect image displacement
- Social links overlay on hover
- Career CTA banner

#### [NEW] [components/features/home/FAQSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/FAQSection.tsx)
- Image with Google Analytics overlay stat card
- Custom accordion with animated indicators
- 4 FAQ items

#### [NEW] [components/features/home/TestimonialsSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/TestimonialsSection.tsx)
- 4.5★ Trustpilot rating card
- Swiper testimonial slider with thumbs gallery
- Star ratings + review text

#### [NEW] [components/features/home/ConsultationSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/ConsultationSection.tsx)
- ApexCharts growth chart
- Contact form (Full Name, Email, Phone, Service select, Message)
- Parallax background

#### [NEW] [components/features/home/BlogSection.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/features/home/BlogSection.tsx)
- Swiper blog tips carousel (3 articles)
- Latest news sidebar card
- Hover-effect image displacement

---

### 5. UI Utilities & Hooks

#### [NEW] [components/ui/ArrowButton.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/ui/ArrowButton.tsx)
- Reusable CTA button with animated arrow icon + flair effect

#### [NEW] [components/ui/VideoDialog.tsx](file:///e:/XiomTech/XiomTech_v3/client/components/ui/VideoDialog.tsx)
- YouTube/Vimeo video modal dialog

#### [NEW] [hooks/useGsap.ts](file:///e:/XiomTech/XiomTech_v3/client/hooks/useGsap.ts)
- Custom hook for GSAP registration (ScrollTrigger, SplitText, ScrollSmoother, MotionPath)

#### [NEW] [hooks/useCounter.ts](file:///e:/XiomTech/XiomTech_v3/client/hooks/useCounter.ts)
- Intersection Observer-based counter animation

#### [NEW] [lib/utils.ts](file:///e:/XiomTech/XiomTech_v3/client/lib/utils.ts)
- `cn()` classname merge utility

---

## Verification Plan

### Automated Tests
- `bun run build` — ensure successful production build with no TypeScript errors
- `bun run dev` — start dev server and verify in browser

### Browser Verification
- Open `http://localhost:3000` in the browser
- Verify: Hero banner renders with Swiper, parallax, blue color scheme
- Verify: All sections render correctly (About, Services, Team, FAQ, Testimonials, Blog, Footer)
- Verify: GSAP animations fire on scroll
- Verify: Mobile responsive menu works
- Verify: Counters animate on scroll into view
- Verify: Swiper carousels are interactive
- Verify: Meta tags show "XiomTech" branding
