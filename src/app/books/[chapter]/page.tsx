import React from "react";
import { books, type Course } from "@/src/db/books";
import type { NewConceptBookKey } from "@/src/utils/constant";

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
  params: { chapter: string };
}
export default async function Book({ params }: BookProps) {
  try {
    const course = await books[params.chapter as NewConceptBookKey]()
      .then((res) => res)
      .catch(() => []);

    return course.map(({ name, id, course }) => {
      return (
        <div key={id}>
          <h2 key={id} className="font-bold text-2xl mb-8">
            {name}
          </h2>
          <RenderCourse course={course} />
        </div>
      );
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
