import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import './blog.css';

export const metadata = {
  keywords: [
    "Digital Marketing Blog",
    "Digital Marketing Articles",
    "Online Marketing Blog",
    "SEO Blog",
    "Internet Marketing Tips",
    "Marketing Insights",
    "Latest Digital Marketing Trends",
    "Digital Marketing Tips for Businesses",
    "SEO Tips and Strategies",
    "Google Ads Best Practices",
    "Social Media Marketing Tips",
    "Website SEO Optimization Guide",
    "Lead Generation Strategies",
    "Content Marketing Guide",
    "Online Business Growth Tips",
    "Digital Marketing News and Updates",
    "AI in Digital Marketing",
    "Local SEO Tips",
    "Performance Marketing Insights",
    "Small Business Marketing Ideas",
    "Digital Marketing Learning Resources",

    "Top Digital Marketing Trends in 2026",
    "Latest Online Marketing Trends for Businesses",
    "AI Powered Digital Marketing Trends",
    "Future of SEO and Digital Marketing",
    "Emerging Digital Marketing Strategies",
    "Best Marketing Trends for Small Businesses",
    "Digital Advertising Trends 2026",
    "Content Marketing Trends 2026",
    "Social Media Marketing Trends 2026",
    "Performance Marketing Trends 2026"
],

  title: 'Top Digital Marketing Agency in India | Digital TenX',
  description: 'Explore expert digital marketing blogs, SEO tips, PPC, social media, AI marketing insights, and proven strategies from Digital Marketing TenX across India.',
};

export default function BlogLayout({ children }) {
  return (
    <>
      <Header />
      <div className="blog-layout">
        {children}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

