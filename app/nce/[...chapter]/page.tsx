import React from "react";
import { books } from "@/lib/books";
import RenderPagination from "./RenderPagination";
import RenderCourse from "./RenderCourse";
import AudioCtx, { AudioTrigger } from "@/context/AudioCtx";
import ServerErrorRender from "@/components/ServerErrorRender";
import PreviewCourse from "./PreviewCourse";
import type { NewConceptBookKey } from "@/lib/utils";

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
    return (
      <div className="res-box max-w-5xl">
        {/* text */}
        <AudioCtx paths={[course.audio]}>
          <div className="flex items-center text-primary">
            <AudioTrigger path={course.audio} />
            <span className="ml-2">{course.name}</span>
          </div>
          <RenderCourse lesson={course} />
        </AudioCtx>

        {/* notes */}
        {course?.notes?.length > 0 && (
          <>
            <h2 className="text-primary-500">Notes on the text</h2>
            {course.notes.map((value, index) => (
              <ul key={index} className="list-disc pl-4">
                <li>
                  <div dangerouslySetInnerHTML={{ __html: value }} />
                </li>
              </ul>
            ))}
          </>
        )}

        {/* pagination */}
        <RenderPagination
          page={courseIndex}
          book={book as NewConceptBookKey}
          courses={courses}
        />
      </div>
    );
  } catch (error) {
    return <ServerErrorRender error={error} />;
  }
}
