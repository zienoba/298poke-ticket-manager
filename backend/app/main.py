from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import ticket, manager, display
from tortoise.contrib.fastapi import register_tortoise
from .config import TORTOISE_ORM

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://[::1]:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # フロントのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
   
app.include_router(ticket.router)
app.include_router(manager.router)
app.include_router(display.router)

register_tortoise(
    app,
    config=TORTOISE_ORM,
    generate_schemas=True,
    add_exception_handlers=True,
)