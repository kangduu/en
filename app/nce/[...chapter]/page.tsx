import React from "react";
import { books } from "@/lib/books";
import NceCourseTools from "./NceCourseTools";
import RenderCourse from "./RenderCourse";
import ServerErrorRender from "@/components/ServerErrorRender";
import PreviewCourse from "./PreviewCourse";
import { NewConceptBookKeys, type NewConceptBookKey } from "@/lib/utils";
import { getPostBySlug } from "@/lib/markdown";
import AudioCtx from "@/context/AudioCtx";

interface BookProps {
  params: Promise<{ chapter: string[] }>;
}

export default async function Book({ params }: BookProps) {
  try {
    const { chapter } = await params;
    const [book, id] = chapter || [];

    if (!book) throw new Error("Book id not found");

    const ActiveBook = books[book as NewConceptBookKey];
    if (typeof ActiveBook !== "function") throw new Error("Book not found");

    const courses = await ActiveBook()
      .then((res) => res)
      .catch(() => []);

    // 没有course id，则表示显示课本所有内容
    if (!id)
      return (
        <PreviewCourse courses={courses} book={book as NewConceptBookKey} />
      );

    const courseIndex = courses.findIndex((item) => item.id === Number(id));
    if (courseIndex === -1) throw new Error("Course not found");
    const course = courses[courseIndex];
    const notes = await getPostBySlug(
      `${NewConceptBookKeys.findIndex((key) => key === book) + 1}-${id.padStart(
        2,
        "0"
      )}`,
      "nce-course"
    );
    return (
      <div className="res-box max-w-5xl ">
        <h2 className="mb-8 text-center font-bold text-2xl">{course.name}</h2>
        <AudioCtx paths={[course.audio]} replay>
          {/* course */}
          <RenderCourse lesson={course} />
          {/* tools */}
          <NceCourseTools
            page={courseIndex}
            book={book as NewConceptBookKey}
            courses={courses}
            notes={notes.contentHtml}
          />
        </AudioCtx>
      </div>
    );
  } catch (error) {
    return <ServerErrorRender error={error} />;
  }
}
