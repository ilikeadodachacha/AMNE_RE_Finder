const express = require('express');
const app = express();

const port = 9090;

app.listen(port, () => {
  console.log(`Express server port ${port}`);
});

