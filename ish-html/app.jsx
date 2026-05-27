// App shell + hash router + Tweaks
const { useState: useStateA, useEffect: useEffectA } = React;

const PAGES = {
  home: HomePage,
  about: AboutPage,
  team: TeamPage,
  services: ServicesPage,
  pricing: PricingPage,
  gallery: GalleryPage,
  contact: ContactPage,
  booking: BookingPage,
  blog: BlogPage,
};

const PALETTES = {
  "Cream & Rose Gold": {
    "--cream": "#f6efe6",
    "--cream-deep": "#efe6d8",
    "--warm-white": "#fbf7f1",
    "--blush": "#e9d6cd",
    "--blush-deep": "#d9b9ad",
    "--rose-gold": "#b08968",
    "--gold": "#c9a47a",
    "--charcoal": "#2a221d",
    "--soft-brown": "#6e5644",
  },
  "Soft Blush": {
    "--cream": "#faf2ee",
    "--cream-deep": "#f3e3dc",
    "--warm-white": "#fdf8f5",
    "--blush": "#f0d5cb",
    "--blush-deep": "#e3b8a8",
    "--rose-gold": "#c08e7b",
    "--gold": "#d4a899",
    "--charcoal": "#352824",
    "--soft-brown": "#785c50",
  },
  "Ivory & Gold": {
    "--cream": "#f7f3e9",
    "--cream-deep": "#ede4cf",
    "--warm-white": "#fcf9ef",
    "--blush": "#e8dec3",
    "--blush-deep": "#d5c498",
    "--rose-gold": "#a8895a",
    "--gold": "#c4a366",
    "--charcoal": "#2b2515",
    "--soft-brown": "#6a583a",
  },
  "Nude & Charcoal": {
    "--cream": "#f4ede4",
    "--cream-deep": "#e7dcce",
    "--warm-white": "#faf5ed",
    "--blush": "#dec3b1",
    "--blush-deep": "#c9a591",
    "--rose-gold": "#8e6a52",
    "--gold": "#b08968",
    "--charcoal": "#1f1916",
    "--soft-brown": "#5a4538",
  },
};

const FONTS = {
  display: {
    "Cormorant Garamond": '"Cormorant Garamond", "Playfair Display", Georgia, serif',
    "Playfair Display": '"Playfair Display", Georgia, serif',
    "Italiana": '"Italiana", Georgia, serif',
  },
  body: {
    "Jost": '"Jost", system-ui, sans-serif',
    "Outfit": '"Outfit", system-ui, sans-serif',
    "Manrope": '"Manrope", system-ui, sans-serif',
  },
};

function injectGoogleFont(family) {
  const id = "gf-" + family.replace(/\s+/g, "-");
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, "+")}:ital,wght@0,400;0,500;0,600;1,400&display=swap`;
  document.head.appendChild(link);
}

function applyTweaks(t) {
  const root = document.documentElement;
  const pal = PALETTES[t.palette] || PALETTES["Cream & Rose Gold"];
  Object.entries(pal).forEach(([k, v]) => root.style.setProperty(k, v));
  if (FONTS.display[t.displayFont]) {
    root.style.setProperty("--display", FONTS.display[t.displayFont]);
    injectGoogleFont(t.displayFont);
  }
  if (FONTS.body[t.bodyFont]) {
    root.style.setProperty("--body", FONTS.body[t.bodyFont]);
    injectGoogleFont(t.bodyFont);
  }
}

function useHashRoute() {
  const get = () => {
    const h = (window.location.hash || "#/home").replace(/^#\/?/, "");
    return PAGES[h] ? h : "home";
  };
  const [route, setRoute] = useStateA(get);
  useEffectA(() => {
    const on = () => setRoute(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

function App() {
  const route = useHashRoute();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffectA(() => { applyTweaks(t); }, [t.palette, t.displayFont, t.bodyFont]);

  const PageEl = PAGES[route] || HomePage;
  return (
    <div>
      <Nav current={route} />
      <PageEl />
      <Footer />
      <FloatBook />

      <TweaksPanel title="Tweaks" subtitle="Customize palette & type">
        <TweakSection title="Palette" subtitle="Curated colour stories">
          <TweakSelect
            label="Theme"
            value={t.palette}
            options={Object.keys(PALETTES)}
            onChange={(v) => setTweak("palette", v)}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginTop: 8 }}>
            {Object.entries(PALETTES).map(([name, pal]) => (
              <button
                key={name}
                onClick={() => setTweak("palette", name)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: 6,
                  borderRadius: 8,
                  border: t.palette === name ? "1.5px solid #2a221d" : "1px solid rgba(0,0,0,0.1)",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 11,
                }}
              >
                <span style={{ width: 14, height: 14, borderRadius: 999, background: pal["--cream"], border: "1px solid rgba(0,0,0,0.1)" }}></span>
                <span style={{ width: 14, height: 14, borderRadius: 999, background: pal["--rose-gold"] }}></span>
                <span style={{ width: 14, height: 14, borderRadius: 999, background: pal["--charcoal"] }}></span>
              </button>
            ))}
          </div>
        </TweakSection>
        <TweakSection title="Typography">
          <TweakSelect
            label="Display font"
            value={t.displayFont}
            options={Object.keys(FONTS.display)}
            onChange={(v) => setTweak("displayFont", v)}
          />
          <TweakSelect
            label="Body font"
            value={t.bodyFont}
            options={Object.keys(FONTS.body)}
            onChange={(v) => setTweak("bodyFont", v)}
          />
        </TweakSection>
        <TweakSection title="Navigate">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => navigate(l.id)} style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.1)",
                background: route === l.id ? "#2a221d" : "transparent",
                color: route === l.id ? "#fbf7f1" : "inherit",
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "inherit",
              }}>{l.label}</button>
            ))}
            <button onClick={() => navigate("booking")} style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.1)",
              background: route === "booking" ? "#2a221d" : "transparent",
              color: route === "booking" ? "#fbf7f1" : "inherit",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}>Booking</button>
          </div>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
