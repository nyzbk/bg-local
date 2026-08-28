import { FAQ, HOME_FAQ } from "@/lib/constants";

type Item = { q: string; a: string };

export function Faq({
  items,
  title = "Questions",
}: {
  items?: readonly Item[];
  title?: string;
}) {
  const list = items ?? FAQ;
  return (
    <section className="mt-14">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4 divide-y divide-border rounded-card border border-border bg-surface">
        {list.map((item) => (
          <details key={item.q} className="group px-4 py-1">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-2 text-sm font-medium">
              {item.q}
              <span className="text-muted transition-transform duration-150 group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HomeFaq() {
  return <Faq items={HOME_FAQ} title="Quick answers" />;
}
