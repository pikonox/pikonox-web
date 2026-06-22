# XiomTech_v3 - Project Memory

## Project Overview

**Project Name:** XiomTech_v3 (PikoNox - Business Consulting & Technology Solutions)
**Framework:** Next.js 16.2.4 (App Router)
**Language:** TypeScript
**Database:** PostgreSQL with Prisma ORM
**Styling:** Tailwind CSS v4 + Radix UI + custom CSS
**State Management:** Zustand
**Package Manager:** npm/bun

---

## Tech Stack

### Core Dependencies
- **Next.js** 16.2.4 - React framework with App Router
- **React** 19.2.4 - UI library
- **Prisma** 7.8.0 - ORM with PostgreSQL adapter
- **Zustand** 5.0.13 - State management
- **Tailwind CSS** 4.3.0 - Styling
- **Framer Motion** 12.38.0 - Animations
- **GSAP** 3.15.0 - Advanced animations
- **Three.js** 0.184.0 - 3D graphics
- **Tiptap** 3.23.1 - Rich text editor

### UI Libraries
- **Radix UI** - Headless UI components (dialog, dropdown, accordion, etc.)
- **Lucide React** - Icons
- **Tabler Icons** - Icons
- **React Icons** - Icon library
- **Swiper** - Carousel/slider
- **ApexCharts** - Charts
- **React Hook Form** + **Zod** - Form handling with validation

### Other Dependencies
- **NextAuth** 4.24.14 - Authentication
- **Jose** 6.2.3 - JWT handling
- **Cloudinary** - Image management
- **AWS S3** - File storage
- **React Hot Toast** - Toast notifications
- **React Markdown** - Markdown rendering
- **React Query** (TanStack) - Data fetching
- **React Table** (TanStack) - Table components
- **Date-fns** - Date utilities

---

## Project Structure

