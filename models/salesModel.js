const connection = require('./connections');

const insertSale = async (sale) => {
  console.log('model', sale);
  const newConnection = await connection();
  const saleName = await newConnection.collection('sales').insertOne(sale);
  console.log(saleName);
};

module.exports = {
  insertSale,
};
