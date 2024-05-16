"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RegisterForm } from "@/features/form/register-form";
import { useRouter, usePathname } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Dialog open={pathname === "/register"} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please enter the required information to sign up.
          </DialogDescription>
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
