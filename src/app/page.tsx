"use client";
import { Link } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="w-1/2 m-auto mt-4 bg-amber-100 px-4 py-4 rounded">
      <div className="w-full mb-4 flex gap-4">
        <Link href="/about">About</Link>
        <Link href="/report">Report</Link>
      </div>
    </div>
  );
}
