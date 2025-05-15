"use client";

import { useRouter } from "next/navigation";
import { LexicalComp, NewConceptComp, Phonetic } from "../components";
import { Subhead } from "../components/ui";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Subhead>new concept english</Subhead>
      <NewConceptComp onClick={(url) => router.push(url + "/1")} />

      <Subhead>Lexical</Subhead>
      <LexicalComp />

      <Subhead>phonetic</Subhead>
      <Phonetic />

      {/* <h1 className="my-4">Part 3 Practices</h1> */}

      {/* <h1 className="my-4">Part 4 Exam</h1> */}
    </>
  );
}
