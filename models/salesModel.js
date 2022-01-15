const { ObjectId } = require('mongodb');

const connection = require('./connections');

const insertSale = async (sale) => {
  const newConnection = await connection();
  const newSale = await newConnection
    .collection('sales').insertOne({ itensSold: sale });
  return newSale;
};

const findSaleByName = async (name) => {
  const newConnection = await connection();
  const sale = await newConnection
    .collection('sales').findOne({ name });
  return sale;
};

const findSaleById = async (id) => {
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

const updateSale = async (id, productList) => {
  try {
    const saleId = new ObjectId(id);
    const newConnection = await connection();
    console.log('productList', productList);
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

const deleteSale = async (id) => {
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

const listSales = async () => {
  const newConnection = await connection();
  const salesList = await newConnection
    .collection('sales').find().toArray();
  return salesList;
};

module.exports = {
  insertSale,
  listSales,
  findSaleById,
  findSaleByName,
  updateSale,
  deleteSale,
};
