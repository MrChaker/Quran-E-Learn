import axios from 'axios';
import express from 'express';
const meetingsRoute = express.Router();

const config = {
  METERED_DOMAIN: process.env.METERED_DOMAIN || '',
  METERED_SECRET_KEY: process.env.METERED_SECRET_KEY || '',
};

if (!config.METERED_DOMAIN || !config.METERED_SECRET_KEY) {
  console.log('err metered domain');
}

meetingsRoute.get('/validate-meeting', (req, res) => {
  let options: any = {
    method: 'GET',
    url:
      'https://' +
      config.METERED_DOMAIN +
      '/api/v1/room/' +
      req.query.meetingId,
    params: {
      secretKey: config.METERED_SECRET_KEY,
    },
    headers: {
      Accept: 'application/json',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send({
        success: true,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.send({
        success: false,
      });
    });
});

meetingsRoute.post('/create-meeting-room', (req, res) => {
  var options: any = {
    method: 'POST',
    url: 'https://' + config.METERED_DOMAIN + '/api/v1/room/',
    params: {
      secretKey: config.METERED_SECRET_KEY,
    },
    headers: {
      Accept: 'application/json',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.send({
        success: true,
        ...response.data,
      });
    })
    .catch(function (error) {
      console.error(error);
      res.send({
        success: false,
      });
    });
});

meetingsRoute.get('/metered-domain', (req, res) => {
  res.send({
    domain: config.METERED_DOMAIN,
  });
});

export default meetingsRoute;
