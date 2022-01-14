const Joi = require('@hapi/joi');
const productsModel = require('../models/productsModel');

const productSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required(),
});

const newError = (err) => (err);

const newProductValidate = async (product) => {
  const { error } = productSchema.validate(product);

  if (error) {
    throw newError({ status: 422, message: error.message });
  }

  if (await productsModel.findProductByName(product.name)) {
    throw newError({ status: 422, message: 'Product already exists' });
  }

  const createdProduct = await productsModel.insertProduct(product);
  return createdProduct;
};

const productList = async () => {
  const list = await productsModel.listProducts();
  return list;
};

const productShow = async (id) => {
  const listedProduct = await productsModel.findProductById(id);
  return listedProduct;
};

const updatedProductValidate = async (id, name, quantity) => {
  const listedProduct = await productsModel
    .updateProduct(id, name, quantity);
  return listedProduct;
};

module.exports = {
  newProductValidate,
  productList,
  productShow,
  updatedProductValidate,
};
