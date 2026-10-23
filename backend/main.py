import os
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

TAILSCALE_API_KEY = os.getenv("TAILSCALE_API_KEY")
TAILNET_NAME = os.getenv("TAILNET_NAME")

services = [
                {
                    "id": "cockpit",
                    "name": "Cockpit",
                    "url":  "https://cockpit.{TAILNET_NAME}.ts.net",
                },
                {
                    "id": "dockge",
                    "name": "Dockge",
                    "url":  "https://dockge.{TAILNET_NAME}.ts.net",
                },
                {
                    "id": "adguard-home",
                    "name": "Adguard Home",
                    "url":  "https://adguard-home.{TAILNET_NAME}.ts.net",
                },
            ]

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/services")
def get_services():
    return services

@app.get("/tailnet/services")
async def tailnet_services():
    
