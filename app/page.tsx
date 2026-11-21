import type { Metadata } from "next";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { OccasionSection } from "@/components/home/OccasionSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { faqItems } from "@/lib/faq";
import { isChristmasSeason } from "@/lib/season";
import { siteConfig } from "@/lib/site";

// Re-render once a day so the seasonal Christmas row turns on and off by itself.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" }
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.supportEmail
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  }
];

export default function HomePage() {
  const christmas = isChristmasSeason();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HeroSection />
      <OccasionSection christmas={christmas} />
      <HowItWorksSection />
      <ShowcaseSection />
      <FaqSection />
    </>
  );
}
