import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, PersonStanding, Sparkles, Shirt, Baby } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: string;
  color: string;
}

const BrowseByCategory: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories: Category[] = [
    { id: "1", name: "Men",   icon: <PersonStanding />, count: "240+ styles", color: "#3b82f6" },
    { id: "2", name: "Women", icon: <Sparkles />,       count: "380+ styles", color: "#ec4899" },
    { id: "3", name: "Boys",  icon: <Shirt />,          count: "120+ styles", color: "#f59e0b" },
    { id: "4", name: "Girls", icon: <Baby />,           count: "150+ styles", color: "#8b5cf6" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const amount = trackRef.current.offsetWidth * 0.7;
    trackRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (trackRef.current) setScrollPos(trackRef.current.scrollLeft);
  };

  const canScrollLeft  = scrollPos > 0;
  const canScrollRight = trackRef.current
    ? scrollPos < trackRef.current.scrollWidth - trackRef.current.clientWidth - 4
    : false;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .bc-section {
          font-family: 'Outfit', sans-serif;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        /* Entrance */
        .bc-fade { opacity:0; transform:translateY(24px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
        .bc-fade.in { opacity:1; transform:none; }
        .bc-d1{transition-delay:.05s} .bc-d2{transition-delay:.2s}

        /* Eyebrow */
        .bc-eyebrow { display:flex; align-items:center; gap:10px; font-size:12px; font-weight:600; color:#ea641e; letter-spacing:.14em; text-transform:uppercase; margin-bottom:6px; }
        .bc-bar { width:4px; height:18px; border-radius:2px; background:#ea641e; animation:bc-pulse 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes bc-pulse { 0%,100%{opacity:1;} 50%{opacity:.4;} }

        .bc-heading { font-family:'Syne',sans-serif; font-size:clamp(1.5rem,3vw,2.2rem); font-weight:800; color:#111; letter-spacing:-.03em; line-height:1; }

        /* Nav buttons */
        .bc-nav { width:38px; height:38px; border-radius:50%; background:#f5f5f5; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .25s,transform .2s; color:#333; flex-shrink:0; }
        .bc-nav:hover:not(:disabled) { background:#ea641e; color:#fff; transform:scale(1.08); }
        .bc-nav:disabled { opacity:.3; cursor:not-allowed; }

        /* Scroll track — horizontal scroll on mobile */
        .bc-track {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 2vw, 20px);
          overflow: visible;
        }

        /* Category card */
        .bc-card {
          position: relative;
          border-radius: 18px;
          border: 1.5px solid #f0f0f0;
          background: #fafafa;
          padding: clamp(20px, 3vw, 36px) 16px;
          cursor: pointer;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 14px;
          transition: border-color .3s, box-shadow .35s, transform .4s cubic-bezier(.16,1,.3,1), background .3s;
          text-align: center;
          overflow: hidden;
          min-height: clamp(140px, 18vw, 200px);
          -webkit-tap-highlight-color: transparent;
          border: none;
          outline: none;
        }
        .bc-card::before {
          content: '';
          position: absolute; inset: 0; border-radius: 18px;
          border: 1.5px solid #f0f0f0;
          transition: border-color .3s;
          pointer-events: none;
        }
        .bc-card:hover::before, .bc-card.active::before {
          border-color: var(--cat-color, #ea641e);
        }
        .bc-card:hover, .bc-card.active {
          background: var(--cat-color, #ea641e);
          box-shadow: 0 16px 40px color-mix(in srgb, var(--cat-color) 30%, transparent);
          transform: translateY(-6px);
        }

        /* Glow blob behind icon */
        .bc-blob {
          position: absolute;
          top: -20px; left: 50%; transform: translateX(-50%);
          width: 100px; height: 100px; border-radius: 50%;
          background: var(--cat-color, #ea641e);
          opacity: 0;
          filter: blur(28px);
          transition: opacity .4s;
          pointer-events: none;
        }
        .bc-card:hover .bc-blob, .bc-card.active .bc-blob { opacity: .25; }

        /* Icon wrapper */
        .bc-icon-wrap {
          width: clamp(52px, 7vw, 68px);
          height: clamp(52px, 7vw, 68px);
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          display: flex; align-items: center; justify-content: center;
          transition: background .3s, transform .4s cubic-bezier(.16,1,.3,1);
          position: relative; z-index: 1;
          box-shadow: 0 4px 12px rgba(0,0,0,.06);
        }
        .bc-card:hover .bc-icon-wrap, .bc-card.active .bc-icon-wrap {
          background: rgba(255,255,255,0.25);
          transform: scale(1.12) rotate(-4deg);
        }
        .bc-icon-wrap svg {
          width: clamp(22px, 3vw, 28px);
          height: clamp(22px, 3vw, 28px);
          transition: color .3s;
          color: var(--cat-color, #ea641e);
        }
        .bc-card:hover .bc-icon-wrap svg,
        .bc-card.active .bc-icon-wrap svg { color: #fff; }

        /* Text */
        .bc-name {
          font-family: 'Syne', sans-serif;
          font-size: clamp(14px, 1.8vw, 17px);
          font-weight: 700; color: #111;
          transition: color .3s; position: relative; z-index: 1; line-height: 1;
        }
        .bc-count {
          font-size: clamp(10px, 1.2vw, 12px); color: #bbb;
          transition: color .3s; position: relative; z-index: 1;
          letter-spacing: .04em;
        }
        .bc-card:hover .bc-name, .bc-card.active .bc-name,
        .bc-card:hover .bc-count, .bc-card.active .bc-count { color: #fff; }

        /* Arrow indicator */
        .bc-arrow {
          position: absolute; bottom: 14px; right: 14px;
          width: 24px; height: 24px; border-radius: 50%;
          background: rgba(255,255,255,.25);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(.7);
          transition: opacity .3s, transform .3s;
          z-index: 1;
        }
        .bc-card:hover .bc-arrow, .bc-card.active .bc-arrow { opacity:1; transform:scale(1); }

        /* Card stagger */
        .bc-stagger { opacity:0; transform:translateY(20px); }
        .bc-stagger.in { animation: bc-card-in .6s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes bc-card-in { to { opacity:1; transform:translateY(0); } }

        /* Divider */
        .bc-divider { height:1px; background:linear-gradient(to right, transparent, #f0f0f0 20%, #f0f0f0 80%, transparent); margin-top: clamp(32px,4vw,56px); }

        /* ═══════════════════════
           RESPONSIVE
        ═══════════════════════ */

        @media (max-width: 1024px) {
          .bc-track { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 640px) {
          .bc-track {
            grid-template-columns: repeat(2, 1fr);
          }
          .bc-card { min-height: 130px; }
        }

        @media (max-width: 360px) {
          .bc-track { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .bc-card { min-height: 118px; padding: 16px 10px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bc-fade,.bc-stagger { transition:none; animation:none; opacity:1; transform:none; }
          .bc-card { transition: background .15s; }
          .bc-bar { animation: none; }
        }
      `}</style>

      <section ref={sectionRef} className="bc-section py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div
            className={`bc-fade bc-d1 ${visible ? 'in' : ''}`}
            style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:'clamp(24px,4vw,40px)', gap:'16px', flexWrap:'wrap' }}
          >
            <div>
              <div className="bc-eyebrow"><div className="bc-bar" />Categories</div>
              <h2 className="bc-heading">Browse By Category</h2>
            </div>

            {/* Arrows — only useful if you add more categories later */}
            <div style={{ display:'flex', gap:'8px' }}>
              <button className="bc-nav" onClick={() => scroll("left")} disabled={!canScrollLeft} aria-label="Scroll left">
                <ChevronLeft size={17} />
              </button>
              <button className="bc-nav" onClick={() => scroll("right")} disabled={!canScrollRight} aria-label="Scroll right">
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* ── Grid ── */}
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className={`bc-fade bc-d2 ${visible ? 'in' : ''} bc-track`}
          >
            {categories.map((cat, i) => (
              <button
                key={cat.id}
                className={`bc-card bc-stagger ${visible ? 'in' : ''} ${activeId === cat.id ? 'active' : ''}`}
                style={{
                  '--cat-color': cat.color,
                  animationDelay: `${0.05 + i * 0.1}s`,
                } as React.CSSProperties}
                onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="bc-blob" />

                <div className="bc-icon-wrap">{cat.icon}</div>

                <div>
                  <div className="bc-name">{cat.name}</div>
                  <div className="bc-count" style={{ marginTop: '4px' }}>{cat.count}</div>
                </div>

                <div className="bc-arrow">
                  <ChevronRight size={12} color="#fff" />
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="bc-divider" />
        </div>
      </section>
    </>
  );
};

export default BrowseByCategory;