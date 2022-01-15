const express = require('express');
const {
  insert, getAll, getSale,
  updateSale, deleteSale,
} = require('../controllers/salesController');

const salesRouter = express.Router();

salesRouter
  .route('/')
  .post(insert)
  .get(getAll);

salesRouter
  .route('/:id')
  .get(getSale)
  .put(updateSale)
  .delete(deleteSale);

module.exports = salesRouter;
