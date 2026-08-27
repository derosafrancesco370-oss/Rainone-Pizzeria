import { Reveal } from "./Reveal";

const CHAPTERS = [
  {
    n: "01",
    title: "La Ruota di Carro",
    body: "La nostra firma: la pizza a Ruota di Carro, ampia e scenografica, che abbonda oltre il piatto. Cornicione alveolato e impasto leggero, nella più autentica tradizione napoletana.",
  },
  {
    n: "02",
    title: "L'Impasto",
    body: "Ad alta digeribilità, lunga lievitazione e cornicioni alveolati. Una tela leggera per il gusto, il frutto di studio e maestria napoletana.",
  },
  {
    n: "03",
    title: "La Friggitoria",
    body: "Frittatine, crocchè e montanare dorate: il rito della strada napoletana elevato ad arte, croccante fuori e avvolgente dentro.",
  },
  {
    n: "04",
    title: "Le Nostre Sale",
    body: (
      <>
        Una <span className="text-[#d6dbe1]">Sala interna</span> raccolta e
        accogliente e una <span className="text-[#d6dbe1]">Sala esterna</span>{" "}
        per le sere d'estate. Un'atmosfera intima pensata per un'esperienza
        curata nel dettaglio.
      </>
    ),
  },
];

export const Philosophy = () => (
  <section
    id="filosofia"
    data-testid="philosophy-section"
    className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-12 md:py-40"
  >
    <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Reveal>
          <span className="font-label text-[11px] uppercase tracking-[0.35em] text-[#d6dbe1]">
            La Filosofia Rainone
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif-display text-4xl font-medium leading-[1.1] text-white md:text-6xl">
            L'incontro tra
            <br />
            <span className="text-gold-gradient italic">tradizione</span> e gourmet
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-base font-light leading-relaxed text-white/60">
            Due anime in un solo luogo: la grande maestria della friggitoria
            napoletana e la nostra pizza a Ruota di Carro. Da gustare nella
            sala interna o nella sala esterna, con ingredienti selezionati e
            prodotti DOP.
          </p>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {CHAPTERS.map((c, i) => (
          <Reveal key={c.n} delay={i * 0.12}>
            <div className="group flex gap-8 border-t border-[#d6dbe1]/15 py-10 transition-colors duration-500 hover:border-[#d6dbe1]/50">
              <span className="font-serif-display text-3xl italic text-[#d6dbe1]/50 transition-colors duration-500 group-hover:text-[#d6dbe1]">
                {c.n}
              </span>
              <div>
                <h3 className="font-serif-display text-2xl text-white md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-3 max-w-lg text-[15px] font-light leading-relaxed text-white/55">
                  {c.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
