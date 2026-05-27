"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FloatBook() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link href="/booking" className={`float-book ${show ? "show" : ""}`}>
      <span className="float-book-dot">✦</span>
      Book Appointment
    </Link>
  );
}
