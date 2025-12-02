from fastapi import FastAPI
from routers import ticket, manager
import psycopg2
import os
from tortoise.contrib.fastapi import register_tortoise
from config import TORTOISE_ORM
import uvicorn

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI + PostgreSQL!"}

@app.get("/db-check")
def db_check():
    try:
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()
        conn.close()
        return {"db_version": version[0]}
    except Exception as e:
        return {"error": str(e)}
    
app.include_router(ticket.router)
app.include_router(manager.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")