"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const categories = [
  { label: "Board Games", href: "/boardgames" },
  { label: "Card Games", href: "/boardgames?categoriesSelected=Card+Game" },
  // { label: "Game Books", href: "/boardgames?categoriesSelected=Game+Book" },
  // { label: "Comics", href: "/boardgames?categoriesSelected=Comics" },
];

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="bg-gray-100 p-6 md:py-12">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold underline">Categories</h3>
          {categories.map((category) => (
            <Button
              className="p-0 w-fit"
              variant="ghost"
              key={category.label}
              onClick={() => {
                router.push(category.href);
                router.refresh();
              }}
            >
              {category.label}
            </Button>
          ))}
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold underline">Sitemap</h3>
          <Link prefetch={false} href="/">
            Home
          </Link>
          <Link prefetch={false} href="#">
            Contact Us - (Coming Soon)
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold underline">Legal</h3>
          <p className="text-gray-900">
            © {new Date().getFullYear()} Tabletop Zealot. All rights reserved.
          </p>
          <Link prefetch={false} href="/terms-of-service">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
