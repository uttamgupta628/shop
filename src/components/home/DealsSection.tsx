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
  const sectionRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 23, minutes: 19, seconds: 56 });

  const flashSaleProducts: Product[] = [
    { id: '1', title: 'Cotton Blend Top Pant Jacket', brand: 'HAVIT', price: 120, originalPrice: 160, image: headPhone, rating: 4.5, reviewCount: '88', status: '-40%', category: 'Gaming', description: 'Premium cotton blend set' },
    { id: '2', title: 'Girls Shirt with Trousers', brand: 'AK', price: 960, originalPrice: 1160, image: watch1, rating: 4, reviewCount: '75', status: '-35%', category: 'Electronics', description: 'Stylish girls outfit' },
    { id: '3', title: 'Boy Skinny Fit Jeans', brand: 'Samsung', price: 370, originalPrice: 400, image: mouse, rating: 4.5, reviewCount: '99', status: '-30%', category: 'Monitors', description: 'Slim fit casual jeans' },
    { id: '4', title: 'Men Half Shirt', brand: 'Herman Miller', price: 375, originalPrice: 400, image: tshirt, rating: 4.5, reviewCount: '99', status: '-25%', category: 'Furniture', description: 'Breathable half sleeve shirt' },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
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

  const nextSlide = () => setCurrentIndex(p => (p + 1) % Math.max(1, flashSaleProducts.length - 3));
  const prevSlide = () => setCurrentIndex(p => (p - 1 + Math.max(1, flashSaleProducts.length - 3)) % Math.max(1, flashSaleProducts.length - 3));

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

  const visible4 = flashSaleProducts.slice(currentIndex, currentIndex + 4);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .fs-section {
          font-family: 'Outfit', sans-serif;
          background: #fff;
          position: relative;
          overflow: hidden;
        }

        .fs-section::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #ea641e, #f59e0b, #ea641e);
          background-size: 200%;
          animation: shimmer-line 3s linear infinite;
        }
        @keyframes shimmer-line {
          from { background-position: 0% 0%; }
          to { background-position: 200% 0%; }
        }

        /* Entrance */
        .fs-fade {
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-fade.in { opacity: 1; transform: translateY(0); }
        .fs-d1 { transition-delay: 0.05s; }
        .fs-d2 { transition-delay: 0.2s; }
        .fs-d3 { transition-delay: 0.35s; }

        /* Section label */
        .section-eyebrow {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 600;
          color: #ea641e;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .eyebrow-bar {
          width: 4px; height: 20px; border-radius: 2px;
          background: #ea641e;
          animation: bar-pulse 2s ease-in-out infinite;
        }
        @keyframes bar-pulse {
          0%,100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Heading */
        .fs-heading {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-weight: 800;
          color: #111;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        /* Timer */
        .timer-box {
          display: flex; align-items: center; gap: 6px;
        }
        .t-block {
          display: flex; flex-direction: column; align-items: center;
          background: #111;
          border-radius: 8px;
          width: 56px; height: 56px;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .t-block::before {
          content: '';
          position: absolute;
          top: 50%; left: 0; right: 0;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }
        .t-num {
          font-family: 'Syne', sans-serif;
          font-size: 1.3rem; font-weight: 700;
          color: #fff; line-height: 1;
        }
        .t-label {
          font-size: 8px; color: #888;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-top: 2px;
        }
        .t-sep {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; color: #ea641e;
          font-weight: 700; line-height: 1;
          animation: blink 1s step-end infinite;
          margin-bottom: 10px;
        }
        @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0;} }

        /* Nav buttons */
        .nav-btn {
          width: 40px; height: 40px; border-radius: 50%;
          background: #f5f5f5; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.25s, transform 0.2s;
          color: #333;
        }
        .nav-btn:hover { background: #ea641e; color: #fff; transform: scale(1.08); }

        /* Product card */
        .fs-card {
          background: #fafafa;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          border: 1px solid transparent;
          transition: border-color 0.3s, box-shadow 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-card:hover {
          border-color: rgba(234,100,30,0.15);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
          transform: translateY(-6px);
        }

        /* Card image area */
        .card-img-wrap {
          position: relative;
          background: #f0ede8;
          height: 220px;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
        }
        .card-img-wrap img {
          width: 160px; height: 180px; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .fs-card:hover .card-img-wrap img { transform: scale(1.07); }

        /* Discount badge */
        .disc-badge {
          position: absolute; top: 12px; left: 12px;
          background: #ea641e; color: #fff;
          font-size: 11px; font-weight: 700;
          padding: 4px 10px; border-radius: 100px;
          letter-spacing: 0.04em;
        }

        /* Action buttons */
        .action-btns {
          position: absolute; top: 12px; right: 12px;
          display: flex; flex-direction: column; gap: 6px;
          opacity: 0; transform: translateX(8px);
          transition: opacity 0.3s, transform 0.3s;
        }
        .fs-card:hover .action-btns { opacity: 1; transform: translateX(0); }

        .action-btn {
          width: 34px; height: 34px; border-radius: 50%;
          background: #fff; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.2s, transform 0.2s;
          color: #555;
        }
        .action-btn:hover { background: #ea641e; color: #fff; transform: scale(1.1); }
        .action-btn.wished { background: #fee2e2; color: #ef4444; }

        /* Add to cart bar */
        .cart-bar {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: #111; color: #fff;
          padding: 10px 0;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          font-size: 13px; font-weight: 500; letter-spacing: 0.04em;
          transform: translateY(100%);
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
          cursor: pointer; border: none;
          width: 100%;
        }
        .fs-card:hover .cart-bar { transform: translateY(0); }
        .cart-bar.added { background: #16a34a; }
        .cart-bar:hover { background: #ea641e; }

        /* Card content */
        .card-body { padding: 14px 16px 16px; }
        .card-title {
          font-size: 14px; font-weight: 600; color: #111;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          margin-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }
        .price-row { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .price-new {
          font-family: 'Syne', sans-serif;
          font-size: 1.15rem; font-weight: 700; color: #ea641e;
        }
        .price-old { font-size: 13px; color: #bbb; text-decoration: line-through; }
        .star-row { display: flex; align-items: center; gap: 6px; }
        .review-count { font-size: 12px; color: #aaa; }

        /* View All */
        .view-all-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: #111; color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 14px; font-weight: 500;
          letter-spacing: 0.05em;
          padding: 14px 40px; border-radius: 100px;
          border: none; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .view-all-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: #ea641e;
          transform: translateX(-101%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .view-all-btn:hover::before { transform: translateX(0); }
        .view-all-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(234,100,30,0.3); }
        .view-all-btn span { position: relative; z-index: 1; }

        /* Card stagger */
        .card-stagger { opacity: 0; transform: translateY(24px); }
        .card-stagger.in {
          animation: card-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes card-in {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section ref={sectionRef} className="fs-section py-16 px-4 sm:px-6 lg:px-8">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ── Header ── */}
          <div className={`fs-fade fs-d1 ${visible ? 'in' : ''}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>

            {/* Left: label + title + timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
              <div>
                <div className="section-eyebrow" style={{ marginBottom: '6px' }}>
                  <div className="eyebrow-bar" />
                  Today's
                </div>
                <h2 className="fs-heading">Flash Sales</h2>
              </div>

              {/* Timer */}
              <div className="timer-box">
                {[
                  { v: timeLeft.days, l: 'Days' },
                  { v: timeLeft.hours, l: 'Hrs' },
                  { v: timeLeft.minutes, l: 'Min' },
                  { v: timeLeft.seconds, l: 'Sec' },
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

            {/* Nav + CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button className="nav-btn" onClick={prevSlide}><ChevronLeft size={18} /></button>
              <button className="nav-btn" onClick={nextSlide}><ChevronRight size={18} /></button>
            </div>
          </div>

          {/* ── Products Grid ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
            {visible4.map((product, i) => (
              <div
                key={product.id}
                className={`fs-card card-stagger ${visible ? 'in' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                onClick={(e) => handleProductClick(product.id, e)}
              >
                {/* Image */}
                <div className="card-img-wrap">
                  <img src={product.image} alt={product.title} />

                  {/* Discount */}
                  <div className="disc-badge">{product.status}</div>

                  {/* Actions */}
                  <div className="action-btns">
                    <button
                      className={`action-btn ${isInWishlist(product.id) ? 'wished' : ''}`}
                      onClick={(e) => handleWishlist(product, e)}
                    >
                      <Heart size={14} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="action-btn" onClick={(e) => e.stopPropagation()}>
                      <Eye size={14} />
                    </button>
                  </div>

                  {/* Cart bar */}
                  <button
                    className={`cart-bar ${addedId === product.id ? 'added' : ''}`}
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingBag size={14} />
                    <span>{addedId === product.id ? 'Added!' : 'Add to Cart'}</span>
                  </button>
                </div>

                {/* Body */}
                <div className="card-body">
                  <div className="card-title">{product.title}</div>
                  <div className="price-row">
                    <span className="price-new">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="price-old">₹{product.originalPrice}</span>
                    )}
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
            <button className="view-all-btn">
              <span>View All Products</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlashSales;