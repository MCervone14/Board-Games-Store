"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { LoginForm } from "@/features/form/login-form";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname === "/login"} onOpenChange={() => router.back()}>
      <DialogContent className="w-[375px] sm:w-full">
        <DialogHeader>
          <Image
            src="/images/promotionals/TT_Z_Logo.png"
            alt="logo"
            width={150}
            height={50}
            className="mx-auto object-cover rounded-full border-2 border-blue-800"
          />
        </DialogHeader>
        <LoginForm />
        <DialogDescription>
          Don't have an account?
          <Button
            variant={"link"}
            onClick={() => router.replace("/register")}
            className="text-blue-600 p-0 pl-2"
          >
            Sign up
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
