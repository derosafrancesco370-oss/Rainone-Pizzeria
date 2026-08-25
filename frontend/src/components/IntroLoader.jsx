import { useEffect, useState } from "react";

// Opening animation — pure CSS driven (compositor timeline), so it reliably
// plays and lifts even when RAF/timers are throttled. `onAnimationEnd`
// unmounts the curtain once it has slid away.
export const IntroLoader = () => {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.__lenis) window.__lenis.stop();
    // Fallback: guarantee the curtain is removed even if animationend
    // never fires (e.g. throttled tabs), so it can never block the UI.
    const t = setTimeout(finish, 2200);
    return () => {
      clearTimeout(t);
      if (window.__lenis) window.__lenis.start();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    setGone(true);
    if (window.__lenis) window.__lenis.start();
    window.scrollTo(0, 0);
  };

  if (gone) return null;

  return (
    <div
      data-testid="intro-loader"
      onAnimationEnd={(e) => {
        if (e.animationName && e.animationName.includes("intro-curtain")) finish();
      }}
      className="intro-curtain pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
      <div className="relative flex items-center justify-center">
        <div
          aria-hidden="true"
          className="intro-glow absolute h-56 w-56 rounded-full bg-[#d6dbe1]/30 blur-[80px] md:h-72 md:w-72"
        />
        <img
          src="/logo-rainone.jpeg"
          alt="Rainone"
          className="intro-logo relative h-40 w-40 rounded-full object-cover ring-1 ring-[#d6dbe1]/60 shadow-[0_0_70px_rgba(214,219,225,0.4)] md:h-48 md:w-48"
        />
      </div>

      <div className="intro-line mt-10 h-px w-48 origin-center bg-gradient-to-r from-transparent via-[#d6dbe1] to-transparent" />

      <p className="intro-fade mt-6 font-label text-[11px] uppercase tracking-[0.45em] text-[#d6dbe1]">
        Pizzeria Rainone
      </p>
    </div>
  );
};
