"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { RegisterForm } from "@/features/form/register-form";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog open={pathname === "/register"} onOpenChange={() => router.back()}>
      <DialogContent className="w-[375px] sm:w-full">
        <DialogHeader>
          <Image
            src="/images/promotionals/TT_Z_Logo.png"
            alt="logo"
            width={150}
            height={50}
            className="mx-auto object-cover rounded-full border-blue-800 border-2"
          />
        </DialogHeader>
        <RegisterForm />
        <DialogDescription>
          Already have an account?{" "}
          <Button
            variant={"link"}
            onClick={() => router.replace("/login")}
            className="text-blue-600 p-0 pl-2"
          >
            Sign in
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterPage;
