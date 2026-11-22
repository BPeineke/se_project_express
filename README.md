# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. I gained a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Deployed Application

- [WTWR frontend](https://wtwer.spacetechnology.net/)
- [WTWR API](https://api.wtwer.spacetechnology.net/items)
- [Frontend GitHub repository](https://github.com/BPeineke/se_project_react)

## Technologies and Tools

- Node.js and Express for the server and API routes
- MongoDB and Mongoose for data storage and schemas
- Validator for URL validation
- ESLint with the Airbnb Base configuration and Prettier for code quality
- Nodemon for automatic server restarts during development

## Running the Project

`npm run start` — to launch the server at `http://localhost:3001` by default

`npm run dev` — to launch the server with hot reload at `http://localhost:3001` by default

The server reads the `PORT` environment variable if you need to use a different port.

## Crash Recovery Review

For a local PM2 check, start the backend with `ENABLE_CRASH_TEST=true`, issue
`GET /crash-test`, and confirm that PM2 relaunches the process and
`GET /items` succeeds. The route is disabled in production. On the VM, a
server operator can test the same PM2 recovery by sending a termination
signal to the managed Express process and checking that PM2 assigns a new
PID and the API responds again.

## Project Pitch Video

[Existing WTWR pitch video](https://drive.google.com/file/d/1uL-kUeIwJ2bEgoY8vvB9ADTfJffQ07lG/view?usp=sharing)
