import os

DB_URL = os.getenv("DATABASE_URL", "postgres://user:password@db:5432/app_db")

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
