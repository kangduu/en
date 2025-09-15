"use client";

import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { Back2Top } from "@/components/kit";

import "@icon-park/react/styles/index.css";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
import Navigation from "@/components/Header";
import Footer from "@/components/Footer";
const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "ken", size: "1.3em" };

export default function Main({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <IconProvider value={IconConfig}>
      <Navigation />
      <main className="w-full">{children}</main>
      <Footer />
      <Toaster />
      <Back2Top />
    </IconProvider>
  );
}
