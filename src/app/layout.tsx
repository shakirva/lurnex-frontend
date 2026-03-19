"use client";

import { Jost } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthProvider } from "../contexts/AuthContext";
import { usePathname } from "next/navigation";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isEmployerPath = pathname?.startsWith('/employer');
  const isAdminPath = pathname?.startsWith('/admin');
  const isDashboard = isEmployerPath || isAdminPath;

  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased font-outfit`}>
        <AuthProvider>
          {!isDashboard && <Header />}
          <main className={isDashboard ? "" : "min-h-screen"}>
            {children}
          </main>
          {!isDashboard && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
