"use client";

import { NewConceptTemp } from "@/src/components";
import { useRouter } from "next/navigation";
import React from "react";

// /books
export default function page() {
  const router = useRouter();
  return (
    <div className="py-4">
      <NewConceptTemp
        showList
        clickable={false}
        onClickCourse={(course, book) => {
          // Handle course click
          router.push(`/books/${book}/${course}`);
        }}
      />
    </div>
  );
}
