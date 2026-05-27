# Converting a static HTML/CSS/JS site to Next.js (App Router)

A walkthrough of the patterns, decisions, and gotchas from porting the [gobs-html/](../gobs-html/) static site to this Next.js 16 app. Written so that the next time you do this on a different site, you can move faster and skip the surprises.

This guide assumes:

- You have an existing static site (one or more `.html` files, one or more `.css` files, one or more `.js` files, maybe assets).
- The target is Next.js 16+ with the App Router.
- You want the result to render **visually identical** to the source.
- You're using TypeScript and want strict typing preserved.

If those assumptions don't match, the structure still holds — just adapt where noted.

---

## 1. Before you touch any code

The biggest mistake on these conversions is opening the editor before you understand what you're converting. Spend an hour on inventory first. It pays back tenfold.

### Inventory the source

For each HTML file, write down:

- **Sections** (hero, features, FAQ, footer, etc.) — these will likely each become either a section in a page, or its own component.
- **Identifying selectors** (`class` / `id`) — you'll keep many of these as `className` so the CSS keeps working.
- **External resources** — Google Fonts, CDN scripts, analytics, icon libraries, embedded iframes (maps, videos). Each one is a decision: keep, replace with a Next.js primitive, or drop.
- **Inline `<script>` tags and inline `<style>` blocks** — these need a home in the new structure.

For each CSS file, note:

- **Design tokens** (`:root` CSS variables) — these are the system the rest of the CSS hangs off.
- **Keyframes and animations** — they'll port as-is.
- **Media query breakpoints** — note the values (`max-width: 720px`, etc.) so you don't accidentally invalidate them later.
- **Whether it's hand-written or generated** (e.g. Tailwind output, framework CSS). Hand-written is much easier to port faithfully.

For each JS file, list every imperative behavior:

- Scroll listeners
- Click handlers (mobile menus, accordions, tabs, modals)
- Form handlers
- IntersectionObserver / animation triggers
- Anything that touches the DOM after `DOMContentLoaded`

Each item in that list becomes either a React effect, a React event handler, or a state update.

### Inventory the interactivity

The single most important output of inventory is this table:

| Source behavior                               | New Next.js home                                              |
| --------------------------------------------- | ------------------------------------------------------------- |
| Sticky nav blur on scroll                     | `Nav.tsx` — `useEffect` + scroll listener + `useState`        |
| Mobile drawer                                 | `Nav.tsx` — `useState` for open/closed                        |
| FAQ accordion                                 | `Faq.tsx` — `useState` for openIndex                          |
| Scroll-reveal animation                       | A global `ScrollFx.tsx` mounted in root layout                |
| Portfolio category filter                     | `PortfolioFilter.tsx` — wraps children, filter state in React |
| Contact form → WhatsApp redirect              | `ContactForm.tsx` — `onSubmit` with `window.open`             |
| Newsletter form (cosmetic)                    | `NewsletterForm.tsx` — `useState` for toast                   |
| Runtime href injection (`[data-attr]` → href) | Replace at render time via a util like `lib/whatsapp.ts`      |
| Parallax scroll transform                     | Global scroll listener in `ScrollFx.tsx`                      |

Build this table first. It's your component shopping list.

### Ask the user three questions before writing code

When porting a site you didn't build, three decisions matter most:

1. **Styling strategy** — replace with utility CSS (Tailwind), keep the hand-written CSS, or run both?
2. **Anything to skip?** — design-tool helpers, mock components, old experiments. Don't blindly port.
3. **Visual fidelity** — exact pixel-for-pixel match, or a refresh-it-while-porting pass?

These decisions cascade into everything else. Get them locked in writing before opening an editor.

---

## 2. Project structure

### Files you'll create

For a typical 5-page marketing site, expect roughly this:

```
app/
  layout.tsx            ← root layout: nav + footer + globals + fonts
  page.tsx              ← home
  globals.css           ← ALL the styling
  about/page.tsx
  services/page.tsx
  portfolio/page.tsx
  contact/page.tsx
components/
  Nav.tsx               ← client: scroll + drawer + active link
  Footer.tsx            ← server: static markup + embedded forms
  Fab.tsx               ← server: floating CTA
  NewsletterForm.tsx    ← client: form state
  ContactForm.tsx       ← client: form state
  Faq.tsx               ← client: accordion state
  PortfolioFilter.tsx   ← client: filter state, wraps server children
  ScrollFx.tsx          ← client: global effects (reveal, parallax, stagger)
lib/
  whatsapp.ts           ← URL builder for WhatsApp redirects
```

