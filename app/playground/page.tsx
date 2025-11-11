"use client";
import React from "react";
import { useFullscreen } from "ahooks";
import { useRef } from "react";
import { FullScreen, OffScreen } from "@icon-park/react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Ornament from "./Ornament";

export default function Playground() {
  const ref = useRef(null);
  const [isFullscreen, { enterFullscreen, exitFullscreen }] =
    useFullscreen(ref);
  return (
    <>
      <section
        ref={ref}
        className="bg-transparent relative flex-1 min-h-screen z-10"
      >
        {!isFullscreen && <SidebarTrigger className="mt-3 ml-2" />}
        {!isFullscreen && (
          <Button
            size="lg"
            variant="secondary"
            onClick={enterFullscreen}
            className="absolute left-1/2 bottom-[5%] transform-[translateX(-50%)] z-10"
          >
            <FullScreen theme="outline" />
            进入沉浸式学习模式
          </Button>
        )}
        {isFullscreen && (
          <Button
            size="icon"
            variant="secondary"
            onClick={exitFullscreen}
            className="absolute right-4 top-4 z-10"
          >
            {/* 退出沉浸式学习模式 */}
            <OffScreen theme="outline" />
          </Button>
        )}
      </section>
      <Ornament />
    </>
  );
}
