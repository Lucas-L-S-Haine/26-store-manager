const Joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required(),
});

const newProduct = async (product) => {
  const { error } = productSchema.validate(product);
  console.log('erro de produto', error);

  if (error) {
    // const productError = new Error({ status: 422, message: error.message });
    // throw productError;
    throw { status: 422, message: error.message };
  }

  const createdProduct = await productsModel.insertProduct(product);
  return createdProduct;
};

const productList = async () => {
  const list = await productsModel.listProducts();
  return list;
};

module.exports = {
  newProduct,
  productList,
};
