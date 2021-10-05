// Dependancies
const express = require('express');
const ejs = require('ejs');
const indexTemplate = require('../views/index.ejs');
const utils = require('../utils/viewsUtils/viewUtils');

const homeRouter = express.Router();

homeRouter.get('/', (request, response) => {
  response.send(
    ejs.render(indexTemplate.default, {
      locationData: request.locationData,
      rootPath: request.app.locals.rootPath,
      utils,
    })
  );
});

module.exports = homeRouter;
