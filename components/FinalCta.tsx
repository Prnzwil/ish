import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IMG } from "@/lib/data";

export default function FinalCta() {
  return (
    <section className="section">
      <div className="shell-wide">
        <Reveal>
          <div className="cta-banner">
            <div className="cta-bg" style={{ backgroundImage: `url(${IMG.salonChair})` }}></div>
            <span
              className="eyebrow"
              style={{ color: "var(--blush)", position: "relative", zIndex: 2 }}
            >
              The Chair Is Waiting
            </span>
            <h2 style={{ marginTop: 18 }}>
              Ready for your<br />
              <em>next look?</em>
            </h2>
            <div className="cta-buttons">
              <Link href="/booking" className="btn btn-primary">
                Book Appointment
              </Link>
              <a href="tel:+2348124416681" className="btn btn-secondary">
                Call Now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
