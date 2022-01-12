const express = require('express');
const salesController = require('../controllers/salesController');

const salesRouter = express.Router();

// router.post('/', async (req, res, next) => {
salesRouter
  .route('/')
  .post(salesController.insert)
  .get((req, res) => res.status(200).send({ message: 'GET /sales works!' }));
//   try {
//     const insertedProduct = insert(req.body)
//   } catch(err) {
//   }

module.exports = salesRouter;
