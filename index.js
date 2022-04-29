const express = require('express');
const app = express();

const axios = require('axios');

const Database = require("@replit/database");
const db = new Database();

db.list().then(keys => {console.log(keys)});

const tmi = require('tmi.js');
require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];

db.get(`nb_raffles_${twitchChannel}`).then(value => {
  if (!value)
    db.set(`nb_raffles_${twitchChannel}`, 0).then(() => {});
});

const commands = {
  // website: {
  //   response: 'https://website'
  // },
  raffle: {
    response: cmdRaffle
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

  const argsDict = {channel: channel.slice(1), context: context, args: message.slice(1).split(' ')};

  let res = await handleCmd(argsDict);
  if (res) {
    await delay(5000);
  }
  client.say(channel, res);
});

/**
 * @param {Object} argsDict - Dict with all usefull arguments
 */
async function handleCmd(argsDict) {
  const command = argsDict['args'].shift().toLowerCase();
  const { response } = commands[command] || {};
  let res = '';

  if (argsDict['channel'] != twitchChannel || !(await isStreamerOrModerator(argsDict['context'].username))) {
    return (res);
  }
  
  console.log(`${argsDict['context'].username}:${command}`);
  
  if (typeof response === 'function') {
    res = response(argsDict);
  } else if (typeof response === 'string') {
    res = response;
  }
  return (res);
}

/**
 * @param {String} user - User sending the message
 */
async function isStreamerOrModerator(user) {
  let streamerAndModeratorsList = [];
  let chatters = '';

  await axios.get(`http://tmi.twitch.tv/group/user/${twitchChannel}/chatters`)
  .then(res => {
    chatters = res.data.chatters;
    streamerAndModeratorsList = chatters.broadcaster.concat(chatters.moderators);
  })
  .catch(error => {});
  return (streamerAndModeratorsList.includes(user));
}

/* returned response with cmd !raffle */
function cmdRaffle(argsDict) {
  db.get(`nb_raffles_${twitchChannel}`).then(value => {
    db.set(`nb_raffles_${twitchChannel}`, value+1).then(() => {});
  });
  return ('!join');
}

// TODO: put server code in a separate file, re-order the repo, add comments and add args type everywhere

app.get('/', (req, res) => {
  db.get(`nb_raffles_${twitchChannel}`).then(value => {
    res.send(`${value} raffles on ${twitchChannel}\'s channel since server up.`);
  });
});

app.listen(3000, () => {
  console.log(`Server started on ${twitchChannel}`);
});
