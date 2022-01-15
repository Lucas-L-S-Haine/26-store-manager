const Joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const saleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }).required(),
);

const newError = (err) => (err);

const newSaleValidate = async (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    throw newError({
      status: 422,
      message: 'Wrong product ID or invalid quantity',
    });
  }
  const createdSale = await salesModel.insertSale(sale);
  return createdSale;
};

const saleList = async () => {
  const list = await salesModel.listSales();
  return list;
};

const saleShow = async (id) => {
  const listedSale = await salesModel.findSaleById(id);
  return listedSale;
};

const updatedSaleValidate = async (id, productList) => {
  const { error } = saleSchema.validate(productList);
  if (error) {
    throw newError({
      status: 422,
      message: 'Wrong product ID or invalid quantity',
    });
  }
  const updatedSale = await salesModel
    .updateSale(id, productList);
  return updatedSale;
};

const deletedSaleValidate = async (id) => {
  const deletedSale = await salesModel.deleteSale(id);
  if (deletedSale.err) {
    throw deletedSale.err;
  }
  return deletedSale;
};

module.exports = {
  newSaleValidate,
  saleList,
  saleShow,
  updatedSaleValidate,
  deletedSaleValidate,
};