Reasoning:

- **`components/` and `lib/` at the repo root** keep imports clean (`@/components/Nav`) and match common Next.js community convention. You could also colocate as `app/_components/`; either works.
- **One client component per interactive concern**, not one mega "client island". Each component declares its own `"use client"`. The rest of the page is server-rendered.

### Server vs client components

Default: server. Only mark `"use client"` when the component:

- Uses `useState`, `useEffect`, `useRef`, `useContext`, or any hook
- Attaches event listeners (`onClick`, `onSubmit`, etc.) — note: in App Router, even `onClick` requires `"use client"`
- Uses `usePathname` / `useRouter` / other navigation hooks
- Touches `window`, `document`, or other browser globals

Pages that are mostly static markup with one or two interactive islands should stay as server components. The interactive bits are imported and used as children — Next.js handles the boundary automatically.

Example from this codebase: [app/page.tsx](../app/page.tsx) is a server component. It renders the hero, marquee, why-us, services preview, process, portfolio preview, and final CTA all server-side. The only client island is `<Faq>`, which receives the FAQ data as a prop.

### One root layout, period

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Fab from "@/components/Fab";
import ScrollFx from "@/components/ScrollFx";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Fab />
        <ScrollFx />
      </body>
    </html>
  );
}
```

Notes:

- **Nav, Footer, Fab, and ScrollFx are mounted once.** They persist across navigations. The thing that changes is `{children}` inside `<main>`.
- **Don't duplicate Nav/Footer per page.** That's an easy mistake when each source HTML file has its own copy.
- **`ScrollFx` is mounted at the layout level on purpose** — it sets up global side effects. Section 7 has the catch.

---

## 3. Styling: pick one strategy and stay there

Three viable options, in order of "least risk" → "most upside, more work":

### Option A — Keep the hand-written CSS as-is

Copy `styles.css` verbatim into `app/globals.css`. Import it once in `app/layout.tsx`. Done.

When to choose: the source design is already coherent and tuned. You want pixel-perfect match. You're not planning major UI churn after launch.

This is what we did here. The 1,466-line source `styles.css` lives in [app/globals.css](../app/globals.css) almost unmodified.

### Option B — Hybrid: keep the hand-written CSS, add Tailwind for new code

This is what _this_ repo ultimately uses. The hand-written CSS still drives the existing pages. Tailwind 4 is installed and configured so any new components can use utility classes.

The bridge is a Tailwind 4 `@theme` block at the top of `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-accent: #22d3ee;
  --color-bg: #050505;
  --color-surface-1: #0a0a0a;
  --color-text: #f5f5f7;
  --color-text-soft: rgba(245, 245, 247, 0.72);
  --color-border: rgba(255, 255, 255, 0.07);
  /* …mirror the design tokens here */

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "SF Mono", monospace;
}

:root {
  /* Original :root tokens kept verbatim from styles.css */
  --bg: #050505;
  --surface-1: #0a0a0a;
  --accent: #22d3ee;
  /* …etc */
}

