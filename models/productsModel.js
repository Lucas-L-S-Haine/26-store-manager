const connection = require('./connections');

const insertProduct = async (product) => {
  const newConnection = await connection();
  const newProduct = await newConnection
    .collection('products').insertOne(product);
  return newProduct;
};

const listProducts = async () => {
  const newConnection = await connection();
  const productsList = await newConnection
    .collection('products').find().toArray();
  return productsList;
};

module.exports = {
  insertProduct,
  listProducts,
};
