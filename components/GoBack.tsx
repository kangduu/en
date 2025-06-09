"use client";
import React, { type PropsWithChildren } from "react";
import { Back } from "@icon-park/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface GoBackProps {
  [key: string]: unknown;
}

export default function GoBack({ children }: PropsWithChildren<GoBackProps>) {
  const router = useRouter();
  return (
    <div className="flex items-center mb-4">
      <div className="flex-1 overflow-hidden mr-2 font-semibold">
        {children}
      </div>
      <Button
        className="ml-auto"
        variant="secondary"
        onClick={() => router.back()}
      >
        <Back />
      </Button>
    </div>
  );
}
