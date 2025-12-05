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
## アプリケーションの起動
1. 必要なもの<br>
[docker](https://www.docker.com/ja-jp/)

2. コンテナの起動
```bash
docker-compose up -d --build
```
3. dbのマイグレーション<br>
backendのコンテナに入る
```bash
docker exec -it fastapi-backend bash
```
初回なら
```bash
aerich init -t app.config.TORTOISE_ORM
aerich init-db
```
dbのmodelを更新したなら
```bash
aerich migrate
aerich upgrade
```
4. 起動<br>
[webアプリ](http://localhost:3000/)<br>
[APIドキュメント](http://localhost:8000/docs)
