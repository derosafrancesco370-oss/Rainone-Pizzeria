import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { waLink } from "../data/config";

// Fixed champagne-gold WhatsApp button (NOT green)
export const FloatingWhatsApp = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = waLink(
    "Ciao Rainone! Vorrei avere informazioni / prenotare un tavolo."
  );

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="floating-whatsapp-btn"
      aria-label="Contattaci su WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: show ? 1 : 0, opacity: show ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-6 right-6 z-[80] flex items-center gap-3"
    >
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-full border border-[#d6dbe1]/40 bg-black/90 px-4 py-2 font-label text-[10px] uppercase tracking-[0.15em] text-[#d6dbe1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Scrivici su WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#d6dbe1] text-black shadow-[0_0_25px_rgba(214,219,225,0.45)] transition-transform duration-300 group-hover:scale-110">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#d6dbe1]/30" />
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </motion.a>
  );
};
