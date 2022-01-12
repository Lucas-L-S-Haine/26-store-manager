require('dotenv').config();

const express = require('express');

// const productController = require('./controllers/productController');
const { productsRouter, salesRouter } = require('./routes');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
// app.use(router);

// app
//   .route('/products')
//   .get()
//   .post(async (req, res) => {
//     await productController.insert(req, res);
//   });
//
// app.get('/products', (_request, response) => {
  // response.status(200).send('Entrou no products');
// });

// app
//   .route('/products')
//   .get((_request, response) => {
//     response.status(200).send('Entrou no products');
//   })
//   .post(productController.insert);

app.listen(port, () => console.log(`Application online on port ${port}.`));
