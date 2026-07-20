import { QuizWizard } from "@/components/quiz/QuizWizard";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Gift Quiz"),
  description: "Answer a short gift finder quiz and get personalized gift ideas based on recipient, occasion, budget, and style."
};

export default function QuizPage() {
  return <QuizWizard />;
}
