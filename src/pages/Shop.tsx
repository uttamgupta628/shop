import React, { useState, useMemo } from 'react';

const ALL_PRODUCTS = [
  { id:1,  name:"Slim Fit Oxford Shirt",   cat:"Men",   sub:"Shirts",   price:899,  orig:1499, img:"https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80", badge:"NEW",  rating:4.5, reviews:128, colors:["#fff","#6b8cba","#111"] },
  { id:2,  name:"Stretch Chino Trousers",  cat:"Men",   sub:"Trousers", price:1299, orig:2199, img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80", badge:"HOT",  rating:4.3, reviews:87,  colors:["#8b6f47","#111","#3a3a3a"] },
  { id:3,  name:"Premium Wool Blazer",     cat:"Men",   sub:"Suits",    price:3499, orig:5999, img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80", badge:"SALE", rating:4.7, reviews:214, colors:["#111","#2c3e50","#555"] },
  { id:4,  name:"Urban Denim Jacket",      cat:"Men",   sub:"Jackets",  price:1899, orig:2999, img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80", badge:"",     rating:4.4, reviews:156, colors:["#3b5998","#111"] },
  { id:5,  name:"Classic White Tee",       cat:"Men",   sub:"T-Shirts", price:399,  orig:699,  img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", badge:"SALE", rating:4.2, reviews:301, colors:["#fff","#111","#e63946"] },
  { id:6,  name:"Slim Straight Jeans",     cat:"Men",   sub:"Jeans",    price:1199, orig:1999, img:"https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80", badge:"",     rating:4.6, reviews:189, colors:["#3b5998","#111","#1a1a2e"] },
  { id:7,  name:"Floral Wrap Dress",       cat:"Women", sub:"Dresses",  price:1099, orig:1799, img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80", badge:"NEW",  rating:4.8, reviews:245, colors:["#e8b4b8","#6b4c3b","#fff"] },
  { id:8,  name:"Silk Kurta Set",          cat:"Women", sub:"Ethnic",   price:2199, orig:3499, img:"https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80", badge:"HOT",  rating:4.6, reviews:178, colors:["#c0392b","#8e44ad","#f39c12"] },
  { id:9,  name:"Printed Cotton Saree",    cat:"Women", sub:"Ethnic",   price:1599, orig:2499, img:"https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=500&q=80", badge:"",     rating:4.5, reviews:132, colors:["#3498db","#e74c3c","#2ecc71"] },
  { id:10, name:"Western Crop Top",        cat:"Women", sub:"Tops",     price:599,  orig:999,  img:"https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=500&q=80", badge:"SALE", rating:4.3, reviews:97,  colors:["#fff","#111","#e63946"] },
  { id:11, name:"High-Waist Palazzo",      cat:"Women", sub:"Trousers", price:899,  orig:1499, img:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500&q=80", badge:"NEW",  rating:4.4, reviews:143, colors:["#111","#555","#8b6f47"] },
  { id:12, name:"Embroidered Anarkali",    cat:"Women", sub:"Ethnic",   price:3299, orig:4999, img:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80", badge:"",     rating:4.9, reviews:312, colors:["#8e44ad","#c0392b","#f39c12"] },
  { id:13, name:"Graphic Printed Tee",     cat:"Boys",  sub:"T-Shirts", price:349,  orig:599,  img:"https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=500&q=80", badge:"HOT",  rating:4.2, reviews:76,  colors:["#3498db","#e63946","#2ecc71"] },
  { id:14, name:"Cargo Shorts",            cat:"Boys",  sub:"Shorts",   price:499,  orig:799,  img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80", badge:"",     rating:4.1, reviews:54,  colors:["#8b6f47","#111","#3b5998"] },
  { id:15, name:"School Uniform Set",      cat:"Boys",  sub:"Uniform",  price:799,  orig:1199, img:"https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500&q=80", badge:"NEW",  rating:4.5, reviews:203, colors:["#fff","#3498db"] },
  { id:16, name:"Princess Frock",          cat:"Girls", sub:"Frocks",   price:699,  orig:1199, img:"https://images.unsplash.com/photo-1476234251651-f353703a034d?w=500&q=80", badge:"HOT",  rating:4.7, reviews:189, colors:["#e8b4b8","#8e44ad","#fff"] },
  { id:17, name:"Lehenga Choli Set",       cat:"Girls", sub:"Ethnic",   price:1499, orig:2499, img:"https://images.unsplash.com/photo-1594938298603-c8148c4b4e46?w=500&q=80", badge:"NEW",  rating:4.6, reviews:134, colors:["#e74c3c","#f39c12","#8e44ad"] },
  { id:18, name:"Casual Kurti",            cat:"Girls", sub:"Tops",     price:449,  orig:749,  img:"https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=500&q=80", badge:"SALE", rating:4.3, reviews:88,  colors:["#3498db","#2ecc71","#e8b4b8"] },
];

const CATS        = ["All","Men","Women","Boys","Girls"];
const SORTS       = ["Popular","Price: Low–High","Price: High–Low","Newest","Top Rated"];
const PRICE_RANGES = ["All Prices","Under ₹500","₹500–₹1000","₹1000–₹2000","Above ₹2000"];

const Stars = ({ n }) => (
  <span style={{ color:"#f97316", fontSize:11, letterSpacing:1 }}>
    {"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}
  </span>
);
const pct = (p, o) => Math.round((1 - p / o) * 100);

export default function ShopPage() {
  const [activeCat, setActiveCat]   = useState("All");
  const [sort, setSort]             = useState("Popular");
  const [priceRange, setPriceRange] = useState("All Prices");
  const [search, setSearch]         = useState("");
  const [wishlist, setWishlist]     = useState([]);
  const [cart, setCart]             = useState([]);
  const [viewMode, setViewMode]     = useState("grid");
  const [hoveredId, setHoveredId]   = useState(null);
  const [addedId, setAddedId]       = useState(null);

  const toggleWish = (id) => setWishlist(w => w.includes(id) ? w.filter(x=>x!==id) : [...w,id]);
  const addCart    = (id) => {
    setCart(c => c.includes(id) ? c : [...c,id]);
    setAddedId(id); setTimeout(() => setAddedId(null), 1200);
  };

  const filtered = useMemo(() => {
    let p = [...ALL_PRODUCTS];
    if (activeCat !== "All") p = p.filter(x => x.cat === activeCat);
    if (search.trim())       p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    if (priceRange === "Under ₹500")    p = p.filter(x => x.price < 500);
    if (priceRange === "₹500–₹1000")   p = p.filter(x => x.price >= 500  && x.price < 1000);
    if (priceRange === "₹1000–₹2000")  p = p.filter(x => x.price >= 1000 && x.price < 2000);
    if (priceRange === "Above ₹2000")  p = p.filter(x => x.price >= 2000);
    if (sort === "Price: Low–High")  p.sort((a,b) => a.price - b.price);
    if (sort === "Price: High–Low")  p.sort((a,b) => b.price - a.price);
    if (sort === "Top Rated")        p.sort((a,b) => b.rating - a.rating);
    if (sort === "Newest")           p.sort((a,b) => b.id - a.id);
    if (sort === "Popular")          p.sort((a,b) => b.reviews - a.reviews);
    return p;
  }, [activeCat, sort, priceRange, search]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red:        #e63946;
          --red2:       #c62828;
          --dark:       #0a0a0a;
          --dark2:      #111111;
          --light:      #ffffff;
          --light2:     #f8f8f8;
          --border:     #ebebeb;
          --text:       #0a0a0a;
          --muted:      #888888;
          --font:       'Plus Jakarta Sans', sans-serif;
          --px:         clamp(16px, 4vw, 48px);
          --ease:       cubic-bezier(.16,1,.3,1);
        }

        .shop-root {
          font-family: var(--font);
          background: var(--light2);
          min-height: 100vh;
          color: var(--text);
        }

        /* ══ NAV ══════════════════════════════════ */
        .shop-nav {
          background: var(--dark);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 var(--px);
          height: 58px;
          position: sticky; top: 0; z-index: 100;
          border-bottom: 2px solid var(--red);
        }
        .nav-logo {
          font-family: var(--font);
          font-size: 17px; font-weight: 800; letter-spacing: .04em;
          text-transform: uppercase; color: var(--light);
        }
        .nav-logo span { color: var(--red); }
        .nav-right { display: flex; align-items: center; gap: 6px; }
        .nav-icon-btn {
          background: none; border: none; cursor: pointer;
          color: rgba(255,255,255,.45); font-size: 16px; position: relative;
          transition: color .2s;
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 6px;
        }
        .nav-icon-btn:hover { color: var(--light); background: rgba(255,255,255,.06); }
        .nav-badge {
          position: absolute; top: 4px; right: 4px;
          width: 15px; height: 15px; border-radius: 50%;
          background: var(--red); color: var(--light);
          font-size: 8px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        /* ══ PAGE HEADER ══════════════════════════ */
        .shop-header {
          background: var(--dark);
          padding: clamp(28px,4vw,52px) var(--px) clamp(24px,3vw,40px);
          position: relative; overflow: hidden;
        }
        .shop-header::before {
          content: ''; position: absolute; top: -60px; right: -60px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(circle, rgba(230,57,70,.14) 0%, transparent 70%);
          pointer-events: none;
        }
        .shop-header-row {
          display: flex; align-items: flex-end; justify-content: space-between;
          flex-wrap: wrap; gap: 12px; position: relative; z-index: 1;
        }
        .shop-title {
          font-family: var(--font);
          font-size: clamp(1.9rem,4.5vw,3.6rem);
          font-weight: 800; color: var(--light);
          letter-spacing: -.03em; line-height: 1;
        }
        .shop-title span { color: var(--red); }
        .shop-subtitle {
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,.38); margin-top: 6px; line-height: 1.5;
        }
        .result-count {
          font-family: var(--font); font-size: 12px; font-weight: 600;
          color: rgba(255,255,255,.3); letter-spacing: .06em; text-transform: uppercase;
          align-self: flex-end; white-space: nowrap;
        }
        .result-count strong { color: var(--light); font-weight: 700; }

        /* ══ TOOLBAR ══════════════════════════════ */
        .toolbar {
          background: var(--light);
          border-bottom: 1px solid var(--border);
          padding: 10px var(--px);
          display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
          position: sticky; top: 58px; z-index: 90;
          box-shadow: 0 1px 0 var(--border);
        }

        /* Category pills */
        .cat-pills { display: flex; gap: 6px; flex-wrap: nowrap; overflow-x: auto; }
        .cat-pill {
          font-family: var(--font); font-size: 11px; font-weight: 700;
          letter-spacing: .04em; text-transform: uppercase;
          padding: 6px 14px; border: 1.5px solid var(--border);
          background: var(--light); color: var(--muted); cursor: pointer;
          border-radius: 4px; transition: all .2s; white-space: nowrap;
        }
        .cat-pill:hover { border-color: var(--red); color: var(--red); }
        .cat-pill.active { background: var(--dark); border-color: var(--dark); color: var(--light); }

        .toolbar-sep { width: 1px; height: 26px; background: var(--border); flex-shrink: 0; }
        .toolbar-right { margin-left: auto; display: flex; align-items: center; gap: 8px; }

        .tool-select {
          font-family: var(--font); font-size: 11px; font-weight: 600;
          letter-spacing: .03em; text-transform: uppercase;
          padding: 6px 28px 6px 10px; border: 1.5px solid var(--border);
          background: var(--light); color: var(--text); cursor: pointer;
          border-radius: 4px; appearance: none; outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23aaa'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 9px center;
          transition: border-color .2s;
        }
        .tool-select:focus { border-color: var(--red); outline: none; }

        .search-wrap { position: relative; display: flex; align-items: center; }
        .search-input {
          font-family: var(--font); font-size: 12px; font-weight: 400;
          padding: 6px 12px 6px 32px; border: 1.5px solid var(--border);
          background: var(--light); outline: none; width: 170px; border-radius: 4px;
          transition: border-color .2s, width .3s var(--ease);
          color: var(--text);
        }
        .search-input::placeholder { color: #bbb; }
        .search-input:focus { border-color: var(--red); width: 210px; }
        .search-icon { position: absolute; left: 10px; color: #bbb; font-size: 12px; pointer-events: none; }

        .view-toggle { display: flex; gap: 3px; }
        .view-btn {
          width: 30px; height: 30px; border: 1.5px solid var(--border);
          background: var(--light); cursor: pointer; color: #bbb;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; transition: all .2s; border-radius: 4px;
        }
        .view-btn.active { background: var(--dark); border-color: var(--dark); color: var(--light); }

        /* ══ BODY ══════════════════════════════════ */
        .shop-body {
          padding: clamp(16px,2.5vw,28px) var(--px) clamp(32px,4vw,48px);
        }

        /* ══ PRODUCT GRID ══════════════════════════ */
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(230px,1fr));
          gap: 16px;
        }
        .product-grid.list-mode { grid-template-columns: 1fr; gap: 12px; }

        /* ══ PRODUCT CARD ══════════════════════════ */
        .p-card {
          background: var(--light);
          position: relative; overflow: hidden; cursor: pointer;
          border: 1px solid var(--border); border-radius: 8px;
          transition: transform .3s var(--ease), box-shadow .3s, border-color .3s;
        }
        .p-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,.09);
          border-color: #ddd;
        }

        /* List mode */
        .product-grid.list-mode .p-card {
          display: grid; grid-template-columns: 180px 1fr;
          border-radius: 8px;
        }
        .product-grid.list-mode .p-card-img-wrap { height: 180px; border-radius: 8px 0 0 8px; }
        .product-grid.list-mode .p-card-body {
          padding: 20px 22px; display: flex; flex-direction: column; justify-content: center;
        }

        .p-card-img-wrap {
          position: relative; height: 260px; overflow: hidden;
          background: #f3f3f3; border-radius: 7px 7px 0 0;
        }
        .p-card-img {
          width: 100%; height: 100%; object-fit: cover;
          transition: transform .55s var(--ease), filter .4s;
          filter: brightness(.97);
        }
        .p-card:hover .p-card-img { transform: scale(1.06); filter: brightness(1); }

        /* Badge */
        .p-badge {
          position: absolute; top: 10px; left: 10px;
          font-family: var(--font); font-size: 9px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          padding: 3px 9px; border-radius: 3px; z-index: 3;
        }
        .badge-NEW  { background: var(--red);  color: #fff; }
        .badge-HOT  { background: var(--dark); color: #fff; }
        .badge-SALE { background: #f97316;     color: #fff; }

        /* Discount */
        .p-discount {
          position: absolute; top: 10px; right: 10px;
          background: rgba(0,0,0,.72); color: #fff;
          font-family: var(--font); font-size: 10px; font-weight: 700;
          padding: 3px 7px; border-radius: 3px; z-index: 3; letter-spacing: .02em;
        }

        /* Hover actions */
        .p-actions {
          position: absolute; bottom: 0; left: 0; right: 0;
          display: flex; gap: 0;
          transform: translateY(100%);
          transition: transform .32s var(--ease);
          z-index: 4;
        }
        .p-card:hover .p-actions { transform: translateY(0); }

        .p-action-btn {
          flex: 1; padding: 11px 6px;
          font-family: var(--font); font-size: 11px; font-weight: 700;
          letter-spacing: .05em; text-transform: uppercase;
          border: none; cursor: pointer; transition: background .2s;
        }
        .btn-cart        { background: var(--dark); color: #fff; }
        .btn-cart:hover  { background: var(--red); }
        .btn-cart.added  { background: #16a34a; }
        .btn-wish        { background: rgba(255,255,255,.94); color: var(--dark); width: 46px; flex: none; font-size: 17px; }
        .btn-wish.wished { background: var(--red); color: #fff; }

        /* Card body */
        .p-card-body { padding: 14px 16px 18px; }

        .p-cat-label {
          font-family: var(--font); font-size: 9px; font-weight: 600;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--red); margin-bottom: 5px;
        }
        .p-name {
          font-family: var(--font); font-size: 14px; font-weight: 700;
          color: var(--dark); margin-bottom: 8px; line-height: 1.3;
          letter-spacing: -.01em;
        }
        .p-rating-row { display: flex; align-items: center; gap: 5px; margin-bottom: 10px; }
        .p-reviews { font-size: 11px; color: var(--muted); font-weight: 400; }

        .p-price-row { display: flex; align-items: baseline; gap: 8px; }
        .p-price {
          font-family: var(--font); font-size: 18px; font-weight: 800;
          color: var(--dark); letter-spacing: -.02em;
        }
        .p-orig { font-size: 12px; color: #bbb; text-decoration: line-through; font-weight: 400; }

        .p-colors { display: flex; gap: 5px; margin-top: 10px; }
        .p-color {
          width: 12px; height: 12px; border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,.08); flex-shrink: 0;
        }

        /* ══ EMPTY STATE ══════════════════════════ */
        .empty-state {
          grid-column: 1/-1; text-align: center;
          padding: 80px 20px; color: var(--muted);
        }
        .empty-icon  { font-size: 52px; margin-bottom: 14px; }
        .empty-title {
          font-family: var(--font); font-size: 1.3rem; font-weight: 700;
          color: #ccc; margin-bottom: 8px; letter-spacing: -.01em;
        }
        .empty-sub { font-size: 13px; color: #bbb; }

        /* ══ CART TOAST ═══════════════════════════ */
        .cart-toast {
          position: fixed; bottom: 24px; right: 24px;
          background: var(--dark); color: var(--light);
          font-family: var(--font); font-size: 12px; font-weight: 700;
          letter-spacing: .06em; text-transform: uppercase;
          padding: 13px 22px; z-index: 999; border-radius: 6px;
          border-left: 3px solid #16a34a;
          box-shadow: 0 8px 24px rgba(0,0,0,.18);
          transform: translateY(80px); opacity: 0;
          transition: all .35s var(--ease);
          pointer-events: none;
        }
        .cart-toast.show { transform: translateY(0); opacity: 1; }

        

        /* ══ RESPONSIVE ═══════════════════════════ */
        @media (max-width: 640px) {
          .toolbar { padding: 8px var(--px); gap: 8px; }
          .toolbar-sep { display: none; }
          .toolbar-right { margin-left: 0; width: 100%; justify-content: space-between; }
          .search-input { width: 130px; }
          .search-input:focus { width: 155px; }
          .product-grid { grid-template-columns: repeat(2,1fr); gap: 10px; }
          .p-card-img-wrap { height: 180px; }
          .p-name  { font-size: 12px; }
          .p-price { font-size: 15px; }
        }
        @media (max-width: 380px) {
          .product-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="shop-root">

       

       
        {/* ── TOOLBAR ── */}
        <div className="toolbar">
          <div className="cat-pills">
            {CATS.map(c => (
              <button key={c} className={`cat-pill${activeCat===c?" active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>
            ))}
          </div>

          <div className="toolbar-sep" />

          <select className="tool-select" value={sort} onChange={e=>setSort(e.target.value)}>
            {SORTS.map(s => <option key={s}>{s}</option>)}
          </select>

          <select className="tool-select" value={priceRange} onChange={e=>setPriceRange(e.target.value)}>
            {PRICE_RANGES.map(r => <option key={r}>{r}</option>)}
          </select>

          <div className="toolbar-right">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                placeholder="Search products..."
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />
            </div>
            <div className="view-toggle">
              <button className={`view-btn${viewMode==="grid"?" active":""}`} onClick={()=>setViewMode("grid")} title="Grid">⊞</button>
              <button className={`view-btn${viewMode==="list"?" active":""}`} onClick={()=>setViewMode("list")} title="List">☰</button>
            </div>
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        <div className="shop-body">
          <div className={`product-grid${viewMode==="list"?" list-mode":""}`}>
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🧺</div>
                <div className="empty-title">No Products Found</div>
                <p className="empty-sub">Try adjusting your filters or search term.</p>
              </div>
            ) : filtered.map(prod => (
              <div
                key={prod.id}
                className="p-card"
                onMouseEnter={()=>setHoveredId(prod.id)}
                onMouseLeave={()=>setHoveredId(null)}
              >
                <div className="p-card-img-wrap">
                  <img src={prod.img} alt={prod.name} className="p-card-img" loading="lazy" />

                  {prod.badge && (
                    <div className={`p-badge badge-${prod.badge}`}>{prod.badge}</div>
                  )}

                  <div className="p-discount">−{pct(prod.price,prod.orig)}%</div>

                  <div className="p-actions">
                    <button
                      className={`p-action-btn btn-cart${addedId===prod.id?" added":""}`}
                      onClick={()=>addCart(prod.id)}
                    >
                      {addedId===prod.id ? "✓ Added" : "+ Add to Cart"}
                    </button>
                    <button
                      className={`p-action-btn btn-wish${wishlist.includes(prod.id)?" wished":""}`}
                      onClick={()=>toggleWish(prod.id)}
                    >
                      {wishlist.includes(prod.id) ? "♥" : "♡"}
                    </button>
                  </div>
                </div>

                <div className="p-card-body">
                  <div className="p-cat-label">{prod.cat} · {prod.sub}</div>
                  <div className="p-name">{prod.name}</div>
                  <div className="p-rating-row">
                    <Stars n={prod.rating} />
                    <span className="p-reviews">({prod.reviews})</span>
                  </div>
                  <div className="p-price-row">
                    <span className="p-price">₹{prod.price.toLocaleString()}</span>
                    <span className="p-orig">₹{prod.orig.toLocaleString()}</span>
                  </div>
                  <div className="p-colors">
                    {prod.colors.map((c,i) => (
                      <span key={i} className="p-color" style={{ background: c }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      

      </div>

      {/* ── CART TOAST ── */}
      <div className={`cart-toast${addedId?" show":""}`}>✓ Added to Cart</div>
    </>
  );
}