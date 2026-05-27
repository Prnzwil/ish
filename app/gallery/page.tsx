import type { Metadata } from "next";
import FinalCta from "@/components/FinalCta";
import GalleryFilter from "@/components/GalleryFilter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery — Ish Hair & Beauty Salon",
  description:
    "Real clients, real chairs, real transformations — a portfolio of looks captured at our Oshawa salon.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHead
        crumbs="Gallery"
        title="A portfolio of <em>looks.</em>"
        sub="Real clients, real chairs, real transformations — captured in our Oshawa salon."
      />
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="shell-wide">
          <Reveal>
            <GalleryFilter />
          </Reveal>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
