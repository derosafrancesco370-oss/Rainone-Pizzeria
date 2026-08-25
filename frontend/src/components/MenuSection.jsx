import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { MENU } from "../data/menu";
import { Reveal } from "./Reveal";

export const MenuSection = () => {
  const [active, setActive] = useState(MENU[0].id);
  const cat = MENU.find((c) => c.id === active);
  const scroller = useRef(null);

  const scrollBy = (dir) => {
    if (scroller.current) {
      scroller.current.scrollBy({ left: dir * 320, behavior: "smooth" });
    }
  };

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="relative border-t border-[#d6dbe1]/15 bg-[#050505] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
            La Carta
          </span>
          <h2 className="mt-5 font-serif-display text-4xl font-medium text-white md:text-6xl">
            Il Menù <span className="text-gold-gradient italic">Culinario</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm font-light text-white/50">
            Fritti napoletani d'autore, pizze gourmet e della tradizione, panuozzi,
            dolci e una selezione di beverage del territorio.
          </p>
        </Reveal>

        {/* Tabs */}
        <div
          className="mt-14 flex flex-wrap justify-center gap-2 md:gap-3"
          data-testid="menu-tabs"
        >
          {MENU.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setActive(c.id);
                if (scroller.current) scroller.current.scrollTo({ left: 0 });
              }}
              data-testid={`menu-tab-${c.id}`}
              className={`rounded-full border px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                active === c.id
                  ? "border-[#d6dbe1] bg-[#d6dbe1] text-black"
                  : "border-white/15 text-white/60 hover:border-[#d6dbe1]/50 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Kicker + arrows */}
        <div className="mt-12 flex items-center justify-between gap-4">
          <p className="font-serif-display text-lg italic text-[#d6dbe1]/70">
            {cat.kicker || cat.label}
          </p>
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scrollBy(-1)}
              data-testid="menu-scroll-left"
              aria-label="Scorri a sinistra"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6dbe1]/40 text-[#d6dbe1] transition-all duration-300 hover:bg-[#d6dbe1] hover:text-black"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              data-testid="menu-scroll-right"
              aria-label="Scorri a destra"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6dbe1]/40 text-[#d6dbe1] transition-all duration-300 hover:bg-[#d6dbe1] hover:text-black"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scroll of dishes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative mt-6"
          >
            <div
              ref={scroller}
              data-testid="menu-scroller"
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
              style={{ scrollPaddingLeft: "0px" }}
            >
              {cat.items.map((item, i) => (
                <article
                  key={`${item.name}-${i}`}
                  data-testid="menu-item"
                  className="group flex min-h-[190px] w-[260px] shrink-0 snap-start flex-col rounded-2xl border border-[#d6dbe1]/15 bg-gradient-to-b from-[#121212] to-black p-6 transition-all duration-500 hover:border-[#d6dbe1]/45 hover:shadow-[0_0_30px_rgba(214,219,225,0.08)]"
                >
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h4 className="font-serif-display text-xl leading-tight text-white transition-colors group-hover:text-[#d6dbe1]">
                      {item.name}
                    </h4>
                    {item.signature && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#d6dbe1]/40 px-2 py-0.5 text-[8px] uppercase tracking-widest text-[#d6dbe1]">
                        <Sparkles className="h-2.5 w-2.5" /> Top
                      </span>
                    )}
                  </div>
                  {item.desc && (
                    <p className="flex-1 text-[13px] font-light leading-relaxed text-white/50">
                      {item.desc}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-label text-[9px] uppercase tracking-[0.2em] text-white/30">
                      Rainone
                    </span>
                    <span className="font-serif-display text-2xl text-[#d6dbe1]">
                      € {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
            {/* fade edges */}
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
          </motion.div>
        </AnimatePresence>

        <p className="mt-4 text-center font-label text-[10px] uppercase tracking-[0.25em] text-white/25 md:hidden">
          Scorri lateralmente →
        </p>
      </div>
    </section>
  );
};
