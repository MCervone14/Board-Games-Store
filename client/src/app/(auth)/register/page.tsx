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
    <div className="flex w-full justify-center bg-white">
      <div className="w-1/2 flex flex-col items-center">
        <Image
          src="/images/promotionals/TT_Z_logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="w-1/4"
        />
        <Tabs
          defaultValue="Sign Up"
          className="w-full mx-auto flex flex-col justify-center"
        >
          <TabsList className="grid w-1/2 mx-auto grid-cols-2">
            <TabsTrigger value="Login In">Login In</TabsTrigger>
            <TabsTrigger value="Sign Up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="Login In">
            <Card className="z-50 bg-gray-500 text-primary/90 w-1/2 mx-auto">
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
            <Card className="z-50 bg-gray-500 text-primary/90 w-1/2 mx-auto">
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
      <div className="w-1/2">
        <Image
          priority
          src="/images/promotionals/zealots-playing-board-game.jpg"
          alt="Hero"
          width={1920}
          height={1080}
          layout="responsive"
          placeholder="blur"
          blurDataURL="/images/promotionals/zealots-playing-board-game.jpg"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
