import React from "react";

export default function Subhead({ children }: { children: React.ReactNode }) {
  return <h2 className=" mt-4 my-2 uppercase text-blue-400">{children}</h2>;
}
