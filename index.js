require('dotenv').config();

const express = require('express');
const errorMiddleware = require('./middlewares/errorHandler');

// const productController = require('./controllers/productController');
const { productsRouter, salesRouter } = require('./routes');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use(errorMiddleware);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Application online on port ${port}.`));
