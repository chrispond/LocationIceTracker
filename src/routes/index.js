// Dependancies
const express = require('express');
const ejs = require('ejs');
const indexTemplate = require('../views/index.ejs');
const utils = require('../utils/viewsUtils/viewUtils');
const Rollbar = require('rollbar');
const { rollbarOptions } = require('../utils');
const rollbar = new Rollbar(rollbarOptions());

const homeRouter = express.Router();

homeRouter.get('/', (request, response) => {
  try {
    response.send(
      ejs.render(indexTemplate.default, {
        locationData: request.locationData,
        rootPath: request.app.locals.rootPath,
        utils
      })
    );
  } catch (error) {
    rollbar.critical(`Render HTML Error: ${error}`, request);
  }
});

module.exports = homeRouter;
