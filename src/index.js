const express = require('express');

const app = express();
const port = 3333;

app.get('/', (req, res) => {
  res.send('welcome');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

require('./bot');