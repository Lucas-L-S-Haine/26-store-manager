const { Router } = require('express');
const {
  readOne, readAll,
  createOne, updateOne, deleteOne,
} = require('../controllers/productsController');

const productsRouter = Router();

productsRouter
  .route('/')
  .get(readAll)
  .post(createOne);

productsRouter
  .route('/:id')
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = productsRouter;
