# Base image
FROM node:18 AS build

# Create app directory
WORKDIR /app/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm ci

# Bundle app source
COPY . .


## PROD
FROM node:19-alpine AS prod 

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY --from=build /app/dist /app/dist

EXPOSE 4000

CMD [ "node", "dist/main.js" ]
