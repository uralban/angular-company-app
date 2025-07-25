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
ARG PORT
EXPOSE ${PORT}
CMD ["npm", "run", "watch"]

FROM nginx:stable AS prod
COPY --from=prod_build /app/dist/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