/* …rest of the hand-written CSS */
```

The `@theme` block tells Tailwind 4 "these tokens exist" so utilities like `bg-accent`, `text-soft`, `border-border` resolve to the same palette as the hand-written `.btn-accent`, `.text-mute` classes. You're keeping two naming conventions side by side, but they share one palette.

Caveats:

- Tailwind 4 includes a CSS reset (preflight) that may slightly affect base element styles. Eyeball headings, buttons, and form fields after wiring it up.
- You can't reference CSS variables inside `@theme` — values must be literal because Tailwind reads them at build time. So you duplicate the hex/rgba values between `@theme` and `:root`.

### Option C — Full rewrite to Tailwind utilities

Translate every component class into utility classes on JSX, push tokens into `@theme`, push keyframes into `@theme` (Tailwind 4 supports `--animate-*` tokens).

When to choose: you're going to actively iterate on the design after launch and don't want two systems to maintain. The cost is high transcription risk during the rewrite — every component is a fresh chance to drift visually.

We didn't do this here because the user wanted pixel-identical match.

### Fonts: use `next/font`, don't keep the Google Fonts CDN link

The starter scaffold and this app both use `next/font/google`:

```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
```

This self-hosts the font, eliminates the external request to `fonts.googleapis.com`, and exposes a CSS variable. In your ported CSS, reference the Next-provided variable:

```css
:root {
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

Then **delete** the `@import url('https://fonts.googleapis.com/…')` line at the top of the ported CSS. If you forget this step, the browser will still fetch fonts from Google — defeats the purpose.

---

## 4. Mechanical HTML → JSX conversions

This is the boring-but-essential transformation. Most issues come from missing one of these.

| HTML                               | JSX                                              |
| ---------------------------------- | ------------------------------------------------ |
| `class="…"`                        | `className="…"`                                  |
| `for="…"`                          | `htmlFor="…"`                                    |
| `tabindex="…"`                     | `tabIndex={…}`                                   |
| `stroke-width="2"`                 | `strokeWidth="2"`                                |
| `stroke-linecap="round"`           | `strokeLinecap="round"`                          |
| `stop-color="#fff"`                | `stopColor="#fff"`                               |
| `stop-opacity="0.5"`               | `stopOpacity="0.5"`                              |
| `stroke-dasharray="2 2"`           | `strokeDasharray="2 2"`                          |
| `referrerpolicy="…"`               | `referrerPolicy="…"`                             |
| `allowfullscreen`                  | `allowFullScreen`                                |
| `style="color:red;font-size:14px"` | `style={{ color: "red", fontSize: 14 }}`         |
| `<br/>`, `<input … required>`      | Self-close as `<br />`, `<input … required />`   |
| Comment `<!-- foo -->`             | JSX `{/* foo */}`                                |
| Boolean attrs `disabled`           | `disabled={true}` or just `disabled` (both work) |

### Inline styles: convert every CSS property to camelCase

```html
<!-- HTML -->
<div
  style="display:flex;flex-direction:column;gap:18px;font-family:var(--font-mono)"
></div>
```

```tsx
// JSX
<div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: "var(--font-mono)" }}>
```

Notes:

- Numeric pixel values can stay as numbers (`gap: 18`, not `"18px"`). React auto-appends `px`.
- `border-radius: 50%` → `borderRadius: "50%"` (string because it's not pixels).
- `aspect-ratio: 16 / 9` → `aspectRatio: "16 / 9"` (string).
- Custom properties (CSS variables) stay as strings: `fontFamily: "var(--font-mono)"`.

### Two ESLint rules will fire on intentional patterns

If your source uses these stylistic conventions, two `react/*` rules will false-positive across every page:

- **`react/jsx-no-comment-textnodes`** — fires on text content starting with `//`. Common in design-language eyebrow labels like `<p className="eyebrow">// Section heading</p>`.
- **`react/no-unescaped-entities`** — fires on apostrophes and quotes in marketing copy: `we're`, `you'd`, `it's`.

You have three options:

1. **Wrap each occurrence in a JS expression:** `<p>{"// Section"}</p>` and `<p>{"we're"}</p>`. Tedious but explicit.
2. **Use HTML entities:** `&apos;` for apostrophe, `&#47;&#47;` for `//`. Renders correctly but uglier source.
3. **Disable the rules in `eslint.config.mjs`** if these patterns are pervasive.

In this repo we chose (3) because the patterns appear 20+ times and aren't catching real bugs:

```js
// eslint.config.mjs
{
  rules: {
    "react/jsx-no-comment-textnodes": "off",
    "react/no-unescaped-entities": "off",
  },
}
```

Don't disable rules wholesale by default — it loses signal. But when a rule consistently false-positives on intentional design language, turning it off is correct.

### Anchor tags → `<Link>` only for internal routes

```tsx
// Internal: use next/link
<Link href="/services">Services</Link>

// External or `mailto:` / `tel:` / `wa.me`: keep as <a>
<a href="https://wa.me/2347040238647" target="_blank" rel="noopener">WhatsApp</a>
<a href="tel:+2347040238647">+234 704 023 8647</a>
<a href="mailto:hello@gobs.tech">hello@gobs.tech</a>

// Anchor jumps within the site: Link works fine and prefetches
<Link href="/services#mobile">Mobile apps</Link>
```

Don't try to use `<Link>` for `mailto:` or `tel:` — it'll throw at runtime.

---

## 5. Porting vanilla JS to React idioms

The source `app.js` is typically a series of IIFEs that:

1. Query the DOM (`document.querySelectorAll(...)`)
2. Attach event listeners
3. Mutate elements (`element.classList.add(...)`, `element.style.transform = ...`)

In React, these all become: state in a component + JSX that reflects the state.

### Pattern A — Boolean state for toggles (sticky nav, drawer)

Source:

```js
window.addEventListener("scroll", () => {
  if (window.scrollY > 12) nav.classList.add("is-scrolled");
  else nav.classList.remove("is-scrolled");
});
```

React equivalent (in `Nav.tsx`):

```tsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);

return <header className={`nav${scrolled ? " is-scrolled" : ""}`}>…</header>;
```

The cleanup function (returned from useEffect) is non-negotiable. Without it, the listener stays attached after the component unmounts, which leaks memory and can fire on stale references.

### Pattern B — Active route highlighting

Source mark up each page with `<a href="..." class="active">…</a>`.

React equivalent — read the current path from Next.js and compare:

```tsx
"use client";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  // …
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav>
      {LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={pathname === l.href ? "active" : undefined}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
```

One Nav, all five pages, with the active state always correct.

### Pattern C — Form that opens an external URL (WhatsApp, mailto)

Source:

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const msg = `Hello, project from ${data.get("name")}…`;
  window.open(
    `https://wa.me/123?text=${encodeURIComponent(msg)}`,
    "_blank",
    "noopener",
  );
});
```

React equivalent — keep `window.open` synchronous inside the submit handler so popup blockers don't kill it:

```tsx
"use client";

