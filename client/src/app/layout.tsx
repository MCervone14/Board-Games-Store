import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarLayout from "@/features/layout/navbar";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Board Games",
  description: "Buy board games online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NavbarLayout />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
