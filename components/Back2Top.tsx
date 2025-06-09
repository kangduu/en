"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./back.module.css";
import { throttle } from "lodash";
import { Button } from "@/components/ui/button";

export default function Back2Top() {
  const [show, setShow] = useState(false);
  const ProgressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // back to top
    function bindScroll() {
      setShow(window.scrollY > 300);
    }

    // progress
    const bindProgress = throttle(() => {
      try {
        const winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        const progress = ProgressRef.current;
        if (progress) progress.style.width = scrolled + "%";
      } catch (error) {
        console.log(error);
      }
    }, 100);

    window.addEventListener("scroll", bindScroll, false);
    window.addEventListener("scroll", bindProgress, false);
    return () => {
      window.removeEventListener("scroll", bindProgress, false);
      window.removeEventListener("scroll", bindScroll, false);
    };
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={`${styles.back_to_top} ${
          show ? styles.show : ""
        } rounded-full p-1 text-xl fixed bottom-4 right-4 z-10 `}
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
      </Button>

      {/* progress */}
      <div
        ref={ProgressRef}
        className="fixed left-0 top-0 z-[100] h-1 transition-width duration-100 bg-blue-300"
      />
    </>
  );
}
