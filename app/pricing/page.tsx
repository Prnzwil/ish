import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { PRICING, SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing — Ish Hair & Beauty Salon",
  description:
    "Three considered packages plus every service à la carte. No surprises at the chair — pricing always confirmed during consultation.",
};

export default function PricingPage() {
  return (
    <>
      <PageHead
        crumbs="Pricing"
        title="Considered <em>pricing.</em>"
        sub="Three carefully built packages, or every service à la carte. No surprises at the chair — your consultation always confirms pricing first."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <div className="pricing-grid">
            {PRICING.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <div className={`price-card ${p.featured ? "featured" : ""}`}>
                  {p.featured && <div className="ribbon">Most Loved</div>}
                  <div
                    className="label"
                    style={p.featured ? { color: "var(--gold)" } : undefined}
                  >
                    {p.label}
                  </div>
                  <h3>{p.name}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="price-amt">
                    {p.price}
                    <small>{p.unit}</small>
                  </div>
                  <ul className="price-features">
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`}
                  >
                    Reserve Package
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 100 }}>
              <div className="section-head" style={{ marginBottom: 40 }}>
                <span className="eyebrow">À La Carte</span>
                <h2 style={{ marginTop: 14 }}>
                  Every service, <em className="serif-i">priced.</em>
                </h2>
              </div>
              <div
                style={{
                  background: "var(--warm-white)",
                  borderRadius: "var(--radius-lg)",
                  padding: 50,
                  border: "1px solid var(--line-soft)",
                }}
              >
                {SERVICES.map((s, i) => (
                  <div
                    key={s.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto",
                      gap: 24,
                      alignItems: "center",
                      padding: "26px 0",
                      borderBottom:
                        i < SERVICES.length - 1
                          ? "1px solid var(--line-soft)"
                          : "none",
                    }}
                  >
                    <div>
                      <div className="eyebrow eyebrow-dark" style={{ marginBottom: 6 }}>
                        {s.label}
                      </div>
                      <h3 style={{ fontSize: 26 }}>{s.name}</h3>
                      <p style={{ color: "var(--soft-brown)", fontSize: 14, marginTop: 4 }}>
                        {s.desc}
                      </p>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--display)",
                        fontStyle: "italic",
                        color: "var(--soft-brown)",
                      }}
                    >
                      {s.duration}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--display)",
                        fontSize: 28,
                        color: "var(--rose-gold)",
                      }}
                    >
                      {s.from}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
