"use client";

import React from "react";
import { Toaster } from "@/components/ui/sonner";
import Back2Top from "@/components/Back2Top";
import Navigation from "./header";
import "./globals.css";
import "@icon-park/react/styles/index.css";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "ken", size: "1.3em" };

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IconProvider value={IconConfig}>
      <Navigation />
      <main className="px-4 pt-4 pb-6 w-full m-auto max-w-[1024px]">
        {children}
        <Back2Top />
      </main>
      <Toaster />
    </IconProvider>
  );
}
