const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

/* productsRouter
  .route('/')
  .post(productsController.insert)
  .get((req, res) => res.status(200).send({ message: 'GET /products works!' })); */

productsRouter.post('/', productsController.insert);
productsRouter.get('/', (req, res) => res.status(200).send({ message: 'GET /products works!' }));

module.exports = productsRouter;
