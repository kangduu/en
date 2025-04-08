"use client";
import { useRouter } from "next/navigation";
import { NewConceptTemp } from "@/src/components";
import React, { type FC } from "react";
import { HeaderLinkPathMapping } from "@/src/routes";

const Books: FC = () => {
  const router = useRouter();
  return (
    <div className="py-4">
      <NewConceptTemp
        showList
        clickable={false}
        onClickCourse={(course, book) => {
          // Handle course click
          router.push(
            `${HeaderLinkPathMapping["Handwriting"]}/${book}/${course}`
          );
        }}
      />
    </div>
  );
};

export default Books;
