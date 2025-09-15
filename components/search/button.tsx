"use client";

import { Search } from "@icon-park/react";
import React from "react";
import { Button } from "../ui/button";

/**
 * search button
 * @param props Button Props
 * @returns {ReturnType<typeof Button>}
 */
function SearchButton(
  props: Parameters<typeof Button>[number]
): ReturnType<typeof Button> {
  // Ctrl + K
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "k" &&
        !e.repeat
      ) {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <Button ref={buttonRef} variant="outline" {...props}>
      <Search />
      <span className="sr-only">Search (Ctrl+K)</span>
      <span aria-hidden="true">Ctrl K</span>
    </Button>
  );
}

export default React.memo(SearchButton);
