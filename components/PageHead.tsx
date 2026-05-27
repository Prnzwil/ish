import Reveal from "@/components/Reveal";

type Props = {
  crumbs?: string;
  title: string;
  sub?: string;
  bg?: string;
};

export default function PageHead({ crumbs, title, sub, bg }: Props) {
  const style: React.CSSProperties | undefined = bg
    ? {
        background: `linear-gradient(180deg, rgba(246,239,230,0.65) 0%, rgba(246,239,230,0.95) 70%, var(--cream) 100%), url(${bg}) center/cover`,
      }
    : undefined;
  return (
    <section className="page-head" style={style}>
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
