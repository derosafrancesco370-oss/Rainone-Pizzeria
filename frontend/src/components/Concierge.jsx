import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "Consigliami una pizza gourmet",
  "Cosa mi consigli dalla friggitoria?",
  "Come prenoto un tavolo?",
];

const uid = () =>
  `sess-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const Concierge = () => {
  const [open, setOpen] = useState(false);
  const [sessionId] = useState(uid);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Benvenuto da Rainone. Sono il vostro Concierge Gourmet: posso consigliarvi pizze d'autore, fritti napoletani e abbinamenti. Come posso deliziarvi?",
    },
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, busy]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [
      ...m,
      { role: "user", content: msg },
      { role: "assistant", content: "" },
    ]);

    try {
      const res = await fetch(`${API}/concierge/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop();
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const payload = JSON.parse(line.slice(5).trim());
          if (payload.delta) {
            setMessages((m) => {
              const copy = [...m];
              copy[copy.length - 1] = {
                role: "assistant",
                content: copy[copy.length - 1].content + payload.delta,
              };
              return copy;
            });
          }
        }
      }
    } catch (e) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content:
            "Mi perdoni, il concierge non è al momento disponibile. Chiamateci al +39 328 818 8273.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen(true)}
        data-testid="concierge-launcher"
        aria-label="Concierge Gourmet"
        initial={{ scale: 0 }}
        animate={{ scale: open ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group fixed bottom-6 left-6 z-[80] flex items-center gap-3"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d6dbe1]/50 bg-black/80 text-[#d6dbe1] shadow-[0_0_25px_rgba(214,219,225,0.2)] backdrop-blur transition-transform duration-300 group-hover:scale-110">
          <Sparkles className="h-6 w-6" />
        </span>
        <span className="pointer-events-none absolute left-16 hidden whitespace-nowrap rounded-full border border-[#d6dbe1]/40 bg-black/90 px-4 py-2 font-label text-[10px] uppercase tracking-[0.15em] text-[#d6dbe1] opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
          Concierge Gourmet
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            data-testid="concierge-panel"
            className="fixed bottom-6 left-4 right-4 z-[85] flex h-[70vh] max-h-[600px] flex-col overflow-hidden rounded-2xl border border-[#d6dbe1]/30 bg-[#0a0a0a]/95 shadow-[0_0_60px_rgba(214,219,225,0.15)] backdrop-blur-xl sm:left-6 sm:right-auto sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#d6dbe1]/20 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6dbe1]/50 text-[#d6dbe1]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-serif-display text-base text-white">
                    Concierge Gourmet
                  </p>
                  <p className="font-label text-[9px] uppercase tracking-[0.2em] text-[#d6dbe1]">
                    Rainone · Baronissi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                data-testid="concierge-close-btn"
                className="text-white/50 transition-colors hover:text-[#d6dbe1]"
                aria-label="Chiudi"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5"
              data-testid="concierge-messages"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm font-light leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#d6dbe1] text-black"
                        : "border border-white/10 bg-white/5 text-white/85"
                    }`}
                  >
                    {m.content || (
                      <span className="flex gap-1">
                        <span className="dot h-1.5 w-1.5 rounded-full bg-[#d6dbe1]" />
                        <span className="dot h-1.5 w-1.5 rounded-full bg-[#d6dbe1]" />
                        <span className="dot h-1.5 w-1.5 rounded-full bg-[#d6dbe1]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-testid="concierge-suggestion"
                      className="rounded-full border border-[#d6dbe1]/30 px-3 py-1.5 text-[11px] text-white/70 transition-colors hover:border-[#d6dbe1] hover:text-[#d6dbe1]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-[#d6dbe1]/20 p-4">
              <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 focus-within:border-[#d6dbe1]">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Scrivi al concierge..."
                  data-testid="concierge-input"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={busy}
                  data-testid="concierge-send-btn"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d6dbe1] text-black transition-transform hover:scale-105 disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
