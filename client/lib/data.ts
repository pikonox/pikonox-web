// Mock Data for CMS-like Dynamic Pages

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  fullContent: string;
  image: string;
}

export const SERVICES: Service[] = [
  {
    id: "1",
    slug: "software-development",
    title: "Software Development",
    description: "Custom-built software solutions that scale with your business goals. We use modern stacks to deliver performance and reliability.",
    icon: "Code2",
    features: ["Custom Web Apps", "Mobile App Development", "API Integrations", "Legacy System Modernization"],
    fullContent: "Our software development process is built on agility and excellence. We collaborate closely with you to understand your unique challenges and build solutions that don't just work—they excel. From complex backend architectures to intuitive frontend interfaces, we handle it all.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    description: "Secure, scalable, and optimized cloud environments (AWS/GCP/Azure) designed for 99.9% uptime and cost-efficiency.",
    icon: "Cloud",
    features: ["Cloud Migration", "Serverless Architecture", "DevOps Automation", "Security Auditing"],
    fullContent: "Scaling your business requires a foundation that's both flexible and rock-solid. Our cloud experts design architectures that grow with you, ensuring your data is always safe and your services are always available.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    slug: "ai-ml-solutions",
    title: "AI & ML Solutions",
    description: "Harness the power of Artificial Intelligence to automate workflows, gain insights, and provide smarter customer experiences.",
    icon: "BrainCircuit",
    features: ["LLM Integration", "Predictive Analytics", "Computer Vision", "Process Automation"],
    fullContent: "AI is no longer the future—it's the present. We help you integrate state-of-the-art machine learning models into your existing workflows to drive efficiency and unlock new revenue streams.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  }
];

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "analytics-pro",
    name: "Analytics Pro Dashboard",
    category: "SaaS Tool",
    price: "$49/mo",
    description: "A comprehensive data visualization tool for enterprise-level business tracking and real-time insights.",
    features: ["Real-time Tracking", "Custom Reports", "Multi-user Support", "Data Export"],
    image: "https://images.unsplash.com/photo-1551288049-bbdac8a28a80?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    slug: "security-shield",
    name: "Security Shield AI",
    category: "Cybersecurity",
    price: "$199/mo",
    description: "Automated threat detection and prevention system powered by deep learning algorithms for 24/7 protection.",
    features: ["Zero-trust Architecture", "AI Threat Detection", "Auto-scaling Firewall", "Weekly Audits"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
  }
];

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  results: string;
  description: string;
  image: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "global-logistics-ai",
    title: "AI-Driven Logistics Optimization",
    client: "Global Logistics Co.",
    industry: "Supply Chain",
    results: "35% efficiency increase",
    description: "How we implemented a custom AI routing engine to reduce fuel costs and delivery times for a worldwide logistics leader.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "2",
    slug: "fintech-security-overhaul",
    title: "Securing the Future of Fintech",
    client: "SecureBank Ltd",
    industry: "Finance",
    results: "0 security breaches in 2 years",
    description: "An end-to-end security architecture overhaul for a growing digital bank, implementing biometric auth and AI monitoring.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
  }
];

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-ai-development",
    title: "The Future of AI Development in 2026",
    excerpt: "Exploring how LLMs and agentic workflows are changing the way we build software at enterprise scale.",
    author: "Alex Rivera",
    date: "April 15, 2026",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    content: "AI is no longer just a buzzword. In 2026, we're seeing a fundamental shift from 'AI features' to 'AI-first' architecture. Developers are now orchestrating agentic workflows rather than writing simple procedural code. This shift allows for unprecedented scalability and personalization in user experiences..."
  },
  {
    id: "2",
    slug: "scaling-cloud-infrastructure",
    title: "Scaling Cloud Infrastructure for 1M+ Users",
    excerpt: "Best practices for maintaining 99.9% uptime while handling massive traffic spikes on global cloud networks.",
    author: "Sarah Chen",
    date: "April 10, 2026",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    content: "When your user base hits the seven-figure mark, traditional load balancing isn't enough. You need multi-region replication, intelligent edge caching, and automated failover systems that can react in milliseconds. In this post, we'll dive deep into the architecture we built for our largest clients..."
  }
];
