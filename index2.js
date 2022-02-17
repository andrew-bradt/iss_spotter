const { nextISSTimesForMyLocation } = require('./iss_promised');

const logPassTimePhrase = (passTimes) => {
  for (const passTime of passTimes) {
    const {risetime, duration} = passTime;
    const risetimeUTC = new Date(0);
    risetimeUTC.setUTCSeconds(risetime);
    console.log(`Next pass at ${risetimeUTC} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(logPassTimePhrase)
  .catch(e=>console.log("It didn't work!: ", e));