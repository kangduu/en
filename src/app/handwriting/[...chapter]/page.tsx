import React from "react";
import { books } from "@/src/db/books";
import type { NewConceptBookKey } from "@/src/utils/constant";
import ServerErrorRender from "@/src/components/ServerErrorRender";
import RenderPagination from "./RenderPagination";
import RenderCourse from "./RenderCourse";
import WithAudioCtx from "./WithAudioCtx";
import RenderCourseName from "./RenderCourseName";

interface BookProps {
  params: Promise<{ chapter: string[] }>;
}

export default async function Book({ params }: BookProps) {
  try {
    const { chapter } = await params;

    const [book, id] = chapter;
    if (!id) throw new Error("Course id not found");

    const ActiveBook = books[book as NewConceptBookKey];
    if (typeof ActiveBook !== "function") throw new Error("Book not found");

    const courses = await ActiveBook()
      .then((res) => res)
      .catch(() => []);

    const courseIndex = courses.findIndex((item) => item.id === Number(id));
    if (courseIndex === -1) throw new Error("Course not found");

    const course = courses[courseIndex];
    return (
      <>
        <WithAudioCtx path={course.audio}>
          <RenderCourseName name={course.name} />
          <RenderCourse lesson={course} />
        </WithAudioCtx>
        <RenderPagination
          page={courseIndex}
          book={book as NewConceptBookKey}
          courses={courses}
        />
      </>
    );
  } catch (error) {
    return <ServerErrorRender error={error} />;
  }
}