```
client/
├── app/                          # Next.js App Router
│   ├── (admin)/                  # Admin routes group
│   │   └── admin/                # Admin dashboard
│   │       ├── blog/             # Blog CRUD
│   │       ├── products/         # Products CRUD
│   │       ├── portfolio/        # Portfolio CRUD
│   │       ├── services/         # Services CRUD
│   │       ├── team/             # Team members CRUD
│   │       ├── testimonials/     # Testimonials CRUD
│   │       ├── faqs/             # FAQs CRUD
│   │       ├── seo/              # SEO settings
│   │       ├── homepage/         # Homepage CMS sections
│   │       ├── site-cms/         # Site-wide CMS
│   │       ├── submissions/      # Contact submissions
│   │       └── guest-posts/      # Guest post submissions
│   ├── (public)/                 # Public routes group
│   │   ├── page.tsx              # Homepage
│   │   ├── about/                # About page
│   │   ├── team/                 # Team page
│   │   ├── faq/                  # FAQ page
│   │   ├── contact/              # Contact page
│   │   ├── services/             # Services listing + [slug] detail
│   │   ├── products/             # Products listing + [slug] detail
│   │   ├── work/                 # Portfolio listing + [slug] detail
│   │   ├── blog/                 # Blog listing + [slug] detail
│   │   ├── guest-post/           # Guest post submission
│   │   └── built-by/             # Built by page
│   ├── (auth)/                   # Auth routes
│   │   └── login/                # Admin login
│   ├── api/                      # API routes
│   │   └── upload/              # File upload endpoint
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/
│   ├── admin/                   # Admin components
│   │   ├── AdminLayoutClient.tsx
│   │   ├── AppAdminSidebar.tsx
│   │   ├── AdminConnectionAudit.tsx
│   │   ├── forms/               # Admin forms (BlogForm, ServiceForm, etc.)
│   │   ├── GalleryRowsEditor.tsx
│   │   ├── ImageUploader.tsx
│   │   ├── RichEditor.tsx
│   │   └── SeoFields.tsx
│   ├── shared/                  # Shared components
│   │   ├── Header.tsx           # Main header
│   │   ├── HeaderClient.tsx     # Header client component
│   │   ├── Footer.tsx          # Main footer
│   │   ├── Breadcrumb.tsx       # Breadcrumb navigation
│   │   └── PageWrapper.tsx      # Page wrapper with loading states
│   ├── cms/                     # CMS page renderers
│   │   ├── HomePageRenderer.tsx
│   │   ├── AboutPageRenderer.tsx
│   │   ├── TeamPageRenderer.tsx
│   │   └── FaqPageRenderer.tsx
│   ├── features/
│   │   ├── home/               # Homepage sections
│   │   │   ├── HeroBanner.tsx
│   │   │   ├── WhatWeDoSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── TechStackSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── DevelopmentProcessSection.tsx
│   │   │   └── ConsultationSection.tsx
│   │   └── about/              # About page components
│   │       ├── AboutHero.tsx
│   │       ├── BrandSwiper.tsx
│   │       ├── HistoryCarousel.tsx
│   │       └── WhyChooseUs.tsx
│   └── public/                 # Public facing components
│       ├── ContactPublicForm.tsx
│       └── GuestPostForm.tsx
├── lib/
│   ├── auth.ts                 # JWT authentication (createSession, getSession, destroySession)
│   ├── db.ts                   # Prisma client singleton
│   ├── store.ts                # Zustand UI store
│   ├── utils.ts                # Utility functions (cn - className merger)
│   ├── data.ts                 # Data utilities
│   ├── tenant.ts               # Tenant configuration
│   ├── fetcher.ts              # Data fetching utilities
│   ├── adminConnectionAudit.ts # Admin database connection check
│   ├── site-cms-presets.ts     # CMS presets
│   ├── seo/
│   │   └── buildMetadata.ts   # SEO metadata builder
│   └── cms/
│       ├── pageMetadata.ts     # Page metadata
│       └── gallery.ts          # Gallery utilities
├── data/                       # Static JSON data
│   ├── site-header.json        # Header configuration
│   ├── site-footer.json        # Footer configuration
│   ├── services.json           # Services static data
│   ├── testimonials.json       # Testimonials static data
│   ├── whatwedo.json           # What we do static data
│   ├── seo-*.json              # SEO configurations
│   └── page-work.json          # Work/portfolio page data
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeder
├── generated/
│   └── prisma/                 # Generated Prisma client
├── public/                     # Static assets
├── package.json                # Dependencies
├── tsconfig.json              # TypeScript config
├── postcss.config.mjs         # PostCSS config
└── eslint.config.mjs          # ESLint config

static/                         # Static HTML files (legacy?)
├── index.html, about-us.html, blog.html, etc.
└── assets/                    # CSS, JS, fonts
```

---

## Database Schema (Prisma Models)

### SiteSection
- `id` (String, cuid)
- `key` (String, unique) - Section identifier (hero, whatwedo, contact, etc.)
- `data` (String, text) - JSON data for the section
- `updatedAt`

### Service
- `id` (String, cuid)
- `slug` (String, unique)
- `title` (String)
- `shortDesc` (String)
- `description` (String, text)
- `icon` (String, nullable)
- `image` (String, nullable)
- `bgImage` (String, nullable)
- `features` (String, text) - JSON array [{title, content}]
- `approachSteps` (String, text) - JSON array [{title, desc}]
- SEO fields (metaTitle, metaDescription, metaKeywords, canonicalPath, ogImage, imageAlt, bgImageAlt)
- `order` (Int, default 0)
- `isActive` (Boolean, default true)
- Timestamps

### Portfolio (Case Studies)
- `id` (String, cuid)
- `slug` (String, unique)
- `title` (String)
- `description` (String)
- `content` (String, text)
- `category` (String, nullable)
- `client` (String, nullable)
- `date` (String, nullable)
- `image` (String, nullable)
- `gallery` (String, text) - JSON array [{url, alt}]
- `outcomeStats` (String, text) - JSON array [{value, label}]
- `liveUrl` (String, nullable)
- SEO fields
- `isFeatured` (Boolean)
- `order`, `isActive`, timestamps

