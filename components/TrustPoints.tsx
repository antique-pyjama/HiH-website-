type TrustPoint = {
  title: string;
  description: string;
  number: string;
};

type TrustPointsProps = {
  points: TrustPoint[];
};

export function TrustPoints({ points }: TrustPointsProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {points.map((point) => (
        <article key={point.title} className="rounded-[2rem] bg-panel px-7 py-8 shadow-soft">
          <p className="font-heading text-4xl font-extrabold tracking-tight text-primary">
            {point.number}
          </p>
          <h3 className="mt-5 text-2xl font-bold tracking-tight text-primary">{point.title}</h3>
          <p className="mt-4 text-base leading-7 text-foreground-muted">{point.description}</p>
        </article>
      ))}
    </div>
  );
}
