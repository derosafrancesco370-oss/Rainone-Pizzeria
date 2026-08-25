export const CONTACT = {
  name: "Rainone",
  tagline: "Pizzeria e Friggitoria Napoletana",
  address: "Corso Giuseppe Garibaldi, 29/31/33",
  city: "84081 Baronissi (SA)",
  phone: "+39 328 818 8273",
  phoneRaw: "393288188273",
  rating: "4.4",
  reviews: "185",
  instagram: "https://www.instagram.com/rainone_pizzeria_baronissi?igsi=d2JoNWY1ZmlwcXZm",
  facebook: "https://www.facebook.com/share/1HTPZ28BiH/?mibextid=wwXIfr",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Corso+Giuseppe+Garibaldi+29+Baronissi+SA",
};

export const HOURS = [
  { day: "Lunedì", time: "18:30 – 00:30", closed: false },
  { day: "Martedì", time: "Chiuso", closed: true },
  { day: "Mercoledì", time: "18:30 – 00:30", closed: false },
  { day: "Giovedì", time: "18:30 – 00:30", closed: false },
  { day: "Venerdì", time: "18:30 – 00:30", closed: false },
  { day: "Sabato", time: "18:30 – 00:30", closed: false },
  { day: "Domenica", time: "18:30 – 00:30", closed: false },
];

// Pre-fill helpers for WhatsApp deep links
export const waLink = (text) =>
  `https://wa.me/${CONTACT.phoneRaw}?text=${encodeURIComponent(text)}`;
