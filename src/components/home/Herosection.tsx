import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import watch from '../../assets/dress.png';

const HeroSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500&display=swap');

        .hero-wrap {
          font-family: 'Outfit', sans-serif;
          background: #f8f4ef;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        /* Mesh background */
        .hero-wrap::before {
          content: '';
          position: absolute;
          top: -30%; right: -10%;
          width: 700px; height: 700px;
          background: radial-gradient(circle at 60% 40%, rgba(234,100,30,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .hero-wrap::after {
          content: '';
          position: absolute;
          bottom: -20%; left: -5%;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(234,100,30,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Animated grid pattern */
        .grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }

        /* Entrance transitions */
        .slide-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .slide-up.in { opacity: 1; transform: translateY(0); }

        .slide-right {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .slide-right.in { opacity: 1; transform: translateX(0); }

        .slide-left {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .slide-left.in { opacity: 1; transform: translateX(0); }

        .d1 { transition-delay: 0.05s; }
        .d2 { transition-delay: 0.2s; }
        .d3 { transition-delay: 0.35s; }
        .d4 { transition-delay: 0.5s; }
        .d5 { transition-delay: 0.65s; }
        .d6 { transition-delay: 0.8s; }

        /* Tag pill */
        .tag-pill {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 100px;
          padding: 6px 14px 6px 8px;
          font-size: 12px; font-weight: 500;
          color: #333;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .tag-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #ea641e;
          animation: tag-pulse 2s ease-in-out infinite;
        }
        @keyframes tag-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(234,100,30,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(234,100,30,0); }
        }

        /* Heading */
        .hero-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.05;
          color: #111;
          letter-spacing: -0.03em;
        }
        .accent-word {
          position: relative;
          display: inline-block;
          color: #ea641e;
        }
        .accent-word::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 3px;
          background: #ea641e;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.8s cubic-bezier(0.16,1,0.3,1) 1s;
        }
        .accent-word.in::after { transform: scaleX(1); }

        /* Stats row */
        .stats-row {
          display: flex; gap: 32px; align-items: center;
        }
        .stat-item { text-align: left; }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.75rem; font-weight: 700;
          color: #111; line-height: 1;
        }
        .stat-label {
          font-size: 11px; color: #999;
          text-transform: uppercase; letter-spacing: 0.12em;
          margin-top: 4px;
        }
        .stat-divider {
          width: 1px; height: 36px;
          background: rgba(0,0,0,0.1);
        }

        /* Buttons */
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: #111; color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 500;
          letter-spacing: 0.04em;
          padding: 16px 32px;
          border-radius: 100px;
          border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: #ea641e;
          transform: translateY(101%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          border-radius: 100px;
        }
        .btn-primary:hover::before { transform: translateY(0); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(234,100,30,0.35); }
        .btn-primary span { position: relative; z-index: 1; }
        .btn-primary svg { position: relative; z-index: 1; }

        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #555;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.05em;
          padding: 16px 0;
          border: none; cursor: pointer;
          transition: color 0.3s;
          text-decoration: none;
        }
        .btn-secondary:hover { color: #ea641e; }
        .btn-arrow {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid currentColor;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s, border-color 0.3s;
        }
        .btn-secondary:hover .btn-arrow { background: #ea641e; border-color: #ea641e; color: #fff; }

        /* Image area */
        .image-scene {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 560px;
        }

        /* Blob */
        .blob {
          position: absolute;
          width: 440px; height: 440px;
          border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
          background: linear-gradient(135deg, rgba(234,100,30,0.12), rgba(234,100,30,0.04));
          animation: blob-morph 8s ease-in-out infinite;
        }
        @keyframes blob-morph {
          0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
          33% { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 70% 30% 60%; }
        }

        /* Product image */
        .product-img {
          position: relative; z-index: 2;
          width: 380px; height: 480px;
          object-fit: contain;
          filter: drop-shadow(0 30px 50px rgba(0,0,0,0.18));
          transition: transform 0.1s ease-out;
          animation: img-float 5s ease-in-out infinite;
        }
        @keyframes img-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }

        /* Floating cards */
        .float-card {
          position: absolute;
          background: #fff;
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          z-index: 4;
          backdrop-filter: blur(8px);
        }
        .card-stock {
          top: 80px; left: -10px;
          animation: card-float 4s ease-in-out infinite;
        }
        .card-price {
          bottom: 100px; right: -10px;
          animation: card-float 4s ease-in-out infinite 2s;
        }
        .card-sale {
          top: 40px; right: 40px;
          background: #ea641e;
          color: #fff;
          border-radius: 50%;
          width: 68px; height: 68px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          animation: card-float 3.5s ease-in-out infinite 1s;
        }
        @keyframes card-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Orbit dots */
        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px dashed rgba(234,100,30,0.2);
          animation: orbit-spin 18s linear infinite;
        }
        .orbit-dot {
          position: absolute;
          width: 8px; height: 8px; border-radius: 50%;
          background: #ea641e;
          top: -4px; left: 50%;
          transform: translateX(-50%);
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Marquee strip */
        .marquee-wrap {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.5);
          padding: 12px 0;
          backdrop-filter: blur(4px);
        }
        .marquee-track {
          display: flex; gap: 48px;
          width: max-content;
          animation: marquee 18s linear infinite;
        }
        .marquee-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; font-weight: 500;
          color: #888; white-space: nowrap;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .marquee-star { color: #ea641e; font-size: 10px; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <section ref={sectionRef} className="hero-wrap">
        <div className="grid-bg" />

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 32px', width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

            {/* ── Left ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Tag pill */}
              <div className={`slide-right d1 ${visible ? 'in' : ''}`}>
                <div className="tag-pill">
                  <span className="tag-dot" />
                  New Arrivals — Summer '25
                </div>
              </div>

              {/* Heading */}
              <div className={`slide-right d2 ${visible ? 'in' : ''}`}>
                <h1 className="hero-heading">
                  Discover the{' '}
                  <span className={`accent-word ${visible ? 'in' : ''}`}>Latest</span>
                  <br />
                  Fashion for
                  <br />
                  <span style={{ color: '#ea641e' }}>Everyone</span>
                </h1>
              </div>

              {/* Body */}
              <div className={`slide-right d3 ${visible ? 'in' : ''}`}>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.8, maxWidth: '380px' }}>
                  Mall Ka Baap brings you stylish, high-quality garments at unbeatable prices — for men, women & kids. Explore exclusive collections curated just for you.
                </p>
              </div>

              {/* Stats */}
              <div className={`slide-up d4 ${visible ? 'in' : ''}`}>
                <div className="stats-row">
                  <div className="stat-item">
                    <div className="stat-num">12K+</div>
                    <div className="stat-label">Styles</div>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <div className="stat-num">98%</div>
                    <div className="stat-label">Happy Buyers</div>
                  </div>
                  <div className="stat-divider" />
                  <div className="stat-item">
                    <div className="stat-num">50+</div>
                    <div className="stat-label">Brands</div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className={`slide-up d5 ${visible ? 'in' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <button className="btn-primary">
                  <span>Shop Now</span>
                  <ArrowUpRight size={16} />
                </button>
                <button className="btn-secondary">
                  <div className="btn-arrow">
                    <ArrowUpRight size={14} />
                  </div>
                  <span>View Lookbook</span>
                </button>
              </div>
            </div>

            {/* ── Right ── */}
            <div className={`slide-left d3 ${visible ? 'in' : ''}`}>
              <div className="image-scene">

                {/* Orbit ring */}
                <div className="orbit" style={{ width: '480px', height: '480px' }}>
                  <div className="orbit-dot" />
                </div>

                {/* Blob */}
                <div className="blob" />

                {/* Product */}
                <img
                  src={watch}
                  alt="Latest Fashion"
                  className="product-img"
                  style={{
                    transform: `perspective(800px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.3}deg) translateY(0)`,
                  }}
                />

                {/* In Stock card */}
                <div className="float-card card-stock">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>In Stock</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>Ships in 24h</div>
                </div>

                {/* Price card */}
                <div className="float-card card-price">
                  <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starting from</div>
                  <div style={{ fontSize: '22px', fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#111', lineHeight: 1.2 }}>₹499</div>
                  <div style={{ fontSize: '11px', color: '#ea641e', marginTop: '2px' }}>Free delivery</div>
                </div>

                {/* Sale badge */}
                <div className="card-sale float-card">
                  <span style={{ fontSize: '9px', letterSpacing: '0.1em', fontWeight: 600 }}>UPTO</span>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800, lineHeight: 1 }}>50%</span>
                  <span style={{ fontSize: '9px', letterSpacing: '0.08em' }}>OFF</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) =>
              ['Men\'s Wear', 'Women\'s Collection', 'Kids Fashion', 'New Arrivals', 'Ethnic Wear', 'Western Styles', 'Accessories', 'Sale Picks'].map((item) => (
                <div key={`${i}-${item}`} className="marquee-item">
                  <span className="marquee-star">✦</span>
                  {item}
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