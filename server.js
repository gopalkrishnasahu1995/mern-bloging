require("dotenv").config();
const path = require("path");
const express = require("express");
const colors = require("colors");
const passport = require("passport");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const paginate = require('express-paginate')
const sanitize = require('mongo-sanitize');
const compress = require("compression");
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const MemoryStore = require("memorystore")(session);
const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./swagger_output.json");

const app = express();

const { connectdb } = require("./server/config/database.config");
const routes = require('./server/routers/routes');
const { StatusCodes } = require("http-status-codes");

//environments
const PORT = process.env.PORT || 8989;
const env = process.env.NODE_ENV;
const server_url = process.env.SERVER_URI || `http://localhost:${PORT}`
//database connection
connectdb();


//all middlewares
app.enable("trust proxy");
app.use(express.json(sanitize(), { limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(express.json(sanitize()));
app.use(cors());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.use(paginate.middleware(process.env.LIMIT, process.env.MAX_LIMIT))

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./server/config/passport.config')(passport);


// Limit requests from same API
const limiter = rateLimit({
  code:StatusCodes.TOO_MANY_REQUESTS,
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
})
app.use(process.env.API_URL, limiter)

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
app.use(helmet());
app.use(compress());

app.use(cookieParser());
app.use(
  session({
    secret: "give-five",
    resave: true,
    saveUninitialized: true,
    name: "cookieUUID",
    cookie: {
      maxAge: 86400000,
      httpOnly: false,
      secure: false,
      sameSite: false,
    },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);


//routes
app.use(routes)

//swagger setup
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
    `Server running in ${process.env.NODE_ENV} mode on port ${server_url}`
      .yellow.bold
  );
});


// Process
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  process.exit(1)
})

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully')
  server.close(() => {
    console.log('💥 Process terminated!')
  })
})

