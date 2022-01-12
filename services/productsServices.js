// const Joi = require('joi');
const productsModel = require('../models/productsModel');

const newProduct = async (product) => {
  const { name, quantity } = product;
//   const { error } = Joi.object({
//     name: Joi.string().min(5).message({ 'string.min': 'xablau' }),
//   }).validate({ name });
//   if ( error ) {}
  if (name.length < 5) {
    const err = new Error({
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    });
    throw err;
  }
  const createdProduct = await productsModel.insertProduct(product);
  return createdProduct;
};

module.exports = {
  newProduct,
};
