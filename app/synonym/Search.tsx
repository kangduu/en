"use client";

import { SearchKit } from "@/components/search";
import Empty from "@/components/svg/Empty";
import RenderTarget from "./RenderTarget";
import { Chapter } from "@/components/kit";

const NoData = (
  <div className="w-[70%]  mx-auto">
    <Empty.search />
  </div>
);

interface SearchSynonymProps {
  list: string[];
}

export default function SearchSynonym({ list }: SearchSynonymProps) {
  const handleSearch = (searchValue: string) => {
    if (Array.isArray(list)) {
      const targets = list.filter((item) => {
        const word = item.split(".");
        return word.includes(searchValue);
      });

      if (targets.length > 0) {
        return targets.map((words) => (
          <RenderTarget path={words} key={words} />
        ));
      }

      return NoData;
    }

    return NoData;
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <Chapter title="Synonymous" />
      <SearchKit onSubmit={handleSearch} />
    </div>
  );
}
