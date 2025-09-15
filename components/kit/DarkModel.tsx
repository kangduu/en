"use client";

import React, { useCallback, useEffect, useState } from "react";
import { SunOne, Moon } from "@icon-park/react";
import { Button } from "../ui/button";

type ThemeType = "dark" | "light";

export default function DarkModel(props: Parameters<typeof Button>[number]) {
  const [theme, setTheme] = useState<ThemeType>();

  // toggle dark model
  const setDarkModel = useCallback(() => {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  // toggle light model
  const setLightModel = useCallback(() => {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    setTheme("light");
    localStorage.setItem("theme", "light");
  }, []);

  // match os scheme
  useEffect(() => {
    function getTheme(theme: ThemeType) {
      return (
        localStorage.getItem("theme") === theme ||
        (!localStorage.getItem(theme) &&
          window.matchMedia(`(prefers-color-scheme: ${theme})`).matches)
      );
    }
    if (getTheme("light")) setLightModel();
    else if (getTheme("dark")) setDarkModel();
  }, [setLightModel, setDarkModel]);

  return (
    <Button
      variant="outline"
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        if (theme === "light") setDarkModel();
        if (theme === "dark") setLightModel();
        props.onClick?.(e);
      }}
    >
      {theme === "light" && <SunOne />}
      {theme === "dark" && <Moon />}
    </Button>
  );
}
