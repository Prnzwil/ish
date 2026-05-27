"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="shell-wide nav-inner">
          <Link href="/" className="brand">
            <span className="brand-mark">
              Ish <span className="amp">&amp;</span> Co.
            </span>
          </Link>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname === l.href ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="nav-cta">
            <a href="tel:6479609764" className="nav-phone">
              <span className="nav-phone-i">✦</span> (647) 960-9764
            </a>
            <Link href="/booking" className="btn btn-primary">
              Book Now
            </Link>
            <button
              type="button"
              className="menu-btn"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <span></span>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button
          type="button"
          className="mm-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ×
        </button>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
