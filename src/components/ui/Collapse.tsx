"use client";

import React, { useCallback, useState, type PropsWithChildren } from "react";
import Card from "./Card";

interface CollapseProps extends ComponentCssProps {
  title: React.ReactNode;
}

export default function Collapse({
  title,
  ...props
}: PropsWithChildren<CollapseProps>) {
  const [collapse, setCollapse] = useState(false);

  const handleClick = useCallback(() => {
    setCollapse((prev) => !prev);
  }, []);

  return (
    <Card style={{ padding: 0, ...props.style }}>
      {/* header */}
      <div
        className={`px-4 py-2 font-bold uppercase ${
          collapse ? "border-none" : "border-b-1 "
        }`}
        onClick={handleClick}
      >
        {title}
      </div>

      {/* body */}
      <div
        className={`overflow-auto max-h-96 px-4 transition-all duration-300 ${
          collapse ? "h-0 py-0" : "h-fit py-2 "
        }`}
      >
        {props.children}
      </div>
    </Card>
  );
}
