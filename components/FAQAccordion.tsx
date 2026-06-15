import { FAQItem } from "@/lib/types";

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="rounded-[1.75rem] border border-white/60 bg-panel px-6 py-5 shadow-soft open:bg-white"
          open={index === 0}
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 pr-1 text-lg font-semibold tracking-tight text-primary">
            <span>{item.question}</span>
            <span className="mt-0.5 text-secondary">+</span>
          </summary>
          <p className="mt-4 max-w-3xl text-base leading-8 text-foreground-muted">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
