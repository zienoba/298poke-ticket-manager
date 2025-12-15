import os
from dotenv import load_dotenv
load_dotenv()

DB_URL = os.getenv("DATABASE_URL")

TORTOISE_ORM = {
    "connections": {
        "default": DB_URL,
    },
    "apps": {
        "models": {
            "models": ["app.models.ticket",
                       "app.models.record",
                       "aerich.models"],  # ← 自分のモデル＋Aerich用
            "default_connection": "default",
        },
    },
}
