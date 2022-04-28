const express = require('express');
const app = express();

const tmi = require('tmi.js');
require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];

const commands = {
  // website: {
  //   response: '!join'
  // }
  raffle: {
    response: autoJoinRaffle
  }
}

let options = {
  connection: {
    reconnect: true
  },
  channels: [
    twitchChannel
  ],
  identity: {
    username: process.env['TWITCH_BOT_USERNAME'],
    password: process.env['TWITCH_OAUTH_TOKEN']
  }
}
  
const client = new tmi.Client(options);
const delay = ms => new Promise(res => setTimeout(res, ms));

// Connect the client to the server..
client.connect();

client.on('message', async (channel, context, message) => {
  if (!message.startsWith('!')) return;

  const args = message.slice(1).split(' ');
	const command = args.shift().toLowerCase();

  const argList = {channel: channel.slice(1), context: context, args: args}
  
  const { response } = commands[command] || {};

  if ( typeof response === 'function' ) {
    res = response(argList)
    if (res)
      await delay(5000);
    client.say(channel, res);
  } else if ( typeof response === 'string' ) {
    client.say(channel, response);
  }
});

/* Join when streamer !raffle*/
function autoJoinRaffle(argList) {
  const channel = argList['channel'];
  console.log(argList['context'].username)

  if (channel == twitchChannel && argList['context'].username == twitchChannel) {
    console.log('I will join.');

    return ('!join');
  }
  console.log('Fake raffle.');

  return ('')
}

app.get('/', (req, res) => {
  res.send('Waiting...')
});

app.listen(3000, () => {
  console.log(`Server started on ${twitchChannel}`);
});
