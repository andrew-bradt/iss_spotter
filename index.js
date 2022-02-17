const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip)=>{
//   if (error) {
//     return console.log("It didn't work!", error);
//   }
//   console.log('It worked! Returned IP: ', ip);
// });

// fetchCoordsByIP('24.55.24.45', (error, data)=>{
//   if (error) {
//     return console.log('It didn\'t work!', error);
//   }
//   console.log('It worked! coordinates: ', data);
// });

fetchISSFlyOverTimes({
  latitude: 30.4548,
  longitude: -97.7664,
  altitude: null,
  number: null
}, (err, flyOverData)=>{
  if (err) {
    return console.log("It didn't work! " , err);
  } else {
    return console.log('It worked! fly over data: ', flyOverData);
  }
});