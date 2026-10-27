
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CalendarDays,
  ArrowRight,
  Scissors,
  ShieldCheck,
  Timer,
  Star,
  CalendarClock,
  CheckCircle2,
  MapPin,
  Phone,
  Clock3,
  Instagram,
  Facebook,
  Menu,
  X,
  ChevronDown,
  Check,
  Sparkles,
} from "lucide-react";

import "./styles.css";

const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const services = [
  {
    name: "Signature Fade",
    time: "45 mins",
    price: 450,
    description: "Clean fade with a sharp finish.",
    image: "photo-1621605815971-fbc98d665033",
  },
  {
    name: "Classic Cut & Beard",
    time: "60 mins",
    price: 600,
    description: "Fresh cut with beard trim and shape.",
    image: "photo-1508330570239-ce7cabceea6d",
  },
  {
    name: "Hair Styling",
    time: "30 mins",
    price: 350,
    description: "Shampoo, style and finish.",
    image: "photo-1599351431202-1e0f0137899a",
  },
  {
    name: "Kids Cut",
    time: "30 mins",
    price: 300,
    description: "Clean, neat and hassle-free.",
    image: "photo-1517832606299-7ae9b720a186",
  },
];

const barbers = [
  {
    name: "Marcus",
    image: "photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Julian",
    image: "photo-1506794778202-cad84cf45f1d",
  },
  {
    name: "Desmond",
    image: "photo-1507003211169-0a1dd7228f2d",
  },
  {
    name: "Leo",
    image: "photo-1507591064344-4c6ce005b128",
  },
];

const gallery = [
  "photo-1621605815971-fbc98d665033",
  "photo-1599351431202-1e0f0137899a",
  "photo-1508330570239-ce7cabceea6d",
  "photo-1517832606299-7ae9b720a186",
  "photo-1622286342621-4bd786c2447c",
];

