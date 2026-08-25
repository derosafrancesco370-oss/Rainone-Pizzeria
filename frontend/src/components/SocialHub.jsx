import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { CONTACT } from "../data/config";

const TILES = [
  "/pizza-1.jpeg",
  "/pizza-2.jpeg",
  "/pizza-3.jpeg",
  "/pizza-5.jpeg",
  "/pizza-6.jpeg",
  "/pizza-4.jpeg",
];

export const SocialHub = () => (
  <section
    data-testid="social-section"
    className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
  >
    <Reveal className="mb-12 text-center">
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
        Social Hub
      </span>
      <h2 className="mt-5 font-serif-display text-4xl font-medium text-white md:text-5xl">
        Seguici su <span className="text-gold-gradient italic">@rainone_pizzeria</span>
      </h2>
      <div className="mt-7 flex items-center justify-center gap-4">
        <a
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="social-instagram-link"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6dbe1]/40 text-[#d6dbe1] transition-all duration-300 hover:bg-[#d6dbe1] hover:text-black"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href={CONTACT.facebook}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="social-facebook-link"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6dbe1]/40 text-[#d6dbe1] transition-all duration-300 hover:bg-[#d6dbe1] hover:text-black"
        >
          <Facebook className="h-5 w-5" />
        </a>
      </div>
    </Reveal>

    <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
      {TILES.map((t, i) => (
        <motion.a
          key={i}
          href={CONTACT.instagram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.06 }}
          className="group relative aspect-square overflow-hidden rounded-sm"
          data-testid={`social-tile-${i}`}
        >
          <img
            src={t}
            alt="Rainone Instagram"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Instagram className="h-6 w-6 text-[#d6dbe1]" />
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);
