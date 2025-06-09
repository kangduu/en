"use client";

import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Input } from "../ui/input";
import SearchButton from "./button";

interface SearchDialogProps {
  title?: React.ReactNode;
  onSubmit?: (value: string) => React.ReactNode | void;
  buttonProps?: Omit<Parameters<typeof SearchButton>[number], "onClick">;
}

export default function SearchDialog({
  onSubmit,
  ...props
}: SearchDialogProps) {
  const InputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<React.ReactNode>(null);

  const handleSearch = () => {
    const content = value?.trim();
    if (!content) {
      InputRef.current?.focus?.();
      return setError("content cannot be empty!");
    }

    if (error) setError("");

    const res = onSubmit?.(content);
    if (typeof res !== "boolean" && typeof res !== "undefined" && res !== null)
      setResult(res);
  };

  const [open, setOpen] = useState(false);
  return (
    <>
      <SearchButton onClick={() => setOpen(true)} {...props.buttonProps} />
      <Dialog
        open={open}
        onOpenChange={(open) => {
          console.log(open);
          if (open) {
            setValue("");
            setError("");
            setResult(null);
          } else setOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-[425px] max-w-[90%]">
          <DialogHeader>
            <DialogTitle>
              {"title" in props ? props.title : "Search"}
            </DialogTitle>
            <DialogDescription>
              {`Enter your content here. Click search when you're done.`}
            </DialogDescription>
          </DialogHeader>

          {/* input field */}
          <div>
            <Input
              autoFocus
              ref={InputRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            {error && (
              <div className="text-sm text-red-400 leading-6 pl-2">{error}</div>
            )}
          </div>

          {/* search list */}
          {result}

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleSearch}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
