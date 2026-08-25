import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MENU } from "../data/menu";
import { Reveal } from "./Reveal";

export const MenuSection = () => {
  const [active, setActive] = useState(MENU[0].id);
  const cat = MENU.find((c) => c.id === active);

  return (
    <section
      id="menu"
      data-testid="menu-section"
      className="relative border-t border-[#d4af37]/15 bg-[#050505] py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal className="text-center">
          <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
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
              onClick={() => setActive(c.id)}
              data-testid={`menu-tab-${c.id}`}
              className={`rounded-full border px-5 py-2.5 font-label text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                active === c.id
                  ? "border-[#d4af37] bg-[#d4af37] text-black"
                  : "border-white/15 text-white/60 hover:border-[#d4af37]/50 hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-14"
          >
            {cat.kicker && (
              <p className="mb-10 text-center font-serif-display text-lg italic text-[#d4af37]/70">
                {cat.kicker}
              </p>
            )}
            <div className="grid gap-x-16 gap-y-7 md:grid-cols-2">
              {cat.items.map((item, i) => (
                <motion.div
                  key={`${item.name}-${i}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
                  data-testid="menu-item"
                  className="group flex items-baseline gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif-display text-lg text-white transition-colors group-hover:text-[#d4af37]">
                        {item.name}
                      </h4>
                      {item.signature && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[#d4af37]/40 px-2 py-0.5 text-[8px] uppercase tracking-widest text-[#d4af37]">
                          <Sparkles className="h-2.5 w-2.5" /> Signature
                        </span>
                      )}
                    </div>
                    {item.desc && (
                      <p className="mt-1 text-[13px] font-light leading-snug text-white/45">
                        {item.desc}
                      </p>
                    )}
                  </div>
                  <div className="mb-1 flex-1 border-b border-dotted border-white/15" />
                  <span className="whitespace-nowrap font-serif-display text-lg text-[#d4af37]">
                    € {item.price}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
