import type { Metadata } from "next";
import Link from "next/link";
import FinalCta from "@/components/FinalCta";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { IMG, SERVICES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services — Kutie's Beauty Lounge",
  description:
    "The full Kutie menu: styling, colour, treatments, extensions, bridal, and beauty — every service crafted with care.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        crumbs="Services"
        title="The full <em>menu.</em>"
        sub="Every service at Kutie begins with a private consultation and a commitment to the result you actually want — not a template."
        bg={IMG.hairTreatment}
      />
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="shell-wide">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <div id={s.id} className={`svc-row ${i % 2 === 1 ? "reverse" : ""}`}>
                <div className="svc-text">
                  <div className="label">{s.label}</div>
                  <h2>{s.name}</h2>
                  <p>{s.long}</p>
                  <div className="svc-meta">
                    <div>
                      <div className="k">Duration</div>
                      <div className="v">{s.duration}</div>
                    </div>
                    <div>
                      <div className="k">Starting from</div>
                      <div className="v">{s.from}</div>
                    </div>
                  </div>
                  <ul className="svc-benefits">
                    {s.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <Link href="/booking" className="btn btn-primary">
                    Book Appointment
                  </Link>
                </div>
                <div className="svc-img" style={{ backgroundImage: `url(${s.img})` }}></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
