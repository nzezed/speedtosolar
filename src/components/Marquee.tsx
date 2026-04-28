const ITEMS = [
  "John C. · Phoenix, AZ · $500 lead → $8,000 close",
  "Marcus P. · Tampa, FL · $150 lead → $6,400 close",
  "Priya S. · San Diego, CA · $150 lead → $7,200 close",
  "Sarah L. · Sacramento, CA · $500 lead → $14,500 close",
  "Jessica R. · SLC, UT · $150 lead → $5,800 close",
  "Tyler B. · Denver, CO · $500 lead → $9,600 close",
  "Diana K. · Scottsdale, AZ · $150 lead → $8,200 close",
  "Devin O. · Charlotte, NC · $500 lead → $10,400 close",
  "Heather N. · Las Vegas, NV · $150 lead → $4,200 close",
  "David M. · Austin, TX · $500 lead → $11,200 close",
];

export function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-ink text-ivory border-y border-ink/50 overflow-hidden relative">
      <div className="flex items-center gap-2 py-3">
        <div className="shrink-0 pl-6 pr-4 flex items-center gap-2 bg-sun text-sun-foreground py-3 -my-3 font-mono-ui text-[10px] tracking-[0.2em] uppercase font-bold">
          <span className="h-2 w-2 rounded-full bg-sun-foreground live-dot" />
        </div>
        <div className="flex gap-10 whitespace-nowrap marquee-track font-mono-ui text-xs tracking-wide">
          {doubled.map((it, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{it}</span>
              <span className="text-sun">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}