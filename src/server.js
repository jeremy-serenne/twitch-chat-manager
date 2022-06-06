const dbHandler = require('./setup_database.js');
const commonValues = require('./common_values.js');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  dbHandler.db.get(`nb_${Object.keys(commonValues.cmdDict)[0]}s_${commonValues.twitchChannel}`).then(value => {
    res.send(`${value} ${Object.keys(commonValues.cmdDict)[0]}s on ${commonValues.twitchChannel}\'s channel since server up.`);
  });
});

module.exports = {
  app
}