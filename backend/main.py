from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

services = [
                {
                    "id": "cockpit",
                    "name": "Cockpit",
                    "url":  "https://cockpit.redacted.ts.net",
                },
                {
                    "id": "dockge",
                    "name": "Dockge",
                    "url":  "https://dockge.redacted.ts.net",
                },
                {
                    "id": "adguard-home",
                    "name": "Adguard Home",
                    "url":  "https://adguard-home.redacted.ts.net",
                },
            ]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/services")
def get_services():
    return services
