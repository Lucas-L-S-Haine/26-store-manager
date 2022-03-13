const { Router } = require('express');
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

const router = Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);

module.exports = router;
