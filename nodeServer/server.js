require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const port = 9090;

app.listen(port, () => {
  console.log(`Express server port ${port}`);
});

app.get(/geocode/, (req, res) => {
  axios.get(`${process.env.GMAPS_URL}${req.url}`, { params: { key: process.env.GMAPS_API_KEY } })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      res.end(e);
    });
});

