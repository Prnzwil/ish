import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import { FAQ, IMG, PROCESS, SERVICES, TESTIMONIALS, WHY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Kutie's Beauty Lounge — Where Beauty Meets Confidence",
  description:
    "Oshawa's boutique hair and beauty salon. Expert styling, custom colour, bridal services, and a complete beauty experience.",
};

const INSTA_IMAGES = [IMG.g1, IMG.g3, IMG.g5, IMG.g7, IMG.g11, IMG.g8];
const MARQUEE_ITEMS = [
  "Hair Styling",
  "Custom Colour",
  "Bridal Suite",
  "Hand-Tied Extensions",
  "Bond Repair",
  "Brows & Lashes",
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url(${IMG.heroSalon})` }}
        ></div>
        <div className="hero-inner">
          <div
            className="eyebrow"
            style={{ color: "var(--blush)", marginBottom: 28 }}
          >
            ✦ Lagos' Hair &amp; Beauty Lounge ✦
          </div>
          <h1>
            Where Beauty<br />
            Meets <em>Confidence</em>
          </h1>
          <p className="hero-sub">
            Transform your look with expert hair styling, beauty treatments, and personalized care designed around you.
          </p>
          <div className="hero-buttons">
            <Link href="/booking" className="btn btn-primary">
              Book Appointment
            </Link>
            <a href="tel:+2348124416681" className="btn btn-secondary">
              Call Now
            </a>
          </div>
        </div>
        <div className="hero-meta">
          <div className="hero-rating">
            <span className="stars" style={{ color: "var(--gold)" }}>
              ★★★★★
            </span>{" "}
            <span>4.9 · 33 Reviews</span>
          </div>
          <div className="scroll-cue">
            <span>Scroll</span>
            <span className="scroll-cue-line"></span>
          </div>
          <div style={{ textAlign: "right" }}>
            8 Ajayi Aina Street, Ifako<br />
            Gbagada, Lagos
          </div>
        </div>
      </section>

      <div className="shell-wide" style={{ paddingTop: 30 }}>
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Our Signature Services</span>
              <h2>
                A complete experience,<br />
                designed around <em className="serif-i">you</em>.
              </h2>
              <p>
                From a single blowout to a full transformation — every service is crafted with detail, care, and the kind of attention you'd expect at a five-star suite.
              </p>
            </div>
          </Reveal>
          <div className="service-grid">
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 0.1}>
                <Link
                  href={`/services#${s.id}`}
                  className="service-card"
                  style={{ display: "block", color: "inherit" }}
                >
                  <div className="service-card-img">
                    <div
                      className="sc-img-inner"
                      style={{ backgroundImage: `url(${s.img})` }}
                    ></div>
                  </div>
                  <div className="service-card-body">
                    <span className="eyebrow eyebrow-dark">{s.label}</span>
                    <h3 style={{ marginTop: 10 }}>{s.name}</h3>
                    <p>{s.desc}</p>
                    <div className="sc-meta">
                      <span>From {s.from}</span>
                      <span className="sc-arrow">→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="shell-wide">
          <Reveal>
            <div className="why">
              <div
                className="why-image"
                style={{ backgroundImage: `url(${IMG.salonInterior})` }}
              ></div>
              <div>
                <span className="eyebrow">Why Kutie</span>
                <h2 style={{ marginTop: 18 }}>
                  The little details<br />
                  you can <em className="serif-i">feel</em>.
                </h2>
                <p
                  style={{
                    color: "var(--soft-brown)",
                    marginTop: 18,
                    maxWidth: 460,
                  }}
                >
                  A philosophy of slow craft, premium product, and a chair that always feels like the best seat in the room.
                </p>
                <div className="why-list">
                  {WHY.map((w, i) => (
                    <div key={w.t} className="why-item">
                      <span className="why-num">0{i + 1}</span>
                      <div>
                        <h4>{w.t}</h4>
                        <p>{w.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 24,
                marginBottom: 48,
              }}
            >
              <div>
                <span className="eyebrow">Looks We Love</span>
                <h2 style={{ marginTop: 14 }}>
                  Transformations<br />
                  <em className="serif-i">in our chair.</em>
                </h2>
              </div>
              <Link href="/gallery" className="btn btn-secondary">
                View Full Gallery
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="gallery-strip">
              <div
                className="g-tile tall"
                data-label="Bridal"
                style={{ backgroundImage: `url(${IMG.g2})` }}
              ></div>
              <div
                className="g-tile"
                data-label="Colour"
                style={{ backgroundImage: `url(${IMG.g11})` }}
              ></div>
              <div
                className="g-tile"
                data-label="Cut"
                style={{ backgroundImage: `url(${IMG.g3})` }}
              ></div>
              <div
                className="g-tile tall"
                data-label="Style"
                style={{ backgroundImage: `url(${IMG.g1})` }}
              ></div>
              <div
                className="g-tile"
                data-label="Treatment"
                style={{ backgroundImage: `url(${IMG.g7})` }}
              ></div>
              <div
                className="g-tile"
                data-label="Beauty"
                style={{ backgroundImage: `url(${IMG.g6})` }}
              ></div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-64">
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <span className="eyebrow">Before &amp; After</span>
              </div>
              <div className="ba-frame">
                <div
                  className="ba-half"
                  data-label="Before"
                  style={{ backgroundImage: `url(${IMG.before})` }}
                ></div>
                <div
                  className="ba-half"
                  data-label="After"
                  style={{ backgroundImage: `url(${IMG.after})` }}
                ></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div className="testimonial-wrap">
              <div className="testimonial-top">
                <div>
                  <span className="eyebrow">Loved By Clients</span>
                  <h2 style={{ marginTop: 14 }}>
                    33+ five-star reviews<br />
                    <em className="serif-i">and counting.</em>
                  </h2>
                </div>
                <div className="rating-big">
                  <div className="num">4.9</div>
                  <span className="stars" style={{ color: "var(--gold)" }}>
                    ★★★★★
                  </span>
                  <small>Verified Google Rating</small>
                </div>
              </div>
              <div className="testimonial-rail">
                {TESTIMONIALS.map((t, i) => (
                  <Reveal key={t.name} delay={i * 0.1}>
                    <div className="tcard">
                      <span className="stars">★★★★★</span>
                      <p>&quot;{t.text}&quot;</p>
                      <footer>
                        <div className="avatar">{t.init}</div>
                        <cite>
                          {t.name}
                          <small>{t.role}</small>
                        </cite>
                      </footer>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">The Kutie Ritual</span>
              <h2>
                Five steps from<br />
                booked to <em className="serif-i">beaming.</em>
              </h2>
              <p>
                Every appointment is a thoughtful sequence — designed so the time you spend with us feels like a small reset for the day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="process">
              {PROCESS.map((p) => (
                <div key={p.t} className="p-step">
                  <div className="p-num">{p.num}</div>
                  <h4>{p.t}</h4>
                  <p>{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell-wide">
          <Reveal>
            <div className="faq">
              <div>
                <span className="eyebrow">Questions, Answered</span>
                <h2 style={{ marginTop: 18 }}>
                  Good to <em className="serif-i">know.</em>
                </h2>
                <p
                  style={{
                    color: "var(--soft-brown)",
                    marginTop: 18,
                    maxWidth: 320,
                  }}
                >
                  Anything we haven&apos;t covered? Reach us at{" "}
                  <a
                    href="tel:+2348124416681"
                    style={{
                      borderBottom: "1px solid var(--rose-gold)",
                      color: "var(--rose-gold)",
                    }}
                  >
                    +234 812 441 6681
                  </a>
                  .
                </p>
              </div>
              <Faq items={FAQ} />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />

      <section className="section-tight">
        <div className="shell-wide">
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 28,
              }}
            >
              <div>
                <span className="eyebrow">@kutiebeauty</span>
                <h2
                  style={{
                    marginTop: 12,
                    fontSize: "clamp(28px, 3vw, 44px)",
                  }}
                >
                  Follow our daily <em className="serif-i">looks</em>.
                </h2>
              </div>
              <a href="#" className="btn-ghost">
                Visit Instagram →
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="insta-strip">
              {INSTA_IMAGES.map((src, i) => (
                <a
                  key={i}
                  className="ig"
                  href="#"
                  style={{ backgroundImage: `url(${src})` }}
                ></a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
