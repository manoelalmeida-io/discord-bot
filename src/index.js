const express = require('express');

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('oi');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});