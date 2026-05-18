import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Camera On Roll Production",
  description: "AI-powered creative production studio. Cinema, design, and artificial intelligence. Mumbai.",
  openGraph: {
    title: "Camera On Roll Production",
    description: "Cinema × AI × Visual Storytelling",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" className={`${anton.variable} ${inter.variable}`}>
        <body>
          <SmoothScroll>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </body>
      </html>
    </AuthProvider>
  );
}
