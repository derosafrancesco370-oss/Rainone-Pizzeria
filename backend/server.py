from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

from emergentintegrations.llm.chat import LlmChat, UserMessage, TextDelta, StreamDone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ['EMERGENT_LLM_KEY']

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


CONCIERGE_SYSTEM_MESSAGE = """Sei il "Concierge Gourmet" di Rainone - Pizzeria e Friggitoria Napoletana, un locale di lusso a Baronissi (Salerno), in Corso Giuseppe Garibaldi 29/31/33.

IDENTITÀ E TONO:
- Parli SEMPRE ed ESCLUSIVAMENTE in italiano, con un tono elegante, caldo e raffinato, degno di un ristorante da stella Michelin.
- Sei ospitale, discreto e appassionato della cucina napoletana gourmet.
- Risposte concise ed eleganti (max 4-5 frasi). Usa un linguaggio evocativo ma mai ridondante.
- Non usare emoji.

INFORMAZIONI CHIAVE DEL LOCALE:
- Pizzeria e Friggitoria Napoletana con impasti gourmet ad alta digeribilità e lunga lievitazione.
- Atmosfera intima: camino scoppiettante in inverno, tavoli all'aperto (dehors) in estate.
- PRENOTAZIONE OBBLIGATORIA (l'esperienza è curata nei minimi dettagli).
- Servizi: Asporto e Consegna a Domicilio.
- Orari: Lunedì, Mercoledì, Giovedì, Venerdì, Sabato, Domenica dalle 18:00 alle 00:00. MARTEDÌ CHIUSO.
- Telefono e WhatsApp: +39 328 818 8273. Valutazione 4.4/5 su 185 recensioni.

IL MENÙ (per consigliare i piatti):
FRITTI D'AUTORE: Tris Montanarine (9€), Montanarina Classica/Mortadella e Pistacchio/Stracciata/Scarola (3,50€), Frittatina Nerano (4,50€), Frittatina Classica (3,50€), Crocché (2,50€), Arancino (2,50€), Montanara Classica (7€), Montanara con Stracciata di Bufala (8,50€), Montanara Doppia Cottura (10€), Tagliere Salumi e Formaggi (20€).
PIZZE GOURMET: Rainone 2.0 (mortadella, pomodori secchi, tarallo napoletano - 10€), Pera e Blu (11€), Mortadella e Pistacchio (9€), Tonnarella del Sole (10€), Tartufata (11€), La Corbara (10€), Nerano (8,50€), Fighissima (fichi, capocollo di Martina Franca - 9,50€), Cetara (10€), Vesuviana (9€), 4 Formaggi (10€), Ariccia (porchetta IGP - 9,50€), Primavera (8,50€).
PIZZE TRADIZIONE: Margherita (5€), Marinara DOP (7€), Napoletana (5,50€), Bufalina (6,50€), Diavola (6,50€), Capricciosa (9€), 4 Stagioni (8,50€), Parmigiana 2.0 (9,50€).
PANUOZZI: Porchetta (10€), Primavera (10€).
DOLCI: Babà Classico (6€), Tiramisù (6€), Cheesecake Frutti di Bosco (6€), Pizza alla Nutella (7€), Scazzuoppoli alla Nutella (5€).
BEVERAGE: Birre artigianali (Birra del Borgo, Tennent's, Leffe, Franziskaner), vini del territorio (Aglianico, Falanghina, Fiano - calice 5€), Champagne (Veuve Durin 70€, Ferrari Brut 50€), Aperitivi (Aperol/Campari Spritz 6€).

REGOLE:
- Se l'utente vuole prenotare, ricordagli che la prenotazione è obbligatoria e invitalo a usare il modulo di prenotazione del sito o WhatsApp/telefono al +39 328 818 8273.
- Se chiedono consigli, proponi abbinamenti (es. un fritto d'autore + una pizza gourmet + un calice di vino del territorio).
- Non inventare piatti o prezzi che non sono nel menù."""


class ChatRequest(BaseModel):
    session_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    message: str


class ReservationLog(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    date: str
    time: str
    guests: str
    note: Optional[str] = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


@api_router.get("/")
async def root():
    return {"message": "Rainone API attiva"}


@api_router.post("/concierge/chat")
async def concierge_chat(req: ChatRequest):
    await db.concierge_messages.insert_one({
        "session_id": req.session_id,
        "role": "user",
        "content": req.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    })

    chat = LlmChat(
        api_key=EMERGENT_LLM_KEY,
        session_id=req.session_id,
        system_message=CONCIERGE_SYSTEM_MESSAGE,
    ).with_model("anthropic", "claude-sonnet-4-6")

    async def event_generator():
        full = ""
        try:
            async for event in chat.stream_message(UserMessage(text=req.message)):
                if isinstance(event, TextDelta):
                    full += event.content
                    yield f"data: {json.dumps({'delta': event.content})}\n\n"
                elif isinstance(event, StreamDone):
                    break
        except Exception:
            logger.exception("Concierge error")
            yield f"data: {json.dumps({'delta': ' Mi perdoni, il concierge non e al momento disponibile. La invitiamo a chiamarci al +39 328 818 8273.'})}\n\n"
        if full:
            await db.concierge_messages.insert_one({
                "session_id": req.session_id,
                "role": "assistant",
                "content": full,
                "created_at": datetime.now(timezone.utc).isoformat(),
            })
        yield f"data: {json.dumps({'done': True})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream",
                             headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"})


@api_router.post("/reservations/log")
async def log_reservation(res: ReservationLog):
    await db.reservations.insert_one(res.model_dump())
    return {"ok": True, "id": res.id}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