function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const msg = `Hello, project from ${data.get("name")?.toString() ?? ""}…`;
  window.open(waLink(msg), "_blank", "noopener");
}

return <form onSubmit={onSubmit}>…</form>;
```

Critical: `window.open` must be called synchronously from a user event. Don't `await` anything before it — most browsers block popups otherwise.

### Pattern D — Render-time URL building (no runtime injection)

Source uses a `data-*` attribute and lets JS fill in the href on page load:

```html
<a class="btn" data-wa="Hello, I want to discuss a project."></a>
<script>
  document.querySelectorAll("[data-wa]").forEach((el) => {
    el.setAttribute(
      "href",
      `https://wa.me/123?text=${encodeURIComponent(el.dataset.wa)}`,
    );
  });
</script>
```

In React, just compute the href at render time:

```tsx
import { waLink } from "@/lib/whatsapp";

<a
  href={waLink("Hello, I want to discuss a project.")}
  target="_blank"
  rel="noopener"
>
  Chat on WhatsApp
</a>;
```

This is faster (no flash before JS runs), works without JavaScript at all (links are usable even if the bundle hasn't loaded), and is type-checked.

### Pattern E — Accordion (FAQ)

Source toggles `aria-expanded` on a button; CSS handles the visual via `[aria-expanded="true"] + .answer { grid-template-rows: 1fr; }`.

React equivalent — keep the CSS, control `aria-expanded` from state:

```tsx
"use client";
import { useState } from "react";

