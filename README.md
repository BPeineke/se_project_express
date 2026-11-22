# WTWR (What to Wear?) Backend

WTWR recommends clothing based on the current weather. The Express API lets
visitors browse clothing cards and lets signed-in users manage their profile,
add their own cards, and like or unlike items. Users can delete only the cards
they created.

## Live Project

- [WTWR frontend](https://wtwer.spacetechnology.net/) and [www address](https://www.wtwer.spacetechnology.net/)
- [Production API](https://api.wtwer.spacetechnology.net/items)
- [Public frontend repository](https://github.com/BPeineke/se_project_react)

## Technologies and Techniques

- React, Vite, and React Router provide the frontend, weather-based card display, and profile navigation.
- Node.js, Express, MongoDB, and Mongoose provide the REST API and persist users and clothing items. bcrypt hashes passwords, and JWTs authenticate protected requests.
- Celebrate and Joi validate incoming data, and Validator checks image URLs. Centralized error handling returns JSON messages, and Winston writes separate request and error logs.
- Google Cloud hosts the full stack. Nginx serves the React build over HTTPS and proxies the API hostname to Express. PM2 supervises the backend and restores it at boot. The production JWT signing key is loaded from a private `.env` file.
- ESLint with Airbnb Base and Prettier check code quality and formatting. Jest and Supertest run the backend endpoint test.

## Run Locally

Use Node.js 22 and start MongoDB locally, then run:

```bash
npm ci
npm run dev
```

The API defaults to `http://localhost:3001` and connects to
`mongodb://127.0.0.1:27017/wtwr_db`. Use `npm start` to run without hot reload.
Use `npm run lint` and `npm test` for the backend checks.

An optional local `.env` can set `PORT`, `MONGODB_URI`, or `JWT_SECRET`.
Production requires `JWT_SECRET`. The `.env`, `request.log`, and `error.log` files are ignored by Git.

## Crash Recovery Review

For a local PM2 check, start the backend with `ENABLE_CRASH_TEST=true`, send
`GET /crash-test`, and verify that PM2 relaunches the process and that
`GET /items` succeeds again. The route is disabled in production. On the VM,
PM2 recovery was verified by terminating the managed Express process and
confirming that PM2 started a new process and the API responded again.

## Project Pitch Video

A demo video of the frontend and backend of the project
https://youtu.be/4IdPIwAX0UM
