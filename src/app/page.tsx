"use client";

import { useRouter } from "next/navigation";
import { LexicalComp, NewConceptComp, Phonetic } from "../components";
import { Subhead } from "../components/ui";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }}
      >
        Show Toast
      </Button>

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
