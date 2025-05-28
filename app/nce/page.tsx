"use client";
import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import NewConcept from "@/components/NewConcept";

const Books: FC = () => {
  const router = useRouter();
  return (
    <>
      <h2 className="uppercase text-primary-500">new concept english</h2>
      <NewConcept
        showList
        clickable={false}
        onClickCourse={(course, book) => {
          // Handle course click
          router.push(`${HeaderLinkPathMapping["NCE"]}/${book}/${course}`);
        }}
      />
    </>
  );
};

export default Books;
