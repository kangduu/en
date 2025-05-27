"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "@icon-park/react";
import React, { useRef } from "react";

export default function SearchSynonym() {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSearch = () => {
    if (!inputRef.current) return;
    // Perform search action with the input value
    inputRef.current.focus();
  };
  return (
    <div className="flex items-center justify-center cursor-pointer">
      <Input ref={inputRef} placeholder="enter a word" className="mr-2" />
      <Button variant="secondary" onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  );
}
