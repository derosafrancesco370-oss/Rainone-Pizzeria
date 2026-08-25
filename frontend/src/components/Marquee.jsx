// Slow editorial marquee — outlined serif text
export const Marquee = () => {
  const phrase = "Pizzeria e Friggitoria Napoletana";
  const items = Array.from({ length: 6 });
  return (
    <section
      className="relative overflow-hidden border-y border-[#d4af37]/20 bg-[#050505] py-8 md:py-10"
      data-testid="marquee-section"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {items.map((_, i) => (
          <span
            key={i}
            className="font-serif-display text-outline-gold mx-8 text-4xl italic md:text-6xl"
          >
            {phrase}
            <span className="text-gold-gradient mx-8 not-italic">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
};
