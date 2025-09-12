"use client";

import { SearchKit } from "@/components/search";
import Subhead from "@/components/Subhead";
import Empty from "@/components/svg/Empty";
import RenderTarget from "./RenderTarget";

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
    <Subhead
      extra={
        <SearchKit
          onSubmit={handleSearch}
          // buttonProps={{ variant: "link" }}
        />
      }
    >
      Synonymous
    </Subhead>
  );
}
