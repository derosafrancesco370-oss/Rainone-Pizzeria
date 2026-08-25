import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { CONTACT } from "../data/config";

const REVIEWS = [
  {
    text: "Sono stato a cena con alcuni amici e siamo rimasti davvero soddisfatti! Ambiente soft e atmosfera rilassante, il servizio impeccabile, e la Pizza… una Signor pizza. Si sente il sapore dei prodotti freschissimi. Da provare anche i fritti, tutto artigianale preparato da loro.",
    author: "Recensione Google",
  },
  {
    text: "Locale bellissimo, fritti artigianali, pizza da paura leggerissima e prodotti ottimi 100% di qualità… per non parlare dei parcheggi. Ottima scelta, ci sono tutti i comfort. Complimenti!",
    author: "Recensione Google",
  },
  {
    text: "Una piccola perla: una pizza in stile napoletano di altissimo livello, impasto leggero e digeribile, stesura perfetta e ingredienti di altissima qualità. Se rimane questo il livello, diventa fra le migliori pizzerie di Salerno. Servizio veloce e cordiale, prezzi giusti e locale accogliente.",
    author: "Recensione Google",
  },
];

const Stars = () => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
    ))}
  </div>
);

export const Reviews = () => (
  <section
    data-testid="reviews-section"
    className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-36"
  >
    <Reveal className="mb-16 text-center">
      <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
        La Voce dei Nostri Ospiti
      </span>
      <h2 className="mt-5 font-serif-display text-4xl font-medium text-white md:text-6xl">
        <span className="text-gold-gradient italic">{CONTACT.rating}</span> su 5 stelle
      </h2>
      <div className="mt-5 flex items-center justify-center gap-3">
        <Stars />
        <span className="text-sm font-light text-white/50">
          {CONTACT.reviews} recensioni verificate
        </span>
      </div>
    </Reveal>

    <div className="grid gap-6 md:grid-cols-3">
      {REVIEWS.map((r, i) => (
        <motion.figure
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          data-testid={`review-card-${i}`}
          className="group relative flex flex-col rounded-2xl border border-[#d4af37]/20 bg-gradient-to-b from-[#111] to-black p-8 transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)]"
        >
          <Quote className="mb-5 h-8 w-8 text-[#d4af37]/40" />
          <blockquote className="flex-1 text-[15px] font-light italic leading-relaxed text-white/75">
            “{r.text}”
          </blockquote>
          <figcaption className="mt-7 flex items-center justify-between border-t border-white/5 pt-5">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-white/50">
              {r.author}
            </span>
            <Stars />
          </figcaption>
        </motion.figure>
      ))}
    </div>
  </section>
);
