import UserProfile from "@/components/UserProfile";
import Header from "@/components/Header";

export const metadata = {
  title: "My Profile | Lurnex",
  description: "Manage your Lurnex profile, track applications, and view your subscription status.",
};

export default function ProfilePage() {
  return (
    <main>
      <Header />
      <UserProfile />
    </main>
  );
}
