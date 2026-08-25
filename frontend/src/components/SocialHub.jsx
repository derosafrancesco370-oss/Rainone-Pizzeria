import { Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { CONTACT } from "../data/config";

const TILES = [
  "https://images.unsplash.com/photo-1677175201981-cb9bf0ccf851?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1677175201952-82d22beabec5?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.pexels.com/photos/5056867/pexels-photo-5056867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600",
  "https://images.unsplash.com/photo-1694441431338-8c66ec524118?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.unsplash.com/photo-1677175245494-dc306351b541?crop=entropy&cs=srgb&fm=jpg&q=85&w=600",
  "https://images.pexels.com/photos/27647972/pexels-photo-27647972.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=600&w=600",
];

export const SocialHub = () => (
  <section
    data-testid="social-section"
    className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
  >
    <Reveal className="mb-12 text-center">
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
        >
          <Instagram className="h-5 w-5" />
        </a>
        <a
          href={CONTACT.facebook}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="social-facebook-link"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
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
            className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Instagram className="h-6 w-6 text-[#d4af37]" />
          </div>
        </motion.a>
      ))}
    </div>
  </section>
);
