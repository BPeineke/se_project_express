require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;
const app = express();

app.use(requestLogger);
app.use(cors());
app.use(express.json());

if (
  process.env.NODE_ENV !== "production" &&
  process.env.ENABLE_CRASH_TEST === "true"
) {
  app.get("/crash-test", () => {
    setTimeout(() => {
      throw new Error("Server will crash now");
    }, 0);
  });
}

app.use(router);
app.use(errorLogger);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  mongoose.connect(MONGODB_URI);

  const server = app.listen(PORT, () => {
    console.log(`App listening at port ${server.address().port}`);
  });
}

module.exports = app;
