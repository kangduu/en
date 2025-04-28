import React from "react";
import IssuePage from "./issues";

interface WordProps {
  params: Promise<{ label: string }>;
}

export default async function Word({ params }: WordProps) {
  const { label } = await params;
  return <IssuePage label={label} />;
}
