import UserProfile from "@/components/UserProfile";
import Header from "@/components/Header";

export const metadata = {
  title: "My Profile | TriaGull",
  description: "Manage your TriaGull profile, track applications, and view your subscription status.",
};

export default function ProfilePage() {
  return (
    <main>
      <Header />
      <UserProfile />
    </main>
  );
}

