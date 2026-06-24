import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import PageHead from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Book Appointment — Kutie's Beauty Lounge",
  description:
    "Reserve your chair in three quick steps. Pick a service, choose a date and time, and we'll send confirmations by text and email.",
};

export default function BookingPage() {
  return (
    <>
      <PageHead
        crumbs="Book Appointment"
        title="Reserve your <em>chair.</em>"
        sub="Three quick steps and you're set. We'll text and email confirmations."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
