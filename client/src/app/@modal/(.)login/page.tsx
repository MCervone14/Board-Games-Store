"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "@/features/form/login-form";
import { useRouter, usePathname } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Dialog open={pathname === "/login"} onOpenChange={() => router.back()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please enter your information to login to your account.
          </DialogDescription>
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
