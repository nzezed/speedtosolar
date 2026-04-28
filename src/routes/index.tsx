import { createFileRoute } from "@tanstack/react-router";
import { LiveTicker } from "@/components/LiveTicker";
import { StateGrid } from "@/components/StateGrid";
import { Testimonials } from "@/components/Testimonials";
import { Marquee } from "@/components/Marquee";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Speedtosolar — The Live Solar Leads Marketplace" },
      { name: "description", content: "Pre-qualified solar leads and appointments, bought and closed live. $250 admission. $49/mo. Reps are closing $4K–$14K commissions today." },
      { property: "og:title", content: "Speedtosolar — The Live Solar Leads Marketplace" },
      { property: "og:description", content: "Buy pre-qualified solar leads. Close $4K–$14K commissions. Marketplace is live — 2,500 seats across 25 states." },
    ],
  }),
  component: Index,
});

function LiveCounter() {
  const [active, setActive] = useState(847);
  const [closed, setClosed] = useState(1284);
  const [commission, setCommission] = useState(4927400);
  useEffect(() => {
    // Target pacing: ~$100K/day in commissions, ~15 deals/day.
    // Active-closers count drifts slightly; deals/commissions tick up rarely.
    // ~15 deals/day ≈ 1 deal every ~96 minutes. We fire a check every 30s
    // with a small probability so the number ticks up a few times per session.
    const activeTick = setInterval(() => {
      setActive((a) => a + (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.8 ? 2 : 1));
    }, 6000);
    const dealTick = setInterval(() => {
      // ~0.5% chance per 30s → roughly 1 deal every ~100 min on average
      if (Math.random() < 0.005) {
        setClosed((c) => c + 1);
        // Avg commission ~$6,800 → keeps daily total near $100K at ~15 deals/day
        setCommission((c) => c + 4000 + Math.floor(Math.random() * 6000));
      }
    }, 30000);
    return () => { clearInterval(activeTick); clearInterval(dealTick); };
  }, []);
  return { active, closed, commission };
}

