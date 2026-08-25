import { Bike, ShoppingBag, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { CONTACT, waLink } from "../data/config";

export const Delivery = () => {
  const takeaway = waLink(
    "Ciao Rainone! Vorrei effettuare un ordine da ASPORTO. Ecco cosa desidero:"
  );
  const domicilio = waLink(
    "Ciao Rainone! Vorrei ordinare a DOMICILIO. Indirizzo di consegna e ordine:"
  );

  return (
    <section
      id="delivery"
      data-testid="delivery-section"
      className="relative border-y border-[#d6dbe1]/15 bg-[#050505] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
                Delivery & Take-Away Premium
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 font-serif-display text-4xl font-medium leading-[1.1] text-white md:text-6xl">
                Il gusto Rainone,
                <br />
                <span className="text-gold-gradient italic">a casa tua</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-white/55">
                Ordina direttamente via WhatsApp o con una chiamata rapida. Ti
                risponderemo per confermare tempi e dettagli della consegna.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-[#d6dbe1]/25 bg-gradient-to-b from-[#111] to-black p-8 shadow-[0_0_40px_rgba(214,219,225,0.08)] md:p-10">
              <div className="flex flex-col gap-4">
                <a
                  href={domicilio}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="delivery-domicilio-btn"
                  className="group flex items-center justify-between rounded-xl border border-[#d6dbe1]/30 bg-[#d6dbe1] px-6 py-5 text-black transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-3">
                    <Bike className="h-5 w-5" />
                    <span className="font-label text-xs uppercase tracking-[0.15em]">
                      Ordina a Domicilio
                    </span>
                  </span>
                  <span className="font-serif-display text-xl italic">→</span>
                </a>
                <a
                  href={takeaway}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="delivery-takeaway-btn"
                  className="group flex items-center justify-between rounded-xl border border-[#d6dbe1]/40 px-6 py-5 text-[#d6dbe1] transition-all duration-300 hover:bg-[#d6dbe1]/10"
                >
                  <span className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5" />
                    <span className="font-label text-xs uppercase tracking-[0.15em]">
                      Ordina da Asporto
                    </span>
                  </span>
                  <span className="font-serif-display text-xl italic">→</span>
                </a>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  data-testid="delivery-call-btn"
                  className="group flex items-center justify-between rounded-xl border border-white/10 px-6 py-5 text-white/80 transition-all duration-300 hover:border-white/30"
                >
                  <span className="flex items-center gap-3">
                    <Phone className="h-5 w-5" />
                    <span className="font-label text-xs uppercase tracking-[0.15em]">
                      Chiama {CONTACT.phone}
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
