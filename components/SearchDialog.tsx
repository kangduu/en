"use client";

import { Search } from "@icon-park/react";
import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Content</DialogTitle>
          <DialogDescription>
            {`Enter your content here. Click search when you're done.`}
          </DialogDescription>
        </DialogHeader>
        <Input />
      </DialogContent>
    </Dialog>
  );
}
 