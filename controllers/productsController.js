const productsServices = require('../services/productsServices');

const insert = async (req, res, next) => {
  try {
    const product = req.body;
    const response = await productsServices.newProduct(product);
    return res.status(201).json(response.ops[0]);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
};

const getAll = async (req, res, _next) => {
  try {
    const response = await productsServices.productList();
    console.log('controller', response);
    return res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    return res.status(422).send(err.message);
  }
};

module.exports = {
  insert,
  getAll,
};
