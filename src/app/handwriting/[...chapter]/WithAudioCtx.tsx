"use client";

import detectAudioSegments, {
  type AudioSegment,
} from "@/src/utils/audio-segments";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";

export interface AudioContextProps {
  path: string;
  playing: boolean;
  segments: AudioSegment[];
  play: () => void;
  playSegment: (index: number /** segments index */) => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextProps>({
  path: "",
  playing: false,
  segments: [],
  play: () => {},
  playSegment: () => {},
  pause: () => {},
});

// Hook Audio
export const useAudioContext = () => useContext(AudioContext);

export interface WithAudioCtxProps {
  path: AudioContextProps["path"]; // load audio with path.
}

let timerPlaySegment: NodeJS.Timeout;

export default function WithAudioCtx({
  children,
  path,
}: PropsWithChildren<WithAudioCtxProps>) {
  // filename
  const filename = useMemo(() => {
    if (path) return path.split("/").at(-1);
    return "";
  }, [path]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audio = audioRef.current;

  const [playing, setPlaying] = useState<AudioContextProps["playing"]>(false);
  const [segments, setSegments] = useState<AudioSegment[]>([]);

  // set audio segments
  useEffect(() => {
    if (path && filename) {
      fetch(path)
        .then((response) => response.blob())
        .then(async (blob) => {
          const file = new File([blob], filename);
          const res = await detectAudioSegments(file);
          setSegments(res.segments);
        });
    }
  }, [path, filename]);

  // play
  const play: AudioContextProps["play"] = () => {
    if (!path) return alert("path not found.");
    if (!audio) throw Error("audio not found.");

    try {
      audio.currentTime = 0;
      audio.play().catch((error) => {
        throw Error(error);
      });
    } catch (error) {
      alert("play failure." + (error as { message: string }).message);
    }
  };

  // pause
  const pause: AudioContextProps["pause"] = () => {
    if (!path) return alert("path not found.");
    if (!audio) throw Error("audio not found.");

    try {
      audio.pause();
    } catch (error) {
      alert("paused failure." + (error as { message: string }).message);
    }
  };

  // play segment
  const playSegment: AudioContextProps["playSegment"] = (index) => {
    try {
      if (!audio) throw Error("audio not found.");
      if (playing) audio.pause();

      const { start, duration } = segments[index];

      audio.currentTime = start;
      audio.playbackRate = 1.0;
      audio.play();

      clearTimeout(timerPlaySegment);
      timerPlaySegment = setTimeout(() => {
        audio.pause();
      }, duration * 1000);
    } catch (error) {
      alert("play segment failure." + (error as { message: string }).message);
    }
  };

  const AudioContextValue: AudioContextProps = {
    playing,
    path,
    segments,
    playSegment,
    play,
    pause,
  };
  return (
    <AudioContext.Provider value={AudioContextValue}>
      <audio
        ref={audioRef}
        src={path}
        preload="data"
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      ></audio>
      {children}
    </AudioContext.Provider>
  );
}
