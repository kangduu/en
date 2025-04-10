"use client";

import React from "react";
import { Media } from "@/src/icons";
import { useAudioContext } from "./WithAudioCtx";

export default function RenderCourseName({ name }: { name: string }) {
  const audio = useAudioContext();
  if (name === "undefined") return null;
  return (
    <h2 className="font-bold text-xl flex items-center gap-2">
      <Media.Sound onClick={audio.play} />
      <Media.Muted onClick={audio.pause} />
      {name}
    </h2>
  );
}
