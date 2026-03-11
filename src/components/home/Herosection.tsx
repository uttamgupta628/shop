import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    tag: "New Arrivals — Summer '25",
    heading: ["Discover the", "Latest", "Fashion for", "Everyone"],
    accentIdx: 1,
    body: "Mall Ka Baap brings you stylish, high-quality garments at unbeatable prices — for men, women & kids.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&q=80",
    accent: "#ea641e",
  },
  {
    id: 2,
    tag: "Men's Exclusive — New In",
    heading: ["Style That", "Defines", "The Modern", "Man"],
    accentIdx: 1,
    body: "Premium menswear crafted for the bold — from sharp formals to relaxed casuals.",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1600&q=80",
    accent: "#1e6aea",
  },
  {
    id: 3,
    tag: "Women's Collection — Trending",
    heading: ["Elegance", "Redefined", "For Every", "Woman"],
    accentIdx: 1,
    body: "From ethnic elegance to western chic — discover our women's collection.",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80",
    accent: "#ea1e6a",
  },
];

const categories = [
  {
    label: "Men's Wear",
    img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80",
    items: ["Shirts", "Trousers", "Suits", "Jackets"],
  },
  {
    label: "Women's Collection",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80",
    items: ["Dresses", "Sarees", "Kurtas", "Tops"],
  },
  {
    label: "Boys Fashion",
    img: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&q=80",
    items: ["T-Shirts", "Jeans", "Shorts"],
  },
  {
    label: "Girls Fashion",
    img: "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=600&q=80",
    items: ["Frocks", "Lehengas", "Skirts"],
  },
  {
    label: "Ethnic Wear",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    items: ["Kurtas", "Sherwanis", "Sarees"],
  },
  {
    label: "Western Styles",
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    items: ["Jeans", "Blazers", "Denim"],
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);

  const slide = slides[current];

  const prev = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  const next = () =>
    setCurrent((current + 1) % slides.length);

  const goTo = (idx) => setCurrent(idx);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => clearInterval(autoRef.current);
  }, [current]);

  return (
    <div className="font-['Plus_Jakarta_Sans']">

      {/* HERO */}
      <div className="relative overflow-hidden h-[70vh] md:h-[80vh] lg:h-auto flex items-center">

        <img
          src={slide.img}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:w-1/2" />

        {/* CONTAINER FIX */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 w-full">

          <div className="grid lg:grid-cols-2 gap-12 items-center py-20">

            <div className="space-y-8">

              <div className="inline-flex items-center gap-2 bg-white border rounded-full px-4 py-2 shadow">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ backgroundColor: slide.accent }}
                />
                <span className="text-xs font-semibold">
                  {slide.tag}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
                {slide.heading.map((word, i) => (
                  <span key={i}>
                    {i === slide.accentIdx ? (
                      <span style={{ color: slide.accent }}>
                        {word}
                      </span>
                    ) : (
                      word
                    )}
                    <br />
                  </span>
                ))}
              </h1>

              <p className="text-gray-700 max-w-md">
                {slide.body}
              </p>

              <button className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl">
                Shop Now
              </button>

            </div>
          </div>
        </div>

        {/* SLIDER CONTROLS */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-5 z-20">

          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-black hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8" : "w-2 bg-gray-300"
                }`}
                style={{
                  backgroundColor:
                    i === current ? slide.accent : undefined,
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border bg-white flex items-center justify-center hover:bg-black hover:text-white"
          >
            <ChevronRight size={18} />
          </button>

        </div>
      </div>

      {/* CATEGORY STRIP */}
      <div className="bg-white border-y-2 border-gray-900">

        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

          <div className="flex h-[110px] sm:h-[140px] lg:h-[160px]">

            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex-1 relative overflow-hidden cursor-pointer border-r border-gray-900 last:border-r-0 hover:flex-[2] transition-all duration-500 group"
              >

                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition"
                  style={{ backgroundImage: `url(${cat.img})` }}
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition" />

                <div className="relative z-10 h-full flex flex-col items-center justify-center">

                  <div className="text-xs sm:text-sm lg:text-lg font-black uppercase tracking-wider text-gray-900 group-hover:text-white">
                    {cat.label}
                  </div>

                  <div className="text-[10px] text-transparent group-hover:text-white/70">
                    {cat.items.length * 120}+ styles
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* MARQUEE */}
        <div className="overflow-hidden border-t py-2">

          <div className="flex gap-10 w-max animate-marquee">

            {[...Array(2)].map((_, i) =>
              ["Men's Wear", "Women's Collection", "Kids Fashion", "Ethnic Wear"].map(item => (
                <div key={i + item} className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500">
                  <span className="text-orange-500">✦</span>
                  {item}
                </div>
              ))
            )}

          </div>

        </div>

      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-marquee{
          animation: marquee 18s linear infinite;
        }
      `}</style>

    </div>
  );
}