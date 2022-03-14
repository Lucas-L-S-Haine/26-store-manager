const service = require('../services/salesServices');

const readOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await service.readOne(id);
    if (sale.err) {
      return res.status(404).json(sale);
    }
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

// const readOne = (req, res, next) => service
//   .readOne(req.params.id)
//   .then((sale) => res.status(200).json(sale))
//   .catch(next);

const readAll = async (req, res, next) => {
  try {
    const sales = await service.readAll();
    return res.status(200).json({ sales });
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const sale = req.body;
    const response = await service.createOne(sale);
    return res.status(200).json(response.ops[0]);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productList = req.body;
    const sale = await service.updateOne(id, productList);
    if (sale.err) {
      return res.status(422).json(sale);
    }
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await service.deleteOne(id);
    return res.status(200).json(deletedSale);
  } catch (err) {
    if (!err) {
      return res.status(333).json({ message: 'olá' });
    }
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
