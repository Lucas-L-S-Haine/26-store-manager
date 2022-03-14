const Joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const saleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().min(1).required(),
  }).required(),
);

const createOne = async (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    error.status = 422;
    error.message = 'Wrong product ID or invalid quantity';
    throw error;
  }
  const createdSale = await salesModel.create(sale);
  return createdSale;
};

const readAll = async () => {
  const list = await salesModel.findAll();
  return list;
};

const readOne = async (id) => {
  const listedSale = await salesModel.findById(id);
  return listedSale;
};

const updateOne = async (id, productList) => {
  const { error } = saleSchema.validate(productList);
  if (error) {
    error.status = 422;
    error.message = 'Wrong product ID or invalid quantity';
    throw error;
  }
  const updatedSale = await salesModel.update(id, productList);
  return updatedSale;
};

const deleteOne = async (id) => {
  const deletedSale = await salesModel.destroy(id);
  if (deletedSale.err) {
    throw deletedSale.err;
  }
  return deletedSale;
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
};
