import { MapPin, Phone, Instagram, Facebook, Star, Clock } from "lucide-react";
import { Reveal } from "./Reveal";
import { CONTACT, HOURS } from "../data/config";

export const Footer = ({ onReserve }) => (
  <footer
    id="contatti"
    data-testid="footer-section"
    className="relative border-t border-[#d4af37]/20 bg-black"
  >
    {/* Reservation banner */}
    <div className="border-b border-[#d4af37]/15 bg-[#050505]">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-6 py-14 text-center md:px-12">
        <Reveal>
          <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d4af37]">
            Prenotazione Obbligatoria
          </span>
          <h3 className="mt-4 font-serif-display text-3xl font-medium text-white md:text-5xl">
            Assicurati il tuo tavolo accanto al camino
          </h3>
          <button
            onClick={onReserve}
            data-testid="footer-reserve-btn"
            className="mt-8 rounded-full bg-[#d4af37] px-9 py-4 font-label text-xs uppercase tracking-[0.18em] text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
          >
            Prenota il Tuo Tavolo
          </button>
        </Reveal>
      </div>
    </div>

    <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:grid-cols-3 md:px-12">
      {/* Brand + contacts */}
      <div>
        <img
          src="/logo-rainone.jpeg"
          alt="Rainone"
          className="h-20 w-20 rounded-full object-cover ring-1 ring-[#d4af37]/40"
        />
        <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-white/50">
          Pizzeria e Friggitoria Napoletana d'autore nel cuore di Baronissi.
        </p>
        <div className="mt-6 flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-[#d4af37] text-[#d4af37]" />
          <span className="text-sm text-white/70">
            {CONTACT.rating} · {CONTACT.reviews} recensioni
          </span>
        </div>
        <div className="mt-6 space-y-3 text-sm text-white/70">
          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 transition-colors hover:text-[#d4af37]"
            data-testid="footer-address-link"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4af37]" />
            <span>
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </span>
          </a>
          <a
            href={`tel:${CONTACT.phoneRaw}`}
            className="flex items-center gap-3 transition-colors hover:text-[#d4af37]"
            data-testid="footer-phone-link"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#d4af37]" />
            {CONTACT.phone}
          </a>
        </div>
        <div className="mt-6 flex gap-3">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href={CONTACT.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/40 text-[#d4af37] transition-all hover:bg-[#d4af37] hover:text-black"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Hours */}
      <div>
        <h4 className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          <Clock className="h-4 w-4" /> Orari
        </h4>
        <ul className="mt-6 space-y-3" data-testid="footer-hours">
          {HOURS.map((h) => (
            <li
              key={h.day}
              className={`flex items-center justify-between border-b border-white/5 pb-3 text-sm ${
                h.closed ? "text-[#d4af37]" : "text-white/70"
              }`}
            >
              <span className="font-light">{h.day}</span>
              <span className={h.closed ? "font-label text-[11px] uppercase tracking-wider" : "font-light"}>
                {h.time}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Map */}
      <div>
        <h4 className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.25em] text-[#d4af37]">
          <MapPin className="h-4 w-4" /> Dove Siamo
        </h4>
        <div className="mt-6 overflow-hidden rounded-lg border border-[#d4af37]/25">
          <iframe
            title="Mappa Rainone Baronissi"
            src="https://www.google.com/maps?q=Corso%20Giuseppe%20Garibaldi%2029%20Baronissi%20SA&output=embed"
            className="h-64 w-full"
            style={{ filter: "invert(90%) hue-rotate(180deg) grayscale(30%)" }}
            loading="lazy"
            data-testid="footer-map"
          />
        </div>
      </div>
    </div>

    <div className="border-t border-white/5 py-6">
      <p className="text-center text-[11px] font-light tracking-wide text-white/30">
        © {new Date().getFullYear()} Rainone · Pizzeria e Friggitoria Napoletana · Baronissi (SA)
      </p>
    </div>
  </footer>
);
