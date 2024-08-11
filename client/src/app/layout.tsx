import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/features/footer/footer";
import NavbarLayout from "@/features/layout/navbar";

const SourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-SourceSans",
});

export const metadata: Metadata = {
  title: "Board Games",
  description: "Buy new and used board games online",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={SourceSans.className}>
        <NavbarLayout />
        <main>
          {props.children}
          {props.modal}
          <SpeedInsights />
        </main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
