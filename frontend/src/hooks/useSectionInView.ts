"use client";

import { useEffect, useState } from "react";

export function useSectionInView(sectionId: string, minRatio = 0.2) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(
          entry.isIntersecting && entry.intersectionRatio >= minRatio,
        );
      },
      { threshold: [0, minRatio, 0.4, 0.6] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionId, minRatio]);

  return inView;
}
