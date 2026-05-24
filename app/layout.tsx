import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
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
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <div className="film-grain" aria-hidden="true" />
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
