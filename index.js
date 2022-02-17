const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work! Error fetching flyover times ", error);
  }
  console.log(passTimes);
});

