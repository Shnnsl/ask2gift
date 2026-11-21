import { FavoritesClient } from "@/components/results/FavoritesClient";
import { getPageTitle } from "@/lib/site";

export const metadata = {
  title: getPageTitle("Saved Favorites"),
  description: "Review gift ideas you saved while browsing personalized recommendations on ask2gift.",
  alternates: {
    canonical: "/favorites"
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