function Brand() {
  return (
    <a className="brand" href="#home" aria-label="JMC Barber Shop home">
      <span className="brand-mark">J</span>

      <span className="brand-type">
        <b>JMC BARBER SHOP</b>
        <small>PREMIUM GROOMING</small>
      </span>
    </a>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="feature">
      <div className="feature-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

function Step({ number, icon, title, text }) {
  return (
    <div className="step">
      <div className="step-symbol">
        <span>{number}</span>
        <div>{icon}</div>
      </div>

      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [service, setService] = useState(services[0].name);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [barber, setBarber] = useState("Marcus");
  const [notice, setNotice] = useState("");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [slide, setSlide] = useState(0);

  const today = new Date().toLocaleDateString("en-CA");

  const slides = [
    {
      title: "Look Good.",
      subtitle: "Feel Confident.",
      image: "photo-1621605815971-fbc98d665033",
    },
    {
      title: "Own Your Style.",
      subtitle: "Make It Yours.",
      image: "photo-1503951914875-452162b0f3f1",
    },
    {
      title: "Sharp Details.",
      subtitle: "Confident You.",
      image: "photo-1599351431202-1e0f0137899a",
    },
  ];

  function scrollToBooking() {
    document
      .getElementById("booking")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function bookAppointment() {
    if (!service || !date || !time || !barber) {
      setNotice("Please select a service, date, time, and barber.");
      return;
    }

    if (date < today) {
      setNotice("Please choose today or a future date.");
      return;
    }

    const selectedService = services.find(
      (item) => item.name === service
    );

    setNotice(
      `Booking preview: ${service} with ${barber} on ${date} at ${time}. Total: ₱${selectedService.price}. Connect Firebase to save and confirm this appointment.`
    );
  }

  return (
    <div className="site-shell" id="home">
      <header className="topbar">
        <div className="nav-inner">
          <Brand />

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>

          <nav className={menuOpen ? "nav-links open" : "nav-links"}>
            {["Home", "Services", "Gallery", "About", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <a className="button button-gold nav-book" href="#booking">
            <CalendarDays size={15} />
            Book Appointment
          </a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div
            className="hero-image"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(5,8,9,.98) 0%, rgba(5,8,9,.78) 35%, rgba(5,8,9,.2) 75%), url(${photo(slides[slide].image, 1800)})`,
            }}
          />

          <div className="hero-content page-width">
            <div className="eyebrow">PREMIUM BARBERSHOP</div>

            <h1>
              {slides[slide].title}
              <br />
              <em>{slides[slide].subtitle}</em>
            </h1>

            <p>
              Modern cuts, classic styles. Book your appointment
              <br className="desktop-break" />
              and get the perfect look at JMC Barber Shop.
            </p>

            <div className="hero-actions">
              <a className="button button-gold" href="#booking">
                <CalendarDays size={16} />
                Book Now
              </a>

              <a className="button button-outline" href="#services">
                View Services <ArrowRight size={16} />
              </a>
            </div>
          </div>

          <div className="hero-controls">
            <div className="dots">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  className={slide === index ? "active" : ""}
                  onClick={() => setSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="slide-count">
              0{slide + 1} / 03
              <button
                onClick={() =>
                  setSlide((slide + slides.length - 1) % slides.length)
                }
                aria-label="Previous slide"
              >
                ‹
              </button>
              <button
                onClick={() => setSlide((slide + 1) % slides.length)}
                aria-label="Next slide"
              >
                ›
              </button>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature-inner page-width">
            <Feature
              icon={<Scissors />}
              title="Professional Barbers"
              text="Skilled and experienced barbers"
            />
            <Feature
              icon={<ShieldCheck />}
              title="Clean & Safe"
              text="Hygienic tools and environment"
            />
            <Feature
              icon={<Timer />}
              title="Easy Booking"
              text="Quick and simple online booking"
            />
            <Feature
              icon={<Star />}
              title="Premium Experience"
              text="More than just a haircut"
            />
          </div>
        </section>

        <section className="services section-dark" id="services">
          <div className="services-inner page-width">
            <div className="section-intro">
              <div className="eyebrow">SERVICES</div>
              <h2>Our Services</h2>

              <p>
                From classic cuts to modern styles, we offer a range
                of services to keep you looking sharp.
              </p>

              <a className="button button-outline" href="#booking">
                View All Services <ArrowRight size={15} />
              </a>
            </div>

            <div className="service-grid">
              {services.map((item) => (
                <article className="service-card" key={item.name}>
                  <img
                    src={photo(item.image, 650)}
                    alt={item.name}
                    loading="lazy"
                  />

                  <div className="service-info">
                    <h3>{item.name}</h3>

                    <div className="service-meta">
                      <span>{item.time}</span>
                      <b>•</b>
                      <span>₱{item.price}</span>
                    </div>

                    <p>{item.description}</p>

                    <button
                      className="button button-small"
                      onClick={() => {
                        setService(item.name);
                        scrollToBooking();
                      }}
                    >
                      Book Now <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="booking-section" id="booking">
          <div className="booking-bg" />

          <div className="booking-inner page-width">
            <div className="booking-explainer">
              <div className="eyebrow">EASY BOOKING</div>

              <h2>Book Your Appointment</h2>
              <p>Get your next haircut in just a few simple steps.</p>

              <div className="steps">
                <Step
                  number="1"
                  icon={<CalendarDays />}
                  title="Choose Service"
                  text="Select the service you want."
                />
                <Step
                  number="2"
                  icon={<CalendarClock />}
                  title="Pick Date & Time"
                  text="Find a time that works for you."
                />
                <Step
                  number="3"
                  icon={<Scissors />}
                  title="Choose Barber"
                  text="Select your preferred barber."
                />
                <Step
                  number="4"
                  icon={<CheckCircle2 />}
                  title="Confirm"
                  text="You're all set! See you soon."
                />
              </div>

              <button
                className="button button-gold"
                onClick={scrollToBooking}
              >
                Book Now <ArrowRight size={15} />
              </button>
            </div>

            <div className="booking-card">
              <h3>Book Your Appointment</h3>

              <div className="form-field">
                <label>
                  <span className="number">1</span>
                  Select Service
                </label>

                <div className="select-wrap">
                  <select
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  >
                    {services.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name} (₱{item.price})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="form-field">
                <label>
                  <span className="number">2</span>
                  Choose Date
                </label>

                <input
                  type="date"
                  min={today}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>

              <div className="form-field">
                <label>
                  <span className="number">3</span>
                  Pick Time
                </label>

                <div className="time-options">
                  {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM"].map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        className={time === item ? "chosen" : ""}
                        onClick={() => setTime(item)}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="form-field">
                <label>
                  <span className="number">4</span>
                  Choose Barber
                </label>

                <div className="barber-options">
                  {barbers.map((item) => (
                    <button
                      type="button"
                      className={barber === item.name ? "selected" : ""}
                      key={item.name}
                      onClick={() => setBarber(item.name)}
                    >
                      <img
                        src={photo(item.image, 150)}
                        alt={item.name}
                        loading="lazy"
                      />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="button button-gold submit-book"
                onClick={bookAppointment}
              >
                Confirm Booking <ArrowRight size={15} />
              </button>

              {notice && (
                <div className="notice" role="status">
                  <Check size={15} />
                  <span>{notice}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bottom-area" id="gallery">
          <div className="gallery-about">
            <div className="gallery-block">
              <div className="eyebrow blue">OUR GALLERY</div>
              <h3>Real Cuts. Real People.</h3>
              <p>
                Check out some of our latest work and satisfied clients.
              </p>

              <div className="gallery-strip">
                {[0, 1, 2, 3].map((offset) => {
                  const imageIndex =
                    (galleryIndex + offset) % gallery.length;

                  return (
                    <img
                      key={gallery[imageIndex]}
                      src={photo(gallery[imageIndex], 300)}
                      alt="JMC Barber Shop haircut gallery"
                      loading="lazy"
                    />
                  );
                })}

                <button
                  className="gallery-next"
                  onClick={() =>
                    setGalleryIndex((galleryIndex + 1) % gallery.length)
                  }
                  aria-label="Next gallery images"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="about-block" id="about">
              <h3>About JMC Barber Shop</h3>

              <p>
                We're more than just a barbershop — we're a community.
                We believe a great haircut boosts more than your look;
                it boosts your confidence. Our barbers, modern space,
                and quality service are here to give you a great
                experience, every time.
              </p>

              <a
                href="#contact"
                className="button button-light-outline"
              >
                Contact Us <ArrowRight size={15} />
              </a>
            </div>
          </div>

          <footer className="contact-block" id="contact">
            <Brand />

            <div className="contact-line">
              <MapPin />
              <span>East Sabellano St, Cebu City</span>
            </div>

            <div className="contact-line">
              <Phone />
              <span>+63 962 209 6953</span>
            </div>

            <div className="contact-line">
              <Clock3 />
              <span>
                Mon - Sat: 9:00 AM - 8:00 PM
                <br />
                Sun: 10:00 AM - 6:00 PM
              </span>
            </div>

            <div className="socials">
              <a href="#contact" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#contact" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#contact" aria-label="Social media">
                <Sparkles />
              </a>
            </div>
          </footer>
        </section>
      </main>

      <div className="copyright">
        <span>© {new Date().getFullYear()} JMC Barber Shop. All rights reserved.</span>
        <span>Sharp Cuts / Clean Vibes / JMC Barber Shop</span>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