### BlogPost
- `id` (String, cuid)
- `slug` (String, unique)
- `title` (String)
- `excerpt` (String)
- `content` (String, text)
- `image` (String, nullable)
- `author` (String, default "Admin")
- `category` (String, default "General")
- `isPublished` (Boolean)
- `publishedAt` (DateTime)
- SEO fields, timestamps

### Product
- `id` (String, cuid)
- `slug` (String, unique)
- `name` (String)
- `description` (String)
- `content` (String, text)
- `price` (String, default "Contact for Pricing")
- `category` (String, nullable)
- `image` (String, nullable)
- `gallery` (String, text) - JSON array [{url, alt}]
- `features` (String, text) - JSON array [{title, content}]
- SEO fields
- `isFeatured`, `order`, `isActive`, timestamps

### TeamMember
- `id`, `name`, `title`, `bio`, `avatar`, `email`, `linkedin`, `twitter`, `facebook`
- `order`, `isActive`, timestamps

### Testimonial
- `id`, `name`, `text` (text), `rating` (Int, default 5), `image`
- `order`, `isActive`, timestamps

### FAQ
- `id`, `question`, `answer` (text), `order`, `isActive`, timestamps

### Technology
- `id`, `name`, `icon`, `category` (default "all"), `order`, `isActive`, timestamps

### GuestPostSubmission
- `id`, `authorName`, `authorEmail`, `authorBio` (text), `title`, `excerpt` (text), `content` (text)
- `category` (default "General"), `suggestedImage`
- `status` (default "pending" - pending|approved|rejected|published)
- `adminNotes` (text), `blogPostId`, timestamps

### ContactSubmission
- `id`, `firstName`, `lastName`, `email`, `phone`, `service`, `message` (text)
- `isRead` (Boolean), timestamps

---

## Routes Structure

### Public Routes (`(public)`)
| Path | Page | Description |
|------|------|-------------|
| `/` | Homepage | Main landing page |
| `/about` | About | About us page |
| `/team` | Team | Team members listing |
| `/faq` | FAQ | Frequently asked questions |
| `/contact` | Contact | Contact form |
| `/services` | Services | Services listing |
| `/services/[slug]` | ServiceDetail | Individual service page |
| `/products` | Products | Products listing |
| `/products/[slug]` | ProductDetail | Individual product page |
| `/work` | Work | Portfolio/case studies listing |
| `/work/[slug]` | WorkDetail | Individual case study |
| `/blog` | Blog | Blog posts listing |
| `/blog/[slug]` | BlogDetail | Individual blog post |
| `/guest-post` | GuestPost | Guest post submission form |
| `/built-by` | BuiltBy | Built by page |

