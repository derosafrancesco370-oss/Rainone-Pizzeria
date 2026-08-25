import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
import { scrollToId } from "./SmoothScroll";
import { CONTACT } from "../data/config";

const LINKS = [
  { id: "filosofia", label: "Filosofia" },
  { id: "menu", label: "Menù" },
  { id: "galleria", label: "Galleria" },
  { id: "delivery", label: "Delivery" },
  { id: "contatti", label: "Contatti" },
];

export const Navbar = ({ onReserve }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#d4af37]/20 bg-black/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <button
          onClick={() => go("hero")}
          data-testid="nav-logo"
          className="flex items-center gap-3"
        >
          <img
            src="/logo-rainone.jpeg"
            alt="Rainone"
            className="h-11 w-11 rounded-full object-cover ring-1 ring-[#d4af37]/40"
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-serif-display text-lg tracking-wide text-white">
              RAINONE
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.3em] text-[#d4af37]">
              Baronissi
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              data-testid={`nav-${l.id}`}
              className="group relative font-label text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 md:flex">
            <Star className="h-3.5 w-3.5 fill-[#d4af37] text-[#d4af37]" />
            <span className="text-xs text-white/70">
              {CONTACT.rating}
              <span className="text-white/40"> · {CONTACT.reviews} recensioni</span>
            </span>
          </div>
          <button
            onClick={onReserve}
            data-testid="nav-reserve-btn"
            className="hidden rounded-full border border-[#d4af37] bg-[#d4af37] px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-transparent hover:text-[#d4af37] md:block"
          >
            Prenota
          </button>
          <button
            onClick={() => setOpen(!open)}
            data-testid="nav-mobile-toggle"
            className="text-[#d4af37] lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden border-t border-[#d4af37]/20 bg-black/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => go(l.id)}
                  data-testid={`nav-mobile-${l.id}`}
                  className="border-b border-white/5 py-3 text-left font-serif-display text-2xl text-white"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  onReserve();
                }}
                data-testid="nav-mobile-reserve-btn"
                className="mt-4 rounded-full bg-[#d4af37] py-3 font-label text-xs uppercase tracking-[0.18em] text-black"
              >
                Prenota il Tuo Tavolo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
