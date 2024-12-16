"use client";
import { Link, Button } from "@nextui-org/react";

export default function Home() {
  return (
    <div className="w-full p-4">
      <Button type="button" color="primary">
        <Link href="/result" className="text-white">
          History Results
        </Link>
      </Button>
    </div>
  );
}
