"use client";

import Image from "next/image";
import { useState } from "react";
import { GALLERY_CATS, GALLERY_ITEMS } from "@/lib/data";

export default function GalleryFilter() {
  const [cat, setCat] = useState<string>("All");
  const items = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === cat);
  return (
    <>
      <div className="gallery-filters">
        {GALLERY_CATS.map((c) => (
          <button
            key={c}
            type="button"
            className={`g-filter ${cat === c ? "active" : ""}`}
            onClick={() => setCat(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="gallery-masonry">
        {items.map((g, i) => (
          <div key={`${g.src}-${i}`} className="gm-item" data-cat={g.cat}>
            <Image
              src={g.src}
              alt={g.cat}
              width={1000}
              height={1250}
              sizes="(max-width: 600px) 100vw, (max-width: 980px) 50vw, 33vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
