const service = require('../services/productsServices');

const readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.readOne(id);
    if (product.err) {
      return res.status(422).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// const readOne = (req, res, next) => service
//   .readOne(req.params.id)
//   .then((product) => res.status(200).json(product))
//   .catch(next);

const readAll = async (req, res, next) => {
  try {
    const products = await service.readAll();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

const createOne = (req, res, next) => service
  .createOne(req.body)
  .then(({ ops }) => ops)
  .then(([product]) => res.status(201).json(product))
  .catch(next);

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const product = await service.updateOne(id, name, quantity);
    if (product.err) {
      return res.status(422).json(product);
    }
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await service.deleteOne(id);
    return res.status(200).json(deletedProduct);
  } catch (err) {
    const { code, message, status } = err;
    return res.status(status).json({ err: { code, message } });
  }
};

module.exports = {
  readOne,
  readAll,
  createOne,
  updateOne,
  deleteOne,
};
