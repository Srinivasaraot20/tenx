import { ServiceData } from "../types/service";

const commonTrustedBy = ["Startups", "SMEs", "Enterprises", "Manufacturers", "Retail Brands", "Healthcare", "Education", "Real Estate"];
const commonIndustries = ["Healthcare", "Education", "Real Estate", "Manufacturing", "Restaurants", "Hotels", "Retail", "Fashion", "Automotive", "NGOs", "Finance", "Construction", "Travel", "Startups", "Government"].map(name => ({ name }));
const commonProcess = ["Discover", "Research", "Planning", "Design", "Development", "Testing", "Deployment", "Optimization"].map(phase => ({ phase, description: "" }));
const commonWhyChooseUs = ["Experienced Team", "AI Powered", "Fast Delivery", "Affordable", "Transparent", "Enterprise Solutions", "24/7 Support", "Scalable Architecture", "Custom Development", "Global Standards"].map(title => ({ title }));
const commonPricing = [
  { name: "Starter", price: "Custom", features: ["Basic Requirements", "Standard Support", "Core Features"] },
  { name: "Professional", price: "Custom", features: ["Advanced Features", "Priority Support", "Analytics"] },
  { name: "Enterprise", price: "Custom", features: ["Custom Solutions", "24/7 Dedicated Support", "Full Source Code"] }
];
const commonTestimonials = [
  { name: "Sarah Jenkins", company: "TechNova", review: "OCTADECENT transformed our operations completely. Highly recommended.", rating: 5 },
  { name: "Michael Chang", company: "GlobalRetail", review: "The enterprise solutions provided are scalable and robust. A great partner for growth.", rating: 5 }
];
const commonOutcomes = ["Faster Operations", "Higher Conversions", "Reduced Costs", "Increased Efficiency"].map(title => ({ title }));
const commonCapabilities = [
  { feature: "Dedicated Project Manager", included: true },
  { feature: "Source Code Ownership", included: true },
  { feature: "Post-Launch Support", included: true }
];
const commonEngagement = [
  { name: "Dedicated Team", description: "Hire our experts full-time for your project." },
  { name: "Fixed Price", description: "Clear scope and fixed budget for your requirements." },
  { name: "Time & Material", description: "Pay for the hours worked, offering maximum flexibility." },
  { name: "Consulting", description: "Strategic guidance from our industry experts." }
];
const commonSecurity = ["ISO 27001 Compliant", "GDPR Ready", "End-to-End Encryption", "Strict NDAs"];

