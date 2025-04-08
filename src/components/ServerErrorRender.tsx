import React, { type PropsWithChildren } from "react";

export default function ServerErrorRender({ children }: PropsWithChildren) {
  return (
    <div className="text-center text-red-500">
      <p className="text-2xl my-8">Sorry, Something went wrong!</p>
      <div>{children}</div>
    </div>
  );
}
