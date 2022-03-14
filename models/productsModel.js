const { ObjectId } = require('mongodb');

const connection = require('./connections');

const findOne = async (name) => {
  const newConnection = await connection();
  const product = await newConnection
    .collection('products').findOne({ name });
  return product;
};

const findAll = async () => {
  const newConnection = await connection();
  const productsList = await newConnection
    .collection('products').find().toArray();
  return productsList;
};

const findById = async (id) => {
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

const create = async (product) => {
  const newConnection = await connection();
  const newProduct = await newConnection
    .collection('products').insertOne(product);
  return newProduct;
};

const update = async (id, name, quantity) => {
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

const destroy = async (id) => {
  try {
    const productId = new ObjectId(id);
    const newConnection = await connection();
    const product = await newConnection.collection('products')
      .findOne(productId);
    await newConnection.collection('products').deleteOne({ _id: productId });
    return product;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
      status: 422,
    } };
  }
};

module.exports = {
  findOne,
  findAll,
  findById,
  create,
  update,
  destroy,
};
