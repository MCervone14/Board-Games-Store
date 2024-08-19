import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/features/footer/footer";
import NavbarLayout from "@/features/layout/navbar";

export const metadata: Metadata = {
  title: "Home | Tabletop_Zealots",
  description: "Buy new and used board games online",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-white w-full sticky top-0 left-0 z-10 min-h-[60px]">
          <div className="sticky h-6 bg-blue-600">
            <p className="text-white text-center">
              *Note: This is a portfolio piece website.
            </p>
          </div>
          <NavbarLayout />
        </div>
        <main>
          {props.children}
          {props.modal}
        </main>
        <Toaster position="top-center" />
        <Footer />
      </body>
    </html>
  );
}
