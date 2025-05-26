import type { Synonym } from "@/lib/actions";
import React from "react";
import RenderTitle from "./RenderTitle";
import { Separator } from "@/components/ui/separator";
interface CommonErrorsProps {
  errors: Synonym["common_errors"];
}
export default function CommonErrors({ errors }: CommonErrorsProps) {
  return (
    <>
      <RenderTitle className="mt-6 text-center">Common Errors</RenderTitle>
      <Separator />
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
