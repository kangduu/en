"use client";

import type { Course } from "@/lib/books";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import type { NewConceptBookKey } from "@/utils/constant";
import React from "react";

function RenderButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      disabled={disabled}
      className={`${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:text-primary-500 text-gray-800 "
      }  dark:text-white`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export interface RenderPaginationProps {
  page: number;
  book: NewConceptBookKey;
  courses: Course[];
}

export default function RenderPagination({
  page,
  book,
  courses,
}: RenderPaginationProps) {
  const PreviousCourse = courses[page - 1],
    NextCourse = courses[page + 1];

  const renderName = (name: string) => {
    if (name === "undefined") return null;
    return (
      <>
        {name && <span>:&nbsp;</span>}
        <span key={name} className="underline underline-offset-4">
          {name}
        </span>
      </>
    );
  };

  return (
    <div className="w-full border-t-1 border-solid border-gray-300 dark:border-gray-100/40 flex gap-4 justify-between items-center mt-8 mb-8 pt-1">
      <RenderButton
        disabled={page === 0}
        onClick={() => {
          window.location.href = `${HeaderLinkPathMapping["NCE"]}/${book}/${PreviousCourse.id}`;
        }}
      >
        P{renderName(PreviousCourse?.name)}
      </RenderButton>
      <RenderButton
        disabled={page === courses.length - 1}
        onClick={() => {
          window.location.href = `${HeaderLinkPathMapping["NCE"]}/${book}/${NextCourse.id}`;
        }}
      >
        N{renderName(NextCourse?.name)}
      </RenderButton>
    </div>
  );
}
