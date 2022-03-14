const Joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

const productSchema = Joi.object({
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

const createOne = async (product) => {
  const { error } = productSchema.validate(product);
  if (error) {
    error.status = 422;
    throw error;
  }
  if (await productsModel.findOne(product.name)) {
    const insertError = new Error();
    insertError.message = 'Product already exists';
    insertError.status = 422;
    throw insertError;
  }
  const createdProduct = await productsModel.create(product);
  return createdProduct;
};

const readAll = async () => {
  const list = await productsModel.findAll();
  return list;
};

const readOne = async (id) => {
  const listedProduct = await productsModel.findById(id);
  return listedProduct;
};

const updateOne = async (id, name, quantity) => {
  const { error: nameError } = nameSchema.validate(name);
  const { error: quantityError } = quantitySchema.validate(quantity);
  if (nameError) {
    nameError.status = 422;
    throw nameError;
  }
  if (quantityError) {
    quantityError.status = 422;
    throw quantityError;
  }
  const updatedProduct = await productsModel.update(id, name, quantity);
  return updatedProduct;
};

const deleteOne = async (id) => {
  const deletedProduct = await productsModel.destroy(id);
  if (deletedProduct.err) {
    throw deletedProduct.err;
  }
  return deletedProduct;
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
};
