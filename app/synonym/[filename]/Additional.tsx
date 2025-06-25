import Empty from "@/components/svg/Empty";
import { Separator } from "@/components/ui/separator";
import type { Synonym } from "@/lib/actions";
import React from "react";

function transform(key: string, uppercase: boolean = true): string {
  if (uppercase)
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  return key.replace(/_/g, " ");
}

function RenderObjectValue({
  value,
}: {
  value: Record<string, string | number | boolean>;
}) {
  return Object.entries(value).map(([subKey, subValue], subIndex) => (
    <div key={subIndex} className="ml-4">
      <span className="font-medium mr-4">{transform(subKey, false)}:</span>
      <span> {subValue}</span>
    </div>
  ));
}

function RenderArrayValue({
  value,
}: {
  value: string[] | number[] | boolean[];
}) {
  return (
    <ul className="list-disc pl-5">
      {value.map((item, index) => (
        <li key={index} className="text-sm  ">
          {item.toString()}
        </li>
      ))}
    </ul>
  );
}

interface AdditionalProps {
  notes?: Synonym["additional_notes"];
}

export default function Additional({ notes }: AdditionalProps) {
  const { extended_words, ...rest } = notes || {};
  const hasExtended = !!extended_words?.length;
  return (
    <>
      <Separator title="Additional Notes" className="mt-8" />
      {hasExtended && (
        <>
          <div className="font-medium">Extended Words</div>
          <ul className="list-disc pl-5">
            {extended_words.map((word, index) => (
              <li key={index} className="text-sm">
                {word}
              </li>
            ))}
          </ul>
        </>
      )}

      {Object.keys(rest).length > 0 && (
        <div className="mt-5">
          {Object.entries(rest).map(([key, value], index) => {
            return (
              <div key={index} className="mb-2">
                <span className="font-medium">{transform(key)}</span>

                {typeof value === "string" && <div> {value}</div>}

                {Array.isArray(value) && value.length > 0 ? (
                  <RenderArrayValue value={value} />
                ) : (
                  typeof value === "object" &&
                  value !== null && (
                    <RenderObjectValue
                      value={value as Record<string, string | number | boolean>}
                    />
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
