import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { IMG, TEAM } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Team — Ish Hair & Beauty Salon",
  description:
    "Meet the four specialists who bring the Ish standard to every chair — precision cutting, dimensional colour, bridal, and beauty.",
};

export default function TeamPage() {
  return (
    <>
      <PageHead
        crumbs="The Team"
        title="Meet the <em>stylists.</em>"
        sub="Four specialists, one shared standard. Every member of the Ish team brings years of training and an eye for the kind of detail you notice the moment you sit in the chair."
      />
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="shell-wide">
          <div className="team-grid">
            {TEAM.map((t, i) => (
              <Reveal key={t.name} delay={(i % 4) * 0.08}>
                <article className="team-card">
                  <div className="team-img">
                    <div
                      className="team-img-inner"
                      style={{ backgroundImage: `url(${t.img})` }}
                    ></div>
                  </div>
                  <div className="team-body">
                    <div className="role">{t.role}</div>
                    <h3>{t.name}</h3>
                    <p>{t.bio}</p>
                    <div className="spec">— {t.spec}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div
              style={{
                background: "var(--cream-deep)",
                borderRadius: "var(--radius-lg)",
                padding: "70px 60px",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                alignItems: "center",
              }}
              className="join-block"
            >
              <div>
                <span className="eyebrow">Join Our Team</span>
                <h2 style={{ marginTop: 14 }}>
                  Are you a stylist<br />
                  with a <em className="serif-i">discerning</em> eye?
                </h2>
                <p
                  style={{
                    color: "var(--soft-brown)",
                    marginTop: 18,
                    fontSize: 16,
                    lineHeight: 1.7,
                    maxWidth: 480,
                  }}
                >
                  We're always interested in meeting talented stylists, colourists, and beauty professionals who share our standards. Send us your portfolio.
                </p>
                <div style={{ marginTop: 28 }}>
                  <Link href="/contact" className="btn btn-primary">
                    Get In Touch
                  </Link>
                </div>
              </div>
              <div
                style={{
                  height: 340,
                  backgroundImage: `url(${IMG.products})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "var(--radius-md)",
                }}
              ></div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