export const servicesData: ServiceData[] = [
  {
    slug: "e-commerce",
    title: "E-Commerce & Quick Commerce Solutions",
    hero: {
      headline: "Build, Scale & Transform Your Retail Business",
      supportingText: "From strategy to execution, OCTADECENT helps startups and enterprises accelerate e-commerce growth using technology, AI, and digital innovation.",
      primaryCta: { label: "Book Consultation", link: "/contact" },
      secondaryCta: { label: "Get Free Proposal", link: "/contact?proposal=true" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Why E-Commerce Matters",
      description: [
        "In today's digital age, a robust online presence is non-negotiable for retail brands. Consumer expectations for fast, seamless purchasing experiences continue to grow.",
        "Our e-commerce and quick commerce solutions are designed to provide lightning-fast, highly scalable online shopping experiences that drive conversions and build brand loyalty.",
        "Whether you are launching a new marketplace or optimizing an existing store, our team has the technical expertise to build secure and scalable digital storefronts."
      ]
    },
    problemsWeSolve: [
      { problem: "Low Sales & Poor Conversion Rates", solution: "High Conversion UI/UX and Fast Checkouts" },
      { problem: "Slow Operations & Manual Inventory", solution: "Automated Order Management Systems" },
      { problem: "High Customer Drop-off", solution: "Personalized AI-driven Product Recommendations" }
    ],
    services: [
      { title: "Ecommerce Website Development", description: "Scalable online stores with modern technologies.", icon: "ShoppingBag" },
      { title: "Marketplace Development", description: "Multi-vendor platforms for massive scale.", icon: "Store" },
      { title: "Quick Commerce Platform", description: "10-minute delivery apps and infrastructure.", icon: "Zap" },
      { title: "Inventory & Order Management", description: "Real-time sync across warehouses.", icon: "PackageSearch" },
      { title: "Payment Integration", description: "Secure global payment gateways.", icon: "CreditCard" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
    features: ["Mobile Responsive", "SEO Ready", "Secure", "Fast", "Analytics", "Inventory Sync"],
    caseStudies: [
      { project: "UrbanCart", challenge: "Scaling past 10k orders/day.", solution: "Microservices architecture.", result: "300% increase in capacity." }
    ],
    portfolioPlaceholders: ["Storefront Mockup", "Admin Dashboard", "Mobile App Screenshot"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [{ question: "How long does it take to build an e-commerce site?", answer: "Typically 4-8 weeks depending on complexity." }],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["Stripe", "Razorpay", "Shopify", "Shiprocket"]
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & Brand Growth",
    hero: {
      headline: "Dominate Your Market with Data-Driven Marketing",
      supportingText: "Supercharge your brand visibility, acquire high-value customers, and maximize ROI through our comprehensive digital marketing solutions.",
      primaryCta: { label: "Boost My Brand", link: "/contact" },
      secondaryCta: { label: "Free Marketing Audit", link: "/audit" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Marketing That Drives Revenue",
      description: [
        "Visibility alone isn't enough; you need targeted traffic that converts. We utilize a combination of paid media, organic search, and creative content to build your audience.",
        "Our marketing strategies are data-driven, leveraging analytics and AI to optimize campaigns in real-time, ensuring every dollar spent delivers maximum return.",
        "Partner with us to transform your digital presence into a powerful engine for predictable growth."
      ]
    },
    problemsWeSolve: [
      { problem: "No Brand Visibility", solution: "Omnichannel Marketing Strategy" },
      { problem: "High Customer Acquisition Cost (CAC)", solution: "Conversion Rate Optimization (CRO)" }
    ],
    services: [
      { title: "SEO Optimization", description: "Rank higher on Google and drive organic traffic.", icon: "Search" },
      { title: "Performance Marketing", description: "Google Ads & Meta Ads with high ROI.", icon: "TrendingUp" },
      { title: "Content Marketing", description: "Engaging content that builds authority.", icon: "PenTool" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Google Analytics", "SEMrush", "Meta Ads Manager", "HubSpot"],
    features: ["Data Driven", "ROI Focused", "Transparent Reporting", "A/B Testing"],
    caseStudies: [],
    portfolioPlaceholders: ["Campaign Dashboard", "Ad Creatives", "Growth Chart"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["Google Ads", "Meta", "LinkedIn", "HubSpot"]
  },
  {
    slug: "ai-automation",
    title: "AI & Business Automation",
    hero: {
      headline: "Automate Workflows and Scale with AI",
      supportingText: "Leverage artificial intelligence and custom automation to reduce manual work, eliminate errors, and scale your business faster.",
      primaryCta: { label: "Explore AI Solutions", link: "/contact" },
      secondaryCta: { label: "Calculate ROI", link: "/roi-calculator" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "The Future of Work is Automated",
      description: ["Modern enterprises are bottlenecked by manual, repetitive tasks.", "By integrating cutting-edge AI and robotic process automation, we free up your human capital to focus on strategic initiatives."]
    },
    problemsWeSolve: [{ problem: "High Manual Work", solution: "Custom AI Agents and Workflow Automation" }],
    services: [
      { title: "AI Chatbots & WhatsApp AI", description: "24/7 intelligent customer support.", icon: "Bot" },
      { title: "Workflow Automation", description: "Connect apps and automate tasks.", icon: "Workflow" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["OpenAI", "Python", "TensorFlow", "Make", "Zapier"],
    features: ["24/7 Operations", "Error Reduction", "Seamless Integration"],
    caseStudies: [],
    portfolioPlaceholders: ["Chatbot Interface", "Automation Workflow Diagram"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["OpenAI", "Anthropic", "Zapier", "Make"]
  },
  {
    slug: "web-development",
    title: "Web, App & Software Development",
    hero: {
      headline: "Enterprise-Grade Software Engineering",
      supportingText: "We build scalable SaaS products, mobile applications, and custom enterprise software that drive business transformation.",
      primaryCta: { label: "Start Your Project", link: "/contact" },
      secondaryCta: { label: "View Portfolio", link: "/portfolio" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Custom Software for Complex Needs",
      description: ["Off-the-shelf software rarely fits complex enterprise workflows.", "Our engineering team crafts bespoke solutions tailored to your exact specifications."]
    },
    problemsWeSolve: [{ problem: "Outdated Legacy Systems", solution: "Modern Cloud-Native Architecture" }],
    services: [
      { title: "Custom Web Apps", description: "React & Next.js enterprise portals.", icon: "Monitor" },
      { title: "Mobile App Development", description: "Native and cross-platform apps.", icon: "Smartphone" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
    features: ["Scalable", "Secure", "Cloud Hosted", "API Driven"],
    caseStudies: [],
    portfolioPlaceholders: ["SaaS Dashboard", "Mobile App Screens"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["AWS", "Google Cloud", "Vercel", "Docker"]
  },
  {
    slug: "creative-studio",
    title: "Creative Studio",
    hero: {
      headline: "Design That Inspires and Converts",
      supportingText: "From brand identity to UI/UX and motion graphics, we create stunning visual experiences that resonate with your audience.",
      primaryCta: { label: "View Our Work", link: "/portfolio" },
      secondaryCta: { label: "Book a Design Sprint", link: "/contact" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Aesthetics Meets Functionality",
      description: ["Design is more than just making things look pretty; it's about solving problems and communicating value.", "Our creative studio bridges the gap between art and business."]
    },
    problemsWeSolve: [{ problem: "Poor Brand Identity", solution: "Comprehensive Brand Guidelines & Logo Design" }],
    services: [
      { title: "UI/UX Design", description: "Intuitive digital product design.", icon: "Figma" },
      { title: "Brand Identity", description: "Logos, typography, and brand books.", icon: "Palette" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Figma", "Adobe CC", "Blender", "After Effects"],
    features: ["User-Centric", "Modern Aesthetics", "Pixel Perfect"],
    caseStudies: [],
    portfolioPlaceholders: ["Brand Book", "UI Mockup", "Motion Reel"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["Figma", "Adobe"]
  },
  {
    slug: "startup-consulting",
    title: "Business Strategy & Startup Consulting",
    hero: {
      headline: "Turn Your Vision Into a Scalable Enterprise",
      supportingText: "Expert guidance on business validation, financial modeling, go-to-market strategies, and fundraising.",
      primaryCta: { label: "Book Strategy Call", link: "/contact" },
      secondaryCta: { label: "Download Pitch Deck Guide", link: "/resources" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Navigate the Startup Journey",
      description: ["Most startups fail due to poor product-market fit or flawed financial models.", "We provide the strategic clarity needed to secure investment and scale successfully."]
    },
    problemsWeSolve: [{ problem: "Lack of Investor Interest", solution: "Compelling Pitch Decks & Robust Financial Models" }],
    services: [
      { title: "Pitch Deck Creation", description: "Investor-ready presentations.", icon: "Presentation" },
      { title: "Financial Modeling", description: "Revenue projections and burn rate analysis.", icon: "LineChart" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Excel", "Notion", "Miro"],
    features: ["Data-Backed", "Investor-Focused", "Actionable Plans"],
    caseStudies: [],
    portfolioPlaceholders: ["Pitch Deck Slide", "Financial Dashboard"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["Crunchbase", "PitchBook"]
  },
  {
    slug: "supply-chain",
    title: "Supply Chain, Logistics & Global Trade",
    hero: {
      headline: "Optimize Your Global Supply Chain",
      supportingText: "End-to-end logistics solutions, warehouse management, and international trade tech to streamline operations.",
      primaryCta: { label: "Optimize Logistics", link: "/contact" },
      secondaryCta: { label: "Speak to an Expert", link: "/contact" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Efficient Movement of Goods",
      description: ["In a globalized world, supply chain efficiency is a massive competitive advantage.", "We provide the technology to track, manage, and optimize your inventory."]
    },
    problemsWeSolve: [{ problem: "Inefficient Warehousing", solution: "Smart WMS and Inventory Sync" }],
    services: [
      { title: "Warehouse Tech", description: "Modern WMS integrations.", icon: "Warehouse" },
      { title: "Tracking Systems", description: "Real-time global shipment tracking.", icon: "MapPin" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["AWS", "IoT", "RFID", "PostgreSQL"],
    features: ["Real-Time Tracking", "Automated Alerts", "Vendor Portals"],
    caseStudies: [],
    portfolioPlaceholders: ["Logistics Dashboard", "Tracking App"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["FedEx", "DHL", "Shiprocket"]
  },
  {
    slug: "talent-community",
    title: "Talent, Freelancing & Community",
    hero: {
      headline: "Build World-Class Teams",
      supportingText: "Access verified top-tier talent, manage remote teams, and build thriving professional communities.",
      primaryCta: { label: "Hire Talent", link: "/hire" },
      secondaryCta: { label: "Join Community", link: "/community" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "The Right People, Right Now",
      description: ["Finding the right technical talent is hard.", "We provide platforms and services to source, vet, and onboard elite professionals rapidly."]
    },
    problemsWeSolve: [{ problem: "Slow Hiring Process", solution: "Pre-Vetted Talent Pools" }],
    services: [
      { title: "Freelancer Marketplace", description: "On-demand specialized talent.", icon: "Users" },
      { title: "Skill Verification", description: "Technical assessments and vetting.", icon: "CheckCircle" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Next.js", "Algolia", "WebRTC"],
    features: ["Verified Profiles", "Secure Payments", "Collaboration Tools"],
    caseStudies: [],
    portfolioPlaceholders: ["Talent Dashboard", "Community Forum"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["LinkedIn", "GitHub", "Deel"]
  },
  {
    slug: "retail-commerce",
    title: "Retail & Lifestyle Commerce",
    hero: {
      headline: "Elevate the Consumer Experience",
      supportingText: "Digital solutions for fashion, beauty, and lifestyle brands looking to conquer the omnichannel retail space.",
      primaryCta: { label: "Transform Retail", link: "/contact" },
      secondaryCta: { label: "Explore Features", link: "#features" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "Omnichannel Retail Reimagined",
      description: ["Modern consumers expect a unified experience across physical and digital stores.", "We build the tech that bridges the gap between retail locations and online shops."]
    },
    problemsWeSolve: [{ problem: "Disconnected Offline/Online Sales", solution: "Unified Omnichannel POS Systems" }],
    services: [
      { title: "Lifestyle Marketplaces", description: "Curated shopping experiences.", icon: "ShoppingBag" },
      { title: "Retail Technology", description: "In-store digital kiosks and POS.", icon: "MonitorSmartphone" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Shopify Plus", "React Native", "Node.js"],
    features: ["Omnichannel", "Loyalty Programs", "AR Try-Ons"],
    caseStudies: [],
    portfolioPlaceholders: ["Fashion App Screen", "POS Interface"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["Shopify POS", "Square"]
  },
  {
    slug: "innovation-research",
    title: "Innovation, Research & Venture Building",
    hero: {
      headline: "Invent the Future with OCTADECENT",
      supportingText: "Deep tech research, rapid prototyping, and venture building for disruptive ideas.",
      primaryCta: { label: "Pitch Your Idea", link: "/contact" },
      secondaryCta: { label: "Join the Lab", link: "/lab" }
    },
    trustedBy: commonTrustedBy,
    overview: {
      title: "From Concept to Unicorn",
      description: ["Innovation requires a sandbox to experiment without fear of failure.", "Our labs provide the resources, IP guidance, and technical talent to turn bold ideas into viable ventures."]
    },
    problemsWeSolve: [{ problem: "High Risk of Innovation Failure", solution: "Structured Rapid Prototyping and Validation" }],
    services: [
      { title: "Rapid Prototyping", description: "Build MVPs in weeks, not months.", icon: "Rocket" },
      { title: "Technology Research", description: "Feasibility studies on emerging tech.", icon: "Microscope" }
    ],
    industriesWeServe: commonIndustries,
    process: commonProcess,
    whyChooseUs: commonWhyChooseUs,
    techStack: ["Python", "TensorFlow", "IoT", "Blockchain"],
    features: ["Agile Development", "IP Protection", "Market Validation"],
    caseStudies: [],
    portfolioPlaceholders: ["Prototype Sketch", "Lab Equipment"],
    testimonials: commonTestimonials,
    pricing: commonPricing,
    faqs: [],
    businessOutcomes: commonOutcomes,
    capabilitiesMatrix: commonCapabilities,
    engagementModels: commonEngagement,
    securityCompliance: commonSecurity,
    integrationEcosystem: ["AWS AI", "Google Cloud Research"]
  }
];

export const getServiceBySlug = (slug: string): ServiceData | undefined => {
  return servicesData.find(service => service.slug === slug);
};
