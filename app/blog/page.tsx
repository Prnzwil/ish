import type { Metadata } from "next";
import NewsletterForm from "@/components/NewsletterForm";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal — Kutie's Beauty Lounge",
  description:
    "Beauty tips, hair-care guides, and stories from the chair — written by the Kutie team for the curious.",
};

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured);
  const rest = BLOG_POSTS.filter((p) => !p.featured);
  return (
    <>
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
                  <div
                    className="blog-img"
                    style={{ backgroundImage: `url(${featured.img})` }}
                  ></div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>{featured.cat}</span>
                      <span className="dot"></span>
                      <span>{featured.read}</span>
                    </div>
                    <h3>{featured.title}</h3>
                    <p style={{ marginTop: 12 }}>{featured.excerpt}</p>
                    <a href="#" className="read-more" style={{ marginTop: 24 }}>
                      Read Article
                    </a>
                  </div>
                </article>
              </Reveal>
            )}
            {rest.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="blog-card">
                  <div className="blog-img" style={{ backgroundImage: `url(${p.img})` }}></div>
                  <div className="blog-body">
                    <div className="blog-meta">
                      <span>{p.cat}</span>
                      <span className="dot"></span>
                      <span>{p.read}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p style={{ marginTop: 12 }}>{p.excerpt}</p>
                    <a href="#" className="read-more" style={{ marginTop: 18 }}>
                      Read More
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div
              style={{
                marginTop: 80,
                background: "var(--blush)",
                borderRadius: "var(--radius-lg)",
                padding: "60px 50px",
                display: "grid",
                gridTemplateColumns: "1.3fr 1fr",
                gap: 40,
                alignItems: "center",
              }}
              className="newsletter-block"
            >
              <div>
                <span className="eyebrow">Weekly Notes</span>
                <h2 style={{ marginTop: 14 }}>
                  Beauty rituals,<br />
                  <em className="serif-i">in your inbox.</em>
                </h2>
                <p style={{ color: "var(--soft-brown)", marginTop: 14, maxWidth: 480 }}>
                  Tips, seasonal looks, and salon news. One thoughtful email a month — never more.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
