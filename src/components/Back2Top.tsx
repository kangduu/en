"use client";

import React, { useEffect, useState } from "react";
import styles from "./back.module.css";

export default function Back2Top() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function bindScroll() {
      // 当垂直滚动超过300px时显示按钮
      setShow(window.scrollY > 300);
    }

    window.addEventListener("scroll", bindScroll, false);
    return () => {
      window.removeEventListener("scroll", bindScroll, false);
    };
  }, []);

  return (
    <button
      className={`${styles.back_to_top} ${
        show ? styles.show : ""
      } rounded-full p-1 text-xl  bg-primary-100/30 hover:bg-primary-100 transition-colors-opacity fixed bottom-4 right-4 z-10 border-none`}
      onClick={() => {
        // 平滑滚动到顶部
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 可选：键盘焦点返回顶部（提升无障碍体验）
        document.body.focus();
      }}
      aria-label="BackToTop"
      role="button"
    >
      👆
    </button>
  );
}
