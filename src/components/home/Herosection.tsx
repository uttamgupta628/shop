import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Using placeholder fashion images from unsplash (CDN safe)
const slides = [
  {
    id: 1,
    tag: "New Arrivals — Summer '25",
    heading: ["Discover the", "Latest", "Fashion for", "Everyone"],
    accentIdx: 1,
    orangeIdx: 3,
    body: "Mall Ka Baap brings you stylish, high-quality garments at unbeatable prices — for men, women & kids.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
    badge: "50% OFF",
    price: "₹499",
    tag2: "Free delivery",
    bg: "#f8f4ef",
    accent: "#ea641e",
  },
  {
    id: 2,
    tag: "Men's Exclusive — New In",
    heading: ["Style That", "Defines", "The Modern", "Man"],
    accentIdx: 1,
    orangeIdx: 3,
    body: "Premium menswear crafted for the bold — from sharp formals to relaxed casuals. Find your fit today.",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=80",
    badge: "40% OFF",
    price: "₹799",
    tag2: "Ships in 24h",
    bg: "#f0f4f8",
    accent: "#1e6aea",
  },
  {
    id: 3,
    tag: "Women's Collection — Trending",
    heading: ["Elegance", "Redefined", "For Every", "Woman"],
    accentIdx: 1,
    orangeIdx: 3,
    body: "From ethnic elegance to western chic — discover our women's collection crafted for every occasion.",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    badge: "60% OFF",
    price: "₹599",
    tag2: "Free delivery",
    bg: "#f8f0f4",
    accent: "#ea1e6a",
  },
];

const categories = [
  {
    label: "Men's Wear",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    items: ["Shirts", "Trousers", "Suits", "Jackets"],
    color: "#1e6aea",
  },
  {
    label: "Women's Collection",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    items: ["Dresses", "Sarees", "Kurtas", "Tops"],
    color: "#ea1e6a",
  },
  {
    label: "Boys Fashion",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
    items: ["T-Shirts", "Jeans", "Shorts", "Uniforms"],
    color: "#1eea6a",
  },
  {
    label: "Girls Fashion",
    img: "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    items: ["Frocks", "Lehengas", "Tops", "Skirts"],
    color: "#ea6a1e",
  },
  {
    label: "Ethnic Wear",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    items: ["Kurtas", "Sherwanis", "Sarees", "Lehengas"],
    color: "#6a1eea",
  },
  {
    label: "Western Styles",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    items: ["Jeans", "Blazers", "Denim", "Casual"],
    color: "#1eeaea",
  },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredCat, setHoveredCat] = useState(null);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

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

    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 400);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => clearInterval(autoRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <div className="font-['Plus_Jakarta_Sans']">


      {/* Hero Section */}
      <div
        className="relative overflow-hidden min-h-screen flex items-center bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${slide.img})`
        }}
      >

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:w-1/2" />

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-8">

              {/* Tag */}
              <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: slide.accent }}
                />
                <span className="text-xs font-semibold">{slide.tag}</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                {slide.heading.map((word, i) => (
                  <span key={i}>
                    {i === slide.accentIdx ? (
                      <span style={{ color: slide.accent }}>{word}</span>
                    ) : (
                      word
                    )}
                    <br />
                  </span>
                ))}
              </h1>

              {/* Body */}
              <p className="text-gray-700 max-w-md">{slide.body}</p>

              {/* Button */}
              <button className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition">
                Shop Now
              </button>

            </div>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 flex items-center gap-5 z-20">

          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8" : "w-2 bg-gray-300"
                  }`}
                style={{ backgroundColor: i === current ? slide.accent : undefined }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-black hover:text-white transition"
          >
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

      {/* Category Section */}
      <div className="relative z-20 bg-white border-t-2 border-b-2 border-gray-900">
        <div className="flex h-[100px] sm:h-[140px] lg:h-[160px]">
          {categories.map((cat, i) => (
            <div
              key={cat.label}
              className="flex-1 relative overflow-hidden cursor-pointer border-r border-gray-900 last:border-r-0 transition-all duration-500 hover:flex-[2.2] group"
              onMouseEnter={() => setHoveredCat(i)}
              onMouseLeave={() => setHoveredCat(null)}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 scale-105 transition-all duration-450 group-hover:opacity-100 group-hover:scale-100"
                style={{ backgroundImage: `url(${cat.img})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <div className="text-xs sm:text-sm lg:text-lg font-black tracking-wider uppercase text-gray-900 group-hover:text-white group-hover:tracking-widest transition-all duration-400 px-2 text-center">
                  {cat.label}
                </div>
                <div className="text-[8px] sm:text-[10px] font-medium text-transparent group-hover:text-white/60 uppercase tracking-wider mt-1 transition-colors duration-400">
                  {cat.items.length * 120}+ styles
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden border-t border-black/6 bg-white/50 py-2.5 backdrop-blur-sm">
          <div className="flex gap-10 w-max animate-marquee">
            {[...Array(2)].map((_, i) =>
              ["Men's Wear", "Women's Collection", "Kids Fashion", "New Arrivals", "Ethnic Wear", "Western Styles"].map(item => (
                <div key={`${i}-${item}`} className="flex items-center gap-2.5 text-[11px] font-medium text-gray-500 whitespace-nowrap uppercase tracking-wider">
                  <span className="text-[#ea641e] text-[10px]">✦</span>
                  {item}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add custom animations to TailWind */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--accent-color); }
          50% { box-shadow: 0 0 0 6px transparent; }
        }
        
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; }
          33% { border-radius: 30% 70% 40% 60% / 60% 30% 70% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 70% 30% 60%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 3.5s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slow 4s ease-in-out infinite 2s;
        }
        
        .animate-spin-slow {
          animation: spin-slow 18s linear infinite;
        }
        
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
        
        .transition-duration-400 {
          transition-duration: 400ms;
        }
        
        .transition-duration-450 {
          transition-duration: 450ms;
        }
        
        .transition-duration-900 {
          transition-duration: 900ms;
        }
        
        .delay-400 {
          transition-delay: 400ms;
        }
        
        .delay-500 {
          transition-delay: 500ms;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}