export default function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq">
      {items.map((item, i) => {
        const expanded = openIndex === i;
        return (
          <div key={item.question} className="faq-item">
            <button
              type="button"
              className="faq-q"
              aria-expanded={expanded}
              onClick={() => setOpenIndex(expanded ? null : i)}
            >
              {item.question}
            </button>
            <div className="faq-a">
              <div>
                <div className="faq-a-inner">{item.answer}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

The CSS rule `.faq-q[aria-expanded="true"] + .faq-a { grid-template-rows: 1fr; }` keeps animating heights — you didn't have to port any of it.

### Pattern F — Category filter that hides DOM siblings

Source iterates over `.project[data-cat]` items and adds `.hidden` based on the active filter button.

React equivalent — wrap the buttons and grid in a client component, use `React.Children.map` + `cloneElement` to apply `className` based on the child's own `data-cat` prop:

```tsx
"use client";
import { Children, cloneElement, isValidElement, useState } from "react";

export default function PortfolioFilter({
  filters,
  children,
}: {
  filters: { label: string; value: string }[];
  children: React.ReactNode;
}) {
  const [active, setActive] = useState("all");

  return (
    <>
      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn${active === f.value ? " active" : ""}`}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="project-grid">
        {Children.map(children, (child) => {
          if (
            !isValidElement<{ "data-cat"?: string; className?: string }>(child)
          )
            return child;
          const cat = child.props["data-cat"];
          const hidden = active !== "all" && cat !== active;
          return cloneElement(child, {
            className:
              `${child.props.className ?? ""}${hidden ? " hidden" : ""}`.trim(),
          });
        })}
      </div>
    </>
  );
}
```

Usage in a server page:

```tsx
<PortfolioFilter filters={FILTERS}>
  <article className="project" data-cat="software">
    …
  </article>
  <article className="project" data-cat="mobile">
    …
  </article>
  …
</PortfolioFilter>
```

This pattern is powerful: the _page_ (a server component) declares the project markup including expensive inline SVG mockups. The _filter wrapper_ (a client component) handles only the filter state. The boundary between server and client is the props that get passed across.

---

## 6. Routing and metadata

### File-based routing

Each route is a folder under `app/` containing `page.tsx`:

```
app/page.tsx                 → /
app/about/page.tsx           → /about
app/services/page.tsx        → /services
app/portfolio/page.tsx       → /portfolio
app/contact/page.tsx         → /contact
```

That's it. No router config.

### Per-page metadata

Each page exports a `metadata` object that overrides the root layout's:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Gobs Technology",
  description: "The studio, the mission, the engineers …",
};

export default function AboutPage() {
  return <>…</>;
}
```

The root layout's `metadata` provides defaults for any page that doesn't set its own. Per-page metadata fully replaces it (it doesn't merge — be explicit).

### Anchor links across pages

If you have `<Link href="/services#mobile">Mobile apps</Link>`, the App Router will:

1. Client-navigate to `/services`
2. Scroll to the element with `id="mobile"`

Make sure your services page has `<section id="mobile">` etc. and the smooth-scroll CSS (`html { scroll-behavior: smooth }`) is present in `globals.css`.

---

## 7. The IntersectionObserver trap (and the fix)

This is the single most important gotcha in this entire guide. Read it carefully.

### The setup

A common scroll-reveal pattern in static sites: elements with `.reveal` start at `opacity: 0`, an IntersectionObserver flips them to `.is-visible` when they enter the viewport, and CSS handles the fade.

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.8s,
    transform 0.8s;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      io.unobserve(e.target);
    }
  });
});
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
```

In Next.js, you put this logic in a `ScrollFx.tsx` client component mounted in the root layout. You write:

```tsx
"use client";
import { useEffect } from "react";

