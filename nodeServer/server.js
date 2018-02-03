require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const port = 9090;

const gMaps = {
  URL: process.env.GMAPS_URL,
  key: process.env.GMAPS_API_KEY,
};

app.listen(port, () => {
  console.log(`Express server port ${port}`);
});

app.get(/geocode/, (req, res) => {
  axios.get(`${gMaps.URL}${req.url}`, { params: { key: gMaps.key } })
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      res.end(e);
    });
});

app.get(/place/, (req, res) => {
  let agencyArr = [];
  const nearbySearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const config = {
    radius: '16000',
    type: 'real_estate_agency',
    key: gMaps.key,
  };
  
  const recordData = (data) => {
    agencyArr = agencyArr.concat(data);
  };

  const waitThenCall = async (url) => {
    await new Promise((resolve) => {
      setTimeout(() => { resolve(); }, 2000);
    });
    const gAPICall = await axios.get(url).catch(e => console.log(e));

    recordData(gAPICall.data.results);

    if (gAPICall.data.next_page_token) {
      waitThenCall(`${nearbySearchURL}?pagetoken=${gAPICall.data.next_page_token}&key=${gMaps.key}`);
    }
    return 'done';
  };

  const getAgencies = async () => {
    const initCall = await axios.get(`${gMaps.URL}${req.url}`, { params: config });
    recordData(initCall.data.results);
    if (initCall.data.next_page_token) {
      await waitThenCall(`${nearbySearchURL}?pagetoken=${initCall.data.next_page_token}&key=${gMaps.key}`);
      await new Promise((resolve) => {
        setTimeout(() => { resolve() }, 4000)
      });

      res.json(agencyArr);
    }
  };

  getAgencies();
});

app.get(/distancematrix/, (req, res) => {
  axios.get(`${gMaps.URL}${req.url}`, { params: { key: gMaps.key } })
    .then(response => res.json(response.data))
    .catch(e => res.end(e));
});