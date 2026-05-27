"use client";

import { useEffect } from "react";

export default function PrintAutoFire() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }
      } catch {
        // ignore — print anyway
      }
      await new Promise((r) => setTimeout(r, 1800));
      if (!cancelled) window.print();
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
