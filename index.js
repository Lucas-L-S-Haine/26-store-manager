const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Application online on port ${port}.`));
