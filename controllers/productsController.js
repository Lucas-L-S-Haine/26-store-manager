const {
  productList, newProductValidate, productShow,
  updatedProductValidate, deletedProductValidate,
} = require('../services/productsServices');

const insert = async (req, res, next) => {
  try {
    const product = req.body;
    const response = await newProductValidate(product);
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

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productShow(id);
    if (product.err) {
      return res.status(422).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await updatedProductValidate(id, name, quantity);
    if (product.err) {
      return res.status(422).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await deletedProductValidate(id);
  return res.status(200).json(deletedProduct);
};

module.exports = {
  insert,
  getAll,
  getProduct,
  updateProduct,
  deleteProduct,
};
