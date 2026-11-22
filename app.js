require("dotenv").config({ quiet: true });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes");

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;
const app = express();

mongoose.connect(MONGODB_URI);

app.use(express.json());
app.use(cors());
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`App listening at port ${server.address().port}`);
});
