import React from "react";

export default function GridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}
