const express = require('express');

const app = express();

const port = 9090;

app.listen(port, () => {
  console.log(`Express server port ${port}`);
});

app.get(/geocode/, (req, res) => {
  console.log(req.url, 'hit');
  res.end('proxy return');
});

