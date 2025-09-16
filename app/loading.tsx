import Loading from "@/components/svg/Loading";
import React from "react";

export default function pending() {
  return (
    <div className="res-box max-w-3xl">
      <div className="text-muted text-center mt-4">资源加载中，请稍候~~~</div>
      <Loading />
    </div>
  );
}
