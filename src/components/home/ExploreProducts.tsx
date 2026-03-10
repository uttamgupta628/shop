import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../products/WishlistContext";
import { useCart } from "../products/CartContext";
import type { Product } from "../types/product";
import tshit   from "../../assets/thsirt.png";
import watch1  from "../../assets/shopping.webp";
import mouse   from "../../assets/girldress.png";
import headPhone from "../../assets/kiddress.png";
import game    from "../../assets/mensuit.png";
import shoe    from "../../assets/images21.png";

const CATEGORIES = ["All", "Traditional", "Women", "Men", "girl", "Boy"];

const ExploreProducts: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [currentPage, setCurrentPage]     = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId]             = useState<string | null>(null);
  const [visible, setVisible]             = useState(false);
  const [cols, setCols]                   = useState(4);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Responsive column count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(w < 480 ? 1 : w < 640 ? 2 : w < 1024 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const allProducts: Product[] = [
    { id: "1", title: "Cotton Blend Kid Set",    brand: "HAVIT",        price: 120,  originalPrice: 160,  image: headPhone, rating: 4.5, reviewCount: "88", status: "-40%", category: "Gaming"      },
    { id: "2", title: "Girls Floral Dress",       brand: "AK",           price: 960,  originalPrice: 1160, image: watch1,    rating: 4,   reviewCount: "75", status: "-35%", category: "Electronics"  },
    { id: "3", title: "Men's Slim Fit Shirt",     brand: "Samsung",      price: 370,  originalPrice: 400,  image: tshit,     rating: 4.5, reviewCount: "99", status: "-10%", category: "Monitors"     },
    { id: "4", title: "Women's Summer Dress",     brand: "Herman Miller",price: 375,  originalPrice: 400,  image: mouse,     rating: 4.5, reviewCount: "99", status: "-25%", category: "Furniture"    },
    { id: "5", title: "Girls Embroidered Top",    brand: "AK",           price: 960,  originalPrice: 1160, image: watch1,    rating: 4,   reviewCount: "75", status: "-35%", category: "Electronics"  },
    { id: "6", title: "Jr. Zoom Soccer Cleats",   brand: "Nike",         price: 1160, originalPrice: 1300, image: shoe,      rating: 5,   reviewCount: "35", status: "NEW",  category: "Sports"       },
    { id: "7", title: "Men's Formal Suit",        brand: "GP11",         price: 660,  originalPrice: 800,  image: game,      rating: 4.5, reviewCount: "55", status: "NEW",  category: "Gaming"       },
    { id: "8", title: "Men's Casual T-Shirt",     brand: "Samsung",      price: 370,  originalPrice: 400,  image: tshit,     rating: 4.5, reviewCount: "99", status: "-30%", category: "Monitors"     },
  ];

  const filtered       = activeCategory === "All" ? allProducts : allProducts.filter(p => p.category === activeCategory);
  const perPage        = cols * 2;                          // always 2 rows
  const totalPages     = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentProducts = filtered.slice(currentPage * perPage, (currentPage + 1) * perPage);

  const handleProductClick = (id: string, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    navigate(`/product/${id}`);
  };
  const handleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product);
  };
  const handleCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < Math.floor(rating) ? "#f59e0b" : "#e5e7eb", fontSize: "13px" }}>★</span>
    ));

  const getColorDots = (id: string) =>
    ({ "6": ["#ef4444", "#3b82f6"], "7": ["#ef4444", "#111"] }[id] || []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Outfit:wght@300;400;500;600&display=swap');

        .ep-section { font-family:'Outfit',sans-serif; background:#fff; position:relative; }

        /* Entrance */
        .ep-fade { opacity:0; transform:translateY(28px); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1); }
        .ep-fade.in { opacity:1; transform:none; }
        .ep-d1{transition-delay:.05s} .ep-d2{transition-delay:.2s} .ep-d3{transition-delay:.35s}

        /* Eyebrow */
        .ep-eyebrow { display:flex; align-items:center; gap:10px; font-size:12px; font-weight:600; color:#ea641e; letter-spacing:.14em; text-transform:uppercase; margin-bottom:6px; }
        .ep-bar { width:4px; height:18px; border-radius:2px; background:#ea641e; flex-shrink:0; animation:bar-blink 2s ease-in-out infinite; }
        @keyframes bar-blink { 0%,100%{opacity:1;} 50%{opacity:.4;} }

        .ep-heading { font-family:'Syne',sans-serif; font-size:clamp(1.4rem,3vw,2.3rem); font-weight:800; color:#111; letter-spacing:-.03em; }

        /* ── Header row ── */
        .ep-header {
          display:flex; align-items:flex-start; justify-content:space-between;
          margin-bottom:clamp(20px,3vw,32px); flex-wrap:wrap; gap:16px;
        }
        .ep-nav-row { display:flex; align-items:center; gap:8px; flex-shrink:0; margin-top:6px; }

        /* Nav */
        .ep-nav { width:38px; height:38px; border-radius:50%; background:#f5f5f5; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background .25s,transform .2s; color:#333; flex-shrink:0; }
        .ep-nav:hover { background:#ea641e; color:#fff; transform:scale(1.08); }
        .ep-nav:disabled { opacity:.3; cursor:not-allowed; }
        .ep-nav:disabled:hover { background:#f5f5f5; color:#333; transform:none; }

        /* Category tabs */
        .cat-tabs {
          display:flex; gap:8px; flex-wrap:wrap;
          margin-bottom:clamp(20px,3vw,32px);
          /* Horizontal scroll on mobile */
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          flex-wrap: nowrap;
          padding-bottom: 4px;
        }
        .cat-tabs::-webkit-scrollbar { display:none; }
        .cat-tab {
          font-size:12px; font-weight:500; letter-spacing:.05em;
          padding:7px 16px; border-radius:100px;
          border:1.5px solid #e5e7eb; background:transparent; color:#777; cursor:pointer;
          transition:all .25s; white-space:nowrap; flex-shrink:0;
        }
        .cat-tab:hover { border-color:#ea641e; color:#ea641e; }
        .cat-tab.active { background:#111; color:#fff; border-color:#111; }

        /* Grid — driven by --ep-cols CSS var */
        .ep-grid {
          display:grid;
          grid-template-columns: repeat(var(--ep-cols,4), 1fr);
          gap:clamp(12px,2vw,20px);
          margin-bottom:clamp(24px,3vw,36px);
        }

        /* Card */
        .ep-card {
          background:#fafafa; border-radius:16px; overflow:hidden; cursor:pointer;
          position:relative; border:1.5px solid transparent;
          transition:border-color .3s,box-shadow .35s,transform .4s cubic-bezier(.16,1,.3,1);
        }
        .ep-card:hover { border-color:rgba(234,100,30,.18); box-shadow:0 18px 44px rgba(0,0,0,.1); transform:translateY(-6px); }

        /* Image */
        .ep-img-wrap {
          position:relative; background:#f0ede8;
          height:clamp(150px,20vw,210px);
          display:flex; align-items:center; justify-content:center; overflow:hidden;
        }
        .ep-img-wrap img {
          width:clamp(100px,13vw,150px); height:clamp(120px,16vw,175px);
          object-fit:cover; transition:transform .6s cubic-bezier(.16,1,.3,1);
        }
        .ep-card:hover .ep-img-wrap img { transform:scale(1.07); }

        /* Badge */
        .ep-badge { position:absolute; top:10px; left:10px; font-size:10px; font-weight:700; padding:3px 9px; border-radius:100px; letter-spacing:.04em; }
        .ep-badge.sale { background:#ea641e; color:#fff; }
        .ep-badge.new  { background:#16a34a; color:#fff; }

        /* Actions */
        .ep-actions { position:absolute; top:10px; right:10px; display:flex; flex-direction:column; gap:6px; opacity:0; transform:translateX(8px); transition:opacity .3s,transform .3s; }
        .ep-card:hover .ep-actions { opacity:1; transform:translateX(0); }
        .ep-action-btn { width:32px; height:32px; border-radius:50%; background:#fff; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,.12); transition:background .2s,transform .2s; color:#555; }
        .ep-action-btn:hover { background:#ea641e; color:#fff; transform:scale(1.1); }
        .ep-action-btn.wished { background:#fee2e2; color:#ef4444; }

        /* Cart bar */
        .ep-cart-bar { position:absolute; bottom:0; left:0; right:0; background:#111; color:#fff; padding:9px 0; display:flex; align-items:center; justify-content:center; gap:7px; font-size:12px; font-weight:500; letter-spacing:.05em; transform:translateY(100%); transition:transform .35s cubic-bezier(.16,1,.3,1); cursor:pointer; border:none; width:100%; }
        .ep-card:hover .ep-cart-bar { transform:translateY(0); }
        .ep-cart-bar.added { background:#16a34a; }
        .ep-cart-bar:hover:not(.added) { background:#ea641e; }

        /* Always-visible cart on touch */
        @media (hover:none) {
          .ep-cart-bar { transform:translateY(0); }
          .ep-actions { opacity:1; transform:translateX(0); }
        }

        /* Card body */
        .ep-body { padding:clamp(10px,1.5vw,14px) clamp(12px,1.5vw,16px) clamp(12px,1.5vw,16px); }
        .ep-title { font-size:clamp(12px,1.3vw,14px); font-weight:600; color:#111; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:7px; }
        .ep-prices { display:flex; align-items:center; gap:7px; margin-bottom:7px; }
        .ep-price { font-family:'Syne',sans-serif; font-size:clamp(.95rem,1.5vw,1.1rem); font-weight:700; color:#ea641e; }
        .ep-orig  { font-size:12px; color:#ccc; text-decoration:line-through; }
        .ep-stars { display:flex; align-items:center; gap:5px; }
        .ep-review{ font-size:11px; color:#bbb; }
        .ep-colors{ display:flex; gap:6px; margin-top:8px; }
        .ep-dot   { width:13px; height:13px; border-radius:50%; border:2px solid #e5e7eb; cursor:pointer; transition:border-color .2s,transform .2s; flex-shrink:0; }
        .ep-dot:hover { border-color:#555; transform:scale(1.2); }

        /* Card stagger */
        .ep-stagger { opacity:0; transform:translateY(22px); }
        .ep-stagger.in { animation:card-appear .6s cubic-bezier(.16,1,.3,1) forwards; }
        @keyframes card-appear { to { opacity:1; transform:translateY(0); } }

        /* Pagination */
        .pg-row { display:flex; justify-content:center; gap:8px; margin-bottom:clamp(24px,3vw,36px); }
        .pg-dot { width:8px; height:8px; border-radius:50%; background:#e5e7eb; border:none; cursor:pointer; transition:background .25s,transform .25s; flex-shrink:0; }
        .pg-dot.active { background:#111; transform:scale(1.3); }
        .pg-dot:hover { background:#ea641e; }

        /* CTA */
        .ep-cta { display:inline-flex; align-items:center; gap:8px; background:#111; color:#fff; font-family:'Outfit',sans-serif; font-size:14px; font-weight:500; letter-spacing:.05em; padding:13px clamp(24px,4vw,40px); border-radius:100px; border:none; cursor:pointer; position:relative; overflow:hidden; transition:transform .3s,box-shadow .3s; }
        .ep-cta::before { content:''; position:absolute; inset:0; background:#ea641e; transform:translateX(-101%); transition:transform .4s cubic-bezier(.16,1,.3,1); }
        .ep-cta:hover::before { transform:translateX(0); }
        .ep-cta:hover { transform:translateY(-2px); box-shadow:0 10px 24px rgba(234,100,30,.3); }
        .ep-cta span,.ep-cta svg { position:relative; z-index:1; }

        /* ═══════════════════════
           BREAKPOINTS
        ═══════════════════════ */

        /* Tablet */
        @media (max-width: 1024px) {
          .ep-section { padding-inline: clamp(16px,4vw,32px); }
        }

        /* Small mobile */
        @media (max-width: 479px) {
          .ep-header { flex-direction:column; gap:10px; }
          .ep-nav-row { align-self:flex-end; }
        }

        /* Reduce motion */
        @media (prefers-reduced-motion:reduce) {
          .ep-fade { transition:none; opacity:1; transform:none; }
          .ep-stagger.in { animation:none; opacity:1; transform:none; }
          .ep-bar { animation:none; }
        }
      `}</style>

      <section ref={sectionRef} className="ep-section py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div style={{ maxWidth:"1280px", margin:"0 auto" }}>

          {/* ── Header ── */}
          <div className={`ep-fade ep-d1 ${visible ? "in" : ""} ep-header`}>
            <div>
              <div className="ep-eyebrow"><div className="ep-bar" />Our Products</div>
              <h2 className="ep-heading">Explore Our Products</h2>
            </div>
            <div className="ep-nav-row">
              <button className="ep-nav" disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}>
                <ChevronLeft size={17} />
              </button>
              <button className="ep-nav" disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages - 1))}>
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* ── Category Tabs (scrollable on mobile) ── */}
          <div className={`ep-fade ep-d2 ${visible ? "in" : ""}`}>
            <div className="cat-tabs">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`cat-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(0); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Grid ── */}
          <div
            className="ep-grid"
            style={{ "--ep-cols": cols } as React.CSSProperties}
          >
            {currentProducts.map((product, i) => (
              <div
                key={product.id}
                className={`ep-card ep-stagger ${visible ? "in" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                onClick={(e) => handleProductClick(product.id, e)}
              >
                <div className="ep-img-wrap">
                  <img src={product.image} alt={product.title} />
                  <div className={`ep-badge ${product.status === "NEW" ? "new" : "sale"}`}>{product.status}</div>

                  <div className="ep-actions">
                    <button className={`ep-action-btn ${isInWishlist(product.id) ? "wished" : ""}`}
                      onClick={(e) => handleWishlist(product, e)}>
                      <Heart size={13} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button className="ep-action-btn" onClick={(e) => e.stopPropagation()}>
                      <Eye size={13} />
                    </button>
                  </div>

                  <button
                    className={`ep-cart-bar ${addedId === product.id ? "added" : ""}`}
                    onClick={(e) => handleCart(product, e)}
                  >
                    <ShoppingBag size={13} />
                    {addedId === product.id ? "Added!" : "Add to Cart"}
                  </button>
                </div>

                <div className="ep-body">
                  <div className="ep-title">{product.title}</div>
                  <div className="ep-prices">
                    <span className="ep-price">₹{product.price}</span>
                    {product.originalPrice && <span className="ep-orig">₹{product.originalPrice}</span>}
                  </div>
                  <div className="ep-stars">
                    <div style={{ display:"flex" }}>{renderStars(product.rating)}</div>
                    <span className="ep-review">({product.reviewCount})</span>
                  </div>
                  {getColorDots(product.id).length > 0 && (
                    <div className="ep-colors">
                      {getColorDots(product.id).map((color, ci) => (
                        <button key={ci} className="ep-dot" style={{ background: color }}
                          onClick={(e) => e.stopPropagation()} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Pagination dots ── */}
          {totalPages > 1 && (
            <div className="pg-row">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`pg-dot ${i === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(i)} />
              ))}
            </div>
          )}

          {/* ── CTA ── */}
          <div className={`ep-fade ep-d3 ${visible ? "in" : ""}`} style={{ textAlign:"center" }}>
            <button className="ep-cta">
              <span>View All Products</span>
              <ArrowUpRight size={15} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default ExploreProducts;