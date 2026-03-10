import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, Eye, ShoppingBag, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../products/WishlistContext";
import { useCart } from "../products/CartContext";
import type { Product } from "../types/product";
import tshit from "../../assets/thsirt.png";
import watch1 from "../../assets/shopping.webp";
import mouse from "../../assets/girldress.png";
import headPhone from "../../assets/kiddress.png";
import game from "../../assets/mensuit.png";
import shoe from "../../assets/images21.png";

const CATEGORIES = ["All", "Traditional", "Women", "Men", "girl", "Boy"];

const ExploreProducts: React.FC = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const allProducts: Product[] = [
    { id: "1", title: "Cotton Blend Kid Set", brand: "HAVIT", price: 120, originalPrice: 160, image: headPhone, rating: 4.5, reviewCount: "88", status: "-40%", category: "Gaming" },
    { id: "2", title: "Girls Floral Dress", brand: "AK", price: 960, originalPrice: 1160, image: watch1, rating: 4, reviewCount: "75", status: "-35%", category: "Electronics" },
    { id: "3", title: "Men's Slim Fit Shirt", brand: "Samsung", price: 370, originalPrice: 400, image: tshit, rating: 4.5, reviewCount: "99", status: "-10%", category: "Monitors" },
    { id: "4", title: "Women's Summer Dress", brand: "Herman Miller", price: 375, originalPrice: 400, image: mouse, rating: 4.5, reviewCount: "99", status: "-25%", category: "Furniture" },
    { id: "5", title: "Girls Embroidered Top", brand: "AK", price: 960, originalPrice: 1160, image: watch1, rating: 4, reviewCount: "75", status: "-35%", category: "Electronics" },
    { id: "6", title: "Jr. Zoom Soccer Cleats", brand: "Nike", price: 1160, originalPrice: 1300, image: shoe, rating: 5, reviewCount: "35", status: "NEW", category: "Sports" },
    { id: "7", title: "Men's Formal Suit", brand: "GP11", price: 660, originalPrice: 800, image: game, rating: 4.5, reviewCount: "55", status: "NEW", category: "Gaming" },
    { id: "8", title: "Men's Casual T-Shirt", brand: "Samsung", price: 370, originalPrice: 400, image: tshit, rating: 4.5, reviewCount: "99", status: "-30%", category: "Monitors" },
  ];

  const filtered = activeCategory === "All" ? allProducts : allProducts.filter(p => p.category === activeCategory);
  const perPage = 8;
  const totalPages = Math.ceil(filtered.length / perPage);
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

        .ep-section {
          font-family: 'Outfit', sans-serif;
          background: #fff;
          position: relative;
        }

        /* Entrance */
        .ep-fade { opacity: 0; transform: translateY(30px); transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1); }
        .ep-fade.in { opacity: 1; transform: translateY(0); }
        .ep-d1 { transition-delay: 0.05s; }
        .ep-d2 { transition-delay: 0.2s; }
        .ep-d3 { transition-delay: 0.35s; }

        /* Eyebrow */
        .ep-eyebrow { display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 600; color: #ea641e; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 6px; }
        .ep-bar { width: 4px; height: 18px; border-radius: 2px; background: #ea641e; animation: bar-blink 2s ease-in-out infinite; }
        @keyframes bar-blink { 0%,100%{opacity:1;} 50%{opacity:0.4;} }

        /* Heading */
        .ep-heading { font-family: 'Syne', sans-serif; font-size: clamp(1.7rem, 3vw, 2.3rem); font-weight: 800; color: #111; letter-spacing: -0.03em; }

        /* Category tabs */
        .cat-tabs { display: flex; gap: 8px; flex-wrap: wrap; }
        .cat-tab {
          font-size: 12px; font-weight: 500; letter-spacing: 0.05em;
          padding: 7px 18px; border-radius: 100px;
          border: 1.5px solid #e5e7eb;
          background: transparent; color: #777; cursor: pointer;
          transition: all 0.25s;
        }
        .cat-tab:hover { border-color: #ea641e; color: #ea641e; }
        .cat-tab.active { background: #111; color: #fff; border-color: #111; }

        /* Nav buttons */
        .ep-nav { width: 38px; height: 38px; border-radius: 50%; background: #f5f5f5; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.25s, transform 0.2s; color: #333; }
        .ep-nav:hover { background: #ea641e; color: #fff; transform: scale(1.08); }

        /* Card */
        .ep-card {
          background: #fafafa;
          border-radius: 16px; overflow: hidden; cursor: pointer; position: relative;
          border: 1.5px solid transparent;
          transition: border-color 0.3s, box-shadow 0.35s, transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .ep-card:hover { border-color: rgba(234,100,30,0.18); box-shadow: 0 18px 44px rgba(0,0,0,0.1); transform: translateY(-6px); }

        /* Image */
        .ep-img-wrap { position: relative; background: #f0ede8; height: 210px; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .ep-img-wrap img { width: 150px; height: 175px; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .ep-card:hover .ep-img-wrap img { transform: scale(1.07); }

        /* Badge */
        .ep-badge { position: absolute; top: 12px; left: 12px; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 100px; letter-spacing: 0.04em; }
        .ep-badge.sale { background: #ea641e; color: #fff; }
        .ep-badge.new { background: #16a34a; color: #fff; }

        /* Action btns */
        .ep-actions { position: absolute; top: 12px; right: 12px; display: flex; flex-direction: column; gap: 6px; opacity: 0; transform: translateX(8px); transition: opacity 0.3s, transform 0.3s; }
        .ep-card:hover .ep-actions { opacity: 1; transform: translateX(0); }
        .ep-action-btn { width: 34px; height: 34px; border-radius: 50%; background: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.12); transition: background 0.2s, transform 0.2s; color: #555; }
        .ep-action-btn:hover { background: #ea641e; color: #fff; transform: scale(1.1); }
        .ep-action-btn.wished { background: #fee2e2; color: #ef4444; }

        /* Cart bar */
        .ep-cart-bar { position: absolute; bottom: 0; left: 0; right: 0; background: #111; color: #fff; padding: 10px 0; display: flex; align-items: center; justify-content: center; gap: 7px; font-size: 12px; font-weight: 500; letter-spacing: 0.05em; transform: translateY(100%); transition: transform 0.35s cubic-bezier(0.16,1,0.3,1); cursor: pointer; border: none; width: 100%; }
        .ep-card:hover .ep-cart-bar { transform: translateY(0); }
        .ep-cart-bar.added { background: #16a34a; }
        .ep-cart-bar:hover:not(.added) { background: #ea641e; }

        /* Card body */
        .ep-body { padding: 14px 16px 16px; }
        .ep-title { font-size: 14px; font-weight: 600; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 8px; }
        .ep-prices { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .ep-price { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 700; color: #ea641e; }
        .ep-orig { font-size: 12px; color: #ccc; text-decoration: line-through; }
        .ep-stars { display: flex; align-items: center; gap: 6px; }
        .ep-review { font-size: 12px; color: #bbb; }

        /* Color dots */
        .ep-colors { display: flex; gap: 6px; margin-top: 8px; }
        .ep-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid #e5e7eb; cursor: pointer; transition: border-color 0.2s, transform 0.2s; }
        .ep-dot:hover { border-color: #555; transform: scale(1.2); }

        /* Card stagger */
        .ep-stagger { opacity: 0; transform: translateY(22px); }
        .ep-stagger.in { animation: card-appear 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        @keyframes card-appear { to { opacity: 1; transform: translateY(0); } }

        /* Pagination dots */
        .pg-dot { width: 8px; height: 8px; border-radius: 50%; background: #e5e7eb; border: none; cursor: pointer; transition: background 0.25s, transform 0.25s; }
        .pg-dot.active { background: #111; transform: scale(1.3); }
        .pg-dot:hover { background: #ea641e; }

        /* View all */
        .ep-cta { display: inline-flex; align-items: center; gap: 8px; background: #111; color: #fff; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.05em; padding: 14px 40px; border-radius: 100px; border: none; cursor: pointer; position: relative; overflow: hidden; transition: transform 0.3s, box-shadow 0.3s; }
        .ep-cta::before { content: ''; position: absolute; inset: 0; background: #ea641e; transform: translateX(-101%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1); }
        .ep-cta:hover::before { transform: translateX(0); }
        .ep-cta:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(234,100,30,0.3); }
        .ep-cta span, .ep-cta svg { position: relative; z-index: 1; }
      `}</style>

      <section ref={sectionRef} className="ep-section py-16 px-4 sm:px-6 lg:px-8">
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div className={`ep-fade ep-d1 ${visible ? "in" : ""}`}
            style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div className="ep-eyebrow"><div className="ep-bar" />Our Products</div>
              <h2 className="ep-heading">Explore Our Products</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
              <button className="ep-nav" onClick={() => setCurrentPage(p => Math.max(0, p - 1))}><ChevronLeft size={17} /></button>
              <button className="ep-nav" onClick={() => setCurrentPage(p => (p + 1) % Math.max(1, totalPages))}><ChevronRight size={17} /></button>
            </div>
          </div>

          {/* ── Category Tabs ── */}
          <div className={`ep-fade ep-d2 ${visible ? "in" : ""}`} style={{ marginBottom: "32px" }}>
            <div className="cat-tabs">
              {CATEGORIES.map(cat => (
                <button key={cat} className={`cat-tab ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => { setActiveCategory(cat); setCurrentPage(0); }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "36px" }}>
            {currentProducts.map((product, i) => (
              <div
                key={product.id}
                className={`ep-card ep-stagger ${visible ? "in" : ""}`}
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
                onClick={(e) => handleProductClick(product.id, e)}
              >
                <div className="ep-img-wrap">
                  <img src={product.image} alt={product.title} />

                  <div className={`ep-badge ${product.status === "NEW" ? "new" : "sale"}`}>{product.status}</div>

                  <div className="ep-actions">
                    <button className={`ep-action-btn ${isInWishlist(product.id) ? "wished" : ""}`} onClick={(e) => handleWishlist(product, e)}>
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
                    <div style={{ display: "flex" }}>{renderStars(product.rating)}</div>
                    <span className="ep-review">({product.reviewCount})</span>
                  </div>
                  {getColorDots(product.id).length > 0 && (
                    <div className="ep-colors">
                      {getColorDots(product.id).map((color, ci) => (
                        <button key={ci} className="ep-dot" style={{ background: color }} onClick={(e) => e.stopPropagation()} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* ── Pagination dots ── */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "36px" }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} className={`pg-dot ${i === currentPage ? "active" : ""}`} onClick={() => setCurrentPage(i)} />
              ))}
            </div>
          )}

          {/* ── CTA ── */}
          <div className={`ep-fade ep-d3 ${visible ? "in" : ""}`} style={{ textAlign: "center" }}>
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