### Admin Routes (`(admin)`)
| Path | Page | Description |
|------|------|-------------|
| `/admin` | AdminDashboard | Main admin dashboard |
| `/admin/blog` | BlogList | Blog posts management |
| `/admin/blog/new` | BlogCreate | Create new blog post |
| `/admin/blog/[id]` | BlogEdit | Edit blog post |
| `/admin/products` | ProductList | Products management |
| `/admin/products/new` | ProductCreate | Create product |
| `/admin/products/[id]` | ProductEdit | Edit product |
| `/admin/portfolio` | PortfolioList | Portfolio management |
| `/admin/portfolio/new` | PortfolioCreate | Create portfolio item |
| `/admin/portfolio/[id]` | PortfolioEdit | Edit portfolio item |
| `/admin/services` | ServiceList | Services management |
| `/admin/services/new` | ServiceCreate | Create service |
| `/admin/services/[id]` | ServiceEdit | Edit service |
| `/admin/team` | TeamList | Team members management |
| `/admin/team/new` | TeamCreate | Create team member |
| `/admin/team/[id]` | TeamEdit | Edit team member |
| `/admin/testimonials` | TestimonialList | Testimonials management |
| `/admin/testimonials/new` | TestimonialCreate | Create testimonial |
| `/admin/testimonials/[id]` | TestimonialEdit | Edit testimonial |
| `/admin/faqs` | FAQList | FAQs management |
| `/admin/faqs/new` | FAQCreate | Create FAQ |
| `/admin/faqs/[id]` | FAQEdit | Edit FAQ |
| `/admin/seo` | SEO | SEO settings |
| `/admin/homepage/hero` | HeroCMS | Homepage hero section CMS |
| `/admin/homepage/whatwedo` | WhatWeDoCMS | Homepage what we do section |
| `/admin/homepage/contact` | ContactCMS | Homepage contact section |
| `/admin/site-cms` | SiteCMS | Site-wide CMS settings |
| `/admin/submissions` | Submissions | Contact form submissions |
| `/admin/guest-posts` | GuestPosts | Guest post submissions |

### Auth Routes (`(auth)`)
| Path | Page | Description |
|------|------|-------------|
| `/login` | Login | Admin login page |

### API Routes
| Path | Method | Description |
|------|--------|-------------|
| `/api/upload` | POST | File upload endpoint |

---

## State Management

### Zustand Store (`lib/store.ts`)
```typescript
interface UIState {
  theme: "dark" | "light"
  isMobileMenuOpen: boolean
  videoDialog: { isOpen: boolean; src: string; type: "youtube" | "vimeo" | "mp4" }
  isLoading: boolean
}
```
Actions: `toggleTheme`, `setTheme`, `toggleMobileMenu`, `closeMobileMenu`, `openVideoDialog`, `closeVideoDialog`, `setLoading`

---

## Authentication

### JWT-based Auth (`lib/auth.ts`)
- Uses **Jose** library for JWT creation/verification
- Cookie name: `admin-session`
- Expiration: 7 days
- Secret: `JWT_SECRET` env variable
- Functions:
  - `createSession(userId, email, companyId)` - Creates JWT and sets cookie
  - `getSession()` - Returns payload or null
  - `destroySession()` - Deletes cookie

### Login Action (`app/lib/actions.ts`)
- Hardcoded credentials: `admin` / `123456`
- Creates session and redirects to `/admin`

---

## Component Categories

### Admin Components
- `AdminLayoutClient.tsx` - Admin layout wrapper
- `AppAdminSidebar.tsx` - Admin navigation sidebar
- `AdminConnectionAudit.tsx` - DB connection status checker
- **Forms:**
  - `BlogForm.tsx` - Blog post create/edit form
  - `ServiceForm.tsx` - Service create/edit form
  - `ProductForm.tsx` - Product create/edit form
  - `PortfolioForm.tsx` - Portfolio item create/edit form
  - `TeamMemberForm.tsx` - Team member create/edit form
  - `TestimonialForm.tsx` - Testimonial create/edit form
  - `FAQForm.tsx` - FAQ create/edit form
  - `ContactAdminForm.tsx` - Contact form settings
  - `WhatWeDoAdminForm.tsx` - What we do section form
  - `HeroAdminForm.tsx` - Hero section form
- **Utilities:**
  - `GalleryRowsEditor.tsx` - Image gallery editor
  - `ImageUploader.tsx` - Image upload component
  - `RichEditor.tsx` - Tiptap rich text editor
  - `SeoFields.tsx` - SEO meta fields component

### Shared Components
- `Header.tsx` - Main header (server component)
- `HeaderClient.tsx` - Header client logic
- `Footer.tsx` - Main footer
- `Breadcrumb.tsx` - Breadcrumb navigation
- `PageWrapper.tsx` - Page wrapper with loading state

