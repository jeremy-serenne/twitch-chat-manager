const commonValues = require('./common_values.js');

const Database = require("@replit/database");

const db = new Database();

db.list().then(keys => { console.log(keys) });

async function setUpDB() {
  for (var i in commonValues.cmdAndResList) {
    var cmdAndRes = commonValues.cmdAndResList[i].split(':');
    commonValues.cmdDict[cmdAndRes[0]] = cmdAndRes[1];
  }

  for (var cmd in commonValues.cmdDict) {
    await db.get(`nb_${cmd}s_${commonValues.twitchChannel}`).then(value => {
      if (!value)
        db.set(`nb_${cmd}s_${commonValues.twitchChannel}`, 0).then(() => { });
    });
  }
}

module.exports = {
  setUpDB,
  db
}