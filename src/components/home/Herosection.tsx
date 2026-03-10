import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import watch from '../../assets/dress.png';

const HeroSection: React.FC = () => {
  const [visible, setVisible]   = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width  - 0.5) * 20,
        y: ((e.clientY - rect.top)  / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [isMobile]);

  const categories = ["Men's Wear", "Women's Collection", "Kids Fashion", "New Arrivals", "Ethnic Wear", "Western Styles", "Accessories", "Sale Picks"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        /* ── Base: single clean font throughout ── */
        .hero-wrap {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: #f8f4ef;
          position: relative;
          overflow: hidden;
          min-height: 100svh;
          display: flex;
          align-items: center;
        }
        .hero-wrap::before {
          content: '';
          position: absolute; top: -30%; right: -10%;
          width: 700px; height: 700px;
          background: radial-gradient(circle at 60% 40%, rgba(234,100,30,.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-wrap::after {
          content: '';
          position: absolute; bottom: -20%; left: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(234,100,30,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        /* ── Entrance ── */
        .slide-up    { opacity:0; transform:translateY(40px);  transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
        .slide-right { opacity:0; transform:translateX(-30px); transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1); }
        .slide-left  { opacity:0; transform:translateX(40px);  transition:opacity  1s cubic-bezier(.16,1,.3,1),transform  1s cubic-bezier(.16,1,.3,1); }
        .slide-up.in,.slide-right.in,.slide-left.in { opacity:1; transform:none; }
        .d1{transition-delay:.05s} .d2{transition-delay:.2s}  .d3{transition-delay:.35s}
        .d4{transition-delay:.5s}  .d5{transition-delay:.65s}

        /* ── Layout ── */
        .hero-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 80px clamp(16px,4vw,48px) 96px;
          width: 100%; position: relative; z-index: 2;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px,5vw,60px);
          align-items: center;
        }
        .hero-left { display:flex; flex-direction:column; gap:clamp(20px,2.5vw,28px); }

        /* ── Tag pill ── */
        .tag-pill {
          display:inline-flex; align-items:center; gap:8px;
          background:#fff; border:1px solid rgba(0,0,0,.07); border-radius:100px;
          padding:6px 14px 6px 8px;
          font-size:12px; font-weight:600; color:#333; letter-spacing:.01em;
          box-shadow:0 2px 8px rgba(0,0,0,.06); width:fit-content;
        }
        .tag-dot {
          width:8px; height:8px; border-radius:50%; background:#ea641e; flex-shrink:0;
          animation:tag-pulse 2s ease-in-out infinite;
        }
        @keyframes tag-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(234,100,30,.4);}
          50%{box-shadow:0 0 0 6px rgba(234,100,30,0);}
        }

        /* ── Heading — same font, heavier weight ── */
        .hero-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: #111;
          letter-spacing: -0.025em;
        }
        .accent-word {
          position: relative; display: inline-block; color: #ea641e;
        }
        .accent-word::after {
          content: ''; position: absolute; bottom: 2px; left: 0; right: 0;
          height: 3px; background: #ea641e; border-radius: 2px;
          transform: scaleX(0); transform-origin: left;
          transition: transform .8s cubic-bezier(.16,1,.3,1) 1s;
        }
        .accent-word.in::after { transform: scaleX(1); }

        /* ── Body text ── */
        .hero-body {
          font-size: clamp(13px,1.4vw,15px);
          color: #666;
          line-height: 1.75;
          font-weight: 400;
        }

        /* ── Stats ── */
        .stats-row    { display:flex; gap:clamp(12px,2vw,24px); align-items:center; flex-wrap:wrap; }
        .stat-num     { font-size:clamp(1.2rem,2.5vw,1.75rem); font-weight:700; color:#111; line-height:1; }
        .stat-label   { font-size:10px; font-weight:500; color:#999; text-transform:uppercase; letter-spacing:.1em; margin-top:4px; }
        .stat-divider { width:1px; height:28px; background:rgba(0,0,0,.12); }

        /* ── Buttons ── */
        .btn-row { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
        .btn-primary {
          display:inline-flex; align-items:center; gap:10px;
          background:#111; color:#fff;
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:14px; font-weight:600; letter-spacing:.01em;
          padding:14px 28px; border-radius:100px; border:none; cursor:pointer;
          position:relative; overflow:hidden;
          transition:transform .3s,box-shadow .3s; white-space:nowrap;
        }
        .btn-primary::before {
          content:''; position:absolute; inset:0; background:#ea641e;
          transform:translateY(101%); transition:transform .45s cubic-bezier(.16,1,.3,1);
          border-radius:100px;
        }
        .btn-primary:hover::before { transform:translateY(0); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 28px rgba(234,100,30,.35); }
        .btn-primary span,.btn-primary svg { position:relative; z-index:1; }

        .btn-secondary {
          display:inline-flex; align-items:center; gap:8px;
          background:transparent; color:#555;
          font-family:'Plus Jakarta Sans',sans-serif;
          font-size:13px; font-weight:500;
          border:none; cursor:pointer; transition:color .3s; white-space:nowrap; padding:0;
        }
        .btn-secondary:hover { color:#ea641e; }
        .btn-arrow {
          width:34px; height:34px; border-radius:50%; border:1.5px solid currentColor;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
          transition:background .3s,border-color .3s;
        }
        .btn-secondary:hover .btn-arrow { background:#ea641e; border-color:#ea641e; color:#fff; }

        /* ── Image scene ── */
        .image-scene {
          position: relative;
          display: flex; justify-content: center; align-items: center;
          height: clamp(360px,52vw,560px);
          overflow: hidden;
          padding: 24px 48px;
          box-sizing: border-box;
        }
        .blob {
          position:absolute;
          width:clamp(200px,34vw,420px); height:clamp(200px,34vw,420px);
          border-radius:60% 40% 70% 30%/50% 60% 40% 50%;
          background:linear-gradient(135deg,rgba(234,100,30,.12),rgba(234,100,30,.04));
          animation:blob-morph 8s ease-in-out infinite; pointer-events:none;
        }
        @keyframes blob-morph {
          0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%;}
          33%    {border-radius:30% 70% 40% 60%/60% 30% 70% 40%;}
          66%    {border-radius:50% 50% 30% 70%/40% 70% 30% 60%;}
        }
        .product-img {
          position:relative; z-index:2;
          width:clamp(130px,22vw,340px); height:clamp(170px,28vw,440px);
          object-fit:contain;
          filter:drop-shadow(0 24px 40px rgba(0,0,0,.16));
          animation:img-float 5s ease-in-out infinite;
        }
        @keyframes img-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

        /* Float cards — single font, clean weights */
        .float-card {
          position:absolute; background:#fff; border-radius:12px;
          padding:10px 13px; box-shadow:0 8px 24px rgba(0,0,0,.1); z-index:4;
          font-family:'Plus Jakarta Sans',sans-serif;
          max-width:calc(50% - 12px);
        }
        .card-stock { top:18px;    left:10px;  animation:card-float 4s ease-in-out infinite; }
        .card-price { bottom:18px; right:10px; animation:card-float 4s ease-in-out infinite 2s; }
        .card-sale  {
          top:12px; right:10px;
          background:#ea641e; color:#fff; border-radius:50%;
          width:clamp(48px,5.5vw,64px); height:clamp(48px,5.5vw,64px);
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          animation:card-float 3.5s ease-in-out infinite 1s;
          max-width:none;
        }
        @keyframes card-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }

        .orbit {
          position:absolute; border-radius:50%; pointer-events:none;
          border:1px dashed rgba(234,100,30,.2);
          animation:orbit-spin 18s linear infinite;
          width: clamp(220px,34vw,420px) !important;
          height:clamp(220px,34vw,420px) !important;
        }
        .orbit-dot {
          position:absolute; width:8px; height:8px; border-radius:50%;
          background:#ea641e; top:-4px; left:50%; transform:translateX(-50%);
        }
        @keyframes orbit-spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

        /* ── Marquee ── */
        .marquee-wrap {
          position:absolute; bottom:0; left:0; right:0; overflow:hidden;
          border-top:1px solid rgba(0,0,0,.06); background:rgba(255,255,255,.5);
          padding:10px 0; backdrop-filter:blur(4px);
        }
        .marquee-track { display:flex; gap:40px; width:max-content; animation:marquee 18s linear infinite; }
        .marquee-item {
          display:flex; align-items:center; gap:10px;
          font-size:11px; font-weight:500; color:#888;
          white-space:nowrap; letter-spacing:.06em; text-transform:uppercase;
        }
        .marquee-star { color:#ea641e; font-size:10px; }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }

        /* ════════════════════════
           RESPONSIVE
        ════════════════════════ */
        @media (max-width: 768px) {
          .hero-inner { padding: 48px 20px 84px; }
          .hero-grid  { grid-template-columns:1fr; gap:32px; }
          .hero-right { order:-1; }
          .image-scene { height:clamp(300px,56vw,400px); padding:18px 36px; }
          .orbit { width:clamp(200px,44vw,320px) !important; height:clamp(200px,44vw,320px) !important; }
        }
        @media (max-width: 640px) {
          .hero-inner { padding:36px 16px 76px; }
          .hero-grid  { gap:28px; }
          .image-scene { height:clamp(280px,60vw,360px); padding:14px 28px; }
          .float-card  { padding:7px 10px; border-radius:10px; }
          .btn-secondary span { display:none; }
          .orbit { width:clamp(180px,50vw,280px) !important; height:clamp(180px,50vw,280px) !important; }
        }
        @media (max-width: 420px) {
          .hero-inner  { padding:28px 14px 68px; }
          .hero-grid   { gap:20px; }
          .card-stock,.card-price { display:none; }
          .card-sale   { width:44px !important; height:44px !important; top:8px; right:6px; }
          .image-scene { height:clamp(240px,60vw,300px); padding:8px 18px; }
          .orbit       { display:none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .slide-up,.slide-right,.slide-left { transition:none; opacity:1; transform:none; }
          .blob,.product-img,.card-stock,.card-price,.card-sale,.orbit,.tag-dot,.marquee-track { animation:none; }
          .accent-word::after { transition:none; transform:scaleX(1); }
        }
      `}</style>

      <section ref={sectionRef} className="hero-wrap">
        <div className="grid-bg" />

        <div className="hero-inner">
          <div className="hero-grid">

            {/* ── Left ── */}
            <div className="hero-left">

              <div className={`slide-right d1 ${visible ? 'in' : ''}`}>
                <div className="tag-pill">
                  <span className="tag-dot" />
                  New Arrivals — Summer '25
                </div>
              </div>

              <div className={`slide-right d2 ${visible ? 'in' : ''}`}>
                <h1 className="hero-heading">
                  Discover the{' '}
                  <span className={`accent-word ${visible ? 'in' : ''}`}>Latest</span>
                  <br />Fashion for<br />
                  <span style={{ color: '#ea641e' }}>Everyone</span>
                </h1>
              </div>

              <div className={`slide-right d3 ${visible ? 'in' : ''}`}>
                <p className="hero-body">
                  Mall Ka Baap brings you stylish, high-quality garments at unbeatable prices — for men, women &amp; kids. Explore exclusive collections curated just for you.
                </p>
              </div>

              <div className={`slide-up d4 ${visible ? 'in' : ''}`}>
                <div className="stats-row">
                  <div><div className="stat-num">12K+</div><div className="stat-label">Styles</div></div>
                  <div className="stat-divider" />
                  <div><div className="stat-num">98%</div><div className="stat-label">Happy Buyers</div></div>
                  <div className="stat-divider" />
                  <div><div className="stat-num">50+</div><div className="stat-label">Brands</div></div>
                </div>
              </div>

              <div className={`slide-up d5 ${visible ? 'in' : ''} btn-row`}>
                <button className="btn-primary">
                  <span>Shop Now</span>
                  <ArrowUpRight size={16} />
                </button>
                <button className="btn-secondary">
                  <div className="btn-arrow"><ArrowUpRight size={14} /></div>
                  <span>View Lookbook</span>
                </button>
              </div>
            </div>

            {/* ── Right ── */}
            <div className={`slide-left d3 ${visible ? 'in' : ''} hero-right`}>
              <div className="image-scene">
                <div className="orbit"><div className="orbit-dot" /></div>
                <div className="blob" />

                <img
                  src={watch}
                  alt="Latest Fashion"
                  className="product-img"
                  style={{
                    transform: isMobile
                      ? undefined
                      : `perspective(800px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.3}deg)`,
                  }}
                />

                {/* In Stock */}
                <div className="float-card card-stock">
                  <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                    <div style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 0 3px rgba(34,197,94,.2)',flexShrink:0 }} />
                    <span style={{ fontSize:12,fontWeight:600,color:'#111' }}>In Stock</span>
                  </div>
                  <div style={{ fontSize:10,fontWeight:400,color:'#aaa',marginTop:2 }}>Ships in 24h</div>
                </div>

                {/* Price */}
                <div className="float-card card-price">
                  <div style={{ fontSize:10,fontWeight:500,color:'#999',textTransform:'uppercase',letterSpacing:'.1em' }}>Starting from</div>
                  <div className="price-num" style={{ fontSize:20,fontWeight:700,color:'#111',lineHeight:1.2,marginTop:2 }}>₹499</div>
                  <div style={{ fontSize:10,fontWeight:500,color:'#ea641e',marginTop:2 }}>Free delivery</div>
                </div>

                {/* Sale */}
                <div className="float-card card-sale">
                  <span style={{ fontSize:8,fontWeight:600,letterSpacing:'.1em' }}>UPTO</span>
                  <span style={{ fontSize:18,fontWeight:800,lineHeight:1 }}>50%</span>
                  <span style={{ fontSize:8,fontWeight:500,letterSpacing:'.08em' }}>OFF</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
              categories.map(item => (
                <div key={`${i}-${item}`} className="marquee-item">
                  <span className="marquee-star">✦</span>{item}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;