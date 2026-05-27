type Props = {
  items: readonly string[];
};

export default function Marquee({ items }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
