export interface HeroSectionData {
  headline: string;
  supportingText: string;
  primaryCta: { label: string; link: string };
  secondaryCta: { label: string; link: string };
}

export interface BusinessStatistic {
  label: string;
  value: string; // e.g. "150+", "99.9%"
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string; // Could be a Lucide icon name
  benefits?: string[];
  features?: string[];
}

export interface ProblemSolution {
  problem: string;
  solution: string;
}

export interface CaseStudy {
  project: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface Testimonial {
  name: string;
  company: string;
  review: string;
  rating: number;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface TechCategory {
  category: string;
  technologies: { name: string; icon: string }[];
}

export interface ServiceData {
  slug: string;
  title: string; // The service name
  
  hero: HeroSectionData;
  businessStatistics?: BusinessStatistic[];
  
  trustedBy: string[]; // List of industries or company types
  overview: {
    title: string;
    description: string[]; // 3-5 paragraphs
  };
  problemsWeSolve: ProblemSolution[];
  services: ServiceItem[];
  
  featureComparison?: {
    title: string;
    metrics: { name: string; traditional: string; modern: string }[];
  };
  
  industriesWeServe: { name: string; description?: string }[];
  process: { phase: string; description: string; timeline?: string }[]; 
  whyChooseUs: { title: string; description?: string }[];
  
  techStack: string[] | TechCategory[];
  features: string[];
  caseStudies: CaseStudy[];
  portfolioPlaceholders: string[]; // e.g. ["Screenshot 1", "Video"]
  testimonials: Testimonial[];
  pricing: PricingTier[];
  faqs: FAQ[];
  
  // Premium Enterprise Sections
  businessOutcomes: { title: string; value?: string; description?: string }[];
  capabilitiesMatrix: { feature: string; included: boolean }[];
  engagementModels: { name: string; description: string }[];
  securityCompliance: string[];
  integrationEcosystem: string[];
}
