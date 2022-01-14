const express = require('express');
const {
  insert, getAll, getProduct,
} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .post(insert)
  .get(getAll);

productsRouter
  .route('/:id')
  .get(getProduct)
  .put()
  .delete();

module.exports = productsRouter;
