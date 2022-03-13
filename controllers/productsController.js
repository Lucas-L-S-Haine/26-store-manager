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
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const products = await productList();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
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
    next(err);
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
    next(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await deletedProductValidate(id);
    return res.status(200).json(deletedProduct);
  } catch (err) {
    const { code, message, status } = err;
    return res.status(status).json({ err: { code, message } });
  }
};

module.exports = {
  insert,
  getAll,
  getProduct,
  updateProduct,
  deleteProduct,
};
