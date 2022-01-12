// const Joi = require('joi');
const productsModel = require('../models/productsModel');

const newProduct = async (product) => {
//   const { name, quantity } = product;
//   const { error } = Joi.object({
//     name: Joi.string().min(5).message({ 'string.min': 'xablau' }),
//   }).validate({ name });
//   if ( error ) {}
  const createdProduct = await productsModel.insertProduct(product);
  return createdProduct;
};

module.exports = {
  newProduct,
};
