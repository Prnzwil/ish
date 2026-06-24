// Booking + Blog pages
const { useState: useStateE } = React;

const BOOKING_DATES = (() => {
  const out = [];
  const base = new Date(2026, 4, 27); // a Wed in May 2026
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let i = 0; i < 14; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({ dow: DOW[d.getDay()], day: d.getDate(), key: `${d.getMonth() + 1}-${d.getDate()}`, closed: d.getDay() === 1 });
  }
  return out;
})();
const TIMES = ["10:00", "11:00", "12:00", "1:30", "2:30", "3:30", "4:30", "5:30", "6:30", "7:00"];

function BookingPage() {
  const [step, setStep] = useStateE(1);
  const [picked, setPicked] = useStateE({ service: null, date: null, time: null, stylist: "Any" });
  const [done, setDone] = useStateE(false);

  const stylistOptions = ["Any", ...TEAM.map((t) => t.name.split(" ")[0])];

  if (done) {
    return (
      <div data-screen-label="Booking Confirmation">
        <PageHead crumbs="Booking" title="You're <em>booked.</em>" sub="A confirmation has been sent. We can't wait to see you." />
        <section className="section">
          <div className="shell-wide" style={{ maxWidth: 720, textAlign: "center" }}>
            <Reveal>
              <div style={{ background: "var(--charcoal)", color: "var(--cream)", borderRadius: "var(--radius-lg)", padding: 60 }}>
                <div style={{ fontSize: 56, color: "var(--rose-gold)", fontFamily: "var(--display)", fontStyle: "italic" }}>✦</div>
                <h2 style={{ color: "var(--warm-white)", marginTop: 18 }}>Appointment <em className="serif-i">confirmed.</em></h2>
                <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, textAlign: "left" }}>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--gold)" }}>Service</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>{picked.service?.name}</div>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--gold)" }}>Stylist</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>{picked.stylist}</div>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--gold)" }}>Date</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>{picked.date?.dow} {picked.date?.day} May 2026</div>
                  </div>
                  <div>
                    <div className="eyebrow" style={{ color: "var(--gold)" }}>Time</div>
                    <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>{picked.time}</div>
                  </div>
                </div>
                <div style={{ marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                  <button onClick={() => { setDone(false); setStep(1); setPicked({ service: null, date: null, time: null, stylist: "Any" }); }} className="btn btn-primary" style={{ background: "var(--warm-white)", color: "var(--charcoal)" }}>Book Another</button>
                  <a href="#/home" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="btn btn-secondary" style={{ color: "var(--warm-white)", borderColor: "rgba(251,247,241,0.7)" }}>Back to Home</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div data-screen-label="Booking">
      <PageHead crumbs="Book Appointment" title="Reserve your <em>chair.</em>" sub="Three quick steps and you're set. We'll text and email confirmations." />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <div className="booking-shell">
            <div className="booking-card">
              <div className="step-indicator">
                {[1, 2, 3].map((n, i) => (
                  <React.Fragment key={n}>
                    <span className={`step-bubble ${step === n ? "active" : step > n ? "done" : ""}`}>
                      {step > n ? "✓" : (["i", "ii", "iii"][n - 1])}
                    </span>
                    {i < 2 && <div className={`step-line ${step > n ? "done" : ""}`}></div>}
                  </React.Fragment>
                ))}
              </div>

              {step === 1 && (
                <div>
                  <span className="eyebrow">Step One</span>
                  <h2 style={{ marginTop: 12, fontSize: 36 }}>Choose your <em className="serif-i">service.</em></h2>
                  <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>You can refine the details at the chair.</p>
                  {SERVICES.map((s) => (
                    <div key={s.id} className={`svc-option ${picked.service?.id === s.id ? "selected" : ""}`} onClick={() => setPicked({ ...picked, service: s })}>
                      <div>
                        <h4>{s.name}</h4>
                        <p>{s.duration} · {s.desc.split(".")[0]}.</p>
                      </div>
                      <span className="price">{s.from}</span>
                    </div>
                  ))}
                </div>
              )}

              {step === 2 && (
                <div>
                  <span className="eyebrow">Step Two</span>
                  <h2 style={{ marginTop: 12, fontSize: 36 }}>Pick a <em className="serif-i">date & time.</em></h2>
                  <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>Showing the next two weeks at our salon.</p>
                  <div className="date-grid">
                    {BOOKING_DATES.map((d) => (
                      <button
                        key={d.key}
                        className={`date-btn ${picked.date?.key === d.key ? "selected" : ""}`}
                        disabled={d.closed}
                        style={d.closed ? { opacity: 0.35, cursor: "not-allowed" } : {}}
                        onClick={() => !d.closed && setPicked({ ...picked, date: d })}
                      >
                        <div className="dow">{d.dow}</div>
                        <div className="day">{d.day}</div>
                      </button>
                    ))}
                  </div>
                  <div className="eyebrow" style={{ marginTop: 12, marginBottom: 12 }}>Available Times</div>
                  <div className="time-grid">
                    {TIMES.map((t) => (
                      <button key={t} className={`time-btn ${picked.time === t ? "selected" : ""}`} onClick={() => setPicked({ ...picked, time: t })}>{t}</button>
                    ))}
                  </div>
                  <div className="eyebrow" style={{ marginTop: 28, marginBottom: 12 }}>Preferred Stylist</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {stylistOptions.map((opt) => (
                      <button key={opt} onClick={() => setPicked({ ...picked, stylist: opt })} className={`time-btn ${picked.stylist === opt ? "selected" : ""}`} style={{ flex: "0 0 auto", padding: "10px 18px" }}>{opt}</button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <span className="eyebrow">Step Three</span>
                  <h2 style={{ marginTop: 12, fontSize: 36 }}>Your <em className="serif-i">details.</em></h2>
                  <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>We'll send confirmations to both.</p>
                  <div className="field-row">
                    <div className="field"><label>Name</label><input placeholder="Your name" /></div>
                    <div className="field"><label>Phone</label><input placeholder="(647) 000-0000" /></div>
                  </div>
                  <div className="field"><label>Email</label><input placeholder="you@example.com" /></div>
                  <div className="field"><label>Notes (Optional)</label><textarea rows="3" placeholder="Anything we should know before your appointment…"></textarea></div>
                </div>
              )}

              <div className="booking-step-nav">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="btn btn-secondary">← Back</button>
                ) : <span></span>}
                {step < 3 ? (
                  <button onClick={() => setStep(step + 1)} className="btn btn-primary" disabled={(step === 1 && !picked.service) || (step === 2 && (!picked.date || !picked.time))} style={(step === 1 && !picked.service) || (step === 2 && (!picked.date || !picked.time)) ? { opacity: 0.4, pointerEvents: "none" } : {}}>Continue →</button>
                ) : (
                  <button onClick={() => setDone(true)} className="btn btn-primary">Confirm Booking</button>
                )}
              </div>
            </div>

            <div className="booking-summary">
              <h4>Your Reservation</h4>
              <div className="bs-row">
                <span className="k">Service</span>
                <span className="v">{picked.service?.name || "—"}</span>
              </div>
              <div className="bs-row">
                <span className="k">Stylist</span>
                <span className="v">{picked.stylist}</span>
              </div>
              <div className="bs-row">
                <span className="k">Date</span>
                <span className="v">{picked.date ? `${picked.date.dow} ${picked.date.day} May` : "—"}</span>
              </div>
              <div className="bs-row">
                <span className="k">Time</span>
                <span className="v">{picked.time || "—"}</span>
              </div>
              <div className="bs-row">
                <span className="k">Duration</span>
                <span className="v">{picked.service?.duration || "—"}</span>
              </div>
              <div className="bs-total">
                <span className="k">From</span>
                <span className="v">{picked.service?.from || "—"}</span>
              </div>
              <p style={{ marginTop: 18, fontSize: 12, color: "rgba(251,247,241,0.5)", letterSpacing: "0.02em" }}>
                Final pricing confirmed during in-chair consultation. 24h cancellation policy applies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function BlogPage() {
  const [hovered, setHovered] = useStateE(null);
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);
  return (
    <div data-screen-label="Blog">
      <PageHead
        crumbs="Journal"
        title="The <em>Kutie</em> Journal."
        sub="Beauty tips, hair-care guides, and stories from the chair — written by our team for the curious."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <div className="blog-grid">
            {featured && (
              <Reveal>
                <article className="blog-card featured">
                  <div className="blog-img" style={{ backgroundImage: `url(${featured.img})` }}></div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>{featured.cat}</span><span className="dot"></span><span>{featured.read}</span>
                    </div>
                    <h3>{featured.title}</h3>
                    <p style={{ marginTop: 12 }}>{featured.excerpt}</p>
                    <a href="#" className="read-more" style={{ marginTop: 24 }}>Read Article</a>
                  </div>
                </article>
              </Reveal>
            )}
            {rest.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="blog-card" onMouseEnter={() => setHovered(p.title)} onMouseLeave={() => setHovered(null)}>
                  <div className="blog-img" style={{ backgroundImage: `url(${p.img})` }}></div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>{p.cat}</span><span className="dot"></span><span>{p.read}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p style={{ marginTop: 12 }}>{p.excerpt}</p>
                    <a href="#" className="read-more" style={{ marginTop: 18 }}>Read More</a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{
              marginTop: 80,
              background: "var(--blush)",
              borderRadius: "var(--radius-lg)",
              padding: "60px 50px",
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: 40,
              alignItems: "center",
            }} className="newsletter-block">
              <div>
                <span className="eyebrow">Weekly Notes</span>
                <h2 style={{ marginTop: 14 }}>Beauty rituals,<br /><em className="serif-i">in your inbox.</em></h2>
                <p style={{ color: "var(--soft-brown)", marginTop: 14, maxWidth: 480 }}>
                  Tips, seasonal looks, and salon news. One thoughtful email a month — never more.
                </p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", gap: 10 }}>
                <input placeholder="Your email" style={{ flex: 1, padding: "16px 22px", borderRadius: 999, border: "1px solid var(--line)", background: "var(--warm-white)", fontFamily: "var(--body)", fontSize: 15 }} />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { BookingPage, BlogPage });
