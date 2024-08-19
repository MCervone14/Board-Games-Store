"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileSettingsSchema } from "@/lib/form-schemas";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { startTransition, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "@/types/user";
import { UpdateProfileSettings } from "@/actions/server";
import DeleteConfirmationModal from "@/components/modals/delete-confirmation-modal";
import { toast } from "sonner";

interface ProfileSettingsFormProps {
  user: User;
}

const ProfileSettingsForm = ({ user }: ProfileSettingsFormProps) => {
  console.log(user);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleCurrentPassword = useCallback(() => {
    setShowCurrentPassword((prev: boolean) => !prev);
  }, []);

  const handleToggleNewPassword = useCallback(() => {
    setShowNewPassword((prev: boolean) => !prev);
  }, []);

  const handleToggleConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev: boolean) => !prev);
  }, []);

  const form = useForm<z.infer<typeof ProfileSettingsSchema>>({
    resolver: zodResolver(ProfileSettingsSchema),
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const watchUsername = form.watch("username");
  const watchEmail = form.watch("email");
  const watchCurrentPassword = form.watch("currentPassword");

  const onSubmit = async (data: z.infer<typeof ProfileSettingsSchema>) => {
    const { username, email, currentPassword, newPassword, confirmPassword } =
      data;

    if (newPassword !== confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      form.setError("newPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("currentPassword", currentPassword as string);
    formData.append("newPassword", newPassword as string);

    const result = await UpdateProfileSettings(formData);

    if (result) {
      form.reset({
        username: result.username,
        email: result.email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast("Profile updated successfully!");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            startTransition(() => {
              onSubmit(data);
            })
          )}
        >
          <div className="mb-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="text-primary placeholder:text-black/60 border-black/30 py-6 focus:border-blue-600"
                      {...field}
                      onChange={(e) => {
                        form.setValue("username", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="text-primary placeholder:text-black/60 border-black/30 py-6 focus:border-blue-600"
                      {...field}
                      onChange={(e) => {
                        form.setValue("email", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Current Password <span className="text-red-800">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="Input current password"
                        className="text-primary placeholder:text-black/60 border-black/30 py-6 focus:border-blue-600"
                        {...field}
                        onChange={(e) => {
                          form.setValue("currentPassword", e.target.value);
                        }}
                      />
                      {showCurrentPassword ? (
                        <EyeIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleCurrentPassword}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleCurrentPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Make a strong new Password"
                        className="text-primary placeholder:text-black/60 border-black/30 py-6 focus:border-blue-600"
                        {...field}
                      />
                      {showNewPassword ? (
                        <EyeIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleNewPassword}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleNewPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-4">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password"
                        className="text-primary placeholder:text-black/60 border-black/30 py-6 focus:border-blue-600"
                        {...field}
                      />
                      {showConfirmPassword ? (
                        <EyeIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleConfirmPassword}
                        />
                      ) : (
                        <EyeSlashIcon
                          className="absolute top-2.5 right-2 w-4 h-7 cursor-pointer"
                          onClick={handleToggleConfirmPassword}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={
              watchUsername === "" ||
              watchEmail === "" ||
              watchCurrentPassword === ""
            }
          >
            Save Changes
          </Button>
        </form>
        <hr className="my-8 border-t border-black/10" />
      </Form>
      <h2 className="text-lg font-bold">
        If you would like to delete your account, click the button below:{" "}
      </h2>
      <DeleteConfirmationModal />
    </>
  );
};

export default ProfileSettingsForm;
