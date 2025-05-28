"use client";

import React from "react";
import { useAudioContext } from "@/context/AudioCtx";
import { PauseOne, Play } from "@icon-park/react";

export default function RenderCourseName({ name }: { name: string }) {
  const audio = useAudioContext();
  if (name === "undefined") return null;
  return (
    <h2 className="flex items-center gap-2">
      {audio?.playing ? (
        <PauseOne onClick={audio.pause} className="cursor-pointer" />
      ) : (
        <Play onClick={audio.play} className="cursor-pointer" />
      )}
      {name}
    </h2>
  );
}
