import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import { PrismaClient } from "../generated/prisma/client";

const rawUrl = process.env.DATABASE_URL!;
const url = new URL(rawUrl);
const schema = url.searchParams.get("schema") ?? "xiomtech";

const pool = new pg.Pool({
  host: url.hostname,
  port: parseInt(url.port) || 5432,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  options: `-c search_path=${schema}`,
  ssl: url.searchParams.get("sslmode") === "require" ? { rejectUnauthorized: false } : false,
});

const adapter = new PrismaPg(pool, { schema });
const prisma = new PrismaClient({ adapter });

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// ─── DevIcon CDN helper ───────────────────────────────────────────────────────
const devicon = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`;

// ─── Unsplash helpers ─────────────────────────────────────────────────────────
const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

async function upsertSection(key: string, data: object) {
  await prisma.siteSection.upsert({
    where: { key },
    update: { data: JSON.stringify(data) },
    create: { key, data: JSON.stringify(data) },
  });
}

async function main() {
  console.log("🌱 Seeding PikoNox database...\n");

  // ─── Hero Section ───────────────────────────────────────────────────────────
  await upsertSection("hero", {
    slides: [
      {
        badge: "Award-Winning Digital Agency",
        headline: "We Build Digital Experiences That Drive Real Results.",
        description: "From strategy to execution, PikoNox crafts powerful web & mobile solutions that help businesses grow, scale, and succeed in the digital age.",
      },
      {
        badge: "Trusted by 200+ Clients Worldwide",
        headline: "Innovative Technology. Exceptional Design.",
        description: "Our team delivers cutting-edge web applications, AI integrations, and brand identities tailored to your vision and goals.",
      },
      {
        badge: "Full-Stack AI Development",
        headline: "Your Vision. Our Expertise. Endless Possibilities.",
        description: "We partner with startups and enterprises to transform ideas into market-ready digital products that scale.",
      },
    ],
    stats: [
      { value: "200+", label: "Projects Delivered" },
      { value: "98%", label: "Client Satisfaction" },
    ],
    bgVideoId: "ahy5o5nT4oI",
    videoUrl: "https://www.youtube.com/embed/tVphpcFHGaI",
    socialLinks: [
      { label: "Instagram", href: "https://www.instagram.com", icon: "fa-brands fa-instagram" },
      { label: "Facebook", href: "https://www.facebook.com", icon: "fa-brands fa-facebook-f" },
      { label: "LinkedIn", href: "https://www.linkedin.com", icon: "fa-brands fa-linkedin-in" },
      { label: "Twitter", href: "https://www.x.com", icon: "fa-brands fa-x-twitter" },
    ],
  });
  console.log("✓ Hero section");

  // ─── What We Do ─────────────────────────────────────────────────────────────
  await upsertSection("whatwedo", {
    badge: "Our Capabilities",
    headingPrefix: "PikoNox is a premium",
    highlight1: "AI Transformation",
    highlight2: "Digital Solutions",
    headingSuffix: "agency.",
    items: [
      {
        title: "AI Transformation",
        description: "We embed intelligence into your entire business — from lead generation and customer support to predictive analytics and automation.",
        caption: "Turning businesses into intelligent, scalable AI-driven enterprises",
        image: unsplash("1620712943543-bcc4688e7485", 800),
        imageHover: unsplash("1677442135703-1787eea5ce01", 800),
      },
      {
        title: "Mobile App Development",
        description: "We turn your idea into a feature-rich, intuitive app that delights users on iOS and Android — built with React Native for cross-platform excellence.",
        caption: "Crafting extraordinary mobile experiences your customers love",
        image: unsplash("1512941937669-90a1b58e7e9c", 800),
        imageHover: unsplash("1551650975-87deedd944c3", 800),
      },
      {
        title: "Ecommerce Development",
        description: "We build stunning, conversion-optimised e-commerce platforms — more traffic, higher sales, and robust security baked in from day one.",
        caption: "Building ecommerce that drives measurable online growth",
        image: unsplash("1556742049-0cfed4f6a45d", 800),
        imageHover: unsplash("1563013544-824ae1b704d3", 800),
      },
    ],
  });
  console.log("✓ What We Do section");

  // ─── Contact Section ────────────────────────────────────────────────────────
  await upsertSection("contact", {
    heading: "Ready to Accelerate Your Growth?",
    description: "Whether you need elite AI engineering, robust cloud infrastructure, or a dedicated software team — our experts are ready to deliver.",
    phone: "",
    email: "contact@pikonox.com",
    address: "Punjab, Pakistan",
    services: [
      "AI & Machine Learning",
      "Cloud Infrastructure",
      "Custom Software Development",
      "Mobile App Development",
      "Ecommerce Solutions",
      "UI/UX Design",
      "Dedicated Tech Teams",
      "Other Inquiry",
    ],
  });
  console.log("✓ Contact section");

  // ─── Tech Stack Section ─────────────────────────────────────────────────────
  await upsertSection("home-techstack", {
    title: "Technologies We Master",
    subtitle: "We work with the latest and most reliable technologies to build powerful, future-proof solutions.",
    brands: [
      { name: "React", logo: devicon("react") },
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", logo: devicon("typescript") },
      { name: "Node.js", logo: devicon("nodejs") },
      { name: "Python", logo: devicon("python") },
      { name: "PostgreSQL", logo: devicon("postgresql") },
      { name: "MongoDB", logo: devicon("mongodb") },
      { name: "Docker", logo: devicon("docker") },
      { name: "AWS", logo: "https://img.icons8.com/color/96/amazon-web-services.png" },
      { name: "Figma", logo: devicon("figma") },
      { name: "GraphQL", logo: devicon("graphql") },
      { name: "Redis", logo: devicon("redis") },
    ],
  });
  console.log("✓ Tech Stack section");

  // ─── Page SEO for all pages ─────────────────────────────────────────────────
  const pageSeo = [
    {
      key: "page-about",
      data: {
        metaTitle: "About PikoNox — AI-Powered Digital Agency",
        metaDescription: "Learn about PikoNox's mission, team, and story. We build cutting-edge software, AI solutions, and digital products for ambitious businesses worldwide.",
        metaKeywords: "about PikoNox, digital agency, AI development team, software company",
        breadcrumb: { title: "About Our Agency", subtitle: "A team obsessed with building technology that makes a real difference." },
      },
    },
    {
      key: "page-services",
      data: {
        metaTitle: "Our Services — PikoNox Digital Agency",
        metaDescription: "Explore PikoNox's full range of services: AI development, mobile apps, ecommerce, cloud infrastructure, and more. Built for scale.",
        metaKeywords: "web development services, AI development, mobile app development, cloud solutions",
        breadcrumb: { title: "Our Services", subtitle: "End-to-end digital services that help your business grow, scale, and lead." },
      },
    },
    {
      key: "seo-services",
      data: {
        metaTitle: "Our Services — PikoNox Digital Agency",
        metaDescription: "Explore PikoNox's full range of services: AI development, mobile apps, ecommerce, cloud infrastructure, and more.",
        metaKeywords: "web development services, AI development, mobile app development, cloud solutions",
      },
    },
    {
      key: "page-products",
      data: {
        metaTitle: "Products — PikoNox",
        metaDescription: "Discover PikoNox's range of digital products — from UI component libraries to SaaS starter kits.",
        metaKeywords: "digital products, SaaS starter kit, UI library, Next.js boilerplate",
        breadcrumb: { title: "Our Products", subtitle: "Ship faster with our battle-tested digital products and starter kits." },
      },
    },
    {
      key: "seo-products",
      data: {
        metaTitle: "Products — PikoNox",
        metaDescription: "Discover PikoNox's range of digital products — from UI component libraries to SaaS starter kits.",
        metaKeywords: "digital products, SaaS starter kit, UI library, Next.js boilerplate",
      },
    },
    {
      key: "page-work",
      data: {
        metaTitle: "Our Work & Case Studies — PikoNox",
        metaDescription: "Explore PikoNox's portfolio of successful projects — e-commerce platforms, mobile apps, AI tools, and enterprise software.",
        metaKeywords: "portfolio, case studies, web development projects, digital agency work",
        breadcrumb: { title: "Our Work", subtitle: "A showcase of our most impactful projects and the results we delivered." },
      },
    },
    {
      key: "seo-work",
      data: {
        metaTitle: "Our Work & Case Studies — PikoNox",
        metaDescription: "Explore PikoNox's portfolio of successful projects — e-commerce, mobile apps, AI tools, and enterprise software.",
        metaKeywords: "portfolio, case studies, web development projects, digital agency work",
      },
    },
    {
      key: "page-blog",
      data: {
        metaTitle: "Blog & Insights — PikoNox",
        metaDescription: "Read the latest insights on AI, web development, cloud infrastructure, and digital strategy from the PikoNox team.",
        metaKeywords: "tech blog, AI insights, web development tips, digital agency blog",
        breadcrumb: { title: "PikoNox Insights", subtitle: "Thoughts on technology, design, and building great digital products." },
      },
    },
    {
      key: "seo-blog",
      data: {
        metaTitle: "Blog & Insights — PikoNox",
        metaDescription: "Read the latest insights on AI, web development, cloud infrastructure, and digital strategy from the PikoNox team.",
        metaKeywords: "tech blog, AI insights, web development tips, digital agency blog",
      },
    },
    {
      key: "page-team",
      data: {
        metaTitle: "Meet the Team — PikoNox",
        metaDescription: "Meet the talented engineers, designers, and strategists behind PikoNox. A global team passionate about exceptional digital products.",
        metaKeywords: "PikoNox team, software engineers, digital agency team, developers",
        breadcrumb: { title: "Meet Our Experts", subtitle: "A global team of engineers, designers, and product strategists." },
      },
    },
    {
      key: "page-faq",
      data: {
        metaTitle: "FAQ — PikoNox Digital Agency",
        metaDescription: "Answers to the most common questions about working with PikoNox — process, timelines, pricing, and technologies.",
        metaKeywords: "FAQ, PikoNox questions, how we work, project timelines",
        breadcrumb: { title: "Frequently Asked Questions", subtitle: "Everything you need to know before we start building together." },
      },
    },
    {
      key: "page-contact",
      data: {
        metaTitle: "Contact PikoNox — Let's Build Together",
        metaDescription: "Ready to start your project? Contact PikoNox for a free consultation. We work with startups, SMEs, and enterprise businesses worldwide.",
        metaKeywords: "contact PikoNox, free consultation, hire developers, start project",
        breadcrumb: { title: "Get In Touch", subtitle: "Tell us about your project. We'll get back to you within 24 hours." },
      },
    },
    {
      key: "page-home-layout",
      data: {
        metaTitle: "PikoNox — AI-Powered Digital Agency | Web & Mobile Development",
        metaDescription: "PikoNox builds world-class web apps, mobile apps, and AI solutions for ambitious businesses. From startup MVPs to enterprise platforms.",
        metaKeywords: "digital agency, web development, AI development, mobile apps, SaaS, Next.js agency",
      },
    },
  ];

  for (const { key, data } of pageSeo) {
    await upsertSection(key, data);
  }
  console.log("✓ Page SEO sections (all pages)");

  // ─── Services ───────────────────────────────────────────────────────────────
  const services = [
    {
      title: "Mobile App Development",
      shortDesc: "Android & iPhone solutions built for performance, scale, and exceptional UX.",
      description: "<p>We deliver polished, production-ready mobile apps using React Native and Expo — from concept to App Store. Our apps are fast, accessible, and built to grow with your user base.</p><p>Every app we build is performance-tested, WCAG-compliant, and designed with your end users at the centre.</p>",
      icon: "📱",
      iconBg: "#EFF6FF",
      image: unsplash("1512941937669-90a1b58e7e9c"),
      bgImage: unsplash("1512941937669-90a1b58e7e9c", 1920),
      features: JSON.stringify([
        { title: "Cross-platform iOS & Android", content: "One codebase, native performance on both platforms" },
        { title: "Offline-first architecture", content: "Works without internet, syncs when connected" },
        { title: "Push notifications", content: "Engage users with targeted, timely notifications" },
        { title: "App Store submission", content: "We handle the full review and submission process" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Discovery & UX Research", desc: "We map user journeys, study competitors, and define the core feature set." },
        { title: "Design & Prototype", desc: "High-fidelity Figma prototypes tested with real users before a single line of code." },
        { title: "Agile Development", desc: "Two-week sprints with demos, feedback loops, and continuous delivery." },
        { title: "QA & Launch", desc: "Device testing, performance profiling, and guided App Store submission." },
      ]),
      order: 1,
    },
    {
      title: "AI Transformation Service",
      shortDesc: "Embed intelligence into your business operations, products, and customer experience.",
      description: "<p>From chatbots and recommendation engines to computer vision and predictive analytics — we make AI work for your business at scale. We don't just integrate AI, we align it with your specific business goals.</p><p>Our AI engineers have shipped production LLM applications, fine-tuned models, and built private AI infrastructure for clients across industries.</p>",
      icon: "🤖",
      iconBg: "#F0FDF4",
      image: unsplash("1620712943543-bcc4688e7485"),
      bgImage: unsplash("1677442135703-1787eea5ce01", 1920),
      features: JSON.stringify([
        { title: "LLM integration & fine-tuning", content: "GPT-4, Claude, Gemini, and open-source models" },
        { title: "AI-powered automation", content: "Replace manual processes with intelligent workflows" },
        { title: "Recommendation engines", content: "Personalised product and content recommendations" },
        { title: "Private AI deployment", content: "Secure on-premise or private cloud AI hosting" },
      ]),
      approachSteps: JSON.stringify([
        { title: "AI Opportunity Audit", desc: "We identify where AI creates the most value in your specific operations." },
        { title: "Model Selection & Architecture", desc: "Choosing the right model (LLM, CV, ML) and infrastructure for your use case." },
        { title: "Integration & Training", desc: "Connecting AI to your data, workflows, and existing systems." },
        { title: "Monitoring & Improvement", desc: "Continuous model monitoring, retraining, and performance optimisation." },
      ]),
      order: 2,
    },
    {
      title: "Ecommerce Website Design",
      shortDesc: "Premium e-commerce solutions that convert visitors into loyal, repeat buyers.",
      description: "<p>We build stunning, revenue-optimised e-commerce platforms — beautiful UX, performance-tuned for Core Web Vitals, and secure transactions built in. Our stores consistently outperform industry conversion benchmarks.</p><p>From Shopify custom development to full Next.js headless commerce — we deliver the stack that fits your business model.</p>",
      icon: "🛒",
      iconBg: "#FFF7ED",
      image: unsplash("1556742049-0cfed4f6a45d"),
      bgImage: unsplash("1556742049-0cfed4f6a45d", 1920),
      features: JSON.stringify([
        { title: "Headless commerce", content: "Next.js frontend with Shopify, WooCommerce, or custom backend" },
        { title: "Conversion optimisation", content: "A/B tested checkout flows and product pages" },
        { title: "Multi-currency & localisation", content: "Sell globally with automatic currency conversion" },
        { title: "Inventory & order management", content: "Real-time stock tracking and fulfilment integration" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Commerce Strategy", desc: "We define your product catalogue structure, pricing model, and checkout flow." },
        { title: "Design System", desc: "Brand-aligned, conversion-focused UI/UX with mobile-first responsive design." },
        { title: "Platform Build", desc: "Performance-optimised storefront integrated with payment and logistics providers." },
        { title: "Launch & Growth", desc: "SEO setup, analytics tracking, and ongoing CRO support." },
      ]),
      order: 3,
    },
    {
      title: "Website Design and Development",
      shortDesc: "Fast, SEO-optimised websites that represent your brand and generate leads.",
      description: "<p>We build websites with Next.js, React, and modern best practices — lightning-fast, SEO-ready, and fully accessible. Every site we ship scores 95+ on Google PageSpeed.</p><p>From marketing sites and landing pages to complex web applications — we design and build sites that look stunning and perform even better.</p>",
      icon: "🌐",
      iconBg: "#EEF2FF",
      image: unsplash("1498050108023-c5249f4df085"),
      bgImage: unsplash("1498050108023-c5249f4df085", 1920),
      features: JSON.stringify([
        { title: "95+ PageSpeed score", content: "Core Web Vitals optimised for rankings and UX" },
        { title: "On-page SEO", content: "Semantic HTML, schema markup, and meta optimisation" },
        { title: "CMS integration", content: "Admin panel so your team can update content without developers" },
        { title: "WCAG 2.1 accessibility", content: "Compliant and usable for all visitors" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Brand & Strategy", desc: "Understanding your audience, positioning, and conversion goals." },
        { title: "Wireframe & Design", desc: "Low-fidelity wireframes → high-fidelity Figma designs → client approval." },
        { title: "Development & CMS", desc: "Next.js build with a fully custom CMS so you control your content." },
        { title: "Launch & SEO", desc: "Technical SEO audit, sitemap submission, and performance baseline." },
      ]),
      order: 4,
    },
    {
      title: "CMS & Platform Development",
      shortDesc: "Powerful content management platforms your team will actually love using.",
      description: "<p>We deliver CMS platforms that give your team full control over content — without needing a developer for every change. Built on battle-tested foundations with custom admin panels tailored to your workflow.</p>",
      icon: "⚙️",
      iconBg: "#F5F3FF",
      image: unsplash("1460925895917-afdab827c52f"),
      bgImage: unsplash("1460925895917-afdab827c52f", 1920),
      features: JSON.stringify([
        { title: "Custom admin panel", content: "Role-based access, intuitive UI, no training needed" },
        { title: "Multi-language support", content: "Manage content in any language or locale" },
        { title: "Media management", content: "Image optimisation, CDN delivery, and gallery management" },
        { title: "API-first architecture", content: "Headless CMS feeding any frontend or mobile app" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Content Audit", desc: "Mapping all content types, relationships, and editorial workflows." },
        { title: "Schema Design", desc: "Flexible, future-proof data models that grow with your content strategy." },
        { title: "Admin Build", desc: "Custom-built admin UI with the exact fields and workflows your team needs." },
        { title: "Training & Handover", desc: "Full documentation and live training sessions for your editorial team." },
      ]),
      order: 5,
    },
    {
      title: "Cloud Hosting & Maintenance",
      shortDesc: "Secure, scalable cloud infrastructure backed by 24/7 monitoring and expert support.",
      description: "<p>We manage your cloud infrastructure on AWS, GCP, or Azure — so you can focus entirely on your product. Uptime SLAs, automated backups, security patching, and proactive monitoring included.</p>",
      icon: "☁️",
      iconBg: "#F0F9FF",
      image: unsplash("1451187580459-43490279c0fa"),
      bgImage: unsplash("1451187580459-43490279c0fa", 1920),
      features: JSON.stringify([
        { title: "99.9% uptime SLA", content: "Multi-region failover and load balancing" },
        { title: "Auto-scaling", content: "Infrastructure that scales with your traffic, automatically" },
        { title: "Daily backups", content: "Point-in-time recovery with 30-day retention" },
        { title: "Security monitoring", content: "24/7 intrusion detection and vulnerability scanning" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Infrastructure Audit", desc: "Reviewing your current stack, costs, and reliability risks." },
        { title: "Architecture Design", desc: "Designing a scalable, cost-optimised cloud architecture for your workload." },
        { title: "Migration & Setup", desc: "Zero-downtime migration with CI/CD pipelines and monitoring from day one." },
        { title: "Ongoing Management", desc: "Proactive monitoring, patching, and monthly infrastructure reports." },
      ]),
      order: 6,
    },
    {
      title: "Generative Engine Optimization",
      shortDesc: "Dominate AI-powered search results with proven GEO strategies.",
      description: "<p>As AI reshapes how people discover businesses — through ChatGPT, Perplexity, and AI-enhanced Google results — GEO ensures your brand stays visible and authoritative where it matters most.</p>",
      icon: "🔍",
      iconBg: "#FFF1F2",
      image: unsplash("1620712943543-bcc4688e7485"),
      bgImage: unsplash("1620712943543-bcc4688e7485", 1920),
      features: JSON.stringify([
        { title: "AI search optimisation", content: "Structured content optimised for ChatGPT, Perplexity, and AI overviews" },
        { title: "Entity & knowledge graph", content: "Building your brand's authority in AI training data" },
        { title: "Content engineering", content: "Long-form, expert content that AI systems cite and quote" },
        { title: "Brand mention monitoring", content: "Tracking how AI models represent your brand" },
      ]),
      approachSteps: JSON.stringify([
        { title: "GEO Audit", desc: "Analysing how AI models currently represent your brand and competitors." },
        { title: "Entity Strategy", desc: "Building your knowledge graph and structured data foundation." },
        { title: "Content Engineering", desc: "Creating authoritative content formats AI systems prefer to cite." },
        { title: "Monitoring & Iteration", desc: "Tracking brand mentions across AI platforms and refining strategy." },
      ]),
      order: 7,
    },
    {
      title: "AI Model Deployment on Private Cloud",
      shortDesc: "Secure, fast, and fully managed private AI hosting for enterprise teams.",
      description: "<p>Deploy your LLMs and ML models with enterprise-grade reliability on your own private infrastructure — full data sovereignty, no third-party data sharing, and performance tuned for your specific use case.</p>",
      icon: "🔐",
      iconBg: "#F0FDF4",
      image: unsplash("1558494949-ef010cbdcc31"),
      bgImage: unsplash("1558494949-ef010cbdcc31", 1920),
      features: JSON.stringify([
        { title: "Full data sovereignty", content: "Your data never leaves your infrastructure" },
        { title: "GPU optimised hosting", content: "NVIDIA A100 and H100 clusters for maximum throughput" },
        { title: "Model fine-tuning", content: "Continuous training pipelines on your proprietary data" },
        { title: "API gateway", content: "OpenAI-compatible REST API for easy integration" },
      ]),
      approachSteps: JSON.stringify([
        { title: "Requirements & Compliance", desc: "Defining data residency, security, and performance requirements." },
        { title: "Infrastructure Setup", desc: "Provisioning GPU clusters, storage, and networking on your chosen cloud." },
        { title: "Model Deployment", desc: "Containerised model serving with auto-scaling and load balancing." },
        { title: "Integration & Monitoring", desc: "API setup, access controls, usage analytics, and cost monitoring." },
      ]),
      order: 8,
    },
  ];

  for (const s of services) {
    const slug = slugify(s.title);
    await prisma.service.upsert({
      where: { slug },
      update: s as any,
      create: { ...s, slug } as any,
    });
  }
  console.log(`✓ Services (${services.length})`);

  // ─── Portfolio ──────────────────────────────────────────────────────────────
  const portfolios = [
    {
      title: "E-Commerce Platform Redesign",
      description: "Complete redesign of a multi-vendor e-commerce platform serving 50,000+ monthly users — resulting in a 3× increase in conversion rate.",
      content: "<p>We partnered with ShopMax to rebuild their legacy PHP platform. The new stack uses Next.js 14, a headless Shopify backend, and a custom recommendation engine.</p><p>Results: Page load time dropped from 8s to under 1s. Conversion rate increased by 3.2×. Mobile revenue grew 180% in the first quarter post-launch.</p>",
      category: "Web Development",
      client: "ShopMax Inc.",
      date: "March 2025",
      image: unsplash("1556742049-0cfed4f6a45d"),
      liveUrl: "https://example.com",
      isFeatured: true,
      outcomeStats: JSON.stringify([
        { value: "3.2×", label: "Conversion Rate" },
        { value: "180%", label: "Mobile Revenue" },
        { value: "87%", label: "Faster Load Time" },
      ]),
      order: 1,
    },
    {
      title: "Healthcare Telemedicine App",
      description: "HIPAA-compliant telemedicine platform with real-time video consultations, prescription management, and patient records.",
      content: "<p>MedCare Group needed a modern telemedicine experience to serve 200,000+ patients. We built a React Native app with WebRTC video, a Node.js backend, and full HIPAA compliance including end-to-end encryption.</p><p>The app launched to 50,000 users in the first month with zero downtime and a 4.8★ App Store rating.</p>",
      category: "Mobile Development",
      client: "MedCare Group",
      date: "January 2025",
      image: unsplash("1576091160399-112ba8d25d1d"),
      liveUrl: "https://example.com",
      isFeatured: true,
      outcomeStats: JSON.stringify([
        { value: "50k", label: "Month-1 Users" },
        { value: "4.8★", label: "App Store Rating" },
        { value: "0", label: "Downtime at Launch" },
      ]),
      order: 2,
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time analytics platform with ML-driven insights, reducing executive decision time by 60%.",
      content: "<p>DataViz Corp needed a single dashboard combining data from 12 sources with predictive analytics. We built a Next.js frontend with a Python ML backend using FastAPI, deployed on AWS with auto-scaling.</p>",
      category: "AI Integration",
      client: "DataViz Corp",
      date: "November 2024",
      image: unsplash("1551288049-bebda4e38f71"),
      liveUrl: "https://example.com",
      isFeatured: false,
      outcomeStats: JSON.stringify([
        { value: "60%", label: "Faster Decisions" },
        { value: "12", label: "Data Sources Unified" },
        { value: "99.9%", label: "Uptime SLA" },
      ]),
      order: 3,
    },
    {
      title: "FinTech Brand & Website",
      description: "Complete brand identity and high-converting marketing website for a Series-A fintech startup.",
      content: "<p>FinFlow came to us pre-Series A needing a brand that could stand alongside Stripe and Wise. We delivered a full brand system and Next.js marketing site in 6 weeks — on time and on budget.</p>",
      category: "Design & Web",
      client: "FinFlow",
      date: "September 2024",
      image: unsplash("1559526324-593bc073d938"),
      liveUrl: "https://example.com",
      isFeatured: false,
      outcomeStats: JSON.stringify([
        { value: "6w", label: "Delivery Time" },
        { value: "2×", label: "Lead Generation" },
        { value: "95+", label: "PageSpeed Score" },
      ]),
      order: 4,
    },
  ];

  for (const p of portfolios) {
    const slug = slugify(p.title);
    await prisma.portfolio.upsert({
      where: { slug },
      update: p as any,
      create: { ...p, slug } as any,
    });
  }
  console.log(`✓ Portfolio (${portfolios.length})`);

  // ─── Blog Posts ─────────────────────────────────────────────────────────────
  const blogs = [
    {
      title: "10 Web Development Trends Defining 2025",
      excerpt: "From AI-generated interfaces to edge computing — the trends every developer and business leader needs to understand this year.",
      content: "<h2>1. AI-Assisted Development</h2><p>Tools like GitHub Copilot and Cursor are fundamentally changing how developers write code — shifting the role from syntax recall to architectural thinking.</p><h2>2. Edge Computing</h2><p>Deploying logic closer to users is becoming the standard for high-performance applications. Next.js, Vercel Edge Functions, and Cloudflare Workers are leading the charge.</p><h2>3. Generative UI</h2><p>AI that generates interface components on demand is no longer science fiction. We're already shipping production features built with this approach.</p>",
      author: "PikoNox Team",
      category: "Technology",
      isPublished: true,
      image: unsplash("1555066931-4365d14bab8c"),
    },
    {
      title: "Why Your Business Needs a Mobile-First Strategy in 2025",
      excerpt: "With 65% of web traffic now coming from mobile devices, a mobile-first strategy isn't optional — it's existential.",
      content: "<h2>The Numbers Don't Lie</h2><p>65% of all web traffic, 72% of e-commerce purchases, and 80% of social media browsing happens on mobile. Yet most businesses still design for desktop first.</p><h2>What Mobile-First Actually Means</h2><p>It's not just responsive CSS. Mobile-first means designing for the constraints of a small screen, slow connection, and distracted user — then progressively enhancing for larger viewports.</p>",
      author: "PikoNox Team",
      category: "Business",
      isPublished: true,
      image: unsplash("1512941937669-90a1b58e7e9c"),
    },
    {
      title: "The Complete Guide to Next.js 15 for Production",
      excerpt: "Everything you need to know about building and shipping production-grade applications with Next.js 15 — from caching to Turbopack.",
      content: "<h2>What Changed in Next.js 15</h2><p>Next.js 15 brings Turbopack as the default bundler, faster local development, and breaking changes to caching behaviour that you need to understand before upgrading.</p><h2>The New Caching Model</h2><p>Fetch requests are no longer cached by default. This is a significant breaking change. Understand the new opt-in caching patterns before migrating.</p>",
      author: "PikoNox Team",
      category: "Development",
      isPublished: true,
      image: unsplash("1498050108023-c5249f4df085"),
    },
  ];

  for (const b of blogs) {
    const slug = slugify(b.title);
    await prisma.blogPost.upsert({
      where: { slug },
      update: b as any,
      create: { ...b, slug } as any,
    });
  }
  console.log(`✓ Blog posts (${blogs.length})`);

  // ─── Testimonials ───────────────────────────────────────────────────────────
  await prisma.testimonial.deleteMany({});
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Sarah Johnson",
        text: "PikoNox transformed our outdated platform into a modern, high-converting experience. Professional, communicative, and delivered well beyond expectations. Our conversion rate tripled.",
        rating: 5,
        image: unsplash("1438761681033-6461ffad8d80", 400),
        order: 1,
      },
      {
        name: "Michael Chen",
        text: "Working with PikoNox on our mobile app was an exceptional experience. They understood our vision perfectly and delivered a polished product on time and under budget.",
        rating: 5,
        image: unsplash("1472099645785-5658abf4ff4e", 400),
        order: 2,
      },
      {
        name: "Emily Rodriguez",
        text: "The AI integration PikoNox built reduced our customer support tickets by 40%. They're not just developers — they're genuine strategic technology partners.",
        rating: 5,
        image: unsplash("1500648767791-00dcc994a43e", 400),
        order: 3,
      },
    ],
  });
  console.log("✓ Testimonials (3)");

  // ─── FAQs ───────────────────────────────────────────────────────────────────
  await prisma.fAQ.deleteMany({});
  await prisma.fAQ.createMany({
    data: [
      { 
        question: "What services does PikoNox offer as a full stack agency?", 
        answer: "<p>PikoNox provides end-to-end digital product services: custom web and mobile applications, dedicated tech teams, cloud hosting &amp; infrastructure management, enterprise AI/ML transformation, and modern UI/UX design. We take you from discovery and design to deployment and post-launch scale.</p>", 
        order: 1 
      },
      { 
        question: "How does PikoNox ensure scalable software architecture?", 
        answer: "<p>We design and build with modern, battle-tested technologies like <strong>React, Next.js, Node.js, Python, and TypeScript</strong>. By employing containerization (Docker), serverless architectures, and modular API design, we ensure that your software scales efficiently alongside your business growth.</p>", 
        order: 2 
      },
      { 
        question: "What does your agile development process look like?", 
        answer: "<p>We work in 2-week sprints with regular milestones and demos. A typical MVP takes <strong>4–8 weeks</strong>, while complex enterprise platforms span 3–6 months. Throughout the build, you have a dedicated product manager and direct communication with our engineering team.</p>", 
        order: 3 
      },
      { 
        question: "Who owns the intellectual property (IP) and source code?", 
        answer: "<p>You do. <strong>100% of the IP, design assets, and source code</strong> belong to you from day one. We sign standard NDA agreements before any engagement and provide clean repository handovers upon project completion.</p>", 
        order: 4 
      },
      { 
        question: "Do you offer post-launch support and server maintenance?", 
        answer: "<p>Yes, we offer ongoing SLA-backed support and maintenance. Our packages cover proactive 24/7 server monitoring, performance optimization, dependency and security updates, and active rolling updates for new features.</p>", 
        order: 5 
      },
    ],
  });
  console.log("✓ FAQs (5)");

  // ─── Team Members ───────────────────────────────────────────────────────────
  await prisma.teamMember.deleteMany({});
  await prisma.teamMember.createMany({
    data: [
      {
        name: "Alex Morgan",
        title: "CEO & Founder",
        bio: "10+ years in software development and digital strategy. Passionate about building products that make a measurable difference for ambitious businesses.",
        email: "alex@pikonox.com",
        linkedin: "https://linkedin.com",
        order: 1,
      },
      {
        name: "Jordan Lee",
        title: "Lead Engineer",
        bio: "Full-stack engineer specialising in React, Next.js, and distributed systems. Obsessed with clean architecture and developer experience.",
        email: "jordan@pikonox.com",
        linkedin: "https://linkedin.com",
        order: 2,
      },
      {
        name: "Sam Rivera",
        title: "Head of Design",
        bio: "UI/UX designer with a decade of experience creating human-centred digital experiences that convert visitors into loyal customers.",
        email: "sam@pikonox.com",
        linkedin: "https://linkedin.com",
        order: 3,
      },
    ],
  });
  console.log("✓ Team members (3)");

  // ─── Products ───────────────────────────────────────────────────────────────
  const products = [
    {
      name: "PikoNox UI Pro",
      description: "A premium Next.js component library with 200+ production-ready, accessible components built on Tailwind CSS.",
      content: "<p>PikoNox UI Pro gives your team a head start with beautifully designed, fully accessible React components. Includes dark mode, animations, Storybook docs, and TypeScript-first APIs.</p><ul><li>200+ components</li><li>Dark mode included</li><li>WCAG 2.1 accessible</li><li>Figma design system</li></ul>",
      price: "$149/year",
      category: "UI Library",
      image: unsplash("1555066931-4365d14bab8c"),
      isFeatured: true,
      order: 1,
    },
    {
      name: "LaunchKit SaaS Starter",
      description: "The ultimate Next.js SaaS starter — auth, billing, admin dashboard, transactional emails, and more. Ship in days, not months.",
      content: "<p>Stop building boilerplate. LaunchKit includes everything you need to ship a production SaaS: Clerk authentication, Stripe billing, admin dashboard, Resend transactional emails, Prisma ORM, and a polished landing page.</p><ul><li>Authentication (Clerk)</li><li>Stripe billing</li><li>Admin dashboard</li><li>Email system (Resend)</li><li>SEO-ready landing page</li></ul>",
      price: "$299 one-time",
      category: "Starter Kit",
      image: unsplash("1498050108023-c5249f4df085"),
      isFeatured: true,
      order: 2,
    },
  ];

  for (const p of products) {
    const slug = slugify(p.name);
    await prisma.product.upsert({
      where: { slug },
      update: p as any,
      create: { ...p, slug } as any,
    });
  }
  console.log(`✓ Products (${products.length})`);

  // ─── Header Config ──────────────────────────────────────────────────────────
  const existingHeader = await prisma.headerConfig.findFirst();
  const headerData = {
    brandPrefix: "piko",
    brandSuffix: "Nox",
    brandHref: "/",
    phone: "",
    email: "contact@pikonox.com",
    ctaLabel: "Let's Connect",
    ctaHref: "/contact",
    navItems: JSON.stringify([
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ]),
    socialLinks: JSON.stringify([
      { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
      { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
      { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
      { label: "Twitter", href: "https://x.com", icon: "twitter" },
    ]),
    isActive: true,
  };
  if (existingHeader) {
    await prisma.headerConfig.update({ where: { id: existingHeader.id }, data: headerData as any });
  } else {
    await prisma.headerConfig.create({ data: headerData as any });
  }
  console.log("✓ Header config");

  // ─── Footer Config ──────────────────────────────────────────────────────────
  const existingFooter = await prisma.footerConfig.findFirst();
  const footerData = {
    ctaTitle: "Ready to Build Something Remarkable?",
    ctaButtonLabel: "Start a Project",
    ctaButtonHref: "/contact",
    locations: JSON.stringify(["Punjab, Pakistan"]),
    footerLinks: JSON.stringify([
      { sub: "What we do", label: "Services", href: "/services" },
      { sub: "Our work", label: "Portfolio", href: "/work" },
      { sub: "Company", label: "About Us", href: "/about" },
      { sub: "Company", label: "Our Team", href: "/team" },
      { sub: "Resources", label: "Blog", href: "/blog" },
      { sub: "Resources", label: "FAQ", href: "/faq" },
      { sub: "Get started", label: "Contact Us", href: "/contact" },
    ]),
    contactCta: JSON.stringify({ eyebrow: "Let's work together", label: "Get In Touch", href: "/contact" }),
    socialLinks: JSON.stringify([
      { label: "Facebook", href: "https://facebook.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Instagram", href: "https://instagram.com" },
      { label: "Twitter", href: "https://x.com" },
    ]),
    copyrightBrand: "PikoNox",
    copyrightText: "All Rights Reserved",
    isActive: true,
  };
  if (existingFooter) {
    await prisma.footerConfig.update({ where: { id: existingFooter.id }, data: footerData as any });
  } else {
    await prisma.footerConfig.create({ data: footerData as any });
  }
  console.log("✓ Footer config");

  console.log("\n✅ Database seeded successfully! Website is ready.\n");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    prisma.$disconnect();
    process.exit(1);
  });
