## BUILD
FROM node:19-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .


RUN npm run build




## PROD
FROM node:19-alpine AS prod 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY --from=build /app/dist /app/dist

EXPOSE 4000

CMD [ "node", "dist/main.js" ]