FROM mcr.microsoft.com/vscode/devcontainers/python:3.11

# PostgreSQLライブラリ用
RUN apt-get update && apt-get install -y libpq-dev

# 作業ディレクトリ
WORKDIR /workspace

# 依存関係インストール
COPY ./backend/app/requirements.txt /workspace/app/requirements.txt
RUN pip install --no-cache-dir -r app/requirements.txt

