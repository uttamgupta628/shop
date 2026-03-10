import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Heart, ShieldCheck, Truck, Users, Star, MapPin, Mail, Phone } from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(start);
    }, 20);
    return () => clearInterval(t);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

export default function AboutPage() {
  const hero    = useInView(0.1);
  const mission = useInView(0.15);
  const values  = useInView(0.1);
  const team    = useInView(0.15);
  const stats   = useInView(0.2);
  const contact = useInView(0.15);

  const coreValues = [
    { icon: <Heart className="w-6 h-6" />,       title: "Customer First",    desc: "Every decision starts and ends with what's best for our customers." },
    { icon: <ShieldCheck className="w-6 h-6" />,  title: "Quality Assured",   desc: "Every garment passes our 12-point quality check before it reaches you." },
    { icon: <Truck className="w-6 h-6" />,        title: "Fast & Reliable",   desc: "Same-day dispatch with real-time tracking on every order." },
    { icon: <Award className="w-6 h-6" />,        title: "Best Value",        desc: "Premium fashion at prices that respect your budget — always." },
    { icon: <Users className="w-6 h-6" />,        title: "Inclusive Fashion",  desc: "Styles for men, women, boys and girls across every age group." },
    { icon: <Star className="w-6 h-6" />,         title: "Community Driven",  desc: "Built on 12,000+ happy customers and counting." },
  ];

  const timeline = [
    { year: "2019", title: "The Idea",     desc: "Ankit Agarwal spotted a gap — great fashion was either too expensive or too inaccessible for everyday families." },
    { year: "2020", title: "First Store",  desc: "Mall Ka Baap launched its first outlet in Jaipur with just 200 SKUs and a big vision." },
    { year: "2022", title: "Going Online", desc: "The e-commerce platform launched, reaching customers across 18 states within 6 months." },
    { year: "2024", title: "12K+ Happy Customers", desc: "Today we serve over 12,000 loyal customers with 50+ brands and 380+ styles." },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        .about-page { font-family: 'Outfit', sans-serif; }
        .font-display { font-family: 'Syne', sans-serif; }

        /* Entrance helpers */
        .fade-up   { opacity:0; transform:translateY(32px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
        .fade-right{ opacity:0; transform:translateX(-28px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
        .fade-left { opacity:0; transform:translateX(28px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
        .fade-in   { opacity:0;                             transition:opacity .8s cubic-bezier(.16,1,.3,1); }
        .in        { opacity:1 !important; transform:none !important; }

        .d1{transition-delay:.05s} .d2{transition-delay:.15s} .d3{transition-delay:.25s}
        .d4{transition-delay:.35s} .d5{transition-delay:.45s} .d6{transition-delay:.55s}

        /* Timeline line */
        .tl-line::before {
          content:''; position:absolute; left:11px; top:24px; bottom:0;
          width:2px; background:linear-gradient(to bottom,#ea641e,rgba(234,100,30,0.1));
        }

        /* Shimmer on hero name */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, #ea641e 0%, #f59e0b 40%, #ea641e 60%, #ea641e 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        /* Card hover lift */
        .val-card { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s; }
        .val-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(234,100,30,0.12); }

        /* Dot pattern bg */
        .dot-bg {
          background-image: radial-gradient(circle, rgba(234,100,30,0.07) 1px, transparent 1px);
          background-size: 26px 26px;
        }
      `}</style>

      <div className="about-page">

        {/* ══════════════ HERO ══════════════ */}
        <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-[#fff7f3]">
          {/* Glow blobs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-orange-100 opacity-60 blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-50 opacity-80 blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />
          <div className="dot-bg absolute inset-0 pointer-events-none" />

          <div ref={hero.ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">

            {/* Left */}
            <div className="space-y-8">
              <div className={`fade-up d1 ${hero.inView ? "in" : ""}`}>
                <span className="inline-flex items-center gap-2 bg-white border border-orange-200 text-orange-500 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  Our Story
                </span>
              </div>

              <div className={`fade-up d2 ${hero.inView ? "in" : ""}`}>
                <h1 className="font-display font-extrabold leading-[1.04] tracking-tight text-[#111]" style={{ fontSize: "clamp(2.6rem,6vw,5rem)" }}>
                  Fashion for<br />
                  <span className="shimmer-text">Every Family.</span><br />
                  Every Budget.
                </h1>
              </div>

              <div className={`fade-up d3 ${hero.inView ? "in" : ""}`}>
                <p className="text-gray-500 leading-relaxed max-w-md" style={{ fontSize: "clamp(14px,1.5vw,16px)" }}>
                  Mall Ka Baap was born from a simple belief — that stylish, high-quality clothing
                  shouldn't be a luxury. We bring India's families the best fashion at prices that
                  make sense.
                </p>
              </div>

              <div className={`fade-up d4 ${hero.inView ? "in" : ""} flex items-center gap-4 flex-wrap`}>
                <button className="group relative overflow-hidden bg-[#111] text-white font-medium tracking-wide text-sm px-8 py-4 rounded-full flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200">
                  <span className="relative z-10">Shop Now</span>
                  <ArrowUpRight size={15} className="relative z-10 group-hover:rotate-45 transition-transform" />
                  <span className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
                </button>
                <a href="#contact" className="text-sm font-medium text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1">
                  Get in touch <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Right — founder card */}
            <div className={`fade-left d3 ${hero.inView ? "in" : ""} flex justify-center lg:justify-end`}>
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-orange-200 scale-105 rotate-2" />
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-orange-100 border border-orange-50 max-w-sm w-full">

                  {/* Avatar placeholder */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-6 shadow-lg shadow-orange-200">
                    <span className="font-display font-bold text-white text-3xl">AA</span>
                  </div>

                  <div className="mb-1">
                    <span className="text-xs font-semibold tracking-widest text-orange-400 uppercase">Founder & CEO</span>
                  </div>
                  <h2 className="font-display font-extrabold text-[#111] text-2xl mb-3 leading-tight">Ankit Agarwal</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Entrepreneur, fashion enthusiast and the driving force behind Mall Ka Baap's mission to democratize style across India.
                  </p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-gray-100">
                    {[
                      { label: "Years in Business", value: "5+" },
                      { label: "Cities Served",     value: "18+" },
                    ].map(s => (
                      <div key={s.label}>
                        <div className="font-display font-bold text-[#111] text-xl">{s.value}</div>
                        <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="mt-5 bg-orange-50 rounded-xl px-4 py-3 border-l-2 border-orange-400">
                    <p className="text-xs text-gray-500 italic leading-relaxed">
                      "Style is not a privilege. It's a right for every Indian family."
                    </p>
                    <p className="text-xs font-semibold text-orange-500 mt-1">— Ankit Agarwal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ STATS ══════════════ */}
        <section ref={stats.ref} className="bg-[#111] py-16 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 12000, suffix: "+", label: "Happy Customers" },
              { to: 50,    suffix: "+", label: "Brands" },
              { to: 380,   suffix: "+", label: "Styles" },
              { to: 18,    suffix: "+", label: "States Served" },
            ].map((s, i) => (
              <div key={s.label} className={`fade-up d${i + 1} ${stats.inView ? "in" : ""}`}>
                <div className="font-display font-extrabold text-white mb-1" style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-gray-400 text-xs tracking-widest uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════ MISSION ══════════════ */}
        <section ref={mission.ref} className="py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Timeline */}
            <div className={`fade-right d1 ${mission.inView ? "in" : ""}`}>
              <div className="space-y-1 mb-8">
                <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase">Our Journey</p>
                <h2 className="font-display font-extrabold text-[#111] leading-tight" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                  From a Dream<br />to 12,000 Families
                </h2>
              </div>

              <div className="relative pl-8 tl-line space-y-8">
                {timeline.map((t, i) => (
                  <div key={t.year} className={`fade-up d${i + 1} ${mission.inView ? "in" : ""} relative`}>
                    <div className="absolute -left-8 top-0 w-6 h-6 rounded-full bg-orange-500 border-4 border-white shadow-md shadow-orange-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{t.year}</span>
                        <span className="font-semibold text-[#111] text-sm">{t.title}</span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission text */}
            <div className={`fade-left d2 ${mission.inView ? "in" : ""} space-y-8`}>
              <div>
                <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">Our Mission</p>
                <h3 className="font-display font-bold text-[#111] leading-snug mb-4" style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)" }}>
                  Making great fashion accessible to every Indian family
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  We believe fashion should not be a barrier. Mall Ka Baap exists to bridge the gap between aspiration and affordability — delivering premium clothing for men, women, boys and girls without asking you to compromise on quality.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Customer Satisfaction", pct: 98 },
                  { label: "On-Time Delivery",      pct: 95 },
                  { label: "Return Rate Success",   pct: 99 },
                ].map(b => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                      <span>{b.label}</span><span className="text-orange-500">{b.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-1000"
                        style={{ width: mission.inView ? `${b.pct}%` : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#111] rounded-2xl p-6 text-white">
                <div className="text-xs text-gray-400 tracking-widest uppercase mb-2">Vision 2026</div>
                <p className="text-sm leading-relaxed text-gray-200">
                  To become India's most trusted affordable fashion brand — present in 50+ cities and serving 1 lakh+ families.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ VALUES ══════════════ */}
        <section ref={values.ref} className="py-20 px-4 sm:px-8 bg-[#fff7f3]">
          <div className="max-w-7xl mx-auto">
            <div className={`fade-up d1 ${values.inView ? "in" : ""} text-center mb-14`}>
              <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
              <h2 className="font-display font-extrabold text-[#111]" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((v, i) => (
                <div
                  key={v.title}
                  className={`fade-up d${(i % 3) + 1} ${values.inView ? "in" : ""} val-card bg-white rounded-2xl p-7 border border-orange-100 cursor-default`}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 mb-5">
                    {v.icon}
                  </div>
                  <h3 className="font-display font-bold text-[#111] text-lg mb-2">{v.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ TEAM / FOUNDER SPOTLIGHT ══════════════ */}
        <section ref={team.ref} className="py-20 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
          <div className={`fade-up d1 ${team.inView ? "in" : ""} text-center mb-14`}>
            <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">The People</p>
            <h2 className="font-display font-extrabold text-[#111]" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
              Meet the Founder
            </h2>
          </div>

          <div className={`fade-up d2 ${team.inView ? "in" : ""} max-w-3xl mx-auto`}>
            <div className="bg-[#111] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

              {/* Left — visual */}
              <div className="relative bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center p-12 min-h-[280px]">
                <div className="absolute inset-0 dot-bg opacity-20" />
                <div className="relative text-center">
                  <div className="w-28 h-28 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-bold text-white text-4xl">AA</span>
                  </div>
                  <div className="text-white/60 text-xs tracking-widest uppercase">Founder & CEO</div>
                  <div className="text-white font-display font-bold text-xl mt-1">Ankit Agarwal</div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full border border-white/20" />
                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border border-white/20" />
              </div>

              {/* Right — bio */}
              <div className="p-8 flex flex-col justify-center space-y-5">
                <div>
                  <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">About Ankit</p>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    With over 5 years in retail and fashion, Ankit Agarwal founded Mall Ka Baap with a clear mission — to make fashionable, quality clothing reachable for every Indian household, regardless of budget.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Serial entrepreneur with roots in Jaipur",
                    "Passionate about inclusive, everyday fashion",
                    "Built a 12K+ customer base from scratch",
                    "Expanding to 50 cities by 2026",
                  ].map(pt => (
                    <div key={pt} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0" />
                      <span className="text-gray-300 text-xs leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-orange-400 text-xs italic">"Fashion. Family. Affordability."</span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════ CONTACT ══════════════ */}
        <section id="contact" ref={contact.ref} className="py-20 px-4 sm:px-8 bg-[#fff7f3]">
          <div className="max-w-4xl mx-auto">
            <div className={`fade-up d1 ${contact.inView ? "in" : ""} text-center mb-14`}>
              <p className="text-orange-500 text-xs font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
              <h2 className="font-display font-extrabold text-[#111]" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>
                We'd Love to Hear From You
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <MapPin className="w-5 h-5" />,  label: "Visit Us",   value: "Jaipur, Rajasthan, India" },
                { icon: <Mail className="w-5 h-5" />,    label: "Email Us",   value: "hello@mallkabaap.com" },
                { icon: <Phone className="w-5 h-5" />,   label: "Call Us",    value: "+91 98765 43210" },
              ].map((c, i) => (
                <div
                  key={c.label}
                  className={`fade-up d${i + 1} ${contact.inView ? "in" : ""} val-card bg-white rounded-2xl p-7 border border-orange-100 text-center`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-orange-200">
                    {c.icon}
                  </div>
                  <div className="text-xs text-gray-400 tracking-widest uppercase mb-2">{c.label}</div>
                  <div className="font-semibold text-[#111] text-sm">{c.value}</div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className={`fade-up d4 ${contact.inView ? "in" : ""} mt-12 text-center`}>
              <button className="group relative overflow-hidden bg-[#111] text-white font-medium tracking-wide text-sm px-10 py-4 rounded-full flex items-center gap-2 mx-auto transition-transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-200">
                <span className="relative z-10">Shop the Collection</span>
                <ArrowUpRight size={15} className="relative z-10 group-hover:rotate-45 transition-transform" />
                <span className="absolute inset-0 bg-orange-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-full" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}