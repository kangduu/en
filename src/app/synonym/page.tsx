import Subhead from "@/components/Subhead";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSynonymDir } from "@/lib/actions";

export default async function Lexical() {
  const wordFiles = await getSynonymDir();
  return (
    <>
      <Subhead>Synonymous</Subhead>
      <div className="flex flex-wrap justify-center items-center gap-4">
        {wordFiles.map((filename) => {
          const name = filename.replaceAll(".", " & ");
          return (
            <Link key={filename} href={`/synonym/${filename}`}>
              <Button
                asChild
                variant="secondary"
                className="whitespace-break-spaces h-fit"
              >
                <span>{name}</span>
              </Button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
