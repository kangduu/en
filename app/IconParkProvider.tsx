"use client";

// @ts-expect-error TS(7016): Could not find a declaration file for module '@icon-park/react'. 'D:/Dukang/en/node_modules/@icon-park/react/index.js' implicitly has an 'any' type.
import "@icon-park/react/styles/index.css";
import React from "react";
import { IconProvider, DEFAULT_ICON_CONFIGS } from "@icon-park/react";
const IconConfig = { ...DEFAULT_ICON_CONFIGS, prefix: "ken", size: "1.3em" };

export default function IconParkProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <IconProvider value={IconConfig}>{children}</IconProvider>;
}
