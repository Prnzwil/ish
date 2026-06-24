"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/data";

type FormState = {
  name: string;
  phone: string;
  email: string;
  service: string;
  msg: string;
};

const EMPTY: FormState = { name: "", phone: "", email: "", service: "", msg: "" };

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <form className="contact-form">
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <div
            style={{
              fontSize: 60,
              color: "var(--rose-gold)",
              fontFamily: "var(--display)",
              fontStyle: "italic",
            }}
          >
            ✦
          </div>
          <h3 style={{ marginTop: 18 }}>Thank you, {form.name || "friend"}.</h3>
          <p
            style={{
              color: "var(--soft-brown)",
              marginTop: 14,
              maxWidth: 380,
              marginInline: "auto",
            }}
          >
            Your message is on its way to us. We'll be in touch soon — usually within a few hours.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setForm(EMPTY);
            }}
            className="btn btn-secondary"
            style={{ marginTop: 28 }}
          >
            Send Another
          </button>
        </div>
      </form>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <span className="eyebrow">Send A Message</span>
      <h3 style={{ marginTop: 12, marginBottom: 32 }}>
        Tell us about your <em className="serif-i">visit.</em>
      </h3>
      <div className="field-row">
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            value={form.name}
            onChange={update("name")}
            placeholder="Your name"
            required
          />
        </div>
        <div className="field">
          <label htmlFor="cf-phone">Phone</label>
          <input
            id="cf-phone"
            value={form.phone}
            onChange={update("phone")}
            placeholder="+234 812 441 6681"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="cf-service">Service Interested In</label>
        <select id="cf-service" value={form.service} onChange={update("service")}>
          <option value="">Choose a service…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea
          id="cf-msg"
          rows={4}
          value={form.msg}
          onChange={update("msg")}
          placeholder="Tell us about the look you have in mind…"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: "100%", justifyContent: "center", marginTop: 14 }}
      >
        Send Message
      </button>
    </form>
  );
}
