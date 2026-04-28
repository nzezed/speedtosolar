import { useState } from "react";

const STATES: { n: string; code: string; t: number }[] = [
  { n: "California", code: "CA", t: 94 },
  { n: "Texas", code: "TX", t: 100 },
  { n: "Florida", code: "FL", t: 87 },
  { n: "Arizona", code: "AZ", t: 100 },
  { n: "Nevada", code: "NV", t: 82 },
  { n: "New Jersey", code: "NJ", t: 79 },
  { n: "New York", code: "NY", t: 74 },
  { n: "Colorado", code: "CO", t: 68 },
  { n: "North Carolina", code: "NC", t: 61 },
  { n: "Georgia", code: "GA", t: 55 },
  { n: "Massachusetts", code: "MA", t: 71 },
  { n: "Maryland", code: "MD", t: 48 },
  { n: "Virginia", code: "VA", t: 57 },
  { n: "Illinois", code: "IL", t: 43 },
  { n: "Ohio", code: "OH", t: 38 },
  { n: "Pennsylvania", code: "PA", t: 46 },
  { n: "Washington", code: "WA", t: 66 },
  { n: "Oregon", code: "OR", t: 41 },
  { n: "Utah", code: "UT", t: 88 },
  { n: "New Mexico", code: "NM", t: 31 },
  { n: "South Carolina", code: "SC", t: 35 },
  { n: "Tennessee", code: "TN", t: 29 },
  { n: "Hawaii", code: "HI", t: 76 },
  { n: "Connecticut", code: "CT", t: 60 },
  { n: "Minnesota", code: "MN", t: 23 },
];

export function StateGrid() {
  const [sel, setSel] = useState<string | null>(null);
  const totalActive = STATES.reduce((s, x) => s + x.t, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          <span className="text-sun font-semibold">{totalActive}</span> / 2,500 seats claimed · Select your state
        </span>
        <span className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground hidden sm:inline">100 seats per state</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {STATES.map((s) => {
          const rem = 100 - s.t;
          const full = rem <= 0;
          const crit = rem > 0 && rem <= 5;
          const low = rem > 5 && rem <= 15;
          const isSel = sel === s.n;
          const barColor = full ? "bg-live" : s.t >= 85 ? "bg-sun" : s.t >= 60 ? "bg-sun/70" : "bg-success/80";
          return (
            <button
              key={s.n}
              disabled={full}
              onClick={() => setSel(s.n)}
              className={`text-left p-3 border transition-all ${
                full
                  ? "border-border bg-muted/50 opacity-60 cursor-not-allowed"
                  : isSel
                  ? "border-ink bg-ink text-ivory"
                  : "border-border bg-card hover:border-ink"
              }`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-semibold truncate">{s.n}</span>
                <span className={`font-mono-ui text-[9px] ${isSel ? "text-ivory/60" : "text-muted-foreground"}`}>{s.code}</span>
              </div>
              <div className={`h-1 w-full ${isSel ? "bg-ivory/20" : "bg-muted"} mb-2 overflow-hidden`}>
                <div className={`h-full ${barColor}`} style={{ width: `${s.t}%` }} />
              </div>
              <div className={`font-mono-ui text-[10px] tracking-wide ${
                full ? "text-live font-semibold" :
                crit ? "text-live" :
                low ? "text-sun" :
                isSel ? "text-ivory/70" : "text-muted-foreground"
              }`}>
                {full ? "CLOSED" : `${rem} seats left`}
              </div>
            </button>
          );
        })}
      </div>
      {sel && (
        <div className="mt-5 p-4 border border-ink bg-ink text-ivory flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-ivory/50 mb-1">Selected Territory</div>
            <div className="font-display text-xl">{sel}</div>
          </div>
          <a href="#admission" className="font-mono-ui text-xs tracking-[0.14em] uppercase bg-sun text-sun-foreground px-5 py-3 font-semibold hover:bg-sun/90 transition">
            Claim Seat — $250 →
          </a>
        </div>
      )}
    </div>
  );
}