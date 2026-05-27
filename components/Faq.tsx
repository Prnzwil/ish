"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/data";

type Props = {
  items: readonly FaqItem[];
};

export default function Faq({ items }: Props) {
  const [open, setOpen] = useState<number>(0);
  return (
    <div className="faq-list">
      {items.map((f, i) => {
        const expanded = open === i;
        return (
          <div
            key={f.q}
            className={`faq-item ${expanded ? "open" : ""}`}
            onClick={() => setOpen(expanded ? -1 : i)}
          >
            <div className="faq-q">
              <span>{f.q}</span>
              <span className="faq-toggle">+</span>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        );
      })}
    </div>
  );
}
