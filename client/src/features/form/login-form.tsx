"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Login } from "@/actions/server";
import { loginFormSchema } from "@/lib/form-schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import EyeSlashIcon from "@heroicons/react/24/solid/EyeSlashIcon";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const { username, password } = values;
    const data = await Login(username, password);

    if (data.status === 401) {
      form.setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });

      form.setError("password", {
        type: "manual",
        message: "Invalid username or password",
      });
    }

    if (data.token) {
      form.reset();
      router.push("/");
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Login with your Created Username"
                  className="text-primary placeholder:text-black/60 border-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
                    className="text-primary placeholder:text-black/60 border-black"
                    {...field}
                  />
                  {showPassword ? (
                    <EyeIcon
                      className="absolute top-2.5 right-2 w-4 h-4 cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <EyeSlashIcon
                      className="absolute top-2.5 right-2 w-4 h-4 cursor-pointer"
                      onClick={handleShowPassword}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="flex justify-center w-full bg-gray-300 text-black hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
