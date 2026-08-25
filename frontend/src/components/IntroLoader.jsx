import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Signature on-load moment: black curtain with monogram, then lift.
// Uses requestAnimationFrame timing (setTimeout is throttled in this env).
export const IntroLoader = () => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // In hidden/background tabs (e.g. automated browsers) RAF & timers are
    // paused — skip the intro so content is never blocked.
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      console.log("[intro] hidden at mount -> skip", document.visibilityState);
      setDone(true);
      return;
    }
    console.log("[intro] visible, starting raf", document.visibilityState);
    if (window.__lenis) window.__lenis.stop();
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const el = now - start;
      if (el >= 1900) {
        console.log("[intro] raf done at", Math.round(el));
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const onHide = () => {
      if (document.visibilityState !== "visible") setDone(true);
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  useEffect(() => {
    if (done && window.__lenis) {
      window.__lenis.start();
      window.scrollTo(0, 0);
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-testid="intro-loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.img
            src="/logo-rainone.jpeg"
            alt="Rainone"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-32 w-32 rounded-full object-cover ring-1 ring-[#d4af37]/40 md:h-40 md:w-40"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="mt-8 h-px w-40 origin-left bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 font-label text-[10px] uppercase tracking-[0.4em] text-[#d4af37]"
          >
            Pizzeria e Friggitoria Napoletana
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
