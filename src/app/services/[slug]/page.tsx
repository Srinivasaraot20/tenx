import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/data/services";

// Import all sections
import HeroSection from "@/components/services/HeroSection";
import TrustedBy from "@/components/services/TrustedBy";
import ServiceOverview from "@/components/services/ServiceOverview";
import ProblemsWeSolve from "@/components/services/ProblemsWeSolve";
import OurServicesGrid from "@/components/services/OurServicesGrid";
import IndustriesWeServe from "@/components/services/IndustriesWeServe";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import WhyChooseUs from "@/components/services/WhyChooseUs";
import TechStack from "@/components/services/TechStack";
import FeaturesGrid from "@/components/services/FeaturesGrid";
import CaseStudies from "@/components/services/CaseStudies";
import BusinessStatistics from "@/components/services/BusinessStatistics";
import FeatureComparison from "@/components/services/FeatureComparison";
import PortfolioShowcase from "@/components/services/PortfolioShowcase";
import TestimonialsSlider from "@/components/services/TestimonialsSlider";
import PricingTable from "@/components/services/PricingTable";
import FAQAccordion from "@/components/services/FAQAccordion";
import RelatedServices from "@/components/services/RelatedServices";
import CallToAction from "@/components/services/CallToAction";
import ContactForm from "@/components/services/ContactForm";

// Premium Sections
import BusinessOutcomes from "@/components/services/BusinessOutcomes";
import CapabilitiesMatrix from "@/components/services/CapabilitiesMatrix";
import EngagementModels from "@/components/services/EngagementModels";
import SecurityCompliance from "@/components/services/SecurityCompliance";
import GlobalDeliveryModel from "@/components/services/GlobalDeliveryModel";

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col w-full overflow-hidden">
      <HeroSection data={service.hero} />
      
      <BusinessStatistics data={service.businessStatistics} />
      
      <TrustedBy data={service.trustedBy} />
      
      <ServiceOverview data={service.overview} />
      
      <BusinessOutcomes data={service.businessOutcomes} />
      
      <ProblemsWeSolve data={service.problemsWeSolve} />
      
      <OurServicesGrid data={service.services} />
      
      <FeatureComparison data={service.featureComparison} />
      
      <CapabilitiesMatrix data={service.capabilitiesMatrix} />
      
      <IndustriesWeServe data={service.industriesWeServe} />
      
      <ProcessTimeline data={service.process} />
      
      <EngagementModels data={service.engagementModels} />
      
      <WhyChooseUs data={service.whyChooseUs} />
      
      <TechStack data={service.techStack} />
      
      <FeaturesGrid data={service.features} />
      
      <SecurityCompliance data={service.securityCompliance} />
      
      <CaseStudies data={service.caseStudies} />
      
      <PortfolioShowcase data={service.portfolioPlaceholders} />
      
      <GlobalDeliveryModel data={service.integrationEcosystem} />
      
      <TestimonialsSlider data={service.testimonials} />
      
      <PricingTable 
        title={`${service.title} Packages`} 
        subtitle="Choose the right plan to accelerate your business growth."
        packages={service.pricing as any} 
        serviceName={service.title} 
        serviceId={service.slug} 
      />
      
      <FAQAccordion data={service.faqs} />
      
      <RelatedServices data={servicesData.filter(s => s.slug !== service.slug).map(s => ({ title: s.title, slug: s.slug })).slice(0, 3)} />
      
      <CallToAction data={null} />
      
      <ContactForm data={null} />
    </main>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);
  
  if (!service) {
    return {
      title: "Service Not Found - OCTADECENT",
    };
  }
  
  return {
    title: `${service.title} | OCTADECENT Enterprise Solutions`,
    description: service.hero.supportingText,
  };
}
