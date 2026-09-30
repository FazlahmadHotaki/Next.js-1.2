"use client";

import { useEffect, useState } from "react";

// ── Online image sources (swap here, used everywhere below) ──
const images = {
  bike: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80",
  feature1: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=1200&q=80",
  feature2: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=1200&q=80",
  feature3: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?auto=format&fit=crop&w=1200&q=80",
  rider: "https://images.unsplash.com/photo-1558980664-10eaad4fdb55?auto=format&fit=crop&w=1600&q=80",
  building: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
};

const models = [
  {
    name: "AEROX",
    subtitle: "CONNECTED ABS",
    year: "2022",
    price: "Rp 30,3 Juta",
    image: images.bike,
  },
  {
    name: "AEROX",
    subtitle: "155 VVA",
    year: "2022",
    price: "Rp 27,5 Juta",
    image: images.bike,
  },
  {
    name: "NMAX",
    subtitle: "CONNECTED",
    year: "2022",
    price: "Rp 32,0 Juta",
    image: images.bike,
  },
];

const features = [
  {
    title: "CONNECTED ABS",
    description: "Advanced braking technology for confident riding.",
    image: images.feature1,
  },
  {
    title: "SMART STORAGE",
    description: "Practical storage designed for everyday riding.",
    image: images.feature2,
  },
  {
    title: "SPORT DESIGN",
    description: "Sharp lines and an aggressive premium silhouette.",
    image: images.feature3,
  },
];

const navigation = [
  ["DEALER", "#dealer"],
  ["PRODUCT", "#product"],
  ["PARTS & WEAR", "#features"],
  ["ABOUT US", "#about"],
];

