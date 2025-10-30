import { getSynonymDir } from "@/lib/synonyms";
import SearchSynonym from "./Search";
import RenderTarget from "./RenderTarget";

export default async function Synonymous() {
  const wordFiles = await getSynonymDir();
  return (
    <div className="res-box">
      <SearchSynonym list={wordFiles} />
      <div className="flex flex-wrap justify-center items-center gap-4">
        {wordFiles.map((filename) => {
          const name = filename.replaceAll(".", " & ");
          return <RenderTarget key={filename} name={name} path={filename} />;
        })}
      </div>
    </div>
  );
}
