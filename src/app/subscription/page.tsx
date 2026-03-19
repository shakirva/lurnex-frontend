import SubscriptionPlans from "@/components/SubscriptionPlans";
import Header from "@/components/Header";

export const metadata = {
  title: "Subscription Plans | Lurnex",
  description: "Choose a Lurnex subscription plan to get full access to job details and exclusive career resources.",
};

export default function SubscriptionPage() {
  return (
    <main>
      <Header />
      <SubscriptionPlans />
    </main>
  );
}
