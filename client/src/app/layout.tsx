import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarLayout from "@/features/layout/navbar";
import { cookies } from "next/headers";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Board Games",
  description: "Buy board games online",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NavbarLayout />
        {props.children}
        {props.modal}
        <Toaster />
      </body>
    </html>
  );
}