### CMS Page Renderers
- `HomePageRenderer.tsx` - Dynamic homepage renderer
- `AboutPageRenderer.tsx` - Dynamic about page renderer
- `TeamPageRenderer.tsx` - Dynamic team page renderer
- `FaqPageRenderer.tsx` - Dynamic FAQ page renderer

### Homepage Features
- `HeroBanner.tsx` - Hero section
- `WhatWeDoSection.tsx` - Capabilities section
- `ServicesSection.tsx` - Services showcase
- `TechStackSection.tsx` - Technology stack
- `TestimonialsSection.tsx` - Client testimonials
- `BlogSection.tsx` - Recent blog posts
- `TeamSection.tsx` - Team highlights
- `AboutSection.tsx` - About preview
- `FAQSection.tsx` - FAQ preview
- `DevelopmentProcessSection.tsx` - Process steps
- `ConsultationSection.tsx` - CTA section

### About Page Features
- `AboutHero.tsx` - About hero section
- `BrandSwiper.tsx` - Brand/logo carousel
- `HistoryCarousel.tsx` - Company history timeline
- `WhyChooseUs.tsx` - Why choose us features

### Public Forms
- `ContactPublicForm.tsx` - Public contact form
- `GuestPostForm.tsx` - Guest post submission form

---

## Data Files (`data/`)

### Static JSON Data
| File | Purpose |
|------|---------|
| `site-header.json` | Header config (brand, nav, social links) |
| `site-footer.json` | Footer config (CTA, locations, links) |
| `services.json` | Static services data |
| `testimonials.json` | Static testimonials |
| `whatwedo.json` | What we do capabilities |
| `seo-*.json` | SEO configs for different pages |

### Data Structure Examples

**site-header.json:**
```json
{
  "brand": { "prefix": "Web", "suffix": "Xprt", "href": "/" },
  "contact": { "phone": "+1 (123) 456-78-90", "email": "info@pikonox.com" },
  "cta": { "label": "Let's Connect", "href": "/contact" },
  "nav": [/* navigation items with children */],
  "socialLinks": [/* social media links */]
}
```

---

## Key Configuration Files

### package.json Scripts
```json
{
  "dev": "next dev",
  "build": "prisma generate && next build",
  "start": "node .next/standalone/server.js",
  "lint": "eslint",
  "db:push": "prisma db push",
  "db:seed": "tsx --env-file=.env prisma/seed.ts"
}
```

### Database Connection (`lib/db.ts`)
- Uses Prisma with PostgreSQL adapter (PrismaPg)
- Singleton pattern to prevent pool exhaustion
- Schema: configurable via `schema` query param
- SSL support for production

### Environment Variables Needed
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

---

## Key Patterns & Conventions

1. **Route Groups:** Using `(admin)`, `(public)`, `(auth)` for route organization
2. **Server Actions:** Form submissions use server actions in `app/lib/actions.ts`
3. **Zustand:** Client state in `lib/store.ts` for theme, mobile menu, video dialog
4. **Prisma Singleton:** Database client is singleton in `lib/db.ts`
5. **JSON Fields:** Database stores complex data as JSON strings
6. **SEO:** Every model has metaTitle, metaDescription, metaKeywords, canonicalPath, ogImage, imageAlt
7. **Soft Deletes:** Using `isActive` boolean instead of actual deletes
8. **Ordering:** Many entities have `order` field for sorting

---

## Component Naming Conventions
- Admin forms: `*Form.tsx` (ServiceForm, BlogForm, etc.)
- Admin list pages: Simple page.tsx files in route folders
- Public sections: `*Section.tsx` for homepage sections
- Page renderers: `*PageRenderer.tsx` for dynamic CMS pages

---

## Development Notes
- Uses Next.js 16.2.4 (bleeding edge version with breaking changes)
- Tailwind CSS v4 (new version with different configuration)
- Prisma v7 with new adapter architecture
- React 19 with new features
- Production build uses standalone output mode