import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

export default function ContactPage() {
  const [form, setForm]       = useState({ name:"", email:"", phone:"", message:"" });
  const [errors, setErrors]   = useState({});
  const [sent, setSent]       = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [headerRef, headerIn] = useInView(0.1);

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const submit = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email needed";
    if (!form.message.trim()) e.message = "Required";
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=Barlow:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --orange:    #f97316;  /* orange-500 */
          --orange2:   #ea580c;  /* orange-600 for hover */
          --orange3:   #fb923c;  /* orange-400 for lighter variation */
          --dark:      #000000;  /* black */
          --dark2:     #0a0a0a;  /* near black for slight variation */
          --border:    rgba(0,0,0,.1);
          --muted:     rgba(0,0,0,.5);
          --white:     #ffffff;
          --white2:    #fafafa;
          --green:     #2dd36f;
          --ease:      cubic-bezier(.16,1,.3,1);
          --px:        clamp(20px,5vw,64px);
        }

        .cp {
          font-family: 'Barlow', sans-serif;
          background: var(--white);
          color: var(--dark);
          overflow-x: hidden;
        }

        /* ══ HERO SPLIT ══════════════════════════ */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100svh - 58px);
        }

        /* LEFT — white panel */
        .hero-left {
          background: var(--white);
          padding: clamp(48px,7vw,88px) var(--px);
          display: flex; flex-direction: column; justify-content: center;
          position: relative; overflow: hidden;
          border-right: 1px solid var(--border);
        }
        /* Grid texture — black dots pattern */
        .hero-left::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,.025) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }
        /* Orange glow top-right */
        .hero-left::after {
          content: '';
          position: absolute; top: -80px; right: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(249,115,22,.08) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-left-inner { position: relative; z-index: 2; }

        .hl-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
          color: var(--orange); margin-bottom: 24px;
          opacity: 0; animation: fadeUp .6s .1s var(--ease) forwards;
        }
        .hl-eyebrow::before { content:''; width: 28px; height: 2px; background: var(--orange); flex-shrink:0; }

        .hl-h1 {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(2.6rem,5.5vw,4.8rem);
          font-weight: 900; line-height: .96; text-transform: uppercase;
          color: var(--dark); margin-bottom: 18px; letter-spacing: -.01em;
          opacity: 0; animation: fadeUp .6s .2s var(--ease) forwards;
        }
        .hl-h1 i { font-style: italic; color: var(--orange); }

        .hl-sub {
          font-size: 14px; font-weight: 300; line-height: 1.8;
          color: var(--muted); max-width: 380px; margin-bottom: 40px;
          opacity: 0; animation: fadeUp .6s .3s var(--ease) forwards;
        }

        /* Contact channels */
        .hl-channels { display: flex; flex-direction: column; }
        .hch {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 0;
          border-top: 1px solid var(--border);
          text-decoration: none; color: inherit;
          transition: padding-left .3s var(--ease);
          opacity: 0; animation: fadeUp .6s var(--ease) forwards;
        }
        .hch:last-child { border-bottom: 1px solid var(--border); }
        .hch:hover { padding-left: 10px; }
        .hch-icon {
          width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; font-size: 15px;
          transition: background .25s, border-color .25s;
        }
        .hch:hover .hch-icon { background: var(--orange); border-color: var(--orange); color: white; }
        .hch-lbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(0,0,0,.3);
        }
        .hch-val { font-size: 13px; font-weight: 500; color: rgba(0,0,0,.75); margin-top: 2px; }
        .hch-arr { margin-left: auto; color: rgba(0,0,0,.18); font-size: 18px; transition: color .25s; }
        .hch:hover .hch-arr { color: var(--orange); }

        /* RIGHT — form panel (ORANGE) */
        .hero-right {
          background: var(--orange);  /* Changed to orange */
          padding: clamp(48px,7vw,88px) var(--px);
          display: flex; flex-direction: column; justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* Orange panel texture - subtle pattern */
        .hero-right::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px);
          background-size: 56px 56px;
          pointer-events: none;
        }

        /* Darker orange glow */
        .hero-right::after {
          content: '';
          position: absolute; bottom: -80px; left: -80px;
          width: 360px; height: 360px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,0,0,.1) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-right-inner {
          position: relative;
          z-index: 2;
        }

        .form-kicker {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase;
          color: rgba(0,0,0,.7); margin-bottom: 10px;
        }
        .form-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.8rem,3vw,2.8rem); font-weight: 900;
          text-transform: uppercase; letter-spacing: -.01em;
          color: var(--dark); line-height: 1; margin-bottom: 28px;
        }
        .form-title span { color: var(--white); }

        .fgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .fg    { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .fg:last-of-type { margin-bottom: 0; }

        .flbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
          color: var(--dark); display: flex; justify-content: space-between; align-items: center;
        }
        .ferr { color: var(--white); font-weight: 700; }

        .fi, .fta {
          font-family: 'Barlow', sans-serif;
          font-size: 14px; color: var(--dark);
          padding: 12px 14px; border: 1.5px solid rgba(0,0,0,.2);
          background: rgba(255,255,255,.9); outline: none; width: 100%;
          transition: border-color .25s, background .2s, box-shadow .25s;
        }
        .fi::placeholder, .fta::placeholder { color: rgba(0,0,0,.4); }
        .fi:focus, .fta:focus {
          border-color: var(--dark); background: var(--white);
          box-shadow: 0 0 0 3px rgba(0,0,0,.15);
        }
        .fi.err, .fta.err { border-color: var(--white); }
        .fta { min-height: 120px; resize: vertical; }

        .sbtn {
          width: 100%; padding: 15px 20px; margin-top: 6px;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 13px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase;
          color: var(--white); background: var(--dark); border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 12px;
          transition: background .25s, transform .2s, gap .3s, color .25s;
          position: relative;
          z-index: 2;
        }
        .sbtn:hover { background: var(--white); color: var(--dark); transform: translateY(-2px); gap: 20px; }

        /* Success */
        .success {
          display: flex; flex-direction: column; gap: 18px;
          padding: 32px 0; animation: fadeUp .5s var(--ease);
        }
        .success-tick {
          width: 52px; height: 52px; border-radius: 50%;
          background: rgba(0,0,0,.1); border: 1.5px solid var(--dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: var(--dark);
        }
        .success-h {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 2rem; font-weight: 900; text-transform: uppercase; color: var(--dark);
        }
        .success-h span { color: var(--white); }
        .success-p { font-size: 14px; color: var(--dark); opacity: 0.7; line-height: 1.75; max-width: 340px; }
        .success-back {
          align-self: flex-start;
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase;
          color: var(--dark); background: none; border: none;
          border-bottom: 2px solid var(--dark); padding-bottom: 2px;
          cursor: pointer; transition: color .2s, border-color .2s;
        }
        .success-back:hover { color: var(--white); border-color: var(--white); }

        /* ══ MAP + HOURS — 50/50 ═════════════════ */
        .info-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid var(--border);
        }

        /* Map */
        .map-area {
          background: var(--white);
          position: relative; overflow: hidden;
          min-height: 380px;
          display: flex; align-items: center; justify-content: center;
          border-right: 1px solid var(--border);
        }
        .map-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,.04) 1px, transparent 1px);
          background-size: 52px 52px;
        }
        /* Orange crosshair lines */
        .map-cross-h {
          position: absolute; left: 0; right: 0; height: 1px;
          top: 50%; background: rgba(249,115,22,.15); pointer-events: none;
        }
        .map-cross-v {
          position: absolute; top: 0; bottom: 0; width: 1px;
          left: 50%; background: rgba(249,115,22,.15); pointer-events: none;
        }
        .map-center { position: relative; z-index: 2; text-align: center; }
        .map-pin { font-size: 44px; display: block; animation: pinFloat 2.8s ease-in-out infinite; }
        .map-tag {
          display: inline-block; margin-top: 14px;
          background: var(--orange); color: var(--white);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 11px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
          padding: 8px 20px;
        }
        @keyframes pinFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

        /* Hours */
        .hours-area {
          padding: clamp(28px,4vw,48px) clamp(24px,3vw,40px);
          background: var(--dark);
          display: flex; flex-direction: column;
        }
        .hours-title {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: clamp(1.2rem,2vw,1.6rem); font-weight: 900;
          text-transform: uppercase; color: var(--white); letter-spacing: .04em;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 10px;
        }
        .hours-title::before {
          content: ''; width: 4px; height: 20px;
          background: var(--orange); display: block; flex-shrink: 0;
        }
        .h-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.1); font-size: 13px;
        }
        .h-row:last-of-type { border-bottom: none; }
        .h-day  { font-weight: 500; color: rgba(255,255,255,.7); }
        .h-time { font-size: 12px; color: rgba(255,255,255,.35); text-align: right; }
        .h-open {
          display: inline-block; width: 5px; height: 5px; border-radius: 50%;
          background: var(--orange); margin-right: 6px; vertical-align: middle;
          box-shadow: 0 0 0 3px rgba(249,115,22,.18);
        }
        .h-closed { color: rgba(255,255,255,.2); }

        .social-block {
          margin-top: auto; padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.1);
        }
        .social-lbl {
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 9px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(255,255,255,.25); margin-bottom: 10px;
        }
        .social-row { display: flex; gap: 8px; }
        .soc-btn {
          flex: 1; height: 34px; border: 1px solid rgba(255,255,255,.1);
          background: none; color: rgba(255,255,255,.3);
          font-family: 'Barlow Condensed', sans-serif;
          font-size: 10px; font-weight: 800; letter-spacing: .1em; cursor: pointer;
          transition: all .25s;
        }
        .soc-btn:hover { background: var(--orange); border-color: var(--orange); color: var(--white); }

        /* ══ KEYFRAMES ══════════════════════════ */
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:none} }

        /* ══ RESPONSIVE ═════════════════════════ */

        /* Tablet — 768px to 900px */
        @media (max-width: 900px) {
          .hero         { grid-template-columns: 1fr; min-height: auto; }
          .info-section { grid-template-columns: 1fr; }
          .map-area     { min-height: 280px; border-right: none; border-bottom: 1px solid var(--border); }
          .hours-area   { padding: clamp(24px,4vw,40px) var(--px); }
          .social-block { margin-top: 24px; }
        }

        /* Mobile — below 640px */
        @media (max-width: 640px) {
          .nav-links  { display: none; }
          .fgrid      { grid-template-columns: 1fr; gap: 0; }
          .fgrid .fg  { margin-bottom: 14px; }
          .foot-links { display: none; }
          .faq-wrap   { padding: 40px var(--px); }
        }

        /* Small mobile — below 420px */
        @media (max-width: 420px) {
          .nav-cta  { display: none; }
          .hch-icon { width: 32px; height: 32px; font-size: 13px; }
        }
      `}</style>

      <div className="cp">

        {/* ── HERO SPLIT ── */}
        <div className="hero" ref={headerRef}>

          {/* LEFT — white panel */}
          <div className="hero-left">
            <div className="hero-left-inner">
              <div className="hl-eyebrow">Contact Us</div>
              <h1 className="hl-h1">
                We're Here<br/>To <i>Help You.</i>
              </h1>
              <p className="hl-sub">
                Questions, bulk orders, returns or just a quick chat — our team responds fast. Reach out any way you like.
              </p>
              <div className="hl-channels">
                {[
                  { icon:"📞", lbl:"Call Us",     val:"+91 98765 43210",    d:".42s", href:"tel:+919876543210" },
                  { icon:"💬", lbl:"WhatsApp",    val:"+91 98765 43210",    d:".52s", href:"https://wa.me/919876543210" },
                  { icon:"✉️", lbl:"Email",       val:"help@mallkabaap.in", d:".62s", href:"mailto:help@mallkabaap.in" },
                  { icon:"📍", lbl:"Visit Store", val:"Lal Bazar, Kolkata", d:".72s", href:"#info" },
                ].map(ch => (
                  <a key={ch.lbl} className="hch" href={ch.href} style={{ animationDelay: ch.d }}>
                    <div className="hch-icon">{ch.icon}</div>
                    <div>
                      <div className="hch-lbl">{ch.lbl}</div>
                      <div className="hch-val">{ch.val}</div>
                    </div>
                    <span className="hch-arr">›</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — ORANGE form panel */}
          <div className="hero-right">
            <div className="hero-right-inner">
              {sent ? (
                <div className="success">
                  <div className="success-tick">✓</div>
                  <h2 className="success-h">Message <span>Sent!</span></h2>
                  <p className="success-p">Thanks for reaching out. Our team will get back to you within 2 hours on your email or phone.</p>
                  <button className="success-back" onClick={() => { setSent(false); setForm({ name:"",email:"",phone:"",message:"" }); }}>
                    Send another message →
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-kicker">Send a Message</div>
                  <h2 className="form-title">How Can We<br/><span>Help You?</span></h2>

                  <div className="fgrid">
                    <div className="fg">
                      <label className="flbl">Name <span className="ferr">{errors.name}</span></label>
                      <input className={`fi${errors.name ? " err" : ""}`} placeholder="Your full name" value={form.name} onChange={e => set("name", e.target.value)} />
                    </div>
                    <div className="fg">
                      <label className="flbl">Email <span className="ferr">{errors.email}</span></label>
                      <input className={`fi${errors.email ? " err" : ""}`} placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} />
                    </div>
                  </div>

                  <div className="fg">
                    <label className="flbl">Phone</label>
                    <input className="fi" placeholder="+91 00000 00000" value={form.phone} onChange={e => set("phone", e.target.value)} />
                  </div>

                  <div className="fg">
                    <label className="flbl">Message <span className="ferr">{errors.message}</span></label>
                    <textarea className={`fta${errors.message ? " err" : ""}`} placeholder="Tell us how we can help…" value={form.message} onChange={e => set("message", e.target.value)} />
                  </div>

                  <button className="sbtn" onClick={submit}>
                    <span>Send Message</span>
                    <span>→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── MAP + HOURS — 50/50 ── */}
        <div className="info-section" id="info">

          {/* Map — 50% white */}
          <div className="map-area">
            <div className="map-grid" />
            <div className="map-cross-h" />
            <div className="map-cross-v" />
            <div className="map-center">
              <span className="map-pin">📍</span>
              <div className="map-tag">Lal Bazar, Kolkata — 700 001</div>
            </div>
          </div>

          {/* Hours — 50% black */}
          <div className="hours-area">
            <div className="hours-title">Store Hours</div>
            {[
              { day: "Monday – Friday", time: "10:00 AM – 9:00 PM", open: true },
              { day: "Saturday", time: "10:00 AM – 10:00 PM", open: true },
              { day: "Sunday", time: "11:00 AM – 8:00 PM", open: true },
              { day: "Public Holidays", time: "Closed", open: false },
            ].map(r => (
              <div className="h-row" key={r.day}>
                <span className="h-day">{r.day}</span>
                <span className={`h-time${r.open ? "" : " h-closed"}`}>
                  {r.open && <span className="h-open" />}{r.time}
                </span>
              </div>
            ))}

            <div className="social-block">
              <div className="social-lbl">Follow Us</div>
              <div className="social-row">
                {["IN", "FB", "YT", "PT"].map(s => (
                  <button key={s} className="soc-btn">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}