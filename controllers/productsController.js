const productsServices = require('../services/productsServices');

const insert = async (req, res, _next) => {
  try {
    const product = req.body;
  console.log('controller', product);
    const response = await productsServices.newProduct(product);
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
