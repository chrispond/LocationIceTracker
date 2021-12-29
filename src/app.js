require("dotenv").config();
// Dependancies
const bodyParser = require("body-parser");
const express = require("express");
const locationsDataMiddleware = require("./middleware/locationsData");
const methodOverride = require("method-override");
const path = require("path");
const serverless = require("serverless-http");
const Rollbar = require('rollbar');
const { rollbarOptions } = require('./utils');
const rollbar = new Rollbar(rollbarOptions());

const app = express();
const router = express.Router();

// Template Settings
app.set("view engine", "ejs");
app.locals.rootPath = process.env.NODE_ENV === "dev" ? "/app/" : "/";

// Middleware
app.use(
  "/app/public",
  express.static(`${path.dirname(__dirname)}/dist/public/`)
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(locationsDataMiddleware);
app.use(rollbar.errorHandler());

// Routes
router.use(require("./routes/index"));

app.use(app.locals.rootPath, router);

module.exports.handler = serverless(app);
