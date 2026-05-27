import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { IMG, VALUES } from "@/lib/data";

export const metadata: Metadata = {
  title: "About — Ish Hair & Beauty Salon",
  description:
    "The story of Ish — a boutique hair and beauty salon in Oshawa where every visit is an hour belonging entirely to you.",
};

const STATS = [
  { n: "12", e: "+", l: "Years of Craft" },
  { n: "33", e: "★", l: "Five-Star Reviews" },
  { n: "4.9", e: "", l: "Average Rating" },
  { n: "300", e: "+", l: "Bridal Clients" },
];

export default function AboutPage() {
  return (
    <>
      <PageHead
        crumbs="About"
        title="Beauty, with <em>intention.</em>"
        sub="Ish is a boutique salon born out of one belief — that great hair is a quiet kind of confidence, and that you deserve a space that takes it seriously."
        bg={IMG.salonInterior}
      />
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="shell-wide">
          <Reveal>
            <div className="about-grid">
              <div className="about-img" style={{ backgroundImage: `url(${IMG.detail})` }}></div>
              <div>
                <span className="eyebrow">Our Story</span>
                <h2 style={{ marginTop: 14 }}>
                  A boutique salon<br />
                  for <em className="serif-i">every chapter</em>.
                </h2>
                <p style={{ color: "var(--soft-brown)", marginTop: 20, fontSize: 17, lineHeight: 1.7 }}>
                  Ish was founded with a singular idea: that a salon visit should feel less like an errand and more like an hour belonging entirely to you. From the moment you walk through our door in Oshawa, you're greeted by warm light, considered design, and a team that listens before they style.
                </p>
                <p style={{ color: "var(--soft-brown)", marginTop: 18, fontSize: 17, lineHeight: 1.7 }}>
                  We've been a small team since the beginning — by design. It lets us know our regulars by name, remember the products you love, and craft a service that actually feels personal.
                </p>
              </div>
            </div>
          </Reveal>
          <div className="stat-row">
            {STATS.map((s, i) => (
              <Reveal key={s.l} delay={i * 0.08}>
                <div className="stat">
                  <div className="num">
                    {s.n}
                    <em>{s.e}</em>
                  </div>
                  <div className="lbl">{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 60 }}>
        <div className="shell-wide">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="mission-grid">
            <Reveal>
              <div style={{ background: "var(--blush)", padding: 60, borderRadius: "var(--radius-lg)", height: "100%" }}>
                <span className="eyebrow">Our Mission</span>
                <h3 style={{ marginTop: 18, fontFamily: "var(--display)", fontSize: 38, fontWeight: 400, lineHeight: 1.15 }}>
                  Helping clients look and <em className="serif-i">feel</em> their absolute best.
                </h3>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div style={{ background: "var(--cream-deep)", padding: 60, borderRadius: "var(--radius-lg)", height: "100%" }}>
                <span className="eyebrow">Our Vision</span>
                <h3 style={{ marginTop: 18, fontFamily: "var(--display)", fontSize: 38, fontWeight: 400, lineHeight: 1.15 }}>
                  Exceptional beauty experiences delivered with <em className="serif-i">care</em>.
                </h3>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">What We Live By</span>
              <h2>
                Five values, kept <em className="serif-i">close</em>.
              </h2>
            </div>
          </Reveal>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.06}>
                <div className="value-card">
                  <div className="num">0{i + 1}</div>
                  <h4>{v.t}</h4>
                  <p>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
