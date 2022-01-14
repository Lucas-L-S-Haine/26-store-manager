const { ObjectId } = require('mongodb');

const connection = require('./connections');

const insertProduct = async (product) => {
  const newConnection = await connection();
  const newProduct = await newConnection
    .collection('products').insertOne(product);
  return newProduct;
};

const findProductByName = async (name) => {
  const newConnection = await connection();
  const product = await newConnection
    .collection('products').findOne({ name });
  return product;
};

const listProducts = async () => {
  const newConnection = await connection();
  const productsList = await newConnection
    .collection('products').find().toArray();
  console.log('model', productsList);
  return productsList;
};

const findProductById = async (id) => {
  console.log('aqui');
  try {
    const productId = new ObjectId(id);
    const newConnection = await connection();
    const product = await newConnection
      .collection('products').findOne(productId);
    console.log('model', product, id);
    return product;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } };
  }
};

module.exports = {
  insertProduct,
  listProducts,
  findProductById,
  findProductByName,
};
