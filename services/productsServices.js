const productsModel = require('../models/productsModel');

const newProduct = async (product) => {
  console.log('service', product);
  const createdProduct = await productsModel.insertProduct(product);
  console.log('service', createdProduct);
  return createdProduct;
};

module.exports = {
  newProduct,
};
