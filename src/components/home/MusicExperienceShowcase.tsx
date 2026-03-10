import React, { useState, useEffect, useRef } from 'react';
import headPhone from '../../assets/mensuit.png';

const SuitShowcase: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 23, minutes: 59, seconds: 35 });
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, '0');

  const timerBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .suit-section {
          font-family: 'Outfit', sans-serif;
          background: #fff7f3;
          position: relative;
          overflow: hidden;
        }

        .suit-section::before {
          content: '';
          position: absolute;
          top: -30%; right: -8%;
          width: 560px; height: 560px;
          background: radial-gradient(circle, rgba(234,100,30,0.1) 0%, transparent 68%);
          pointer-events: none;
        }

        .suit-section::after {
          content: '';
          position: absolute;
          bottom: -20%; left: -5%;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(234,100,30,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .suit-grid-bg {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(234,100,30,0.08) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }

        .suit-content { position: relative; z-index: 2; }

        /* Entrance */
        .s-fade-up {
          opacity: 0; transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .s-fade-up.in { opacity: 1; transform: translateY(0); }

        .s-fade-right {
          opacity: 0; transform: translateX(-28px);
          transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
        }
        .s-fade-right.in { opacity: 1; transform: translateX(0); }

        .s-fade-left {
          opacity: 0; transform: translateX(36px);
          transition: opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1);
        }
        .s-fade-left.in { opacity: 1; transform: translateX(0); }

        .sd1 { transition-delay: 0.08s; }
        .sd2 { transition-delay: 0.22s; }
        .sd3 { transition-delay: 0.36s; }
        .sd4 { transition-delay: 0.5s; }
        .sd5 { transition-delay: 0.64s; }
        .sd6 { transition-delay: 0.78s; }

        /* Badge */
        .s-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff;
          border: 1.5px solid rgba(234,100,30,0.3);
          color: #ea641e;
          padding: 6px 16px; border-radius: 100px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          box-shadow: 0 2px 10px rgba(234,100,30,0.1);
        }
        .s-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #ea641e;
          animation: s-pulse 2s ease-in-out infinite;
        }
        @keyframes s-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(234,100,30,0.4); }
          50% { box-shadow: 0 0 0 5px rgba(234,100,30,0); }
        }

        /* Heading */
        .s-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 800;
          color: #111;
          line-height: 1.05;
          letter-spacing: -0.03em;
        }
        .s-heading em {
          font-style: italic;
          color: #ea641e;
          position: relative;
        }
        .s-heading em::after {
          content: '';
          position: absolute;
          bottom: 2px; left: 0; right: 0;
          height: 3px; border-radius: 2px;
          background: #ea641e;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.8s;
        }
        .s-heading em.in::after { transform: scaleX(1); }

        /* Divider */
        .s-divider {
          width: 0; height: 3px; border-radius: 2px;
          background: linear-gradient(to right, #ea641e, rgba(234,100,30,0.1));
          transition: width 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s;
        }
        .s-divider.in { width: 72px; }

        /* Timer */
        .s-timer { display: flex; align-items: center; gap: 8px; }

        .s-t-digit {
          width: 62px; height: 62px;
          background: #fff;
          border: 1.5px solid rgba(234,100,30,0.18);
          border-radius: 10px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 1.55rem; font-weight: 700;
          color: #111;
          box-shadow: 0 4px 14px rgba(234,100,30,0.08);
          position: relative; overflow: hidden;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .s-t-digit::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 50%;
          background: rgba(234,100,30,0.03);
        }
        .s-t-digit:hover {
          border-color: rgba(234,100,30,0.45);
          box-shadow: 0 6px 20px rgba(234,100,30,0.15);
        }
        .s-t-label {
          font-size: 9px; color: #bbb;
          letter-spacing: 0.16em; text-transform: uppercase;
          margin-top: 7px; font-weight: 500; text-align: center;
        }
        .s-t-sep {
          font-family: 'Syne', sans-serif;
          font-size: 1.4rem; font-weight: 700;
          color: #ea641e; margin-bottom: 18px;
          animation: s-blink 1s step-end infinite;
        }
        @keyframes s-blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* CTA */
        .s-cta {
          display: inline-flex; align-items: center; gap: 12px;
          background: #111; color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 13px; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 16px 36px; border: none; cursor: pointer;
          border-radius: 4px;
          position: relative; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .s-cta::before {
          content: '';
          position: absolute; inset: 0;
          background: #ea641e;
          transform: translateX(-101%);
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
        }
        .s-cta:hover::before { transform: translateX(0); }
        .s-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(234,100,30,0.3); }
        .s-cta span { position: relative; z-index: 1; }
        .s-cta-arrow {
          position: relative; z-index: 1;
          width: 16px; height: 1px;
          background: currentColor;
          transition: width 0.3s;
        }
        .s-cta-arrow::after {
          content: '';
          position: absolute; right: 0; top: -3px;
          width: 6px; height: 6px;
          border-right: 1px solid currentColor;
          border-top: 1px solid currentColor;
          transform: rotate(45deg);
        }
        .s-cta:hover .s-cta-arrow { width: 24px; }

        /* Offer strip */
        .s-offer-strip {
          display: flex; align-items: center; gap: 28px;
          padding-top: 28px;
          border-top: 1px solid rgba(234,100,30,0.1);
        }
        .s-offer-item {
          display: flex; align-items: center; gap: 10px;
          font-size: 12px; color: #999;
        }
        .s-offer-icon {
          width: 30px; height: 30px; border-radius: 50%;
          border: 1.5px solid rgba(234,100,30,0.25);
          display: flex; align-items: center; justify-content: center;
          color: #ea641e; font-size: 12px; flex-shrink: 0;
          background: rgba(234,100,30,0.05);
        }

        /* Image scene */
        .s-img-scene {
          position: relative;
          display: flex; align-items: center; justify-content: center;
          height: 520px;
        }

        .s-ring {
          position: absolute; border-radius: 50%;
          border: 1px solid rgba(234,100,30,0.12);
          animation: s-spin 22s linear infinite;
        }
        .s-ring-2 {
          animation-direction: reverse; animation-duration: 34s;
          border-style: dashed; border-color: rgba(234,100,30,0.07);
        }
        @keyframes s-spin { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }

        .s-blob {
          position: absolute;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,100,30,0.09) 0%, transparent 70%);
          animation: s-breathe 6s ease-in-out infinite;
        }
        @keyframes s-breathe { 0%,100%{transform:scale(1);} 50%{transform:scale(1.1);} }

        .s-img-float {
          position: relative; z-index: 2;
          animation: s-float 5s ease-in-out infinite;
          filter: drop-shadow(0 28px 44px rgba(234,100,30,0.12)) drop-shadow(0 8px 16px rgba(0,0,0,0.08));
        }
        @keyframes s-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-14px);} }

        /* Chips */
        .s-chip {
          position: absolute; z-index: 3;
          background: #fff;
          border: 1.5px solid rgba(234,100,30,0.15);
          border-radius: 10px;
          padding: 10px 14px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.07);
        }
        .s-chip-1 { animation: s-chip-bob 4s ease-in-out infinite; }
        .s-chip-2 { animation: s-chip-bob 4s ease-in-out infinite 2s; }
        @keyframes s-chip-bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }

        .s-sale-badge {
          position: absolute; z-index: 3;
          width: 66px; height: 66px; border-radius: 50%;
          background: #ea641e;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(234,100,30,0.4);
          animation: s-chip-bob 3.5s ease-in-out infinite 1s;
        }
      `}</style>

      <section ref={sectionRef} className="suit-section py-20 px-6 lg:px-16">
        <div className="suit-grid-bg" />

        <div className="suit-content max-w-7xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', minHeight: '560px' }}>

            {/* ── Left ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              <div className={`s-fade-right sd1 ${visible ? 'in' : ''}`}>
                <div className="s-badge">
                  <span className="s-badge-dot" />
                  New Collection 2025
                </div>
              </div>

              <div className={`s-fade-right sd2 ${visible ? 'in' : ''}`}>
                <h2 className="s-heading">
                  Upgrade Your<br />
                  <em className={visible ? 'in' : ''}>Suit</em> Style
                </h2>
              </div>

              <div className={`s-divider ${visible ? 'in' : ''}`} />

              <div className={`s-fade-right sd3 ${visible ? 'in' : ''}`}>
                <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.85, maxWidth: '350px' }}>
                  Precision tailoring meets contemporary design. Limited availability — reserve yours before the offer expires.
                </p>
              </div>

              <div className={`s-fade-up sd4 ${visible ? 'in' : ''}`}>
                <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase', marginBottom: '14px' }}>
                  Offer ends in
                </p>
                <div className="s-timer">
                  {timerBlocks.map((block, i) => (
                    <React.Fragment key={block.label}>
                      <div>
                        <div className="s-t-digit">{fmt(block.value)}</div>
                        <div className="s-t-label">{block.label}</div>
                      </div>
                      {i < timerBlocks.length - 1 && <div className="s-t-sep">:</div>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className={`s-fade-up sd5 ${visible ? 'in' : ''}`}>
                <button className="s-cta">
                  <span>Reserve Now</span>
                  <div className="s-cta-arrow" />
                </button>
              </div>

              <div className={`s-fade-up sd6 ${visible ? 'in' : ''} s-offer-strip`}>
                {[
                  { icon: '✦', text: 'Free Alterations' },
                  { icon: '◈', text: 'Express Delivery' },
                  { icon: '◇', text: 'Returns 30d' },
                ].map(item => (
                  <div key={item.text} className="s-offer-item">
                    <div className="s-offer-icon">{item.icon}</div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right ── */}
            <div className={`s-fade-left sd3 ${visible ? 'in' : ''} s-img-scene`}>

              <div className="s-ring" style={{ width: '430px', height: '430px' }} />
              <div className="s-ring s-ring-2" style={{ width: '320px', height: '320px' }} />
              <div className="s-blob" />

              <div className="s-img-float">
                <img src={headPhone} alt="Premium Suit" style={{ width: '300px', height: '390px', objectFit: 'contain' }} />
              </div>

              {/* Material chip */}
              <div className="s-chip s-chip-1" style={{ top: '70px', left: '5px' }}>
                <div style={{ fontSize: '10px', color: '#bbb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Material</div>
                <div style={{ fontSize: '13px', color: '#111', fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>Merino Wool</div>
              </div>

              {/* Rating chip */}
              <div className="s-chip s-chip-2" style={{ bottom: '90px', right: '0px' }}>
                <div style={{ fontSize: '10px', color: '#bbb', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '3px' }}>Rating</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '13px' }}>★★★★★</span>
                  <span style={{ fontSize: '13px', color: '#111', fontWeight: 600 }}>4.9</span>
                </div>
              </div>

              {/* Sale badge */}
              <div className="s-sale-badge" style={{ top: '36px', right: '28px' }}>
                <span style={{ fontSize: '8px', color: '#fff', letterSpacing: '0.1em', fontWeight: 700 }}>SALE</span>
                <span style={{ fontSize: '18px', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1 }}>30%</span>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SuitShowcase;