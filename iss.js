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

const fetchISSFlyOverTimes = (coords, callback) => {
  const {latitude, longitude} = coords;
  const url = `https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  request(url, (e, res, body)=>{
    if (e) {
      return callback(e, null);
    }
    if (res.statusCode !== 200) {
      const msg = `Status Code ${res.statusCode} when fetching ISS Fly Over Times.  Response ${body}`;
      return callback(Error(msg), null);
    }
    const {response: flyOverTimes} = JSON.parse(body);
    return callback(null, flyOverTimes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip)=>{
    if (error) {
      return console.log("It didn't work! Error fetching ip: ", error);
    }
    fetchCoordsByIP(ip, (error, coords)=>{
      if (error) {
        return console.log("It didn't work! Error fetching coordinates: ", error);
      }
      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};