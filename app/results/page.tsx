import { ResultsClient } from "@/components/results/ResultsClient";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Gift Results"),
  description: "Browse personalized gift recommendations generated from your Ask2Gift quiz answers.",
  robots: {
    index: false,
    follow: true
  }
};

export default function ResultsPage() {
  return <ResultsClient />;
}