// ─── FLOATING CONTACT WIDGET ────────────────────────────────────────────────
function FloatingContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleWidget = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating panel */}
      <div
        className={`mb-4 transition-all duration-300 ease-out ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 border-b border-amber-100">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-display font-bold text-ink text-lg">Talk to Us</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-mono-ui text-emerald-700">Available now</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">5–10 min · no pressure · just answers</p>
          </div>

          {/* Body with contact options */}
          <div className="p-3 space-y-1">
            {/* Call */}
            <a
              href="tel:+13362665679"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-sun/20 flex items-center justify-center text-sun group-hover:bg-sun/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.27-.52a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <div>
                <div className="font-mono-ui text-xs font-semibold text-ink">Call us now</div>
                <div className="text-sm text-gray-500">+1 336 266 5679</div>
              </div>
            </a>

            {/* Email Burak */}
            <a
              href="mailto:b@speedtosolar.com?subject=Demo%20Request%20%E2%80%94%20S2S&body=Hi%20Burak%2C%0A%0AI'd%20love%20to%20book%20a%20quick%205-10%20min%20call%20to%20learn%20more%20about%20S2S.%0A%0AMy%20name%3A%20%0AMy%20state%3A%20%0ABest%20time%20to%20reach%20me%3A%20"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-sun/20 flex items-center justify-center text-sun group-hover:bg-sun/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="font-mono-ui text-xs font-semibold text-ink">Email Burak</div>
                <div className="text-sm text-gray-500">b@speedtosolar.com</div>
              </div>
            </a>

            {/* Email Parrish */}
            <a
              href="mailto:p@speedtosolar.com?subject=Demo%20Request%20%E2%80%94%20S2S&body=Hi%20Parrish%2C%0A%0AI'd%20love%20to%20book%20a%20quick%205-10%20min%20call%20to%20learn%20more%20about%20S2S.%0A%0AMy%20name%3A%20%0AMy%20state%3A%20%0ABest%20time%20to%20reach%20me%3A%20"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-sun/20 flex items-center justify-center text-sun group-hover:bg-sun/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="font-mono-ui text-xs font-semibold text-ink">Email Parrish</div>
                <div className="text-sm text-gray-500">p@speedtosolar.com</div>
              </div>
            </a>

            <div className="border-t border-gray-100 my-2"></div>

            {/* SMS */}
            <a
              href="sms:+13362665679&body=Hey%20S2S%20team%2C%20I%20have%20a%20quick%20question%20about%20the%20platform%3A%20"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition group"
            >
              <div className="w-10 h-10 rounded-full bg-sun/20 flex items-center justify-center text-sun group-hover:bg-sun/30">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                </svg>
              </div>
              <div>
                <div className="font-mono-ui text-xs font-semibold text-ink">Text us a question</div>
                <div className="text-sm text-gray-500">Quick questions welcome</div>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-4 py-2 text-center text-[10px] text-gray-400 border-t border-gray-100">
            Typically responds within a few hours · speedtosolar.com
          </div>
        </div>
      </div>

      {/* Trigger button */}
      <button
        onClick={toggleWidget}
        className="relative w-14 h-14 rounded-full bg-sun shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-ink hover:scale-105 focus:outline-none"
        aria-label="Contact us"
      >
        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>

        {/* Chat icon (open state) */}
        <svg
          className={`w-6 h-6 absolute transition-all duration-200 ${
            !isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>

        {/* Close icon (closed state) */}
        <svg
          className={`w-6 h-6 absolute transition-all duration-200 ${
            isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line x1="18" y1="6" x2="6" y2="18" strokeWidth={1.5} />
          <line x1="6" y1="6" x2="18" y2="18" strokeWidth={1.5} />
        </svg>
      </button>
    </div>
  );
}
// ──────────────────────────────────────────────────────────────────────────

function Index() {
  const { active, closed, commission } = LiveCounter();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ═══════ TOP NAV ═══════ */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full sun-gradient" />
            <span className="font-display text-lg tracking-tight">SPEEDTOSOLAR</span>
          </a>
          <div className="hidden md:flex items-center gap-8 font-mono-ui text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            <a href="#marketplace" className="hover:text-foreground transition">Marketplace</a>
            <a href="#proof" className="hover:text-foreground transition">Closers</a>
            <a href="#territories" className="hover:text-foreground transition">Territories</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </div>
          <a
  href="https://square.link/u/sC5iIssz"
  target="_blank"
  rel="noopener noreferrer"
  className="font-mono-ui text-[11px] tracking-[0.14em] uppercase font-semibold bg-ink text-ivory px-4 py-2 hover:bg-sun transition"
>
  Join
</a>
        </div>
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="top" className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 sun-gradient opacity-[0.08]" />
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-[1280px] mx-auto px-6 pt-16 pb-20">
          {/* LIVE banner */}
          <div className="inline-flex items-center gap-3 border border-live/40 bg-live/5 pl-2.5 pr-4 py-1.5 mb-10">
            <span className="h-2 w-2 rounded-full bg-live live-dot" />
            <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-live font-semibold">Marketplace is Live</span>
            <span className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-muted-foreground">· {active} closers online now</span>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-start">
            <div>
              <h1 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-tight mb-6">
                THE LIVE<br />
                SOLAR LEADS<br />
                <span className="text-sun">MARKETPLACE.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-[540px] mb-8 leading-relaxed">
                Pre-qualified homeowners. Credit-flagged. Utility-bill attached.
                Bought by real closers right now — and turned into{" "}
                <span className="text-foreground font-semibold">$4K–$14K commissions</span> this week.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
  href="https://square.link/u/sC5iIssz"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-3 bg-sun text-sun-foreground font-mono-ui text-sm tracking-[0.14em] uppercase font-bold px-7 py-4 hover:bg-sun/90 transition"
>
  ENTER MARKETPLACE →
</a>
                <a
  href="https://calendly.com/b-speedtosolar/30min"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sun to-amber-500 text-ink font-mono-ui text-sm tracking-[0.14em] uppercase font-bold px-7 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse"
>
  📅 CONTACT →
</a>
              </div>

              {/* LIVE STATS */}
              <div className="grid grid-cols-3 border border-border bg-card">
                <div className="p-4 border-r border-border">
                  <div className="font-display text-3xl text-ink tabular-nums">{closed.toLocaleString('en-US')}</div>
                  <div className="font-mono-ui text-[9px] tracking-[0.14em] uppercase text-muted-foreground mt-1">Deals closed · 30d</div>
                </div>
                <div className="p-4 border-r border-border">
                  <div className="font-display text-3xl text-sun tabular-nums">${(commission / 1_000_000).toFixed(2)}M</div>
                  <div className="font-mono-ui text-[9px] tracking-[0.14em] uppercase text-muted-foreground mt-1">Commissions paid · 30d</div>
                </div>
                <div className="p-4">
                  <div className="font-display text-3xl text-ink tabular-nums">{active}</div>
                  <div className="font-mono-ui text-[9px] tracking-[0.14em] uppercase text-muted-foreground mt-1">Closers online now</div>
                </div>
              </div>
            </div>

            {/* HERO LIVE TICKER */}
            <div id="marketplace">
              <LiveTicker />
              <div className="mt-3 font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground text-center">
                Updates every few seconds · Deals filtered to last 24h
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ MARQUEE ═══════ */}
      <Marquee />

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ How Speedtosolar Works</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mt-3 max-w-[700px]">
              Buy a lead. Close a deal. Repeat.
            </h2>
          </div>
          <div className="font-mono-ui text-[11px] tracking-[0.14em] uppercase text-muted-foreground">04 Steps</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-border">
          {[
            { n: "01", t: "Pay $250 admission", d: "One-time. Unlocks the marketplace and your territory. Credited back as your first $250 in lead coupons." },
            { n: "02", t: "Claim your state", d: "Lock 1 of 100 seats per state. Protects your territory from saturation. Auto-assigns matching leads." },
            { n: "03", t: "Browse & buy leads", d: "$150–$500 per lead by tier. FICO, utility bill, urgency score, AI call brief — attached to every profile." },
            { n: "04", t: "Close & collect", d: "Average commission per close: $6,800. Top 10% average $11,400. The math is already decided." },
          ].map((s, i) => (
            <div key={s.n} className={`p-7 ${i < 3 ? "md:border-r" : ""} border-border ${i < 2 ? "border-b md:border-b lg:border-b-0" : ""}`}>
              <div className="font-display text-4xl text-sun mb-5">{s.n}</div>
              <h3 className="font-semibold text-base mb-2">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ PROOF / TESTIMONIALS ═══════ */}
      <section id="proof" className="border-y border-border bg-muted/30">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ Real Closers · Real Commissions</span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mt-3 max-w-[820px]">
                They paid $250. Then they got paid.
              </h2>
              <p className="text-muted-foreground max-w-[560px] mt-4">
                Every closer below bought a lead from Speedtosolar this month and closed it.
                Screenshots, payouts, and CRM logs verified before publish.
              </p>
            </div>
            <div className="flex gap-6 font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
              <div>
                <div className="font-display text-2xl text-ink">98%</div>
                <div>Would recommend</div>
              </div>
              <div>
                <div className="font-display text-2xl text-sun">6.4×</div>
                <div>Avg ROI on a lead</div>
              </div>
            </div>
          </div>
          <Testimonials />
          <div className="mt-10 text-center font-mono-ui text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
            + 312 more closer reviews inside the dashboard
          </div>
        </div>
      </section>

      {/* ═══════ TERRITORIES / STATE GRID ═══════ */}
      <section id="territories" className="max-w-[1280px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <div className="lg:sticky lg:top-20">
            <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ Territory Protection</span>
            <h2 className="font-display text-[clamp(2.3rem,4.5vw,4rem)] leading-[0.95] mt-3 mb-5">
              100 seats.<br />Per state.<br />That's it.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Territories are capped so leads don't get resold into the ground.
              Once a state closes, it closes. <span className="text-foreground font-semibold">Arizona and Texas are already full.</span> California and Florida close this week.
            </p>
            <div className="flex gap-6 py-4 border-y border-border mb-6">
              <div>
                <div className="font-display text-3xl text-ink">25</div>
                <div className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1">States live</div>
              </div>
              <div>
                <div className="font-display text-3xl text-sun">2</div>
                <div className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1">Already closed</div>
              </div>
              <div>
                <div className="font-display text-3xl text-live">6</div>
                <div className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-1">Critical (&lt;15 left)</div>
              </div>
            </div>
            <a href="#admission" className="inline-flex items-center gap-2 font-mono-ui text-sm tracking-[0.14em] uppercase font-bold bg-ink text-ivory px-6 py-3.5 hover:bg-sun transition">
              Lock My Territory →
            </a>
          </div>
          <StateGrid />
        </div>
      </section>

      {/* ═══════ LEAD TIERS ═══════ */}
      <section className="border-y border-border bg-ink text-ivory">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ Lead Tiers</span>
          <h2 className="font-display text-[clamp(2.3rem,4.5vw,4rem)] leading-[0.95] mt-3 mb-12 text-ivory max-w-[700px]">
            Pay for the lead. Not the hope.
          </h2>
          <div className="grid md:grid-cols-3 border border-ivory/15">
            {[
              { price: "$150", name: "Meta Appt", desc: "Form-captured homeowner. Interest confirmed, appt booked.", bullets: ["Contact verified", "Appointment on calendar", "Utility zone flagged"] },
              { price: "$250", name: "Direct-Mail", desc: "Canvasser-qualified. Spoken to in person, pitch primed.", bullets: ["Homeowner confirmed", "Roof & shading photo", "Objection notes attached"] },
              { price: "$500", name: "Credit Verified", desc: "FICO-flagged, utility bill on file, AI call brief ready.", bullets: ["FICO 650+ pre-qualified", "12-mo bill history", "AI brief + likely close $"] , featured: true },
            ].map((t, i) => (
              <div key={t.name} className={`p-8 ${i < 2 ? "md:border-r" : ""} border-ivory/15 ${t.featured ? "bg-sun text-sun-foreground" : ""}`}>
                <div className="flex items-baseline justify-between mb-1">
                  <div className="font-display text-4xl">{t.price}</div>
                  {t.featured && <span className="font-mono-ui text-[9px] tracking-[0.15em] uppercase bg-sun-foreground text-sun px-2 py-1 font-bold">Top Seller</span>}
                </div>
                <div className={`font-mono-ui text-[11px] tracking-[0.15em] uppercase mb-3 ${t.featured ? "opacity-80" : "text-sun"}`}>{t.name}</div>
                <p className={`text-sm mb-5 leading-relaxed ${t.featured ? "opacity-90" : "text-ivory/60"}`}>{t.desc}</p>
                <ul className="space-y-2">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm">
                      <span className={t.featured ? "opacity-80" : "text-sun"}>◆</span>
                      <span className={t.featured ? "" : "text-ivory/80"}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="font-mono-ui text-[11px] tracking-[0.14em] uppercase text-ivory/40 mt-6 text-center">
            Lead inventory refreshes hourly · Subscribers see new drops 60 min before free tier
          </p>
        </div>
      </section>

      {/* ═══════ ADMISSION + SUBSCRIPTION ═══════ */}
      <section id="admission" className="max-w-[1280px] mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ Get In</span>
          <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[0.95] mt-3 mb-4">
            Two numbers.<br />That's the whole deal.
          </h2>
          <p className="text-muted-foreground max-w-[560px] mx-auto">
            One-time admission to get into the marketplace. One flat monthly fee to stay inside.
            Leads are priced separately per tier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-0 border border-border max-w-[920px] mx-auto bg-card">
          {/* ADMISSION */}
          <div id="pricing" className="p-10 md:border-r border-border relative">
            <div className="absolute top-4 right-4 font-mono-ui text-[10px] tracking-[0.15em] uppercase bg-live text-ivory px-2 py-1 font-bold">Required</div>
            <div className="font-mono-ui text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-3">One-Time Admission</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-6xl text-ink">$250</span>
              <span className="text-muted-foreground text-sm">· once</span>
            </div>
            <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
              Unlocks the live marketplace, your state seat, and the AI call-brief engine.
              Credited back to your account as <span className="font-semibold text-foreground">$250 in lead coupons</span>.
            </p>
            <ul className="space-y-3 mb-8">
              {["Lifetime marketplace access", "1 reserved state seat", "AI call-brief on every lead", "$250 lead credit applied day 1", "Territory autopilot included"].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="text-sun mt-0.5">◆</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
<a
  href="https://square.link/u/sC5iIssz"
  target="_blank"
  rel="noopener noreferrer"
  className="block text-center bg-sun text-sun-foreground font-mono-ui text-sm tracking-[0.14em] uppercase font-bold py-4 hover:bg-sun/90 transition"
>
  ENTER MARKETPLACE →
</a>
            <p className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-muted-foreground mt-3 text-center">
              Secure · Stripe · Refund if no leads in 14 days
            </p>
          </div>

          {/* SUBSCRIPTION */}
          <div className="p-10 bg-ink text-ivory">
            <div className="font-mono-ui text-[11px] tracking-[0.2em] uppercase text-ivory/50 mb-3">Monthly Subscription</div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-display text-6xl text-ivory">$49</span>
              <span className="text-ivory/50 text-sm">/ month</span>
            </div>
            <p className="text-ivory/60 text-sm mb-6 leading-relaxed">
              Keep your seat, your territory, and your 60-minute head start on every new lead drop.
              Cancel any time — your admission is yours forever.
            </p>
            <ul className="space-y-3 mb-8">
              {["60-min early access on new leads", "Unlimited lead browsing", "Full CRM + pipeline sync", "AI close scripts + objection maps", "Territory autopilot (always-on)", "Monthly closer leaderboard access"].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="text-sun mt-0.5">◆</span>
                  <span className="text-ivory/85">{b}</span>
                </li>
              ))}
            </ul>
            <a href="#" className="block text-center border border-ivory/30 text-ivory font-mono-ui text-sm tracking-[0.14em] uppercase font-bold py-4 hover:bg-sun hover:border-sun hover:text-sun-foreground transition">
              Add $49/mo at Checkout
            </a>
            <p className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-ivory/30 mt-3 text-center">
              Pause or cancel with one click
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <div className="font-mono-ui text-[11px] tracking-[0.15em] uppercase text-muted-foreground mb-3">
            <span className="inline-flex h-2 w-2 rounded-full bg-live live-dot mr-2 align-middle" />
            {active} reps are inside the marketplace right now
          </div>
        </div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section className="border-t border-border bg-muted/30">
        <div className="max-w-[1000px] mx-auto px-6 py-20">
          <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-sun font-semibold">/ Questions</span>
          <h2 className="font-display text-[clamp(2.3rem,4.5vw,4rem)] leading-[0.95] mt-3 mb-10">The usual ones.</h2>
          <div className="divide-y divide-border border-y border-border">
            {[
              { q: "Is the $250 refundable?", a: "No. After onboarding, there are no refunds on your admission fee." },
              { q: "What happens if my state is already full?", a: "You get waitlisted and your card isn't charged. We only release new seats when existing members cancel or get booted for bad behavior (re-selling leads, no-showing appointments, etc)." },
              { q: "Who generates the leads?", a: "Our own Meta, Google, and Personalized Direct-Mail — plus vetted partner networks. Every lead is human-verified before it enters the marketplace. No scraped lists, no aged leads, no recycled junk." },
              { q: "Do I keep my territory if I cancel the $49/mo?", a: "You keep marketplace access and your admission credits forever. You lose the 60-min early access and territory autopilot until you resubscribe." },
              { q: "Can multiple reps on my team use one account?", a: "One seat = one closer. Teams buy seats per rep. Volume discount at 5+ seats — email b@speedtosolar.com." },
            ].map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-semibold text-base pr-4">{f.q}</span>
                  <span className="font-display text-2xl text-sun group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed text-sm max-w-[720px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative overflow-hidden sun-gradient border-t border-ink/20">
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-[1280px] mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 border border-ivory/30 px-3 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-ivory live-dot" />
            <span className="font-mono-ui text-[10px] tracking-[0.2em] uppercase text-ivory font-semibold">Marketplace Open · {active} closers inside</span>
          </div>
          <h2 className="font-display text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] text-ivory mb-6">
            STOP COLD CALLING.<br />START CLOSING.
          </h2>
          <p className="text-ivory/80 max-w-[560px] mx-auto mb-10 text-lg">
            The reps already inside made{" "}
            <span className="font-semibold text-ivory">${(commission / 1_000_000).toFixed(2)}M in commissions</span> this month.
          </p>
<a
  href="https://square.link/u/sC5iIssz"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center justify-center gap-3 bg-ink text-ivory font-mono-ui text-base tracking-[0.14em] uppercase font-bold px-10 py-5 hover:bg-ivory hover:text-ink transition"
>
  ENTER MARKETPLACE →
</a>
          <div className="font-mono-ui text-[10px] tracking-[0.14em] uppercase text-ivory/60 mt-6">
            Onboarding · 14-day refund policy after fully onboarded · No long-term contract
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-ink text-ivory/60 border-t border-ink">
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full sun-gradient" />
            <span className="font-display text-ivory text-base tracking-tight">SPEEDTOSOLAR</span>
            <span className="font-mono-ui text-[10px] tracking-[0.15em] uppercase ml-3 text-ivory/40">The Live Solar Leads Marketplace</span>
          </div>
          <div className="font-mono-ui text-[10px] tracking-[0.15em] uppercase text-ivory/40 flex gap-6">
            <span>© 2026 Speedtosolar Inc.</span>
            <a href="#" className="hover:text-ivory">Terms</a>
            <a href="#" className="hover:text-ivory">Privacy</a>
            <a href="#" className="hover:text-ivory">Contact</a>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING CONTACT WIDGET ─── */}
      <FloatingContactWidget />
    </div>
  );
}