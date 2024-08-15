import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen items-center justify-center space-y-6">
      <Image
        src="/images/promotionals/TT_Z_Logo.png"
        alt="Logo"
        width={300}
        height={300}
        className="w-1/2 lg:w-[300px] rounded-full border-2 border-blue-800 mb-6"
      />
      <h1 className="text-2xl">Sorry! The resource or page was not found!</h1>
      <div className="flex gap-10">
        <Link href="/">
          <Button>Go Back to Homepage?</Button>
        </Link>
        <Link href="/boardgames">
          <Button>Continue Shopping?</Button>
        </Link>
      </div>
    </div>
  );
}
