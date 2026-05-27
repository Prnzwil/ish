import type { Metadata } from "next";
import AboutPage from "@/app/about/page";
import BlogPage from "@/app/blog/page";
import BookingPage from "@/app/booking/page";
import ContactPage from "@/app/contact/page";
import GalleryPage from "@/app/gallery/page";
import HomePage from "@/app/page";
import PricingPage from "@/app/pricing/page";
import ServicesPage from "@/app/services/page";
import TeamPage from "@/app/team/page";
import PrintAutoFire from "@/components/PrintAutoFire";

export const metadata: Metadata = {
  title: "Ish Hair & Beauty Salon — Print Edition",
  description: "Print edition of the Ish Hair & Beauty Salon website.",
};

const PRINT_STYLES = `
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
  .scroll-cue, .menu-btn, .mobile-menu { display: none !important; }
  .hero { min-height: auto; padding: 80px 0 100px; }
  .hero-meta { position: static; padding: 30px 40px 0; color: var(--charcoal); }
  .hero-rating, .hero-meta > div { color: var(--charcoal); }
  .page-head { padding: 80px 0 60px; }
  .section { padding: 60px 0; }
  .section-tight { padding: 40px 0; }
  .print-page { page-break-after: always; break-after: page; padding-top: 60px; }
  .print-page:last-child { page-break-after: auto; break-after: auto; }
  .service-card, .team-card, .price-card, .blog-card, .tcard, .ci-card,
  .value-card, .why-item, .p-step, .faq-item, .svc-row {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  body, .hero, .hero-bg, .cta-bg, .testimonial-wrap, .footer, .price-card.featured,
  .booking-summary, .service-card-img, .sc-img-inner, .g-tile, .ba-half,
  .team-img, .team-img-inner, .svc-img, .about-img, .why-image, .blog-img,
  .insta-strip .ig, .map-wrap, .cta-banner {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  .page-divider {
    text-align: center;
    padding: 28px 0;
    font-family: var(--display);
    font-style: italic;
    color: var(--rose-gold);
    font-size: 18px;
    letter-spacing: 0.18em;
  }
  .page-divider span { display: inline-block; padding: 0 24px; position: relative; }
  .page-divider span::before,
  .page-divider span::after {
    content: "";
    position: absolute;
    top: 50%;
    width: 80px;
    height: 1px;
    background: var(--rose-gold);
  }
  .page-divider span::before { right: 100%; }
  .page-divider span::after { left: 100%; }
  @page { size: A4 portrait; margin: 0; }
  @media print { .section { padding: 40px 0; } }
`;

const PAGES = [
  { id: "home", label: "Home", C: HomePage },
  { id: "about", label: "About", C: AboutPage },
  { id: "services", label: "Services", C: ServicesPage },
  { id: "team", label: "The Team", C: TeamPage },
  { id: "pricing", label: "Pricing", C: PricingPage },
  { id: "gallery", label: "Gallery", C: GalleryPage },
  { id: "booking", label: "Booking", C: BookingPage },
  { id: "blog", label: "The Ish Journal", C: BlogPage },
  { id: "contact", label: "Contact", C: ContactPage },
] as const;

export default function PrintBook() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />
      <div>
        {PAGES.map((p, i) => (
          <div key={p.id}>
            {i > 0 && (
              <div className="page-divider">
                <span>✦ {p.label} ✦</span>
              </div>
            )}
            <section className="print-page" id={`print-${p.id}`}>
              <p.C />
            </section>
          </div>
        ))}
      </div>
      <PrintAutoFire />
    </>
  );
}
