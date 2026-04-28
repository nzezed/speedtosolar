type T = {
  name: string;
  title: string;
  city: string;
  lead: string;
  leadCost: number;
  commission: number;
  quote: string;
};

const TESTIMONIALS: T[] = [
  { name: "John Castellanos", title: "Solar Consultant · Ascend Energy", city: "Phoenix, AZ",
    lead: "Credit-Verified", leadCost: 500, commission: 8000,
    quote: "Bought one credit-verified lead on Tuesday, closed it Thursday. $500 in, $8,000 out. I don't know why I ever cold-called." },
  { name: "Marcus Pereira", title: "Closer · Solaris Group", city: "Tampa, FL",
    lead: "Direct-Mail", leadCost: 250, commission: 6400,
    quote: "The AI brief called out their rate hike objection before I even knocked. Walked in, handled it in 30 seconds, signed that night." },
  { name: "Heather Nguyen", title: "Owner · Sunbelt Solar Co.", city: "Las Vegas, NV",
    lead: "Meta Appt", leadCost: 150, commission: 4200,
    quote: "My whole team runs on speedtosolar now. We canceled three vendors. Cost per close dropped 62% in the first month." },
  { name: "David Morales", title: "Sr. Energy Advisor", city: "Austin, TX",
    lead: "Credit-Verified", leadCost: 500, commission: 11200,
    quote: "$500 lead, 18.5kW system, $11,200 commission. The homeowner was already educated — I basically just confirmed paperwork." },
  { name: "Priya Shah", title: "Solar Rep · Helios Power", city: "San Diego, CA",
    lead: "Direct-Mail", leadCost: 250, commission: 7200,
    quote: "I used to buy garbage leads off Facebook agencies. Speedtosolar leads actually pick up the phone. Night and day." },
  { name: "Tyler Brooks", title: "Team Lead · Radiant Solar", city: "Denver, CO",
    lead: "Credit-Verified", leadCost: 500, commission: 9600,
    quote: "Paid the $250 admission on a Monday. Closed my first deal by Friday. The marketplace is already paying my rent." },
  { name: "Jessica Reyes", title: "Independent Closer", city: "Salt Lake City, UT",
    lead: "Meta Appt", leadCost: 150, commission: 5800,
    quote: "$150 lead. $5,800 commission. I've been in this game 6 years and I've never seen ROI like this. It's not even close." },
  { name: "Jorge Ramirez", title: "Solar Specialist", city: "Albuquerque, NM",
    lead: "Direct-Mail", leadCost: 250, commission: 6900,
    quote: "The territory autopilot claims leads for me while I'm on other calls. Wake up to 4 pre-qualified appointments every morning." },
  { name: "Sarah Lindholm", title: "Regional Manager", city: "Sacramento, CA",
    lead: "Credit-Verified", leadCost: 500, commission: 14500,
    quote: "Closed a 22kW commercial-residential hybrid off a single $500 lead. $14,500 commission. That's one lead. One." },
  { name: "Kevin Foster", title: "Solar Consultant", city: "Orlando, FL",
    lead: "Meta Appt", leadCost: 150, commission: 4800,
    quote: "Every lead has FICO pre-flagged and utility bill attached. I stopped wasting time on window shoppers months ago." },
  { name: "Diana Kim", title: "Owner · Skyline Energy", city: "Scottsdale, AZ",
    lead: "Direct-Mail", leadCost: 250, commission: 8200,
    quote: "My 3 reps bought 27 leads last month. Closed 11. The math is stupid in our favor. I'm buying more seats." },
  { name: "Devin Okafor", title: "Closer · PowerPath", city: "Charlotte, NC",
    lead: "Credit-Verified", leadCost: 500, commission: 10400,
    quote: "I was skeptical of the $250 admission. Broke even on lead #2. Everything after that is pure profit." },
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  return (
    <div className="h-12 w-12 rounded-full bg-muted border border-border flex items-center justify-center font-display text-sm text-foreground/70 flex-shrink-0">
      {initials}
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-border bg-card">
      {TESTIMONIALS.map((t, i) => {
        const roi = Math.round((t.commission / t.leadCost) * 10) / 10;
        return (
          <div
            key={t.name}
            className={`p-7 border-border ${
              i % 3 !== 2 ? "md:border-r" : ""
            } ${i < TESTIMONIALS.length - 3 ? "border-b" : ""} ${
              i % 2 === 1 ? "md:bg-muted/40" : ""
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <Avatar name={t.name} />
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.title}</div>
                <div className="font-mono-ui text-[10px] text-muted-foreground tracking-wide mt-0.5">{t.city}</div>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-foreground/85 mb-5">"{t.quote}"</p>
            <div className="grid grid-cols-3 gap-0 border border-border">
              <div className="p-2.5 border-r border-border">
                <div className="font-mono-ui text-[9px] tracking-[0.12em] uppercase text-muted-foreground">Lead</div>
                <div className="font-display text-base text-ink">${t.leadCost}</div>
              </div>
              <div className="p-2.5 border-r border-border">
                <div className="font-mono-ui text-[9px] tracking-[0.12em] uppercase text-muted-foreground">Comm.</div>
                <div className="font-display text-base text-ink">${t.commission.toLocaleString('en-US')}</div>
              </div>
              <div className="p-2.5 bg-sun text-sun-foreground">
                <div className="font-mono-ui text-[9px] tracking-[0.12em] uppercase opacity-80">ROI</div>
                <div className="font-display text-base">{roi}×</div>
              </div>
            </div>
            <div className="font-mono-ui text-[10px] text-muted-foreground tracking-[0.12em] uppercase mt-3">
              · {t.lead} Lead
            </div>
          </div>
        );
      })}
    </div>
  );
}