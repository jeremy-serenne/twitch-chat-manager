const commonValues = require('./common_values.js');
const tmi = require('tmi.js');

let options = {
  connection: {
    reconnect: true
  },
  channels: [
    commonValues.twitchChannel
  ],
  identity: {
    username: process.env['TWITCH_BOT_USERNAME'],
    password: process.env['TWITCH_OAUTH_TOKEN'] //token valid for 60 days https://dev.twitch.tv/docs/authentication
  }
}

const client = new tmi.Client(options);

// Connect the client to the server..
client.connect();


module.exports = {
  client
}