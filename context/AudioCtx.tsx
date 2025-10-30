"use client";

import { PauseOne, Play } from "@icon-park/react";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

export interface AudioContextProps {
  paths: string[]; // audio path list
  current: HTMLAudioElement | null; // The currently playing audio file.
  playing: boolean;
  activePath: string; // The path of the currently playing audio file.
  currentTime: number; // The pause time of the currently playing audio file.
  play: (path: string) => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextProps>({
  paths: [],
  current: null,
  playing: false,
  activePath: "",
  currentTime: 0,
  play: () => {},
  pause: () => {},
});

// Hook Audio
export const useAudioContext = () => useContext(AudioContext);

/**
 * Audio Context
 * @param param0
 * @returns
 */
export default function AudioCtx({
  children,
  paths,
}: PropsWithChildren<Pick<AudioContextProps, "paths">>) {
  const [audio, setAudio] = useState<AudioContextProps["current"]>(null);
  const [playing, setPlaying] = useState<AudioContextProps["playing"]>(false);
  const [active, setActive] = useState<AudioContextProps["activePath"]>("");
  const [currentTime, setCurrentTime] =
    useState<AudioContextProps["currentTime"]>(0);

  // fetch audio metadata
  const generateAudioElement = useCallback(function (
    path: string
  ): AudioContextProps["current"] {
    if (path) {
      const AudioElement = document.createElement("audio");
      AudioElement.src = path;
      AudioElement.preload = "metadata";
      // AudioElement.onerror = function () {}; use catch handler on paly
      AudioElement.onpause = function () {
        setCurrentTime(AudioElement.currentTime);
        setPlaying(false);
      };
      AudioElement.onended = () => {
        setCurrentTime(0);
      };
      AudioElement.onplay = () => {
        setPlaying(true);
        setActive(path);
      };
      return AudioElement;
    }
    return null;
  },
  []);

  // on play
  const play: AudioContextProps["play"] = useCallback(
    async (path: string) => {
      if (!path) return alert("path not found.");
      try {
        const unchanging = path === active;
        const AudioElement = unchanging ? audio : generateAudioElement(path);
        if (!AudioElement) throw Error("Audio loading failed.");
        if (!unchanging) setAudio(AudioElement);
        // 同一个音频暂停后复播从暂停处继续播放
        AudioElement.currentTime = unchanging ? currentTime : 0;
        AudioElement.play().catch(() => {
          setAudio(null);
          setActive("");
          // in onpause event
          // setPlaying(false);
          // setCurrentTime(0);
        });
      } catch (error) {
        alert("play failure." + (error as { message?: string })?.message);
      }
    },
    [active, audio, currentTime, generateAudioElement]
  );

  // on pause
  const pause: AudioContextProps["pause"] = useCallback(() => {
    try {
      audio?.pause();
    } catch (error) {
      alert("paused failure." + (error as { message: string }).message);
    }
  }, [audio]);

  // on unmount
  useEffect(() => () => audio?.pause(), [audio]);

  const AudioContextValue: AudioContextProps = {
    currentTime,
    current: audio,
    activePath: active,
    playing,
    paths,
    play,
    pause,
  };
  return (
    <AudioContext.Provider value={AudioContextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export interface AudioTriggerProps {
  path: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
/**
 * Audio Play or Pause Trigger Component
 * @param param0
 * @returns
 */
export function AudioTrigger({ onClick, path }: AudioTriggerProps) {
  const audio = useAudioContext();
  return (
    <span className="cursor-pointer" onClick={(e) => onClick?.(e)}>
      {audio?.activePath === path && audio?.playing ? (
        <PauseOne onClick={() => audio.pause()} />
      ) : (
        <Play
          onClick={() => {
            if (audio.playing && audio?.activePath !== path) audio.pause();
            audio.play(path);
          }}
        />
      )}
    </span>
  );
}
