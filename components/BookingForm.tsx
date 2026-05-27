"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES, TEAM, type Service } from "@/lib/data";

type DateSlot = {
  dow: string;
  day: number;
  key: string;
  closed: boolean;
};

type Picked = {
  service: Service | null;
  date: DateSlot | null;
  time: string | null;
  stylist: string;
};

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;
const BASE_DATE = new Date(2026, 4, 27);

const BOOKING_DATES: DateSlot[] = Array.from({ length: 14 }, (_, i) => {
  const d = new Date(BASE_DATE);
  d.setDate(BASE_DATE.getDate() + i);
  return {
    dow: DOW[d.getDay()],
    day: d.getDate(),
    key: `${d.getMonth() + 1}-${d.getDate()}`,
    closed: d.getDay() === 1,
  };
});

const TIMES = ["10:00", "11:00", "12:00", "1:30", "2:30", "3:30", "4:30", "5:30", "6:30", "7:00"];
const EMPTY: Picked = { service: null, date: null, time: null, stylist: "Any" };

export default function BookingForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [picked, setPicked] = useState<Picked>(EMPTY);
  const [done, setDone] = useState(false);

  const stylistOptions = ["Any", ...TEAM.map((t) => t.name.split(" ")[0])];

  if (done) {
    return (
      <div className="shell-wide" style={{ maxWidth: 720, textAlign: "center" }}>
        <div
          style={{
            background: "var(--charcoal)",
            color: "var(--cream)",
            borderRadius: "var(--radius-lg)",
            padding: 60,
          }}
        >
          <div
            style={{
              fontSize: 56,
              color: "var(--rose-gold)",
              fontFamily: "var(--display)",
              fontStyle: "italic",
            }}
          >
            ✦
          </div>
          <h2 style={{ color: "var(--warm-white)", marginTop: 18 }}>
            Appointment <em className="serif-i">confirmed.</em>
          </h2>
          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 24,
              textAlign: "left",
            }}
          >
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Service</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>
                {picked.service?.name}
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Stylist</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>
                {picked.stylist}
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Date</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>
                {picked.date?.dow} {picked.date?.day} May 2026
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold)" }}>Time</div>
              <div style={{ fontFamily: "var(--display)", fontSize: 22, marginTop: 8 }}>
                {picked.time}
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(1);
                setPicked(EMPTY);
              }}
              className="btn btn-primary"
              style={{ background: "var(--warm-white)", color: "var(--charcoal)" }}
            >
              Book Another
            </button>
            <Link
              href="/"
              className="btn btn-secondary"
              style={{ color: "var(--warm-white)", borderColor: "rgba(251,247,241,0.7)" }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const continueDisabled =
    (step === 1 && !picked.service) || (step === 2 && (!picked.date || !picked.time));

  return (
    <div className="booking-shell">
      <div className="booking-card">
        <div className="step-indicator">
          {[1, 2, 3].map((n, i) => {
            const labels = ["i", "ii", "iii"];
            const bubbleClass =
              step === n ? "active" : step > n ? "done" : "";
            return (
              <span key={n} style={{ display: "contents" }}>
                <span className={`step-bubble ${bubbleClass}`}>
                  {step > n ? "✓" : labels[n - 1]}
                </span>
                {i < 2 && <div className={`step-line ${step > n ? "done" : ""}`}></div>}
              </span>
            );
          })}
        </div>

        {step === 1 && (
          <div>
            <span className="eyebrow">Step One</span>
            <h2 style={{ marginTop: 12, fontSize: 36 }}>
              Choose your <em className="serif-i">service.</em>
            </h2>
            <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>
              You can refine the details at the chair.
            </p>
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className={`svc-option ${picked.service?.id === s.id ? "selected" : ""}`}
                onClick={() => setPicked({ ...picked, service: s })}
              >
                <div>
                  <h4>{s.name}</h4>
                  <p>
                    {s.duration} · {s.desc.split(".")[0]}.
                  </p>
                </div>
                <span className="price">{s.from}</span>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <span className="eyebrow">Step Two</span>
            <h2 style={{ marginTop: 12, fontSize: 36 }}>
              Pick a <em className="serif-i">date & time.</em>
            </h2>
            <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>
              Showing the next two weeks at our salon.
            </p>
            <div className="date-grid">
              {BOOKING_DATES.map((d) => (
                <button
                  type="button"
                  key={d.key}
                  className={`date-btn ${picked.date?.key === d.key ? "selected" : ""}`}
                  disabled={d.closed}
                  style={d.closed ? { opacity: 0.35, cursor: "not-allowed" } : undefined}
                  onClick={() => !d.closed && setPicked({ ...picked, date: d })}
                >
                  <div className="dow">{d.dow}</div>
                  <div className="day">{d.day}</div>
                </button>
              ))}
            </div>
            <div className="eyebrow" style={{ marginTop: 12, marginBottom: 12 }}>
              Available Times
            </div>
            <div className="time-grid">
              {TIMES.map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`time-btn ${picked.time === t ? "selected" : ""}`}
                  onClick={() => setPicked({ ...picked, time: t })}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="eyebrow" style={{ marginTop: 28, marginBottom: 12 }}>
              Preferred Stylist
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {stylistOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setPicked({ ...picked, stylist: opt })}
                  className={`time-btn ${picked.stylist === opt ? "selected" : ""}`}
                  style={{ flex: "0 0 auto", padding: "10px 18px" }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <span className="eyebrow">Step Three</span>
            <h2 style={{ marginTop: 12, fontSize: 36 }}>
              Your <em className="serif-i">details.</em>
            </h2>
            <p style={{ color: "var(--soft-brown)", marginTop: 12, marginBottom: 28 }}>
              We'll send confirmations to both.
            </p>
            <div className="field-row">
              <div className="field">
                <label htmlFor="bk-name">Name</label>
                <input id="bk-name" placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="bk-phone">Phone</label>
                <input id="bk-phone" placeholder="(647) 000-0000" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="bk-email">Email</label>
              <input id="bk-email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="bk-notes">Notes (Optional)</label>
              <textarea
                id="bk-notes"
                rows={3}
                placeholder="Anything we should know before your appointment…"
              />
            </div>
          </div>
        )}

        <div className="booking-step-nav">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
              className="btn btn-secondary"
            >
              ← Back
            </button>
          ) : (
            <span></span>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s === 1 ? 2 : 3))}
              className="btn btn-primary"
              disabled={continueDisabled}
              style={continueDisabled ? { opacity: 0.4, pointerEvents: "none" } : undefined}
            >
              Continue →
            </button>
          ) : (
            <button type="button" onClick={() => setDone(true)} className="btn btn-primary">
              Confirm Booking
            </button>
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
        <p
          style={{
            marginTop: 18,
            fontSize: 12,
            color: "rgba(251,247,241,0.5)",
            letterSpacing: "0.02em",
          }}
        >
          Final pricing confirmed during in-chair consultation. 24h cancellation policy applies.
        </p>
      </div>
    </div>
  );
}