export default function ScrollFx() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []); // ← THIS IS THE BUG
}
```

### What goes wrong

On the first page load it works perfectly. The user clicks a `<Link>` to another page. Next.js performs a client-side navigation: `{children}` inside `<main>` swaps, but **`ScrollFx` doesn't unmount** because it lives in the root layout. The empty dep array (`[]`) means the effect never re-runs.

Result: the new page's `.reveal` elements never get observed. They sit at `opacity: 0`. **The user sees a blank page**. The content is there in the DOM — `View Source` shows it — but it's transparent.

A full reload re-mounts the layout, the effect runs against the new page's DOM, everything works. So the user reports: "nothing shows until I reload."

This is the kind of bug where the fix is one character and the diagnosis is everything.

### The fix

Add `usePathname()` to the dependency array. Every navigation changes the pathname, which retriggers the effect, which disconnects the old observer and sets up a new one against the current page's DOM.

```tsx
"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFx() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]); // ← re-bind on every route change
}
```

### The general rule

**Any global side effect mounted in the root layout that queries the DOM must depend on `pathname`.** This includes:

- IntersectionObservers for scroll reveal, lazy-loading, analytics view tracking
- `[data-*]` attribute scanners that set up listeners
- Parallax scroll handlers that cache element references
- Anything that does `document.querySelectorAll(...)` inside `useEffect`

Without this dep, all of those silently break after the first navigation.

### A symptom you'll often misdiagnose

A common report is "there's a big void space at the top of [some pages]". The user assumes you forgot an image or have a stray padding. The actual cause is almost always: the top section is wrapped in `.reveal` or sits inside an element with `opacity: 0`, and the observer isn't firing. The content is there — it's transparent. Inspect element to confirm: if you see the text in the DOM but with `opacity: 0` in computed styles, this is the bug.

---

## 8. Verification checklist

Before declaring the conversion done:

### Build-time checks

- [ ] `tsc --noEmit` — zero errors. Strict mode on.
- [ ] `npm run lint` — clean. False-positive rules either fixed in source or explicitly disabled in config (with comment explaining why).
- [ ] `npm run build` — all routes prerender as static (`○ (Static)` in the route table). If any route shows `λ (Dynamic)`, find out why — usually an accidental call to `cookies()` / `headers()` / `searchParams` inside a server component.

### Runtime checks (dev server + side-by-side)

1. Run the static source separately: `cd source-site && python3 -m http.server 8080`.
2. Run Next.js: `npm run dev` (default :3000).
3. Compare each route at four widths: **1440 / 1024 / 720 / 480**. Most breakpoints fire at one of those.

### Interaction checks (don't skip — these are where the IntersectionObserver bug hides)

- **Navigate to every page via in-app links, not by typing the URL.** If reveal animations don't fire on the second page you visit, see Section 7.
- **Mobile menu** — opens, closes on link click, body scroll locks while open.
- **Sticky nav blur** — scroll past 12px on any page.
- **Accordion** — open one item, open another, both should animate.
- **Filter buttons** — click each, confirm transitions are clean (no layout jump).
- **Forms** — submit each one, confirm the redirect/toast/network call works as expected.
- **Anchor links** (e.g. `/services#mobile`) — should scroll to the right block after navigation.

### Console

- **Zero errors and zero warnings** in the dev console. Hydration warnings are common and usually mean: text whose rendering depends on `Date.now()` / `Math.random()` / the user's locale was rendered on the server, then differed on the client. Move any such dynamic value into `useEffect`.

### Lighthouse

- Run on production build (`npm run build && npm start`), not dev (dev mode is intentionally slower).
- Most static marketing sites should hit 95+ on all four scores. If yours doesn't, the usual suspects are oversized images (use `next/image`) or render-blocking external scripts.

---

## 9. Common pitfalls, quick reference

| Symptom                                                       | Likely cause                                                                                                                   |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Content appears blank, "fixes" itself on reload               | IntersectionObserver effect missing `usePathname` in deps (Section 7)                                                          |
| Heading text invisible at top of certain pages                | Same bug — `.reveal` not getting `.is-visible` class                                                                           |
| Hydration warning in console                                  | Server-rendered text differs from client. Often `Date.now()` or browser-only API in a server component                         |
| Mobile menu opens but body still scrolls                      | Forgot to set `document.body.style.overflow = "hidden"` in the open-state effect                                               |
| Popup blocked when submitting a form                          | `window.open` called asynchronously (after `await` or in a `setTimeout`). Must be synchronous inside the submit handler        |
| Fonts flash on first load                                     | Using `@import url(https://fonts.googleapis.com/...)` instead of `next/font/google`                                            |
| `<Link>` to `mailto:` throws at runtime                       | Use `<a>` for non-route URLs (mailto, tel, wa.me, anything external)                                                           |
| ESLint fails on every page with `react/no-unescaped-entities` | Marketing copy uses apostrophes. Either escape with `&apos;` or disable the rule (Section 4)                                   |
| Tailwind utilities like `bg-accent` not working               | Forgot to declare the token in `@theme` block, or used `var(--accent)` (CSS var) instead of a literal value                    |
| Build complains about `cookies()` / dynamic rendering         | A server component (or one of its imports) imported a module that calls a dynamic API. Trace the import chain                  |
| Styles "look slightly different" from source                  | Tailwind's preflight reset is changing base element styles. Either accept it or override the affected elements in your own CSS |

---

## 10. The one-line summary

**Treat the conversion as a translation, not a redesign.** Inventory first. Pick a styling strategy and stay there. Port DOM-mutating JS to React state declaratively. Mount global side effects in the root layout but make them depend on `usePathname` so they re-bind on every navigation. Verify by clicking, not by URL-typing.

The IntersectionObserver / `usePathname` bug in Section 7 is the single most common production-breaking issue with this kind of conversion. If you remember nothing else from this guide, remember that one.
