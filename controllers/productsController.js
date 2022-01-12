const productsServices = require('../services/productsServices');

const insert = async (req, res, _next) => {
  try {
    const product = req.body;
    const response = await productsServices.newProduct(product);
    console.log(response.ops[0]);
    return res.status(201).json(response.ops[0]);
  } catch (err) {
    console.error(err);
    // next(err);
    return res.status(422).send(err.message);
  }
};

module.exports = {
  insert,
};
