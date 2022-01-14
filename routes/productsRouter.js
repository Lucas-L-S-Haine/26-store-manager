const express = require('express');
const {
  insert, getAll, getProduct,
  updateProduct, deleteProduct,
} = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter
  .route('/')
  .post(insert)
  .get(getAll);

productsRouter
  .route('/:id')
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = productsRouter;
