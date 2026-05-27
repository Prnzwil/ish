// Gallery + Contact pages
const { useState: useStateGC } = React;

function GalleryPage() {
  const [cat, setCat] = useStateGC("All");
  const items = cat === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.cat === cat);
  return (
    <div data-screen-label="Gallery">
      <PageHead
        crumbs="Gallery"
        title="A portfolio of <em>looks.</em>"
        sub="Real clients, real chairs, real transformations — captured in our Oshawa salon."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <Reveal>
            <div className="gallery-filters">
              {GALLERY_CATS.map((c) => (
                <button key={c} className={`g-filter ${cat === c ? "active" : ""}`} onClick={() => setCat(c)}>
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="gallery-masonry">
            {items.map((g, i) => (
              <div key={`${g.src}-${i}`} className="gm-item" data-cat={g.cat}>
                <img src={g.src} alt={g.cat} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

function ContactPage() {
  const [submitted, setSubmitted] = useStateGC(false);
  const [form, setForm] = useStateGC({ name: "", phone: "", email: "", service: "", msg: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  return (
    <div data-screen-label="Contact">
      <PageHead
        crumbs="Contact"
        title="Let's <em>chat.</em>"
        sub="Questions about a service, a special occasion, or want to schedule a consultation? Reach out — we typically respond within a few hours."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <div className="contact-grid">
            <Reveal>
              <div>
                <div className="contact-info">
                  <div className="ci-card">
                    <span className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </span>
                    <div>
                      <h4>Visit Us</h4>
                      <p>1808 Grandview St N<br />Oshawa, ON L1K 0Y2</p>
                    </div>
                  </div>
                  <div className="ci-card">
                    <span className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M5 4h4l2 5-3 2c1 3 4 6 7 7l2-3 5 2v4c0 1-1 2-2 2C9 23 1 15 1 6c0-1 1-2 2-2z" />
                      </svg>
                    </span>
                    <div>
                      <h4>Call Us</h4>
                      <p><a href="tel:6479609764" style={{ color: "inherit" }}>(647) 960-9764</a></p>
                    </div>
                  </div>
                  <div className="ci-card">
                    <span className="ci-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <div>
                      <h4>Hours</h4>
                      <p style={{ fontFamily: "var(--body)", fontSize: 14, color: "var(--soft-brown)", lineHeight: 1.7 }}>
                        Tue–Fri 10am – 8pm<br />
                        Sat 9am – 6pm · Sun 10am – 5pm<br />
                        Mon Closed
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <a href="tel:6479609764" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Call Now</a>
                    <a href="https://maps.google.com/?q=1808+Grandview+St+N+Oshawa+ON" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Get Directions</a>
                  </div>
                </div>

                <div className="map-wrap">
                  <svg className="map-svg" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(110,86,68,0.15)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="600" height="400" fill="url(#grid)" />
                    <path d="M0 220 Q 200 200 300 230 T 600 210" stroke="rgba(110,86,68,0.35)" strokeWidth="2" fill="none" />
                    <path d="M120 0 Q 140 150 200 250 T 350 400" stroke="rgba(110,86,68,0.25)" strokeWidth="1.5" fill="none" />
                    <path d="M0 80 L 600 100" stroke="rgba(110,86,68,0.2)" strokeWidth="1" fill="none" />
                    <path d="M0 340 L 600 320" stroke="rgba(110,86,68,0.2)" strokeWidth="1" fill="none" />
                    <rect x="80" y="120" width="80" height="60" fill="rgba(217,191,169,0.4)" rx="4" />
                    <rect x="380" y="80" width="120" height="80" fill="rgba(217,191,169,0.4)" rx="4" />
                    <rect x="200" y="280" width="100" height="60" fill="rgba(217,191,169,0.4)" rx="4" />
                    <rect x="430" y="270" width="80" height="80" fill="rgba(217,191,169,0.4)" rx="4" />
                  </svg>
                  <div className="map-pin">
                    <div className="pin-dot"></div>
                  </div>
                  <div className="map-card">
                    <div className="t">Ish Hair &amp; Beauty</div>
                    <div className="s">1808 Grandview St N</div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <form className="contact-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 60, color: "var(--rose-gold)", fontFamily: "var(--display)", fontStyle: "italic" }}>✦</div>
                    <h3 style={{ marginTop: 18 }}>Thank you, {form.name || "friend"}.</h3>
                    <p style={{ color: "var(--soft-brown)", marginTop: 14, maxWidth: 380, marginInline: "auto" }}>
                      Your message is on its way to us. We'll be in touch soon — usually within a few hours.
                    </p>
                    <button type="button" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", service: "", msg: "" }); }} className="btn btn-secondary" style={{ marginTop: 28 }}>
                      Send Another
                    </button>
                  </div>
                ) : (
                  <React.Fragment>
                    <span className="eyebrow">Send A Message</span>
                    <h3 style={{ marginTop: 12, marginBottom: 32 }}>Tell us about your <em className="serif-i">visit.</em></h3>
                    <div className="field-row">
                      <div className="field">
                        <label>Name</label>
                        <input value={form.name} onChange={update("name")} placeholder="Your name" required />
                      </div>
                      <div className="field">
                        <label>Phone</label>
                        <input value={form.phone} onChange={update("phone")} placeholder="(647) 000-0000" />
                      </div>
                    </div>
                    <div className="field">
                      <label>Email</label>
                      <input type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required />
                    </div>
                    <div className="field">
                      <label>Service Interested In</label>
                      <select value={form.service} onChange={update("service")}>
                        <option value="">Choose a service…</option>
                        {SERVICES.map((s) => (<option key={s.id} value={s.name}>{s.name}</option>))}
                        <option value="other">Something else</option>
                      </select>
                    </div>
                    <div className="field">
                      <label>Message</label>
                      <textarea rows="4" value={form.msg} onChange={update("msg")} placeholder="Tell us about the look you have in mind…"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 14 }}>Send Message</button>
                  </React.Fragment>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { GalleryPage, ContactPage });
