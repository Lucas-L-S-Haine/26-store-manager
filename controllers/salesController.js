const salesServices = require('../services/salesServices');

const insert = async (req, res, _next) => {
  try {
    const sale = req.body;
  console.log('controller', sale);
    const response = await salesServices.newSale(sale);
    return res.status(201).json(response);
  } catch (err) {
    console.error(err);
    // next(err);
    return res.status(422).send(err.message);
  }
};

module.exports = {
  insert,
};
