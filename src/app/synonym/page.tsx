import { readSynonymDir } from "@/lib/synonym";
import Subhead from "@/components/Subhead";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Lexical() {
  const wordFiles = await readSynonymDir();
  console.log(wordFiles);
  return (
    <>
      <Subhead>Synonym List</Subhead>
      {wordFiles.map((filename) => {
        const name = filename.replaceAll(".", " & ");
        return (
          <Link key={filename} href={`/synonym/${filename}`}>
            <Button asChild variant="secondary" className="mr-4 mb-4">
              <span>{name}</span>
            </Button>
          </Link>
        );
      })}
    </>
  );
}
