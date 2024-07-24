import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/features/footer/footer";
import NavbarLayout from "@/features/layout/navbar";
import CategoriesNavbar from "@/features/layout/categories-navbar";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
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
      <body className={archivo.className}>
        <NavbarLayout />
        <CategoriesNavbar />
        <main>
          {props.children}
          {props.modal}
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
