import { Jost } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/LayoutWrapper";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata = {
  title: "TriaGull - Global Recruitment Platform",
  description: "Your gateway to international job opportunities. Connect with recruiters and find your dream job overseas.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} antialiased font-outfit`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

