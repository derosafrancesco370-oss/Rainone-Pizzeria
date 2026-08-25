import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "./Reveal";

const SHOTS = [
  {
    url: "https://images.unsplash.com/photo-1694441431338-8c66ec524118?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    caption: "La Margherita",
  },
  {
    url: "https://images.pexels.com/photos/5056867/pexels-photo-5056867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=800",
    caption: "Arancini d'Oro",
  },
  {
    url: "https://images.unsplash.com/photo-1677175245494-dc306351b541?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    caption: "Gourmet d'Autore",
  },
  {
    url: "https://images.unsplash.com/photo-1677175201952-82d22beabec5?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    caption: "Cotta a Regola d'Arte",
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
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[#d4af37]/20">
        <img
          src={shot.url}
          alt={shot.caption}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {/* spotlight on hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_65%)]" />
        <figcaption className="absolute bottom-4 left-4 right-4">
          <span className="font-serif-display text-lg italic text-white">
            {shot.caption}
          </span>
        </figcaption>
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
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
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
