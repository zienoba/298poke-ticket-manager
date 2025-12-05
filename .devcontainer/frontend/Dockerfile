FROM node:24

# 作業ディレクトリ
WORKDIR /workspace

# git や curl など必要なら追加
RUN apt-get update && apt-get install -y git

# 依存関係をコピーしてインストール
COPY package.json ./
RUN npm install

# 開発用サーバの起動
CMD ["npm", "run", "dev"]
# グローバルに vite など入れるなら（必要なら）
# RUN npm install -g vite
