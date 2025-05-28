import Subhead from "@/components/Subhead";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSynonymDir } from "@/lib/actions";
import SearchDialog from "@/components/SearchDialog";

export default async function Synonymous() {
  const wordFiles = await getSynonymDir();
  return (
    <>
      <Subhead extra={<SearchDialog />}>Synonymous</Subhead>
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
