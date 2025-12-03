# 298poke-ticket-manager
つくポケ双峰祭用整理券管理アプリケーション

## backendのマイグレーションの手順
```bash
cd /workspace/backend
aerich init -t app.config.TORTOISE_ORM
aerich init-db
aerich migrate
aerich upgrade
```
## backendの開発サーバーの起動手順
```bash
cd /workspace/backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```