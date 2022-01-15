const {
  saleList, newSaleValidate, saleShow,
  updatedSaleValidate, deletedSaleValidate,
} = require('../services/salesServices');

const insert = async (req, res, next) => {
  try {
    const sale = req.body;
    const response = await newSaleValidate(sale);
    return res.status(200).json(response.ops[0]);
  } catch (err) {
    // console.error('Error:', err.message);
    next(err);
  }
};

const getAll = async (req, res, next) => {
  try {
    const sales = await saleList();
    return res.status(200).json({ sales });
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

const getSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await saleShow(id);
    if (sale.err) {
      return res.status(404).json(sale);
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productList = req.body;
    const sale = await updatedSaleValidate(id, productList);
    if (sale.err) {
      return res.status(422).json(sale);
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err.message);
    next(err);
    // return res.status(422).send(err.message);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await deletedSaleValidate(id);
    return res.status(200).json(deletedSale);
  } catch (err) {
    if (!err) {
      return res.status(333).json({ message: 'olá' });
    }
    const { code, message, status } = err;
    return res.status(status).json({ err: { code, message } });
  }
};

module.exports = {
  insert,
  getAll,
  getSale,
  updateSale,
  deleteSale,
};
