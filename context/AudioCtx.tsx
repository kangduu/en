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
  replay?: boolean;
  setReplay?: (replay: boolean) => void;
  play: (path: string) => void;
  pause: () => void;
}

const AudioContext = createContext<AudioContextProps>({
  paths: [],
  current: null,
  playing: false,
  activePath: "",
  currentTime: 0,
  replay: false,
  setReplay: () => {},
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
  paths,
  ...props
}: PropsWithChildren<Pick<AudioContextProps, "paths" | "replay">>) {
  const [audio, setAudio] = useState<AudioContextProps["current"]>(null);
  const [playing, setPlaying] = useState<AudioContextProps["playing"]>(false);
  const [active, setActive] = useState<AudioContextProps["activePath"]>("");
  const [currentTime, setCurrentTime] =
    useState<AudioContextProps["currentTime"]>(0);

  // replay on ended.
  const [replay, setReplay] = useState<AudioContextProps["replay"]>(false);
  useEffect(() => {
    if (props.replay === undefined) setReplay(false);
    else setReplay(props.replay);
  }, [props.replay]);

  // whether to replay at the ended.
  useEffect(() => {
    if (audio) {
      audio.onended = () => {
        setCurrentTime(0);
        if (replay) audio.play();
      };
    }
  }, [audio, replay]);

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
    replay,
    setReplay,
    play,
    pause,
  };
  return (
    <AudioContext.Provider value={AudioContextValue}>
      {props.children}
    </AudioContext.Provider>
  );
}

interface AudioControlProps {
  played: boolean;
  onClick?: OnClickEvent;
}
/**
 * Audio control components
 * @param param0
 * @returns
 */
export function AudioControl({ played, onClick }: AudioControlProps) {
  if (played) return <PauseOne onClick={onClick} />;
  return <Play onClick={onClick} />;
}

export interface AudioTriggerProps extends ComponentCssProps {
  path: string;
  onClick?: OnClickEvent;
  children?: ((playing: boolean) => React.ReactNode) | React.ReactNode;
}
/**
 * Audio Play or Pause Trigger Component
 * @param param0
 * @returns
 */
export function AudioTrigger({ path, ...props }: AudioTriggerProps) {
  const audio = useAudioContext();
  const played = audio?.activePath === path && audio?.playing;
  const handleClick: OnClickEvent = (e) => {
    if (played) audio.pause();
    else {
      // 关闭正在播放的
      if (audio.playing && audio?.activePath !== path) audio.pause();
      // 播放当前点击的
      audio.play(path);
    }
    props.onClick?.(e);
  };
  return (
    <span onClick={handleClick} className={props.className} style={props.style}>
      {"children" in props ? (
        typeof props.children === "function" ? (
          props.children(played)
        ) : (
          props.children
        )
      ) : (
        <AudioControl played={played} />
      )}
    </span>
  );
}
