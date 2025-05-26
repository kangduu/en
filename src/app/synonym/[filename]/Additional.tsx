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
      <span className="text-gray-800 font-medium mr-4">
        {transform(subKey, false)}:
      </span>
      <span className="text-gray-700"> {subValue}</span>
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
        <li key={index} className="text-sm text-gray-700">
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
  return (
    <>
      <Separator title="Additional Notes" className="mt-8" />
      <div className="font-medium">Extended Words</div>
      {extended_words?.length ? (
        <ul className="list-disc pl-5">
          {extended_words.map((word, index) => (
            <li key={index} className="text-sm text-gray-700">
              {word}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600">No extended words available.</p>
      )}

      {Object.keys(rest).length > 0 && (
        <div className="mt-5">
          {Object.entries(rest).map(([key, value], index) => {
            return (
              <div key={index} className="mb-2">
                <span className="text-gray-800 font-medium">
                  {transform(key)}
                </span>

                {typeof value === "string" && (
                  <div className="text-gray-700"> {value}</div>
                )}

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
