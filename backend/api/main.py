from fastapi import FastAPI
import uvicorn
from routers import ticket, manager

app = FastAPI()
app.include_router(ticket.router)
app.include_router(manager.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
