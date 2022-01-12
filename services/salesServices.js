const salesModel = require('../models/salesModel');

const newSale = async (sale) => {
  console.log('service', sale);
  const createdSale = await salesModel.insertSale(sale);
  console.log('service', createdSale);
  return createdSale;
};

module.exports = {
  newSale,
};
