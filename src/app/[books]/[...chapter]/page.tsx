import React from "react";
import { books, type Course } from "@/src/db/books";
import type { NewConceptBookKey } from "@/src/utils/constant";
import ServerErrorRender from "@/src/components/ServerErrorRender";

function RenderCourse({ course }: Pick<Course, "course">) {
  return (
    <div className="text-center">
      {course.map((item, index) => {
        return <p key={index}>{item}</p>;
      })}
    </div>
  );
}

interface BookProps {
  params: Promise<{ chapter: string[] }>;
}
export default async function Book({ params }: BookProps) {
  try {
    const { chapter } = await params;
    const [book, id] = chapter;
    const ActiveBook = books[book as NewConceptBookKey];
    if (!ActiveBook) throw new Error("Book not found");
    const courses = await ActiveBook()
      .then((res) => res)
      .catch(() => []);

    const renderName = (name: string) => {
      return (
        <h2 key={id} className="font-bold text-2xl mb-8">
          {name}
        </h2>
      );
    };

    if (id) {
      const course = courses.find((item) => item.id === Number(id));
      if (!course) throw new Error("Course not found");
      return (
        <>
          {renderName(course.name)}
          <RenderCourse course={course.course} />
        </>
      );
    }

    return courses.map(({ name, id, course }) => {
      return (
        <div key={id}>
          {renderName(name)}
          <RenderCourse course={course} />
        </div>
      );
    });
  } catch (error) {
    return (
      <ServerErrorRender>
        {(error as { message: string }).message}
      </ServerErrorRender>
    );
  }
}
