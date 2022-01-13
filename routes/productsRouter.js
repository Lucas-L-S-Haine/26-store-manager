const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .post(productsController.insert)
  .get(productsController.getAll);

// productsRouter
//   .route('/:id')
//   .get()
//   .put()
//   .delete();

module.exports = productsRouter;
