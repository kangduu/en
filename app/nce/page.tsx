"use client";

import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import NewConcept from "@/app/nce/NewConcept";
import { Chapter } from "@/components/kit";

const Books: FC = () => {
  const router = useRouter();
  return (
    <div className="res-box my-4">
      <div className="mb-4">
        <Chapter title="New Concept English" />
      </div>
      <NewConcept
        showList
        clickable={false}
        onClickCourse={(course, book) => {
          // Handle course click
          router.push(`${HeaderLinkPathMapping["NCE"]}/${book}/${course}`);
        }}
      />
    </div>
  );
};

export default Books;
