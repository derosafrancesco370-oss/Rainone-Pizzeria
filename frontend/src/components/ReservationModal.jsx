import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarHeart, Check } from "lucide-react";
import axios from "axios";
import { CONTACT, waLink } from "../data/config";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TIMES = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
const GUESTS = ["1", "2", "3", "4", "5", "6", "7", "8+"];

const Field = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-[#d6dbe1]">
      {label}
    </span>
    {children}
  </label>
);

const inputCls =
  "w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-colors focus:border-[#d6dbe1]";

export const ReservationModal = ({ open, onClose }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "20:00",
    guests: "2",
    note: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const buildMessage = () => {
    const lines = [
      "Buongiorno Rainone, vorrei prenotare un tavolo.",
      "",
      `• Nome: ${form.name || "-"}`,
      form.phone ? `• Telefono: ${form.phone}` : null,
      `• Data: ${form.date || "-"}`,
      `• Orario: ${form.time}`,
      `• Ospiti: ${form.guests}`,
      form.note ? `• Note: ${form.note}` : null,
      "",
      "Attendo conferma, grazie!",
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    const msg = buildMessage();
    // fire-and-forget log (does not block WhatsApp)
    try {
      axios.post(`${API}/reservations/log`, {
        name: form.name,
        date: form.date,
        time: form.time,
        guests: form.guests,
        note: form.note,
      });
    } catch (_) {}
    setSent(true);
    window.open(waLink(msg), "_blank");
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1600);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="reservation-modal"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#d6dbe1]/30 bg-gradient-to-b from-[#121212] to-black p-8 shadow-[0_0_60px_rgba(214,219,225,0.12)] md:p-10"
          >
            <button
              onClick={onClose}
              data-testid="reservation-close-btn"
              className="absolute right-5 top-5 text-white/50 transition-colors hover:text-[#d6dbe1]"
              aria-label="Chiudi"
            >
              <X className="h-5 w-5" />
            </button>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d6dbe1] text-[#d6dbe1]">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-serif-display text-2xl text-white">
                  Ti reindirizziamo su WhatsApp
                </h3>
                <p className="mt-2 text-sm font-light text-white/50">
                  Invia il messaggio precompilato per confermare la tua prenotazione.
                </p>
              </div>
            ) : (
              <>
                <div className="text-center">
                  <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#d6dbe1]">
                    Prenotazione Obbligatoria
                  </span>
                  <h3 className="mt-3 font-serif-display text-3xl font-medium text-white">
                    Prenota il Tuo Tavolo
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <Field label="Nome e Cognome">
                    <input
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Il tuo nome"
                      className={inputCls}
                      data-testid="reservation-name-input"
                    />
                  </Field>

                  <Field label="Telefono (facoltativo)">
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+39 ..."
                      className={inputCls}
                      data-testid="reservation-phone-input"
                    />
                  </Field>

                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Data">
                      <input
                        required
                        type="date"
                        value={form.date}
                        onChange={set("date")}
                        className={`${inputCls} [color-scheme:dark]`}
                        data-testid="reservation-date-input"
                      />
                    </Field>
                    <Field label="Orario">
                      <select
                        value={form.time}
                        onChange={set("time")}
                        className={inputCls}
                        data-testid="reservation-time-input"
                      >
                        {TIMES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Numero di Ospiti">
                    <div className="flex flex-wrap gap-2" data-testid="reservation-guests">
                      {GUESTS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm({ ...form, guests: g })}
                          className={`h-10 w-10 rounded-full border text-sm transition-all ${
                            form.guests === g
                              ? "border-[#d6dbe1] bg-[#d6dbe1] text-black"
                              : "border-white/15 text-white/60 hover:border-[#d6dbe1]/50"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Note (facoltativo)">
                    <textarea
                      value={form.note}
                      onChange={set("note")}
                      rows={2}
                      placeholder="Allergie, tavolo al camino, occasione speciale..."
                      className={`${inputCls} resize-none`}
                      data-testid="reservation-note-input"
                    />
                  </Field>

                  <button
                    type="submit"
                    data-testid="reservation-submit-btn"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#d6dbe1] py-4 font-label text-xs uppercase tracking-[0.18em] text-black transition-all duration-300 hover:shadow-[0_0_35px_rgba(214,219,225,0.4)]"
                  >
                    <CalendarHeart className="h-4 w-4" />
                    Invia su WhatsApp
                  </button>
                  <p className="text-center text-[11px] font-light text-white/35">
                    I dati verranno trascritti in un messaggio WhatsApp al {CONTACT.phone}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
