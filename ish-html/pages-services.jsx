// Services + Pricing pages

function ServicesPage() {
  return (
    <div data-screen-label="Services">
      <PageHead
        crumbs="Services"
        title="The full <em>menu.</em>"
        sub="Every service at Ish begins with a private consultation and a commitment to the result you actually want — not a template."
        bg={IMG.hairTreatment}
      />
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="shell-wide">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id}>
              <div className={`svc-row ${i % 2 === 1 ? "reverse" : ""}`}>
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
                    {s.benefits.map((b) => (<li key={b}>{b}</li>))}
                  </ul>
                  <a href="#/booking" onClick={(e) => { e.preventDefault(); navigate("booking"); }} className="btn btn-primary">Book Appointment</a>
                </div>
                <div className="svc-img" style={{ backgroundImage: `url(${s.img})` }}></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
}

function PricingPage() {
  return (
    <div data-screen-label="Pricing">
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
                  <div className="label" style={p.featured ? { color: "var(--gold)" } : {}}>{p.label}</div>
                  <h3>{p.name}</h3>
                  <p className="desc">{p.desc}</p>
                  <div className="price-amt">{p.price}<small>{p.unit}</small></div>
                  <ul className="price-features">
                    {p.features.map((f) => (<li key={f}>{f}</li>))}
                  </ul>
                  <a href="#/booking" onClick={(e) => { e.preventDefault(); navigate("booking"); }} className={`btn ${p.featured ? "btn-primary" : "btn-secondary"}`}>Reserve Package</a>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ marginTop: 100 }}>
              <div className="section-head" style={{ marginBottom: 40 }}>
                <span className="eyebrow">À La Carte</span>
                <h2 style={{ marginTop: 14 }}>Every service, <em className="serif-i">priced.</em></h2>
              </div>
              <div style={{
                background: "var(--warm-white)",
                borderRadius: "var(--radius-lg)",
                padding: 50,
                border: "1px solid var(--line-soft)",
              }}>
                {SERVICES.map((s, i) => (
                  <div key={s.id} style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto auto",
                    gap: 24,
                    alignItems: "center",
                    padding: "26px 0",
                    borderBottom: i < SERVICES.length - 1 ? "1px solid var(--line-soft)" : "none",
                  }}>
                    <div>
                      <div className="eyebrow eyebrow-dark" style={{ marginBottom: 6 }}>{s.label}</div>
                      <h3 style={{ fontSize: 26 }}>{s.name}</h3>
                      <p style={{ color: "var(--soft-brown)", fontSize: 14, marginTop: 4 }}>{s.desc}</p>
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontStyle: "italic", color: "var(--soft-brown)" }}>
                      {s.duration}
                    </div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 28, color: "var(--rose-gold)" }}>
                      {s.from}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

Object.assign(window, { ServicesPage, PricingPage });
