import Subhead from "@/components/Subhead";
import React from "react";

export default function PETS() {
  return (
    <div>
      <Subhead>Cambridge Assessment English</Subhead>
      <a
        href="https://bec.neea.cn/html1/folder/1507/1856-1.htm"
        target="_blank"
      >
        剑桥商务英语考试
      </a>
      <ul className="list-disc pl-4">
        <li>KET/PET/FCE的区别❓</li>
      </ul>
      <br />
      <Subhead>public english text system</Subhead>
      <a href="https://pets.neea.edu.cn/" target="_blank">
        全国英语等级考试
      </a>
    </div>
  );
}
