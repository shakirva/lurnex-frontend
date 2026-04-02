"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { AuthProvider } from "../contexts/AuthContext";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmployerPath = pathname?.startsWith('/employer');
  const isAdminPath = pathname?.startsWith('/admin');
  const isDashboard = isEmployerPath || isAdminPath;

  return (
    <AuthProvider>
      {!isDashboard && <Header />}
      <main className={isDashboard ? "" : "min-h-screen"}>
        {children}
      </main>
      {!isDashboard && <Footer />}
    </AuthProvider>
  );
}
