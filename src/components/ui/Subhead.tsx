import React from "react";

export default function Subhead({ children }: { children: React.ReactNode }) {
  return <h2 className="my-4 uppercase text-primary-500">{children}</h2>;
}
