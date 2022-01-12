const connection = require('./connections');

const insertProduct = async (product) => {
  // console.log('model', product);
  const newConnection = await connection();
  const productName = await newConnection.collection('products').insertOne(product);
  // console.log(productName);
  return productName;
};

module.exports = {
  insertProduct,
};
