import Link from "next/link";

const categories = [
  { label: "Board Games", href: "/boardgames" },
  { label: "Card Games", href: "/cardgames" },
  { label: "Game Books", href: "/gamebooks" },
  { label: "Comics", href: "/comics" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Categories</h3>
          {categories.map((category) => (
            <Link key={category.label} href={category.href}>
              {category.label}
            </Link>
          ))}
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Sitemap</h3>
          <Link href="/">Home</Link>
          <Link href="#">Contact Us</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <p className="text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tabletop Zealot. All rights reserved.
          </p>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
