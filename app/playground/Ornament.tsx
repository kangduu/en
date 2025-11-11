import React from "react";

/**
 * 装饰元素
 * @returns
 */
export default function Ornament() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-1">
      <div className="absolute -top-10 -right-10 w-62 h-62 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#8B5CF6]/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-2/5 w-72 h-72  bg-[#10B981]/20 rounded-full blur-3xl"></div>
    </div>
  );
}
