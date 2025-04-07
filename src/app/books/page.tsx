import { NewConceptTemp } from "@/src/components";
import React from "react";

// /books
export default function page() {
  return (
    <div className="py-4">
      <NewConceptTemp showList clickable={false} />
    </div>
  );
}
