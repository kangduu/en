"use client";

import { useRouter } from "next/navigation";
import { LexicalComp, NewConceptComp } from "../components";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1 className="my-4 uppercase text-primary-500">new concept english</h1>
      <NewConceptComp onClick={(url) => router.push(url + "/1")} />

      <h1 className="my-4 text-primary-500">Lexical</h1>
      <LexicalComp />

      {/* <h1 className="my-4">Part 3 Practices</h1> */}

      {/* <h1 className="my-4">Part 4 Exam</h1> */}
    </>
  );
}
