import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../products/WishlistContext';
import { useCart } from '../products/CartContext';
import type { Product } from '../types/product';
import watch1 from '../../assets/girldress.png';
import tshirt from '../../assets/thsirt.png';
import mouse from '../../assets/images21.png';
import headPhone from '../../assets/kiddress.png';

const FlashSales: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [cols, setCols] = useState(4);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  const flashSaleProducts: Product[] = [
    { id: '1', title: 'Cotton Blend Top Pant Jacket', brand: 'HAVIT', price: 120, originalPrice: 160, image: headPhone, rating: 4.5, reviewCount: '88', status: '-40%', category: 'Gaming', description: 'Premium cotton blend set' },
    { id: '2', title: 'Girls Shirt with Trousers',    brand: 'AK',           price: 960,  originalPrice: 1160, image: watch1,    rating: 4,   reviewCount: '75', status: '-35%', category: 'Electronics', description: 'Stylish girls outfit' },
    { id: '3', title: 'Boy Skinny Fit Jeans',         brand: 'Samsung',      price: 370,  originalPrice: 400,  image: mouse,     rating: 4.5, reviewCount: '99', status: '-30%', category: 'Monitors',    description: 'Slim fit casual jeans' },
    { id: '4', title: 'Men Half Shirt',               brand: 'Herman Miller',price: 375,  originalPrice: 400,  image: tshirt,    rating: 4.5, reviewCount: '99', status: '-25%', category: 'Furniture',   description: 'Breathable half sleeve shirt' },
  ];

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 480 ? 1 : w < 768 ? 2 : w < 1024 ? 3 : 4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(p => {
        let { days, hours, minutes, seconds } = p;
        if (seconds > 0) seconds--;
        else if (minutes > 0) { minutes--; seconds = 59; }
        else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
        else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (n: number) => n.toString().padStart(2, '0');
  const maxIndex = Math.max(0, flashSaleProducts.length - cols);
  const nextSlide = () => setCurrentIndex(p => Math.min(p + 1, maxIndex));
  const prevSlide = () => setCurrentIndex(p => Math.max(p - 1, 0));
  const visibleProducts = flashSaleProducts.slice(currentIndex, currentIndex + cols);

  const handleProductClick = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    navigate(`/product/${id}`);
  };
  const handleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? '#f59e0b' : '#e5e7eb', fontSize: '13px' }}>★</span>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .fs-section {
          font-family:'Plus Jakarta Sans', sans-serif;
          background: #fff;
          position: relative;
          overflow: hidden;
        }
        .fs-section::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ea641e, #f59e0b, #ea641e);
          background-size: 200%;
          animation: shimmer-line 3s linear infinite;
        }
        @keyframes shimmer-line {
          from { background-position: 0%; }
          to   { background-position: 200%; }
        }

        /* Entrance */
        .fs-fade { opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
        .fs-fade.in { opacity:1; transform:none; }
        .fs-d1{transition-delay:.05s} .fs-d2{transition-delay:.2s} .fs-d3{transition-delay:.35s}

        /* Eyebrow */
        .section-eyebrow { display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; color:#ea641e; letter-spacing:.12em; text-transform:uppercase; }
        .eyebrow-bar { width:4px; height:20px; border-radius:2px; background:#ea641e; animation:bar-pulse 2s ease-in-out infinite; flex-shrink:0; }
        @keyframes bar-pulse { 0%,100%{opacity:1;} 50%{opacity:.5;} }

        /* Heading */
        .fs-heading { font-family:'Syne',sans-serif; font-size:clamp(1.5rem,3vw,2.4rem); font-weight:800; color:#111; letter-spacing:-.03em; line-height:1; }

        /* ── Header row layout ── */
        .fs-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .fs-header-left {
          display: flex;
          align-items: center;
          gap: clamp(16px, 3vw, 32px);
          flex-wrap: wrap;
          flex: 1;
          min-width: 0;
        }

        /* Timer */
        .timer-box { display:flex; align-items:center; gap:5px; flex-shrink:0; }
        .t-block {
          display:flex; flex-direction:column; align-items:center;
          background:#111; border-radius:8px;
          width:clamp(44px,6vw,56px); height:clamp(44px,6vw,56px);
          justify-content:center; position:relative; overflow:hidden;
        }
        .t-block::before { content:''; position:absolute; top:50%; left:0; right:0; height:1px; background:rgba(255,255,255,.08); }
        .t-num { font-family:'Syne',sans-serif; font-size:clamp(1rem,2vw,1.3rem); font-weight:700; color:#fff; line-height:1; }
        .t-label { font-size:clamp(7px,1vw,8px); color:#888; letter-spacing:.12em; text-transform:uppercase; margin-top:2px; }
        .t-sep { font-family:'Syne',sans-serif; font-size:1.1rem; color:#ea641e; font-weight:700; animation:blink 1s step-end infinite; margin-bottom:10px; }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* Nav */
        .nav-btn { width:38px; height:38px; border-radius:50%; background:#f5f5f5; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .25s,transform .2s; color:#333; flex-shrink:0; }
        .nav-btn:hover { background:#ea641e; color:#fff; transform:scale(1.08); }
        .nav-btn:disabled { opacity:.35; cursor:not-allowed; }
        .nav-btn:disabled:hover { background:#f5f5f5; color:#333; transform:none; }

        /* Grid */
        .fs-grid {
          display: grid;
          grid-template-columns: repeat(var(--fs-cols, 4), 1fr);
          gap: clamp(12px, 2vw, 20px);
          margin-bottom: 36px;
        }

        /* Card */
        .fs-card {
          background:#fafafa; border-radius:16px; overflow:hidden; cursor:pointer;
          position:relative; border:1px solid transparent;
          transition:border-color .3s,box-shadow .35s,transform .4s cubic-bezier(.16,1,.3,1);
        }
        .fs-card:hover { border-color:rgba(234,100,30,.15); box-shadow:0 20px 48px rgba(0,0,0,.1); transform:translateY(-6px); }

        .card-img-wrap {
          position:relative; background:#f0ede8;
          height:clamp(160px,22vw,220px);
          display:flex; align-items:center; justify-content:center; overflow:hidden;
        }
        .card-img-wrap img {
          width:clamp(110px,14vw,160px); height:clamp(130px,17vw,180px);
          object-fit:cover; transition:transform .6s cubic-bezier(.16,1,.3,1);
        }
        .fs-card:hover .card-img-wrap img { transform:scale(1.07); }

        .disc-badge {
          position:absolute; top:10px; left:10px;
          background:#ea641e; color:#fff;
          font-size:10px; font-weight:700;
          padding:3px 9px; border-radius:100px; letter-spacing:.04em;
        }

        .action-btns {
          position:absolute; top:10px; right:10px;
          display:flex; flex-direction:column; gap:6px;
          opacity:0; transform:translateX(8px);
          transition:opacity .3s,transform .3s;
        }
        .fs-card:hover .action-btns { opacity:1; transform:translateX(0); }

        .action-btn {
          width:32px; height:32px; border-radius:50%;
          background:#fff; border:none; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          box-shadow:0 2px 8px rgba(0,0,0,.12);
          transition:background .2s,transform .2s; color:#555;
        }
        .action-btn:hover { background:#ea641e; color:#fff; transform:scale(1.1); }
        .action-btn.wished { background:#fee2e2; color:#ef4444; }

        .cart-bar {
          position:absolute; bottom:0; left:0; right:0;
          background:#111; color:#fff; padding:9px 0;
          display:flex; align-items:center; justify-content:center; gap:7px;
          font-size:12px; font-weight:500; letter-spacing:.04em;
          transform:translateY(100%);
          transition:transform .35s cubic-bezier(.16,1,.3,1);
          cursor:pointer; border:none; width:100%;
        }
        .fs-card:hover .cart-bar { transform:translateY(0); }
        .cart-bar.added { background:#16a34a; }
        .cart-bar:hover:not(.added) { background:#ea641e; }

        /* On touch devices always show cart bar */
        @media (hover: none) {
          .cart-bar { transform:translateY(0); }
          .action-btns { opacity:1; transform:translateX(0); }
        }

        .card-body { padding:12px 14px 14px; }
        .card-title { font-size:clamp(12px,1.3vw,14px); font-weight:600; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:7px; }
        .price-row { display:flex; align-items:center; gap:7px; margin-bottom:7px; }
        .price-new { font-family:'Syne',sans-serif; font-size:clamp(1rem,1.5vw,1.15rem); font-weight:700; color:#ea641e; }
        .price-old { font-size:12px; color:#bbb; text-decoration:line-through; }
        .star-row { display:flex; align-items:center; gap:5px; }
        .review-count { font-size:11px; color:#aaa; }

        /* CTA */
        .view-all-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:#111; color:#fff;
          font-family:'Outfit',sans-serif; font-size:14px; font-weight:500; letter-spacing:.05em;
          padding:13px clamp(24px,4vw,40px); border-radius:100px;
          border:none; cursor:pointer; position:relative; overflow:hidden;
          transition:transform .3s,box-shadow .3s;
        }
        .view-all-btn::before { content:''; position:absolute; inset:0; background:#ea641e; transform:translateX(-101%); transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .view-all-btn:hover::before { transform:translateX(0); }
        .view-all-btn:hover { transform:translateY(-2px); box-shadow:0 10px 24px rgba(234,100,30,.3); }
        .view-all-btn span { position:relative; z-index:1; }

        /* Card stagger */
        .card-stagger { opacity:0; transform:translateY(24px); }
        .card-stagger.in { animation:card-in .6s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes card-in { to { opacity:1; transform:translateY(0); } }

        /* ═══════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════ */

        /* Tablet */
        @media (max-width: 1024px) {
          .fs-section { padding-inline: clamp(16px, 4vw, 32px); }
        }

        /* Small tablet → 2 cols handled via JS cols state */
        @media (max-width: 768px) {
          .fs-header { margin-bottom: 24px; }
          .fs-header-left { gap: 12px; }
          /* Stack title above timer on small screens */
          .fs-title-timer { flex-direction: column; align-items: flex-start; gap: 10px; }
          .t-sep { font-size: 1rem; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .card-img-wrap { height: 180px; }
        }

        /* Small mobile → 1 col */
        @media (max-width: 479px) {
          .fs-header { flex-direction: column; align-items: flex-start; gap: 12px; }
          /* Timer compact: hide labels */
          .t-label { display: none; }
          .t-block { width: 40px; height: 40px; border-radius: 6px; }
          .t-num { font-size: .95rem; }
          /* Slide nav below header */
          .fs-nav { align-self: flex-end; }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .fs-fade { transition:none; opacity:1; transform:none; }
          .card-stagger.in { animation:none; opacity:1; transform:none; }
          .eyebrow-bar,.t-sep,.fs-section::before { animation:none; }
        }
      `}</style>

      <section ref={sectionRef} className="fs-section py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div className={`fs-fade fs-d1 ${visible ? 'in' : ''} fs-header`}>

            <div className="fs-header-left">
              {/* Title */}
              <div style={{ flexShrink: 0 }}>
                <div className="section-eyebrow" style={{ marginBottom: '6px' }}>
                  <div className="eyebrow-bar" />
                  Today's
                </div>
                <h2 className="fs-heading">Flash Sales</h2>
              </div>

              {/* Timer */}
              <div className="timer-box">
                {[
                  { v: timeLeft.days,    l: 'Days' },
                  { v: timeLeft.hours,   l: 'Hrs'  },
                  { v: timeLeft.minutes, l: 'Min'  },
                  { v: timeLeft.seconds, l: 'Sec'  },
                ].map((item, i) => (
                  <React.Fragment key={item.l}>
                    <div className="t-block">
                      <div className="t-num">{fmt(item.v)}</div>
                      <div className="t-label">{item.l}</div>
                    </div>
                    {i < 3 && <div className="t-sep">:</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <div className="fs-nav" style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button className="nav-btn" onClick={prevSlide} disabled={currentIndex === 0}>
                <ChevronLeft size={17} />
              </button>
              <button className="nav-btn" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* ── Products Grid ── */}
          <div
            className="fs-grid"
            style={{ '--fs-cols': cols } as React.CSSProperties}
          >
            {visibleProducts.map((product, i) => (
              <div
                key={product.id}
                className={`fs-card card-stagger ${visible ? 'in' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                onClick={(e) => handleProductClick(product.id, e)}
              >
                <div className="card-img-wrap">
                  <img src={product.image} alt={product.title} />
                  <div className="disc-badge">{product.status}</div>

                  <div className="action-btns">
                    <button
                      className={`action-btn ${isInWishlist(product.id) ? 'wished' : ''}`}
                      onClick={(e) => handleWishlist(product, e)}
                    >
                      <Heart size={13} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                      <Eye size={13} />
                    </button>
                  </div>

                  <button
                    className={`cart-bar ${addedId === product.id ? 'added' : ''}`}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag size={13} />
                    <span>{addedId === product.id ? 'Added!' : 'Add to Cart'}</span>
                  </button>
                </div>

                <div className="card-body">
                  <div className="card-title">{product.title}</div>
                  <div className="price-row">
                    <span className="price-new">₹{product.price}</span>
                    {product.originalPrice && <span className="price-old">₹{product.originalPrice}</span>}
                  </div>
                  <div className="star-row">
                    <div style={{ display: 'flex' }}>{renderStars(product.rating)}</div>
                    <span className="review-count">({product.reviewCount})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
          <div className={`fs-fade fs-d3 ${visible ? 'in' : ''}`} style={{ textAlign: 'center' }}>
            <button className="view-all-btn"><span>View All Products</span></button>
          </div>

        </div>
      </section>
    </>
  );
};

export default FlashSales;