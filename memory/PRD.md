# PRD — Rainone · Pizzeria e Friggitoria Napoletana

## Original Problem Statement
Sito web luxury "Dark Obsidian & Champagne Gold" per "Rainone - Pizzeria e Friggitoria Napoletana" a Baronissi (SA). Estetica mozzafiato ispirata al logo monogramma "RR". Sezioni: Hero monumentale, Filosofia, Menù completo, Galleria verticale, Delivery/Take-Away, Social Hub, Footer con mappa/orari. Form di prenotazione che precompila un messaggio WhatsApp. Integrazione Claude AI per un'estetica/esperienza premium.

## User Choices (confirmed)
- Prenotazione: **solo WhatsApp** precompilato (nessun DB per prenotazioni pubbliche).
- Immagini: **placeholder eleganti** + galleria verticale di 4 foto (l'utente le sostituirà con le proprie).
- Lingua: **solo Italiano**.
- Logo: **logo RR ufficiale** allegato (`/frontend/public/logo-rainone.jpeg`).
- Pulsante WhatsApp flottante fisso: **sì**, colore oro champagne (NON verde).
- Claude AI Models: integrato come **Concierge Gourmet** (chat) — Emergent LLM Key.

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + lenis (smooth scroll). Single page, componenti in `/frontend/src/components`.
- Backend: FastAPI + MongoDB (motor). Routes prefissate `/api`.
- LLM: `emergentintegrations` → Claude `claude-sonnet-4-6` via `EMERGENT_LLM_KEY`, streaming SSE.
- Dati menù statici in `/frontend/src/data/menu.js`; contatti/orari in `/frontend/src/data/config.js`.

## Implemented (2026-06 / this session)
- Hero kinetic con monogramma RR, masked line reveal, parallax, 2 CTA oro. ✓ (verificato visivamente)
- Navbar sticky con link ancora (lenis), rating 4.4/185, CTA Prenota. ✓
- Marquee editoriale, Filosofia (capitoli 01–03), Menù a schede (10 categorie, 44 pizze + panuozzi/fritti/dolci/beverage), Galleria verticale (4 frame parallax), Delivery premium (WhatsApp/telefono), Social Hub (IG/FB), Footer (mappa scura, orari con Martedì CHIUSO, prenotazione obbligatoria). ✓ (DOM verificato: bodyH 7719px, tutte le sezioni presenti)
- ReservationModal luxury → costruisce URL `wa.me/393288188273` con dati precompilati + log su `/api/reservations/log`. ✓ (endpoint verificato via curl)
- FloatingWhatsApp oro fisso (bottom-right) + Concierge launcher (bottom-left).
- Concierge Gourmet chat (Claude, streaming, italiano, conosce menù/orari/regole). ✓ (streaming verificato via curl public URL)

## Verification Notes
- Backend verificato via curl (concierge streaming + reservations) sull'URL pubblico.
- Frontend: hero verificato visivamente; struttura completa verificata via console diagnostic. Le sezioni sotto la piega e i modali usano pattern framer-motion standard; lo strumento screenshot non esegue scroll/interazioni (limite dello strumento, non del codice).

## Endpoints
- `GET /api/` health
- `POST /api/concierge/chat` {session_id, message} → SSE stream (Claude)
- `POST /api/reservations/log` {name,date,time,guests,note?}

## Backlog / Next
- P1: L'utente caricherà foto reali (pizze/fritti) da inserire in Galleria e Hero/Social.
- P2: Eventuale pannello admin per le prenotazioni loggate.
- P2: Sezione recensioni Google.
