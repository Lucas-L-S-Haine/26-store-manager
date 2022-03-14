const { ObjectId } = require('mongodb');

const connection = require('./connections');

const findAll = async () => {
  const newConnection = await connection();
  const salesList = await newConnection
    .collection('sales').find().toArray();
  return salesList;
};

const findById = async (id) => {
  try {
    const saleId = new ObjectId(id);
    const newConnection = await connection();
    const sale = await newConnection
      .collection('sales').findOne(saleId);
    return sale;
  } catch (err) {
    return { err: {
      code: 'not_found',
      message: 'Sale not found',
    } };
  }
};

const create = async (sale) => {
  const newConnection = await connection();
  const newSale = await newConnection
    .collection('sales').insertOne({ itensSold: sale });
  return newSale;
};

const update = async (id, productList) => {
  try {
    const saleId = new ObjectId(id);
    const newConnection = await connection();
    await newConnection.collection('sales')
      .updateOne({ _id: saleId }, { $set: { itensSold: productList } });
    const sale = await newConnection.collection('sales').findOne(saleId);
    return sale;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    } };
  }
};

const destroy = async (id) => {
  try {
    const saleId = new ObjectId(id);
    const newConnection = await connection();
    const sale = await newConnection.collection('sales')
      .findOne(saleId);
    await newConnection.collection('sales').deleteOne({ _id: saleId });
    return sale;
  } catch (err) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
      status: 422,
    } };
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
};
