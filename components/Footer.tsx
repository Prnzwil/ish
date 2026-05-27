import Link from "next/link";
import { HOURS, NAV_LINKS, SERVICES } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="shell-wide">
        <div className="footer-grid">
          <div>
            <span className="brand-mark">
              Ish <span className="amp">&amp;</span> Co.
            </span>
            <p style={{ marginTop: 18, color: "rgba(251,247,241,0.65)", maxWidth: 340 }}>
              A luxury hair and beauty salon in Oshawa — where every guest leaves looking and feeling their absolute best.
            </p>
            <div className="socials" style={{ marginTop: 26 }}>
              {["Ig", "Fb", "Tt", "Pn"].map((s) => (
                <a key={s} href="#" aria-label={s}>
                  <span style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 14 }}>{s}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <Link key={s.id} href="/services">
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <h4>Visit</h4>
            <p style={{ color: "rgba(251,247,241,0.7)", fontSize: 14, marginBottom: 18 }}>
              1808 Grandview St N
              <br />
              Oshawa, ON L1K 0Y2
              <br />
              <a href="tel:6479609764" style={{ padding: 0, color: "var(--gold)", fontSize: 14 }}>
                (647) 960-9764
              </a>
            </p>
            <h4 style={{ marginTop: 30 }}>Hours</h4>
            {HOURS.map(([d, h]) => (
              <div
                key={d}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 13,
                  padding: "4px 0",
                  color: "rgba(251,247,241,0.7)",
                }}
              >
                <span>{d}</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <span>© {year} Ish Hair &amp; Beauty Salon. All rights reserved.</span>
          <span style={{ fontFamily: "var(--display)", fontStyle: "italic", color: "var(--gold)" }}>
            Crafted with care in Oshawa, Ontario.
          </span>
        </div>
      </div>
    </footer>
  );
}
