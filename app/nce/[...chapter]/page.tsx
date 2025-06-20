import React from "react";
import { books } from "@/lib/books";
import type { NewConceptBookKey } from "@/utils/constant";
import RenderPagination from "./RenderPagination";
import RenderCourse from "./RenderCourse";
import AudioCtx from "@/context/AudioCtx";
import RenderCourseName from "./RenderCourseName";
import ServerErrorRender from "@/components/ServerErrorRender";

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
        {/* text */}
        <AudioCtx path={course.audio}>
          <RenderCourseName name={course.name} />
          <RenderCourse lesson={course} />
        </AudioCtx>

        {/* notes */}
        {course?.notes?.length > 0 && (
          <>
            <h2 className="text-primary-500">Notes on the text</h2>
            {course.notes.map((value, index) => (
              <ul key={index} className="list-disc pl-4 wrapper">
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
      </>
    );
  } catch (error) {
    return <ServerErrorRender error={error} />;
  }
}
