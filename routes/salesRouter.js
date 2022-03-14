const { Router } = require('express');
const {
  readOne, readAll,
  createOne, updateOne, deleteOne,
} = require('../controllers/salesController');

const salesRouter = Router();

salesRouter
  .route('/')
  .get(readAll)
  .post(createOne);

salesRouter
  .route('/:id')
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = salesRouter;
