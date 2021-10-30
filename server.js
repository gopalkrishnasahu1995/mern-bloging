require("dotenv").config();
const path = require("path");
const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const paginate = require('express-paginate')
const sanitize = require('mongo-sanitize');
const createError = require("http-errors");
const compress = require("compression");

const app = express();

const {connectdb} = require("./server/config/database.config");

//environments
const PORT = process.env.PORT || 8989;
const env = process.env.NODE_ENV
//database connection
connectdb();


//all middlewares
app.use(express.json(sanitize()));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(paginate.middleware(process.env.LIMIT,process.env.MAX_LIMIT))

//routes


//static file setup
if (env === "production") {
  app.use(cors());
  app.options("*", cors());
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(
    cors({
      origin: process.env.CLIENT_URI,
    })
  );
  app.use(morgan("dev"));
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//server setup
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      .yellow.bold
  );
});
