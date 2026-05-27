// About + Team pages

function AboutPage() {
  return (
    <div data-screen-label="About">
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
                <h2 style={{ marginTop: 14 }}>A boutique salon<br />for <em className="serif-i">every chapter</em>.</h2>
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
            {[
              { n: "12", e: "+", l: "Years of Craft" },
              { n: "33", e: "★", l: "Five-Star Reviews" },
              { n: "4.9", e: "", l: "Average Rating" },
              { n: "300", e: "+", l: "Bridal Clients" },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="stat">
                  <div className="num">{s.n}<em>{s.e}</em></div>
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
              <h2>Five values, kept <em className="serif-i">close</em>.</h2>
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

      <CTASection />
    </div>
  );
}

function TeamPage() {
  return (
    <div data-screen-label="Team">
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
                    <div className="team-img-inner" style={{ backgroundImage: `url(${t.img})` }}></div>
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
            <div style={{
              background: "var(--cream-deep)",
              borderRadius: "var(--radius-lg)",
              padding: "70px 60px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              alignItems: "center",
            }} className="join-block">
              <div>
                <span className="eyebrow">Join Our Team</span>
                <h2 style={{ marginTop: 14 }}>Are you a stylist<br />with a <em className="serif-i">discerning</em> eye?</h2>
                <p style={{ color: "var(--soft-brown)", marginTop: 18, fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}>
                  We're always interested in meeting talented stylists, colourists, and beauty professionals who share our standards. Send us your portfolio.
                </p>
                <div style={{ marginTop: 28 }}>
                  <a href="#/contact" onClick={(e) => { e.preventDefault(); navigate("contact"); }} className="btn btn-primary">Get In Touch</a>
                </div>
              </div>
              <div style={{
                height: 340,
                backgroundImage: `url(${IMG.products})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "var(--radius-md)",
              }}></div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

Object.assign(window, { AboutPage, TeamPage });
