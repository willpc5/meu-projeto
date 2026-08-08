FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install && chmod +x node_modules/.bin/*

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node ./node_modules/tsx/dist/cli.mjs prisma/seed.ts && npm start"]