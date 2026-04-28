import { useEffect, useState } from "react";

const SEED: { name: string; city: string; tier: string; commission: number; ago: number }[] = [
  { name: "James W.", city: "Phoenix, AZ", tier: "Credit Verified", commission: 8100, ago: 2 },
  { name: "Maria G.", city: "Houston, TX", tier: "Direct-mail", commission: 6400, ago: 7 },
  { name: "David M.", city: "Dallas, TX", tier: "Meta Appt", commission: 4200, ago: 14 },
  { name: "Sarah L.", city: "Austin, TX", tier: "Credit Verified", commission: 11200, ago: 22 },
  { name: "Michael R.", city: "Las Vegas, NV", tier: "Direct-Mail", commission: 7200, ago: 31 },
  { name: "Linda K.", city: "Tampa, FL", tier: "Meta Appt", commission: 5800, ago: 44 },
  { name: "Robert P.", city: "Orlando, FL", tier: "Credit Verified", commission: 9600, ago: 58 },
  { name: "Jennifer S.", city: "Denver, CO", tier: "Direct-Mail", commission: 6900, ago: 73 },
  { name: "William T.", city: "Salt Lake City, UT", tier: "Meta Appt", commission: 4800, ago: 92 },
  { name: "Elizabeth C.", city: "Albuquerque, NM", tier: "Credit Verified", commission: 10400, ago: 115 },
];

type Deal = { name: string; city: string; tier: string; commission: number; ago: number };

const FIRST = ["James","Maria","David","Sarah","Michael","Linda","Robert","Jennifer","William","Elizabeth","Thomas","Patricia","Charles","Susan","Anthony","Jessica","Brian","Amanda","Kevin","Melissa","Carlos","Rachel","Diana","Marcus","Heather","Tyler","Jorge","Priya","Devin","Nadia"];
const LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez","Hernandez","Wilson","Anderson","Taylor","Moore","Jackson","Lee","Thompson","White","Patel","Nguyen","Foster","Reyes","Kim"];
const CITIES = [["Phoenix","AZ"],["Houston","TX"],["Dallas","TX"],["Austin","TX"],["Las Vegas","NV"],["Tampa","FL"],["Orlando","FL"],["Denver","CO"],["Salt Lake City","UT"],["Albuquerque","NM"],["Riverside","CA"],["San Antonio","TX"],["Fort Worth","TX"],["Mesa","AZ"],["Scottsdale","AZ"],["Colorado Spgs","CO"],["Tucson","AZ"],["Bakersfield","CA"],["Fresno","CA"],["San Diego","CA"],["Sacramento","CA"],["Jacksonville","FL"],["Miami","FL"],["Reno","NV"]];
const TIERS = [
  { label: "Meta Appt", cls: "bg-muted text-foreground border-border", price: 150 },
  { label: "Direct-Mail", cls: "bg-muted text-foreground border-border", price: 250 },
  { label: "Credit Verified", cls: "bg-ink text-ivory border-ink", price: 500 },
];
const COMMISSIONS = [4200, 5800, 6400, 7200, 8100, 8900, 9600, 10400, 11200, 12800, 14500];

function rnd<T>(a: T[]) { return a[Math.floor(Math.random() * a.length)]; }
function timeAgo(mins: number) {
  if (mins < 1) return "just now";
  if (mins < 60) return `${Math.floor(mins)}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function makeDeal(ago: number, isNew = false): Deal & { isNew?: boolean } {
  const tier = rnd(TIERS);
  return {
    name: `${rnd(FIRST)} ${rnd(LAST)[0]}.`,
    city: rnd(CITIES).join(", "),
    tier: tier.label,
    commission: rnd(COMMISSIONS),
    ago,
    isNew,
  };
}

export function LiveTicker() {
  const [deals, setDeals] = useState<(Deal & { isNew?: boolean })[]>(() => SEED);

 useEffect(() => {
    // Pacing: ~15 deals/day → roughly 1 new deal every ~90 min on average.
    // Poll every 45s with a small probability so the feed still feels alive
    // within a session but doesn't explode the counters.
    const i = setInterval(() => {
      if (Math.random() < 0.008) {
        setDeals((prev) => {
          const next = [makeDeal(0, true), ...prev.slice(0, 11).map((d) => ({ ...d, ago: d.ago + 45, isNew: false }))];
          return next;
        });
      }
    }, 45000);
    // Age existing rows every minute so timestamps advance naturally.
    const j = setInterval(() => {
      setDeals((prev) => prev.map((d) => ({ ...d, ago: d.ago + 1, isNew: false })));
    }, 60000);
    return () => { clearInterval(i); clearInterval(j); };
  }, []);

  return (
    <div className="bg-card border border-border">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-ink text-ivory">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-live live-dot" />
          <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase">Live Marketplace Feed</span>
        </div>
        <span className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-ivory/50">Deals Closed Today</span>
      </div>
      <div className="divide-y divide-border">
        {deals.map((d, i) => (
          <div key={`${d.name}-${i}-${d.ago}`} className={`grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-5 py-3 ${d.isNew ? "ticker-new" : ""}`}>
            <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center font-mono-ui text-[10px] font-semibold text-foreground/70">
              {d.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{d.name} <span className="text-muted-foreground font-normal">· {d.city}</span></div>
              <div className="font-mono-ui text-[10px] text-muted-foreground tracking-wide">Closed · ${d.commission.toLocaleString('en-US')} commission</div>
            </div>
            <span className="hidden sm:inline-block font-mono-ui text-[9px] tracking-[0.12em] uppercase px-2 py-1 border border-border text-foreground/70">{d.tier}</span>
            <span className="font-mono-ui text-[10px] text-muted-foreground tabular-nums w-14 text-right">{timeAgo(d.ago)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}