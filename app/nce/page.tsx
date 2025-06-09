"use client";

import { useRouter } from "next/navigation";
import React, { type FC } from "react";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import NewConcept from "@/app/nce/NewConcept";
import Subhead from "@/components/Subhead";

const Books: FC = () => {
  const router = useRouter();
  return (
    <>
      <Subhead>new concept english</Subhead>
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