function Header({ active = "PRODUCT" }) {
  return (
    <header className="absolute left-0 right-0 top-0 z-50">
      <div className="flex h-[82px] items-center justify-between px-6 md:pl-24 md:pr-10">
        <a
          href="#product"
          className="text-[26px] font-black tracking-[-0.06em] text-white"
        >
          YAMAHA
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`relative text-[10px] font-semibold tracking-wide transition ${
                active === label
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {label}

              {active === label && (
                <span className="absolute -bottom-2 left-1/2 h-[2px] w-5 -translate-x-1/2 bg-[#c9bc91]" />
              )}
            </a>
          ))}

          <button className="text-[10px] text-white/60">ENG⌄</button>
        </nav>

        <button className="md:hidden">
          <div className="space-y-1.5">
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
            <span className="block h-[2px] w-6 bg-white" />
          </div>
        </button>
      </div>
    </header>
  );
}

function SideRail() {
  return (
    <aside className="absolute bottom-0 left-0 top-0 z-40 hidden w-[64px] border-r border-white/[0.06] bg-black/10 backdrop-blur-sm md:block">
      <div className="flex h-full flex-col items-center pt-7">
        <button aria-label="Menu" className="flex flex-col gap-[5px]">
          <span className="h-[2px] w-5 bg-white" />
          <span className="h-[2px] w-5 bg-white" />
          <span className="h-[2px] w-5 bg-white" />
        </button>

        <div className="mt-16 flex flex-col gap-7 text-[13px] font-bold text-white/60">
          <a href="#" className="transition hover:text-white">◎</a>
          <a href="#" className="transition hover:text-white">𝕏</a>
          <a href="#" className="transition hover:text-white">f</a>
        </div>
      </div>
    </aside>
  );
}

function ProductHero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const model = models[current];

  const next = () => {
    setDirection(1);
    setCurrent((value) => (value + 1) % models.length);
  };

  const previous = () => {
    setDirection(-1);
    setCurrent((value) => (value - 1 + models.length) % models.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((value) => (value + 1) % models.length);
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="product"
      className="relative min-h-screen overflow-hidden bg-[#07110f]"
    >
      <SideRail />
      <Header />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(42,105,89,.55),transparent_34%),radial-gradient(circle_at_78%_60%,rgba(22,57,49,.5),transparent_38%),linear-gradient(135deg,#173e35,#07110f_65%)]" />

      <div className="absolute left-[22%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#5aa493]/10 blur-[120px]" />

      <div
        key={model.year + current}
        className="pointer-events-none absolute left-[13%] top-[13%] select-none text-[130px] font-black leading-none tracking-[-0.08em] text-white/[0.075] sm:text-[190px] md:text-[290px]"
      >
        {model.year}
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] items-center px-8 pb-36 pt-28 md:pl-28 md:pr-14">
        <div className="grid w-full items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
          <div className="relative flex min-h-[400px] items-center justify-center md:min-h-[600px]">
            <div className="absolute h-[270px] w-[270px] rounded-full bg-[#7aa99b]/10 blur-[90px]" />

            <button
              onClick={previous}
              aria-label="Previous motorcycle"
              className="absolute left-0 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/10 text-4xl text-white/40 backdrop-blur-md transition hover:border-white/30 hover:text-white md:left-2"
            >
              ‹
            </button>

            <img
              key={`${model.image}-${current}`}
              src={model.image}
              alt={model.name}
              className={`relative z-10 w-[90%] max-w-[680px] object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,.75)] transition-all duration-700 ${
                direction === 1
                  ? "animate-[slideIn_.7s_ease-out]"
                  : "animate-[slideInReverse_.7s_ease-out]"
              }`}
            />

            <button
              onClick={next}
              aria-label="Next motorcycle"
              className="absolute right-0 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/10 text-4xl text-white/40 backdrop-blur-md transition hover:border-white/30 hover:text-white md:right-2"
            >
              ›
            </button>
          </div>

          <div className="max-w-[520px]">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9bc91]" />
              <span className="text-[9px] font-semibold uppercase tracking-[.35em] text-white/50">
                Yamaha Motor
              </span>
            </div>

            <h1 className="text-5xl font-black uppercase leading-[.88] tracking-[-.05em] sm:text-6xl md:text-7xl">
              {model.name}
            </h1>

            <h2 className="mt-2 text-4xl font-black uppercase leading-none tracking-[-.03em] text-[#c9bc91] sm:text-5xl md:text-6xl">
              {model.subtitle}
            </h2>

            <div className="mt-8">
              <p className="text-[9px] uppercase tracking-[.25em] text-white/45">
                Base price
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                {model.price}
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#dealer"
                className="group flex items-center gap-4 rounded-md border border-[#c9bc91] px-6 py-3 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-[#c9bc91] hover:text-[#07110f]"
              >
                Find a dealer
                <span className="transition group-hover:translate-x-1">→</span>
              </a>

              <a
                href="#features"
                className="rounded-md border border-white/10 bg-white/[0.04] px-6 py-3 text-[10px] font-bold uppercase tracking-wide text-white/70 backdrop-blur-md transition hover:bg-white/[0.09] hover:text-white"
              >
                Explore
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[90px] left-0 right-0 z-20">
        <div className="mx-auto flex max-w-[1400px] gap-7 px-8 md:pl-28">
          {["TOP FEATURES", "GALLERY", "SPECS", "ACCESSORIES"].map((item) => (
            <a
              key={item}
              href="#features"
              className="text-[9px] font-semibold uppercase tracking-wide text-white/55 transition hover:text-white"
            >
              + {item}
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 border-t border-white/[0.06] bg-black/20 backdrop-blur-md">
        <div className="mx-auto flex h-[70px] max-w-[1400px] items-center justify-between px-8 md:pl-28 md:pr-12">
          <button
            onClick={previous}
            className="text-[11px] text-white/50 transition hover:text-white"
          >
            ‹ &nbsp; {models[(current - 1 + models.length) % models.length].name}
          </button>

          <div className="flex items-center gap-2">
            {models.map((item, index) => (
              <button
                key={item.name}
                onClick={() => {
                  setDirection(index > current ? 1 : -1);
                  setCurrent(index);
                }}
                aria-label={`Select ${item.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === current
                    ? "w-7 bg-[#c9bc91]"
                    : "w-1.5 bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-[11px] text-white/50 transition hover:text-white"
          >
            {models[(current + 1) % models.length].name} &nbsp;›
          </button>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [current, setCurrent] = useState(0);

  const previous = () => {
    setCurrent((value) => (value - 1 + features.length) % features.length);
  };

  const next = () => {
    setCurrent((value) => (value + 1) % features.length);
  };

  const left = features[(current - 1 + features.length) % features.length];
  const right = features[(current + 1) % features.length];
  const active = features[current];

  return (
    <section
      id="features"
      className="relative min-h-screen overflow-hidden bg-[#07110f]"
    >
      <SideRail />
      <Header />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(40,91,78,.35),transparent_35%),linear-gradient(135deg,#102b25,#050b0a)]" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 pb-28 pt-28">
        <div className="mb-8 text-center">
          <p className="text-[9px] uppercase tracking-[.4em] text-[#c9bc91]">
            Technology & Design
          </p>
          <h2 className="mt-3 text-4xl font-black uppercase tracking-[-.04em] md:text-6xl">
            Top features
          </h2>
        </div>

        <div className="relative flex w-full max-w-[1250px] items-center justify-center gap-3 md:gap-7">
          <button
            onClick={previous}
            aria-label="Previous feature"
            className="z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-3xl text-white/50 backdrop-blur-md transition hover:border-white/30 hover:text-white"
          >
            ‹
          </button>

          <div className="hidden w-[250px] overflow-hidden rounded-3xl opacity-45 md:block">
            <img
              src={left.image}
              alt={left.title}
              className="h-[180px] w-full object-cover"
            />
          </div>

          <div className="group relative w-full max-w-[650px] overflow-hidden rounded-[28px] border border-white/10 bg-black/20 shadow-[0_40px_100px_rgba(0,0,0,.5)]">
            <img
              key={active.image + current}
              src={active.image}
              alt={active.title}
              className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 pt-20">
              <div className="text-[10px] uppercase tracking-[.3em] text-[#c9bc91]">
                0{current + 1}
              </div>

              <h3 className="mt-1 text-2xl font-black uppercase">
                {active.title}
              </h3>

              <p className="mt-1 max-w-md text-xs text-white/60">
                {active.description}
              </p>
            </div>
          </div>

          <div className="hidden w-[250px] overflow-hidden rounded-3xl opacity-45 md:block">
            <img
              src={right.image}
              alt={right.title}
              className="h-[180px] w-full object-cover"
            />
          </div>

          <button
            onClick={next}
            aria-label="Next feature"
            className="z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-3xl text-white/50 backdrop-blur-md transition hover:border-white/30 hover:text-white"
          >
            ›
          </button>
        </div>

        <div className="mt-7 flex items-center gap-2">
          {features.map((item, index) => (
            <button
              key={item.title}
              onClick={() => setCurrent(index)}
              className={`h-1.5 rounded-full transition-all ${
                current === index ? "w-8 bg-[#c9bc91]" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-[8px] uppercase tracking-[.3em] text-white/35">
          Tap to explore
        </p>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#070d0c]">
      <SideRail />

      <div className="relative h-[350px] overflow-hidden md:ml-16">
        <img
          src={images.rider}
          alt="Yamaha motorcycle rider"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />

        <Header active="ABOUT US" />

        <div className="absolute bottom-10 left-8 md:left-12">
          <p className="text-[9px] uppercase tracking-[.4em] text-[#c9bc91]">
            Yamaha Motor
          </p>
          <h2 className="mt-2 text-6xl font-black tracking-[-.06em] md:text-8xl">
            YAMAHA
          </h2>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1200px] gap-14 px-8 py-20 md:ml-16 md:grid-cols-[1fr_330px] md:px-12">
        <div>
          <p className="text-[9px] uppercase tracking-[.35em] text-[#c9bc91]">
            About the brand
          </p>

          <h3 className="mt-4 text-4xl font-light uppercase leading-none md:text-6xl">
            Move
            <br />
            your
            <br />
            heart.
          </h3>

          <div className="mt-8 max-w-xl space-y-5 text-sm leading-7 text-white/55">
            <p>
              Yamaha Motor develops motorcycles that combine performance,
              technology and distinctive design.
            </p>
            <p>
              From everyday mobility to sport riding, every model is designed
              around the connection between rider and machine.
            </p>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <img
              src={images.building}
              alt="Yamaha building"
              className="aspect-[4/3] w-full object-cover"
            />

            <div className="p-5">
              <p className="text-[9px] uppercase tracking-[.2em] text-[#c9bc91]">
                Indonesia
              </p>
              <h4 className="mt-2 text-sm font-bold uppercase">
                Manufaktur Motor Yamaha Indonesia
              </h4>
              <p className="mt-3 text-[10px] leading-5 text-white/45">
                021 2457 5555
                <br />
                Jakarta Timur, Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dealer() {
  const cities = ["Jakarta", "Bandung", "Surabaya"];

  return (
    <section
      id="dealer"
      className="relative overflow-hidden bg-[#050908] px-8 py-24 md:pl-28"
    >
      <div className="mx-auto max-w-[1200px]">
        <p className="text-[9px] uppercase tracking-[.4em] text-[#c9bc91]">
          Yamaha Dealer Network
        </p>

        <h2 className="mt-3 text-5xl font-black uppercase tracking-[-.05em] md:text-7xl">
          Find your
          <br />
          dealer.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {cities.map((city, index) => (
            <a
              href="#"
              key={city}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 transition duration-500 hover:-translate-y-1 hover:border-[#c9bc91]/40 hover:bg-white/[0.05]"
            >
              <span className="text-[9px] text-white/30">0{index + 1}</span>

              <h3 className="mt-10 text-2xl font-bold uppercase">{city}</h3>

              <p className="mt-2 text-[10px] text-white/40">
                Explore available dealers
              </p>

              <span className="absolute bottom-7 right-7 text-xl text-[#c9bc91] transition group-hover:translate-x-2">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="overflow-hidden">
      <ProductHero />
      <Features />
      <About />
      <Dealer />
    </main>
  );
}