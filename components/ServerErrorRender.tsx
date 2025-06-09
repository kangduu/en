import React, { type PropsWithChildren } from "react";

export default function ServerErrorRender({
  children,
  error,
}: PropsWithChildren<{ error?: unknown }>) {
  return (
    <div className="text-center text-red-500">
      <p className="text-2xl my-8">Sorry, Something went wrong!</p>
      <div>{(error as { message: string })?.message || children}</div>
    </div>
  );
}
