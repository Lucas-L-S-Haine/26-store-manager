require('dotenv').config();
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
