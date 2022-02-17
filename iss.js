const request = require('request');

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org/?format=json';
  request(url, (e, res, body) => {
    if (e) {
      return callback(e, null);
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching IP.  Response: ${body}`;
      return callback(Error(msg), null);
    }
    const {ip} = JSON.parse(body);
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (e, res, body) => {
    if (e) {
      return callback(e, null);
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching coordinates.  Response: ${body}`;
      return callback(Error(msg), null);
    }
    const {latitude, longitude} = JSON.parse(body);
    return callback(null, {latitude, longitude});
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};