import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ShowcaseSection } from "@/components/home/ShowcaseSection";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Gift Finder"),
  description:
    "Find gift ideas with a personalized gift finder quiz. ask2gift helps you discover thoughtful, budget-friendly gift suggestions fast."
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorksSection />
      <ShowcaseSection />
    </>
  );
}
