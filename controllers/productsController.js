const {
  productList, productValidate,
} = require('../services/productsServices');

const insert = async (req, res, next) => {
  try {
    const product = req.body;
    const response = await productValidate(product);
    return res.status(201).json(response.ops[0]);
  } catch (err) {
    // console.error('Error:', err.message);
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await productList();
    return res.status(200).json({ products });
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

module.exports = {
  insert,
  getAll,
};
