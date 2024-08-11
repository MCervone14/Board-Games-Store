"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/features/form/login-form";
import { RegisterForm } from "@/features/form/register-form";

const RegisterPage = () => {
  return (
    <div className="flex w-full justify-center bg-slate-300">
      <div className="w-[360px] lg:w-1/2 flex flex-col items-center justify-center py-10">
        <Image
          src="/images/promotionals/TT_Z_Logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-1/2 lg:w-1/4 rounded-full border-2 border-blue-800 mb-6"
        />
        <Tabs
          defaultValue="Sign Up"
          className="w-full mx-auto flex flex-col justify-center"
        >
          <TabsList className="grid w-full lg:w-1/2 mx-auto grid-cols-2">
            <TabsTrigger value="Login In">Login In</TabsTrigger>
            <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="Login In">
            <Card className="z-50 text-primary/90 w-full lg:w-1/2 mx-auto">
              <CardHeader>
                <CardTitle>Login In</CardTitle>
                <CardDescription className="text-primary/90">
                  Please enter your information to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                <LoginForm />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="Sign Up">
            <Card className="z-50 text-primary/90 w-full lg:w-1/2 mx-auto">
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription className="text-primary/90">
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-10">
                <RegisterForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-1/2 hidden lg:flex">
        <Image
          priority
          src="/images/promotionals/zealots-playing-board-game.jpg"
          alt="Hero"
          width={2048}
          height={1925}
          placeholder="blur"
          blurDataURL="/images/promotionals/zealots-playing-board-game.jpg"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
