const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

// router.post('/', async (req, res, next) => {
productsRouter
  .route('/')
  .post(productsController.insert)
  .get((req, res) => res.status(200).send({ message: 'GET /products works!' }));
//   try {
//     const insertedProduct = insert(req.body)
//   } catch(err) {
//   }

module.exports = productsRouter;
