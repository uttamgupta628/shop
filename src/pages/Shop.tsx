import React, { useState, useMemo } from "react";

const ALL_PRODUCTS = [
  { id: 1, name: "Slim Fit Oxford Shirt", cat: "Men", sub: "Shirts", price: 899, orig: 1499, img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600", badge: "NEW", rating: 4.5, reviews: 128, colors: ["#fff", "#6b8cba", "#111"] },
  { id: 2, name: "Stretch Chino Trousers", cat: "Men", sub: "Trousers", price: 1299, orig: 2199, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600", badge: "HOT", rating: 4.3, reviews: 87, colors: ["#8b6f47", "#111", "#3a3a3a"] },
  { id: 3, name: "Premium Wool Blazer", cat: "Men", sub: "Suits", price: 3499, orig: 5999, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600", badge: "SALE", rating: 4.7, reviews: 214, colors: ["#111", "#2c3e50", "#555"] },
  { id: 4, name: "Urban Denim Jacket", cat: "Men", sub: "Jackets", price: 1899, orig: 2999, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600", badge: "", rating: 4.4, reviews: 156, colors: ["#3b5998", "#111"] },
  { id: 5, name: "Classic White Tee", cat: "Men", sub: "T-Shirts", price: 399, orig: 699, img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600", badge: "SALE", rating: 4.2, reviews: 301, colors: ["#fff", "#111", "#e63946"] },
  { id: 6, name: "Slim Straight Jeans", cat: "Men", sub: "Jeans", price: 1199, orig: 1999, img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600", badge: "", rating: 4.6, reviews: 189, colors: ["#3b5998", "#111", "#1a1a2e"] },
  { id: 7, name: "Floral Wrap Dress", cat: "Women", sub: "Dresses", price: 1099, orig: 1799, img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600", badge: "NEW", rating: 4.8, reviews: 245, colors: ["#e8b4b8", "#6b4c3b", "#fff"] },
  { id: 8, name: "Silk Kurta Set", cat: "Women", sub: "Ethnic", price: 2199, orig: 3499, img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600", badge: "HOT", rating: 4.6, reviews: 178, colors: ["#c0392b", "#8e44ad", "#f39c12"] },
];

const CATS = ["All", "Men", "Women"];

const Stars = ({ n }) => (
  <span style={{ color: "#f97316", fontSize: 11 }}>
    {"★".repeat(Math.floor(n))}
    {"☆".repeat(5 - Math.floor(n))}
  </span>
);

const pct = (p, o) => Math.round((1 - p / o) * 100);

export default function ShopPage() {

  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [addedId, setAddedId] = useState(null);

  const toggleWish = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id])
  }

  const addCart = (id) => {
    setAddedId(id)
    setTimeout(() => setAddedId(null), 1200)
  }

  const filtered = useMemo(() => {
    let p = [...ALL_PRODUCTS]

    if (activeCat !== "All") p = p.filter(x => x.cat === activeCat)

    if (search.trim())
      p = p.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))

    return p
  }, [activeCat, search])

  return (

    <div className="shop-root">

      <style>{`

.shop-root{
font-family:system-ui;
background:#f8f8f8;
min-height:100vh;
}

.toolbar{
display:flex;
flex-wrap:wrap;
gap:12px;
align-items:center;
justify-content:space-between;
padding:16px 0;
}

.cat-pills{
display:flex;
gap:8px;
flex-wrap:wrap;
}

.cat-pill{
padding:6px 14px;
border:1px solid #ddd;
background:#fff;
cursor:pointer;
font-size:12px;
font-weight:600;
border-radius:6px;
}

.cat-pill.active{
background:#111;
color:#fff;
border-color:#111;
}

.toolbar-right{
display:flex;
gap:10px;
align-items:center;
}

.search-input{
padding:8px 12px;
border:1px solid #ddd;
border-radius:6px;
width:180px;
}

.view-btn{
width:34px;
height:34px;
border:1px solid #ddd;
background:#fff;
cursor:pointer;
border-radius:6px;
}

.view-btn.active{
background:#111;
color:#fff;
}

.shop-body{
padding:32px 0;
}

.product-grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(240px,1fr));
gap:20px;
}

.product-grid.list-mode{
grid-template-columns:1fr;
}

.p-card{
background:#fff;
border:1px solid #eee;
border-radius:10px;
overflow:hidden;
transition:.3s;
}

.p-card:hover{
transform:translateY(-5px);
box-shadow:0 10px 30px rgba(0,0,0,.08);
}

.product-grid.list-mode .p-card{
display:grid;
grid-template-columns:200px 1fr;
}

.p-card-img-wrap{
position:relative;
height:260px;
overflow:hidden;
}

.product-grid.list-mode .p-card-img-wrap{
height:200px;
}

.p-card-img{
width:100%;
height:100%;
object-fit:cover;
}

.p-badge{
position:absolute;
top:10px;
left:10px;
background:#e63946;
color:#fff;
font-size:10px;
padding:3px 8px;
border-radius:4px;
}

.p-discount{
position:absolute;
top:10px;
right:10px;
background:#111;
color:#fff;
font-size:10px;
padding:3px 6px;
border-radius:4px;
}

.p-actions{
position:absolute;
bottom:0;
left:0;
right:0;
display:flex;
transform:translateY(100%);
transition:.3s;
}

.p-card:hover .p-actions{
transform:translateY(0);
}

.p-action-btn{
flex:1;
padding:10px;
border:none;
cursor:pointer;
font-size:11px;
font-weight:700;
}

.btn-cart{
background:#111;
color:#fff;
}

.btn-cart.added{
background:#16a34a;
}

.btn-wish{
width:46px;
background:#fff;
}

.btn-wish.wished{
background:#e63946;
color:#fff;
}

.p-card-body{
padding:16px;
}

.p-cat-label{
font-size:10px;
color:#e63946;
margin-bottom:4px;
}

.p-name{
font-size:15px;
font-weight:700;
margin-bottom:6px;
}

.p-price-row{
display:flex;
gap:8px;
align-items:center;
margin-top:6px;
}

.p-price{
font-weight:800;
font-size:18px;
}

.p-orig{
font-size:12px;
text-decoration:line-through;
color:#aaa;
}

.p-colors{
display:flex;
gap:6px;
margin-top:8px;
}

.p-color{
width:12px;
height:12px;
border-radius:50%;
border:1px solid #ddd;
}

.cart-toast{
position:fixed;
bottom:20px;
right:20px;
background:#111;
color:#fff;
padding:12px 20px;
border-radius:6px;
opacity:0;
transform:translateY(40px);
transition:.3s;
}

.cart-toast.show{
opacity:1;
transform:translateY(0);
}

@media(max-width:640px){

.product-grid{
grid-template-columns:repeat(2,1fr);
gap:12px;
}

.p-card-img-wrap{
height:180px;
}

.search-input{
width:120px;
}

}

`}</style>

      {/* container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* toolbar */}
        <div className="toolbar">

          <div className="cat-pills">
            {CATS.map(c => (
              <button
                key={c}
                className={`cat-pill ${activeCat === c ? "active" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="toolbar-right">

            <input
              className="search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              ⊞
            </button>

            <button
              className={`view-btn ${viewMode === "list" ? "active" : ""}`}
              onClick={() => setViewMode("list")}
            >
              ☰
            </button>

          </div>

        </div>

        {/* products */}
        <div className="shop-body">

          <div className={`product-grid ${viewMode === "list" ? "list-mode" : ""}`}>

            {filtered.map(prod => (
              <div key={prod.id} className="p-card">

                <div className="p-card-img-wrap">

                  <img src={prod.img} className="p-card-img" />

                  {prod.badge && <div className="p-badge">{prod.badge}</div>}

                  <div className="p-discount">-{pct(prod.price, prod.orig)}%</div>

                  <div className="p-actions">

                    <button
                      className={`p-action-btn btn-cart ${addedId === prod.id ? "added" : ""}`}
                      onClick={() => addCart(prod.id)}
                    >
                      {addedId === prod.id ? "✓ Added" : "+ Add"}
                    </button>

                    <button
                      className={`p-action-btn btn-wish ${wishlist.includes(prod.id) ? "wished" : ""}`}
                      onClick={() => toggleWish(prod.id)}
                    >
                      {wishlist.includes(prod.id) ? "♥" : "♡"}
                    </button>

                  </div>

                </div>

                <div className="p-card-body">

                  <div className="p-cat-label">{prod.cat} · {prod.sub}</div>

                  <div className="p-name">{prod.name}</div>

                  <Stars n={prod.rating} />

                  <div className="p-price-row">
                    <span className="p-price">₹{prod.price}</span>
                    <span className="p-orig">₹{prod.orig}</span>
                  </div>

                  <div className="p-colors">
                    {prod.colors.map((c, i) => (
                      <span key={i} className="p-color" style={{ background: c }} />
                    ))}
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className={`cart-toast ${addedId ? "show" : ""}`}>
        ✓ Added to Cart
      </div>

    </div>
  )
}