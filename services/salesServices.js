const Joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const saleSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required(),
});
const nameSchema = Joi.string().min(5).required().messages({
  'string.min': '"name" length must be at least 5 characters long',
});
const quantitySchema = Joi.number().min(1).required().messages({
  'number.min': '"quantity" must be larger than or equal to 1',
  'number.base': '"quantity" must be a number',
});

const newError = (err) => (err);

const newSaleValidate = async (sale) => {
  const { error } = saleSchema.validate(sale);
  if (error) {
    throw newError({ status: 422, message: error.message });
  }
  if (await salesModel.findSaleByName(sale.name)) {
    throw newError({ status: 422, message: 'Sale already exists' });
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

const updatedSaleValidate = async (id, name, quantity) => {
  const nameValidate = nameSchema.validate(name);
  const quantityValidate = quantitySchema.validate(quantity);
  if (nameValidate.error) {
    throw newError({ status: 422, message: nameValidate.error.message });
  }
  if (quantityValidate.error) {
    throw newError({ status: 422, message: quantityValidate.error.message });
  }
  const updatedSale = await salesModel
    .updateSale(id, name, quantity);
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
