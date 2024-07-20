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
import { Register } from "@/actions/server";
import { registerFormSchema } from "@/lib/form-schemas";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    const { username, email, password } = values;
    const data = await Register(username, email, password);

    if (data.status === 400) {
      if (data.errors.DuplicateEmail) {
        form.setError("email", {
          type: "manual",
          message: data.errors.DuplicateEmail,
        });
      }

      if (data.errors.DuplicateUserName) {
        form.setError("username", {
          type: "manual",
          message: data.errors.DuplicateUserName,
        });
      }

      if (data.errors.PasswordRequiresDigit) {
        form.setError("password", {
          type: "manual",
          message: data.errors.PasswordRequiresDigit,
        });
      }

      if (data.errors.PasswordRequiresNonAlphanumeric) {
        form.setError("password", {
          type: "manual",
          message: data.errors.PasswordRequiresNonAlphanumeric,
        });
      }
    }

    if (data.token) {
      form.reset();
      router.replace("/boardgames");
    }
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
                  placeholder="Create a Unique Username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="JohnDoe@gmail.com"
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
          className="flex justify-center w-full  bg-gray-300 text-black hover:bg-blue-600 hover:text-white"
          type="submit"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
