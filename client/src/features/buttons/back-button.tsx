"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  children: React.ReactNode;
}

const BackButton = ({ children }: BackButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          router.back();
        })
      }
    >
      {children}
    </Button>
  );
};

export default BackButton;
