import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const SHOTS = [
  {
    url: "/pizza-1.jpeg",
    caption: "Crudo & Burrata",
  },
  {
    url: "/pizza-2.jpeg",
    caption: "Pesto d'Autore",
  },
  {
    url: "/pizza-3.jpeg",
    caption: "Dal Forno a Legna",
  },
  {
    url: "/pizza-4.jpeg",
    caption: "Nerano & Crudo",
  },
];

const Frame = ({ shot, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // alternate parallax direction
  const dir = index % 2 === 0 ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [40 * dir, -40 * dir]);

  return (
    <motion.figure
      ref={ref}
      style={{ y }}
      className="group relative"
      data-testid={`gallery-frame-${index}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#d6dbe1]/20">
        <img
          src={shot.url}
          alt={shot.caption}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {/* spotlight on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(214,219,225,0.14),transparent_65%)]" />
      </div>
    </motion.figure>
  );
};

export const Gallery = () => (
  <section
    id="galleria"
    data-testid="gallery-section"
    className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36"
  >
    <Reveal className="mb-14 flex flex-col items-end text-right">
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
        Editorial · Gallery
      </span>
      <h2 className="mt-5 font-serif-display text-4xl font-medium text-white md:text-6xl">
        Ogni scatto, <span className="text-gold-gradient italic">un desiderio</span>
      </h2>
    </Reveal>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {SHOTS.map((s, i) => (
        <Frame key={i} shot={s} index={i} />
      ))}
    </div>
  </section>
);
