"use client";
import { useRouter } from "next/navigation";
import { NewConceptComp } from "@/src/components";
import React, { type FC } from "react";
import { HeaderLinkPathMapping } from "@/src/routes";

const Books: FC = () => {
  const router = useRouter();
  return (
    <>
      <h2 className="uppercase text-primary-500">new concept english</h2>
      <NewConceptComp
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
