// Home page composition
const { useState: useStateH } = React;

function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${IMG.heroSalon})` }}></div>
      <div className="hero-inner">
        <div className="eyebrow" style={{ color: "var(--blush)", marginBottom: 28 }}>
          ✦ Oshawa's Boutique Hair &amp; Beauty Salon ✦
        </div>
        <h1>Where Beauty<br />Meets <em>Confidence</em></h1>
        <p className="hero-sub">
          Transform your look with expert hair styling, beauty treatments, and personalized care designed around you.
        </p>
        <div className="hero-buttons">
          <a href="#/booking" onClick={(e) => { e.preventDefault(); navigate("booking"); }} className="btn btn-primary">
            Book Appointment
          </a>
          <a href="tel:6479609764" className="btn btn-secondary">Call Now</a>
        </div>
      </div>
      <div className="hero-meta">
        <div className="hero-rating">
          <StarsRow /> <span>4.9 · 33 Reviews</span>
        </div>
        <div className="scroll-cue">
          <span>Scroll</span>
          <span className="scroll-cue-line"></span>
        </div>
        <div style={{ textAlign: "right" }}>
          1808 Grandview St N<br />Oshawa, ON
        </div>
      </div>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="section" data-screen-label="Services Overview">
      <div className="shell-wide">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">Our Signature Services</span>
            <h2>A complete experience,<br />designed around <em className="serif-i">you</em>.</h2>
            <p>From a single blowout to a full transformation — every service is crafted with detail, care, and the kind of attention you'd expect at a five-star suite.</p>
          </div>
        </Reveal>
        <div className="service-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) * 0.1}>
              <article className="service-card" onClick={() => navigate("services")}>
                <div className="service-card-img">
                  <div className="sc-img-inner" style={{ backgroundImage: `url(${s.img})` }}></div>
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
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChoose() {
  return (
    <section className="section" style={{ paddingTop: 0 }} data-screen-label="Why Choose">
      <div className="shell-wide">
        <Reveal>
          <div className="why">
            <div className="why-image" style={{ backgroundImage: `url(${IMG.salonInterior})` }}></div>
            <div>
              <span className="eyebrow">Why Ish</span>
              <h2 style={{ marginTop: 18 }}>The little details<br />you can <em className="serif-i">feel</em>.</h2>
              <p style={{ color: "var(--soft-brown)", marginTop: 18, maxWidth: 460 }}>
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
  );
}

function GalleryPreview() {
  return (
    <section className="section" data-screen-label="Gallery Preview">
      <div className="shell-wide">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
            <div>
              <span className="eyebrow">Looks We Love</span>
              <h2 style={{ marginTop: 14 }}>Transformations<br /><em className="serif-i">in our chair.</em></h2>
            </div>
            <a href="#/gallery" onClick={(e) => { e.preventDefault(); navigate("gallery"); }} className="btn btn-secondary">View Full Gallery</a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="gallery-strip">
            <div className="g-tile tall" data-label="Bridal" style={{ backgroundImage: `url(${IMG.g2})` }}></div>
            <div className="g-tile" data-label="Colour" style={{ backgroundImage: `url(${IMG.g11})` }}></div>
            <div className="g-tile" data-label="Cut" style={{ backgroundImage: `url(${IMG.g3})` }}></div>
            <div className="g-tile tall" data-label="Style" style={{ backgroundImage: `url(${IMG.g1})` }}></div>
            <div className="g-tile" data-label="Treatment" style={{ backgroundImage: `url(${IMG.g7})` }}></div>
            <div className="g-tile" data-label="Beauty" style={{ backgroundImage: `url(${IMG.g6})` }}></div>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-64">
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <span className="eyebrow">Before &amp; After</span>
            </div>
            <div className="ba-frame">
              <div className="ba-half" data-label="Before" style={{ backgroundImage: `url(${IMG.before})` }}></div>
              <div className="ba-half" data-label="After" style={{ backgroundImage: `url(${IMG.after})` }}></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section" data-screen-label="Testimonials">
      <div className="shell-wide">
        <Reveal>
          <div className="testimonial-wrap">
            <div className="testimonial-top">
              <div>
                <span className="eyebrow">Loved By Clients</span>
                <h2 style={{ marginTop: 14 }}>33+ five-star reviews<br /><em className="serif-i">and counting.</em></h2>
              </div>
              <div className="rating-big">
                <div className="num">4.9</div>
                <StarsRow />
                <small>Verified Google Rating</small>
              </div>
            </div>
            <div className="testimonial-rail">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="tcard">
                    <span className="stars">★★★★★</span>
                    <p>"{t.text}"</p>
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
  );
}

function ProcessSection() {
  return (
    <section className="section" data-screen-label="Process">
      <div className="shell-wide">
        <Reveal>
          <div className="section-head">
            <span className="eyebrow">The Ish Ritual</span>
            <h2>Five steps from<br />booked to <em className="serif-i">beaming.</em></h2>
            <p>Every appointment is a thoughtful sequence — designed so the time you spend with us feels like a small reset for the day.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="process">
            {PROCESS.map((p, i) => (
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
  );
}

function FAQSection({ data = FAQ }) {
  const [open, setOpen] = useStateH(0);
  return (
    <section className="section" data-screen-label="FAQ">
      <div className="shell-wide">
        <Reveal>
          <div className="faq">
            <div>
              <span className="eyebrow">Questions, Answered</span>
              <h2 style={{ marginTop: 18 }}>Good to <em className="serif-i">know.</em></h2>
              <p style={{ color: "var(--soft-brown)", marginTop: 18, maxWidth: 320 }}>
                Anything we haven't covered? Reach us at
                {" "}<a href="tel:6479609764" style={{ borderBottom: "1px solid var(--rose-gold)", color: "var(--rose-gold)" }}>(647) 960-9764</a>.
              </p>
            </div>
            <div className="faq-list">
              {data.map((f, i) => (
                <div key={f.q} className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)}>
                  <div className="faq-q">
                    <span>{f.q}</span>
                    <span className="faq-toggle">+</span>
                  </div>
                  <div className="faq-a">{f.a}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section" data-screen-label="Final CTA">
      <div className="shell-wide">
        <Reveal>
          <div className="cta-banner">
            <div className="cta-bg" style={{ backgroundImage: `url(${IMG.salonChair})` }}></div>
            <span className="eyebrow" style={{ color: "var(--blush)", position: "relative", zIndex: 2 }}>The Chair Is Waiting</span>
            <h2 style={{ marginTop: 18 }}>Ready for your<br /><em>next look?</em></h2>
            <div className="cta-buttons">
              <a href="#/booking" onClick={(e) => { e.preventDefault(); navigate("booking"); }} className="btn btn-primary">Book Appointment</a>
              <a href="tel:6479609764" className="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramStrip() {
  const igs = [IMG.g1, IMG.g3, IMG.g5, IMG.g7, IMG.g11, IMG.g8];
  return (
    <section className="section-tight" data-screen-label="Instagram">
      <div className="shell-wide">
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div>
              <span className="eyebrow">@ishbeauty</span>
              <h2 style={{ marginTop: 12, fontSize: "clamp(28px, 3vw, 44px)" }}>Follow our daily <em className="serif-i">looks</em>.</h2>
            </div>
            <a href="#" className="btn-ghost">Visit Instagram →</a>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="insta-strip">
            {igs.map((src, i) => (
              <a key={i} className="ig" href="#" style={{ backgroundImage: `url(${src})` }}></a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <div data-screen-label="Home">
      <Hero />
      <div className="shell-wide" style={{ paddingTop: 30 }}>
        <Marquee items={["Hair Styling", "Custom Colour", "Bridal Suite", "Hand-Tied Extensions", "Bond Repair", "Brows & Lashes"]} />
      </div>
      <ServicesOverview />
      <WhyChoose />
      <GalleryPreview />
      <Testimonials />
      <ProcessSection />
      <FAQSection />
      <CTASection />
      <InstagramStrip />
    </div>
  );
}

Object.assign(window, { HomePage, FAQSection });
