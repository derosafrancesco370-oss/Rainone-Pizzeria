import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const SALE = [
  { url: "/sala-1.jpeg", label: "Sala Esterna", className: "md:row-span-2" },
  { url: "/sala-2.jpeg", label: "Sala Interna", className: "md:col-span-2" },
  { url: "/sala-3.jpeg", label: "Sala Esterna", className: "md:col-span-2" },
];

const Frame = ({ item, index }) => (
  <motion.figure
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    data-testid={`sala-frame-${index}`}
    className={`group relative overflow-hidden rounded-2xl border border-[#d6dbe1]/20 ${item.className}`}
  >
    <img
      src={item.url}
      alt={item.label}
      className="h-full min-h-[240px] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
    <figcaption className="absolute bottom-5 left-5">
      <span className="inline-flex items-center gap-2 rounded-full border border-[#d6dbe1]/40 bg-black/40 px-4 py-1.5 font-label text-[10px] uppercase tracking-[0.22em] text-[#d6dbe1] backdrop-blur">
        {item.label}
      </span>
    </figcaption>
  </motion.figure>
);

export const Sale = () => (
  <section
    id="sale"
    data-testid="sale-section"
    className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
  >
    <Reveal className="mb-14 text-center">
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
        Ambiente & Atmosfera
      </span>
      <h2 className="mt-5 font-serif-display text-4xl font-medium text-white md:text-6xl">
        Le Nostre <span className="text-gold-gradient italic">Sale</span>
      </h2>
      <p className="mx-auto mt-5 max-w-xl text-sm font-light text-white/50">
        Una <span className="text-[#d6dbe1]">Sala interna</span> raccolta e
        accogliente e una <span className="text-[#d6dbe1]">Sala esterna</span>{" "}
        immersa nel verde per le sere d'estate.
      </p>
    </Reveal>

    <div className="grid gap-4 md:h-[660px] md:grid-cols-3 md:grid-rows-2">
      {SALE.map((s, i) => (
        <Frame key={i} item={s} index={i} />
      ))}
    </div>
  </section>
);
