"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Back2Top } from "@/components/kit";
import Footer from "@/components/Footer";
import Navigation from "@/components/navigation";

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="antialiased bg-background dark:text-white text-base">
      <Navigation />
      <main className="pt-16 w-full min-h-screen">{children}</main>
      <Footer />
      <Toaster />
      <Back2Top />
    </div>
  );
}
