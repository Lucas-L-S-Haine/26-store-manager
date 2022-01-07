require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/StoreManager`;
const DB_NAME = 'StoreManager';
const express = require('express');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(router);
app.listen(port, () => console.log(`Application online on port ${port}.`));
