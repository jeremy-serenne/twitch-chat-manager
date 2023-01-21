const dbHandler = require('../src/setup_database.js');
const commonValues = require('../src/common_values.js');

const express = require('express');
const app = express();

// serve files from the public directory
// app.use(express.static('../public')); #TODO

app.get('/', (req, res) => {
  dbHandler.db.get(`nb_${Object.keys(commonValues.cmdDict)[0]}s_${commonValues.twitchChannel}`).then(value => {
    res.send(`${value} ${Object.keys(commonValues.cmdDict)[0]}s on ${commonValues.twitchChannel}\'s channel since server up.`);
  });
});

// serve the homepage
// app.get('/', (req, res) => {
//   res.sendFile('/home/runner/viewer-twitch-bot/public/index.html');
// }); #TODO

// app.post('/clicked', (req, res) => {
//   const click = {clickTime: new Date()};
//   console.log(click); #TODO

  // db.collection('clicks').save(click, (err, result) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('click added to db');
  //   res.sendStatus(201);
  // });
// });

module.exports = {
  app
}