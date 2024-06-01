import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Categories</h3>
          <Link href="#">Electronics</Link>
          <Link href="#">Fashion</Link>
          <Link href="#">Home & Garden</Link>
          <Link href="#">Sports & Outdoors</Link>
          <Link href="#">Beauty & Personal Care</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Sitemap</h3>
          <Link href="#">Home</Link>
          <Link href="#">Shop</Link>
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
          <Link href="#">FAQ</Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <p className="text-gray-500 dark:text-gray-400">
            © 2024 Example Inc. All rights reserved.
          </p>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
