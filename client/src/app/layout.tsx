import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
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
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
