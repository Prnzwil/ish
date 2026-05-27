// Shared UI: Nav, Footer, FloatBook, Reveal, page header, marquee
const { useState, useEffect, useRef } = React;

function navigate(page) {
  window.location.hash = "#/" + page;
  window.scrollTo({ top: 0, behavior: "instant" });
}

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <div ref={ref} style={style} className={`reveal ${seen ? "in" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Nav({ current }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <React.Fragment>
      <nav className={`nav ${scrolled ? "scrolled" : ""}`} data-screen-label="Navigation">
        <div className="shell-wide nav-inner">
          <a href="#/home" onClick={(e) => { e.preventDefault(); navigate("home"); }} className="brand">
            <span className="brand-mark">Ish <span className="amp">&amp;</span> Co.</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#/${l.id}`}
                onClick={(e) => { e.preventDefault(); navigate(l.id); }}
                className={`nav-link ${current === l.id ? "active" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="nav-cta">
            <a href="tel:6479609764" className="nav-phone">
              <span className="nav-phone-i">✦</span> (647) 960-9764
            </a>
            <a href="#/booking" onClick={(e) => { e.preventDefault(); navigate("booking"); }} className="btn btn-primary">Book Now</a>
            <button className="menu-btn" onClick={() => setOpen(true)} aria-label="Menu"><span></span></button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button className="mm-close" onClick={() => setOpen(false)}>×</button>
        {NAV_LINKS.map((l) => (
          <a key={l.id} href={`#/${l.id}`} onClick={(e) => { e.preventDefault(); navigate(l.id); setOpen(false); }}>
            {l.label}
          </a>
        ))}
      </div>
    </React.Fragment>
  );
}

function FloatBook() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#/booking"
      onClick={(e) => { e.preventDefault(); navigate("booking"); }}
      className={`float-book ${show ? "show" : ""}`}
    >
      <span className="float-book-dot">✦</span>
      Book Appointment
    </a>
  );
}

function PageHead({ crumbs, title, sub, bg }) {
  return (
    <section
      className="page-head"
      style={bg ? {
        background: `linear-gradient(180deg, rgba(246,239,230,0.65) 0%, rgba(246,239,230,0.95) 70%, var(--cream) 100%), url(${bg}) center/cover`,
      } : undefined}
    >
      <Reveal>
        {crumbs && (
          <div className="crumbs">
            <span>Home</span> <span className="dot"></span> <span>{crumbs}</span>
          </div>
        )}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="page-head-sub">{sub}</p>}
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" data-screen-label="Footer">
      <div className="shell-wide">
        <div className="footer-grid">
          <div>
            <span className="brand-mark">Ish <span className="amp">&amp;</span> Co.</span>
            <p style={{ marginTop: 18, color: "rgba(251,247,241,0.65)", maxWidth: 340 }}>
              A luxury hair and beauty salon in Oshawa — where every guest leaves looking and feeling their absolute best.
            </p>
            <div className="socials" style={{ marginTop: 26 }}>
              {["Ig", "Fb", "Tt", "Pn"].map((s) => (
                <a key={s} href="#" aria-label={s}>
                  <span style={{ fontFamily: "var(--display)", fontStyle: "italic", fontSize: 14 }}>{s}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#/${l.id}`} onClick={(e) => { e.preventDefault(); navigate(l.id); }}>{l.label}</a>
            ))}
          </div>
          <div>
            <h4>Services</h4>
            {SERVICES.map((s) => (
              <a key={s.id} href="#/services" onClick={(e) => { e.preventDefault(); navigate("services"); }}>{s.name}</a>
            ))}
          </div>
          <div>
            <h4>Visit</h4>
            <p style={{ color: "rgba(251,247,241,0.7)", fontSize: 14, marginBottom: 18 }}>
              1808 Grandview St N<br />
              Oshawa, ON L1K 0Y2<br />
              <a href="tel:6479609764" style={{ padding: 0, color: "var(--gold)", fontSize: 14 }}>(647) 960-9764</a>
            </p>
            <h4 style={{ marginTop: 30 }}>Hours</h4>
            {HOURS.map(([d, h]) => (
              <div key={d} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", color: "rgba(251,247,241,0.7)" }}>
                <span>{d}</span><span>{h}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <span>© {new Date().getFullYear()} Ish Hair &amp; Beauty Salon. All rights reserved.</span>
          <span style={{ fontFamily: "var(--display)", fontStyle: "italic", color: "var(--gold)" }}>
            Crafted with care in Oshawa, Ontario.
          </span>
        </div>
      </div>
    </footer>
  );
}

function Marquee({ items }) {
  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (<span key={i}>{t}</span>))}
      </div>
    </div>
  );
}

function StarsRow({ n = 5, color = "var(--gold)" }) {
  return <span className="stars" style={{ color }}>{"★".repeat(n)}</span>;
}

Object.assign(window, { Nav, Footer, FloatBook, Reveal, PageHead, Marquee, StarsRow, navigate });
