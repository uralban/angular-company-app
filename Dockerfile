FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

FROM base AS prod_build
RUN npm ci
COPY . .
RUN npm run prod

FROM base AS dev
RUN npm install
COPY . .
ARG PORT
EXPOSE ${PORT}
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]

FROM nginx:stable AS prod
COPY --from=prod_build /app/dist/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
