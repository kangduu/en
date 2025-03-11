import React, { type PropsWithChildren } from "react";

function SquareBox({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <div className="w-full h-0 pt-[100%] mt-4 relative"></div>
      <div className="w-full h-full bg-red-50 absolute top-0 left-0 z-10">
        {children}
      </div>
    </div>
  );
}
export default SquareBox;
