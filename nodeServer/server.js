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
  // let pageToken = '';
  // const nearbySearchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const config = {
    radius: '16000',
    type: 'real_estate_agency',
    key: gMaps.key,
  };
  
  // const getAgencies = async (url) => {
  //   const agencies = await axios.get(url);
  //   return agencies;
  // };

  const recordData = (data) => {
    agencyArr = agencyArr.concat(data.results);
    if (data.next_page_token) {
      return data.next_page_token;
    }
    return 'end';
  };

  axios.get(`${gMaps.URL}${req.url}`, { params: config })
    .then((response) => {
      recordData(response.data);
      res.json(agencyArr);
    })
    .catch(e => res.end(e));
});

app.get(/distancematrix/, (req, res) => {
  axios.get(`${gMaps.URL}${req.url}`, { params: { key: gMaps.key } })
    .then(response => res.json(response.data))
    .catch(e => res.end(e));
});