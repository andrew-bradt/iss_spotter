const { nextISSTimesForMyLocation } = require('./iss');

const logPassTimePhrase = (passTimes) => {
  for (const passTime of passTimes) {
    const {risetime, duration} = passTime;
    const risetimeUTC = new Date(0);
    risetimeUTC.setUTCSeconds(risetime);
    console.log(`Next pass at ${risetimeUTC} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work! Error fetching flyover times ", error);
  }
  logPassTimePhrase(passTimes);
});