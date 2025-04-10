"use client";

import detectAudioSegments from "@/src/utils/audio-segments";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { blob } from "stream/consumers";

export interface AudioContextProps {
  path?: string;
  play: () => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextProps>({
  path: undefined,
  play: () => {},
  pause: () => {},
});

// Hook Audio
export const useAudioContext = () => useContext(AudioContext);

export interface WithAudioCtxProps {
  path: string; // load audio with path.
}

export default function WithAudioCtx({
  children,
  path,
}: PropsWithChildren<WithAudioCtxProps>) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const filename = useMemo(() => {
    if (path) return path.split("/").at(-1);
    return "";
  }, [path]);

  // todo audio segments

  useEffect(() => {
    if (path && filename) {
      fetch(path)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new File([blob], filename);
          const res = await detectAudioSegments(file);
          console.log(res);
        });
    }
  }, [path, filename]);

  const play = () => {
    try {
      audioRef.current?.play().catch((error) => {
        throw Error(error);
      });
    } catch (error) {
      alert("play failure." + (error as { message: string }).message);
    }
  };

  const pause = () => {
    try {
      audioRef.current?.pause();
    } catch (error) {
      alert("paused failure." + (error as { message: string }).message);
    }
  };

  const AudioContextValue: AudioContextProps = {
    path,
    play,
    pause,
  };
  return (
    <AudioContext.Provider value={AudioContextValue}>
      <audio src={path} preload="metadata" ref={audioRef}></audio>
      {children}
    </AudioContext.Provider>
  );
}
