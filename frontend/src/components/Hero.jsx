import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarHeart, Bike, Flame, ChevronDown } from "lucide-react";
import { MaskedLines } from "./Reveal";
import { scrollToId } from "./SmoothScroll";

const HERO_IMG = "/pizza-3.jpeg";

const Badge = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-[#d6dbe1]/40 bg-black/40 px-4 py-1.5 font-label text-[10px] uppercase tracking-[0.22em] text-[#d6dbe1] backdrop-blur">
    {children}
  </span>
);

export const Hero = ({ onReserve, onOrder }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      data-testid="hero-section"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img
          src={HERO_IMG}
          alt="Pizza gourmet napoletana"
          className="h-[130%] w-full object-cover opacity-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000_80%)]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="mx-auto max-w-5xl px-6 pt-28 text-center"
      >
        {/* Monogram — large, centered, luminous */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mb-10 flex h-48 w-48 items-center justify-center md:h-64 md:w-64"
        >
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.45, 0.7, 0.45], scale: [1, 1.08, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-[#d6dbe1]/30 blur-[70px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-6 rounded-full bg-[#eef1f4]/15 blur-3xl"
          />
          <img
            src="/logo-rainone.jpeg"
            alt="Monogramma RR Rainone"
            className="relative h-44 w-44 rounded-full object-cover ring-1 ring-[#d6dbe1]/60 shadow-[0_0_70px_rgba(214,219,225,0.4)] md:h-60 md:w-60"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-7 flex flex-wrap items-center justify-center gap-3"
        >
          <Badge>
            <Flame className="h-3 w-3" /> Camino
          </Badge>
          <Badge>Friggitoria Napoletana</Badge>
          <Badge>Prenotazione Obbligatoria</Badge>
        </motion.div>

        <h1 className="font-serif-display text-4xl font-medium leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
          <MaskedLines
            lines={["L'Arte della Pizza"]}
            delay={0.5}
          />
          <MaskedLines
            lines={["Napoletana Gourmet"]}
            lineClass="text-gold-gradient italic"
            delay={0.62}
          />
          <MaskedLines lines={["a Baronissi"]} delay={0.74} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="mx-auto mt-8 max-w-2xl text-base font-light leading-relaxed text-white/70 md:text-lg"
        >
          Pizzeria e friggitoria d'autore. Ingredienti selezionati, il calore del
          camino e impasti ad alta digeribilità a lunga lievitazione.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={onReserve}
            data-testid="hero-reserve-btn"
            className="group flex items-center gap-2.5 rounded-full bg-[#d6dbe1] px-8 py-4 font-label text-xs uppercase tracking-[0.18em] text-black shadow-[0_0_30px_rgba(214,219,225,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(214,219,225,0.45)]"
          >
            <CalendarHeart className="h-4 w-4" />
            Prenota il Tuo Tavolo
          </button>
          <button
            onClick={onOrder}
            data-testid="hero-order-btn"
            className="group flex items-center gap-2.5 rounded-full border border-[#d6dbe1]/50 px-8 py-4 font-label text-xs uppercase tracking-[0.18em] text-[#d6dbe1] transition-all duration-300 hover:border-[#d6dbe1] hover:bg-[#d6dbe1]/10"
          >
            <Bike className="h-4 w-4" />
            Domicilio / Asporto
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToId("filosofia")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#d6dbe1]/60"
        aria-label="Scorri"
        data-testid="hero-scroll-cue"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.button>
    </section>
  );
};
