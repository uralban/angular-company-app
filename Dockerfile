FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS prod_build
RUN npm ci
COPY . .
RUN npm run prod:build

FROM base AS dev
RUN npm install
COPY . .
RUN npm install -g nodemon
ARG PORT
EXPOSE ${PORT}
CMD ["nodemon", "-L"]

FROM nginx:stable AS prod
COPY --from=prod_build /app/dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
