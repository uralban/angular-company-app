## Description
```
This app is designed to help practice my front-end skills as part of an internship. 
Application use client-side rendering at the moment.
```

### Technologies
```
Angular v.19.0.0
TypeScript v.5.6.2
Tailwind v.3.4.17
Karma v.6.4.0
```

### Requirements
```
Node.js v.22.13.0
```

## Compile and run the application

### Deployment
```bash
# At first you need clone the project to local directory
$ git clone https://github.com/uralban/meduzzenFront.git

# Second, switch to the branch 'develop'
$ git checkout develop

# Third, install all dependencies
$ npm install
```

### Environment variables

You need to create .env file in project root directory. This file should contain the following data:
```
PORT=4200 ;the port of the application is running on
API_URL=http://localhost:8080 ;backend api url
```

### Build and start application

The project builds to the `/dist` directory.

```bash
# Build project in development mode
$ npm run build

# Build project in development watch mode
$ npm run watch

# Build project in production mode
$ npm run prod

# Start angular cli server, build and run project in development watch mode
$ npm run start
```

### Build and start application with Docker

For production:

```bash
# Create image:
$ docker build --target prod -t meduzzen-front-app-prod-img .

# Create and run container:
$ docker run -p 4200:80 --env-file .env -d --rm meduzzen-front-app-prod-img
```

For developing:

```bash
$ docker compose up --build
```

### The application will start on
```
localhost:4200
```

## Testing application

```bash
# Unit tests via Karma
$ npm run test

# Unit tests with coverage
$ npm run test:cov
```

You can see the coverage report in `/coverage` directory after generate.

### You can see the deployed project on:
```bash
  https://www.mental-help.com.ua
```
