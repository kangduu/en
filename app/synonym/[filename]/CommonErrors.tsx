import type { Synonym } from "@/lib/synonyms";
import React from "react";
import { Separator } from "@/components/ui/separator";
interface CommonErrorsProps {
  errors: Synonym["common_errors"];
}
export default function CommonErrors({ errors }: CommonErrorsProps) {
  return (
    <>
      <Separator title="Common Errors" className="mt-8" />
      {errors.length > 0 ? (
        errors.map(({ error, correction }, index) => (
          <div key={index} className="my-4">
            <p>{error}</p>
            <p>{correction}</p>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground">
          No common errors found.
        </div>
      )}
    </>
  );
}
