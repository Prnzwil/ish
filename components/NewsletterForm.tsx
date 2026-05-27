"use client";

export default function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: "flex", gap: 10 }}
    >
      <input
        type="email"
        placeholder="Your email"
        aria-label="Your email"
        style={{
          flex: 1,
          padding: "16px 22px",
          borderRadius: 999,
          border: "1px solid var(--line)",
          background: "var(--warm-white)",
          fontFamily: "var(--body)",
          fontSize: 15,
        }}
      />
      <button type="submit" className="btn btn-primary">
        Subscribe
      </button>
    </form>
  );
}
