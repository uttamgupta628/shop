import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );

    if (ref.current) obs.observe(ref.current);

    return () => {
      if (ref.current) obs.unobserve(ref.current);
      obs.disconnect();
    };
  }, [threshold]);

  return [ref, inView];
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [sent, setSent] = useState(false);
  const [headerRef] = useInView(0.1);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: ""
    }));
  };

  const submit = () => {
    const newErrors = {
      name: "",
      email: "",
      message: ""
    };

    if (!form.name.trim()) newErrors.name = "Required";

    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email needed";

    if (!form.message.trim()) newErrors.message = "Required";

    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      return;
    }

    setSent(true);
  };

  return (
    <>
      <style>{`
      .hero{display:grid;grid-template-columns:1fr 1fr}
      .hero-left{padding:60px 40px;background:#fff;border-right:1px solid #eee}
      .hero-right{padding:60px 40px;background:#f97316;color:white}
      .hl-h1{font-size:48px;font-weight:900}
      .hl-sub{margin-top:20px;color:#555}
      .hch{display:flex;align-items:center;gap:12px;margin-top:20px;text-decoration:none;color:black}
      .hch-icon{width:36px;height:36px;border-radius:50%;border:1px solid #ddd;display:flex;align-items:center;justify-content:center}
      .form-title{font-size:32px;font-weight:900}
      .form-title span{color:white}
      .fgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .fg{margin-top:15px}
      .fi,.fta{width:100%;padding:12px;border:1px solid #ddd}
      .fta{min-height:120px}
      .sbtn{margin-top:15px;padding:14px;border:none;background:black;color:white;width:100%;cursor:pointer}
      .success{color:black;background:white;padding:30px}
      .success-h span{color:#f97316}
      .map-area{background:#fafafa;padding:80px;text-align:center}
      .hours-area{background:black;color:white;padding:60px}

      .h-row{display:flex;justify-content:space-between;margin-top:10px}

      @media(max-width:900px){
      .hero{grid-template-columns:1fr}
      .hero-left,.hero-right{padding:40px 20px}
      }
      `}</style>

      {/* HERO SECTION */}
      <section ref={headerRef} className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <div className="hero">

          {/* LEFT */}
          <div className="hero-left">

            <h1 className="hl-h1">
              We're Here <br /> To Help You
            </h1>

            <p className="hl-sub">
              Questions, bulk orders, returns or just a quick chat — our team responds fast.
            </p>

            <a className="hch" href="tel:+919876543210">
              <div className="hch-icon">📞</div>
              <div>+91 98765 43210</div>
            </a>

            <a className="hch" href="https://wa.me/919876543210">
              <div className="hch-icon">💬</div>
              <div>WhatsApp</div>
            </a>

            <a className="hch" href="mailto:help@mallkabaap.in">
              <div className="hch-icon">✉️</div>
              <div>help@mallkabaap.in</div>
            </a>

          </div>

          {/* RIGHT */}
          <div className="hero-right">

            {sent ? (
              <div className="success">
                <h2 className="success-h">
                  Message <span>Sent!</span>
                </h2>

                <p>Our team will contact you soon.</p>

                <button
                  onClick={() => {
                    setSent(false);
                    setForm({
                      name: "",
                      email: "",
                      phone: "",
                      message: ""
                    });
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="form-title">
                  How Can We <br />
                  <span>Help You?</span>
                </h2>

                <div className="fgrid">

                  <div className="fg">
                    <label>Name {errors.name}</label>
                    <input
                      className="fi"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>

                  <div className="fg">
                    <label>Email {errors.email}</label>
                    <input
                      className="fi"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>

                </div>

                <div className="fg">
                  <label>Phone</label>
                  <input
                    className="fi"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="fg">
                  <label>Message {errors.message}</label>
                  <textarea
                    className="fta"
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                  />
                </div>

                <button className="sbtn" onClick={submit}>
                  Send Message →
                </button>
              </>
            )}

          </div>

        </div>

      </section>

      {/* INFO SECTION */}

      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        <div className="grid md:grid-cols-2">

          <div className="map-area">
            📍 Lal Bazar, Kolkata
          </div>

          <div className="hours-area">

            <h3 className="text-xl font-bold">Store Hours</h3>

            <div className="h-row">
              <span>Monday – Friday</span>
              <span>10AM – 9PM</span>
            </div>

            <div className="h-row">
              <span>Saturday</span>
              <span>10AM – 10PM</span>
            </div>

            <div className="h-row">
              <span>Sunday</span>
              <span>11AM – 8PM</span>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}