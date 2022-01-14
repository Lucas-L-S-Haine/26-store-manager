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

const findProductById = async (id) => {
  try {
    const productId = new ObjectId(id);
    const newConnection = await connection();
    const product = await newConnection
      .collection('products').findOne(productId);
    return product;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } };
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    const productId = new ObjectId(id);
    const newConnection = await connection();
    await newConnection.collection('products')
      .updateOne({ _id: productId }, { $set: { name, quantity } });
    const product = await newConnection.collection('products')
      .findOne(productId);
    return product;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } };
  }
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
  findProductById,
  findProductByName,
  updateProduct,
};
