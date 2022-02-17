const request = require('request');

const fetchMyIP = (callback) => {
  const url = 'https://api.ipify.org/?format=json';
  request(url, (e, res, body) => {
    if (e) {
      return callback(e, null);
    } else {
      const {ip} = JSON.parse(body);
      return callback(null, ip);
    }
  });
};

module.exports = {
  fetchMyIP
};