const express = require('express');
const app = express();

const axios = require('axios');

const Database = require("@replit/database");
const db = new Database();

db.list().then(keys => {console.log(keys)});

const tmi = require('tmi.js');
require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];

const cmdAndResList = process.env['LIST_OF_CMDS'].split(';'); // format cmd:res;cmd:res

let cmdDict = {};

async function setUpDB() {
  for (var i in cmdAndResList) {
    var cmdAndRes = cmdAndResList[i].split(':');
    cmdDict[cmdAndRes[0]] = cmdAndRes[1];
  }
  
  for (var cmd in cmdDict) {
    await db.get(`nb_${cmd}s_${twitchChannel}`).then(value => {
      if (!value)
        db.set(`nb_${cmd}s_${twitchChannel}`, 0).then(() => {});
    });
  }
}

setUpDB(); // check DB

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
    client.say(channel, "Prayge i"); // Dodge the 30sec to wait in case of identical message error
    await delay(5000);
  }
  client.say(channel, res);
});

/**
 * @param {Object} argsDict - Dict with all usefull arguments
 */
async function handleCmd(argsDict) {
  const command = argsDict['args'].shift().toLowerCase();
  let res = '';

  if (argsDict['channel'] != twitchChannel || !(await isStreamerOrModerator(argsDict['context'].username))) {
    return (res);
  }
  
  console.log(`${argsDict['context'].username}:${command}`);

  res = returnResFromCmd(command);

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

/* returned response related to cmd */
function returnResFromCmd(command) {
  if (!cmdDict[command]) { 
    return '';
  }

  db.get(`nb_${command}s_${twitchChannel}`).then(value => {
    db.set(`nb_${command}s_${twitchChannel}`, value+1).then(() => {});
  });
  return (cmdDict[command]);
}

// TODO: put server code in a separate file, re-order the repo, add comments and add args type everywhere

async function getDatas() {
  let textResponse = '';
  for (var cmd in cmdDict) {
    await db.get(`nb_${cmd}s_${twitchChannel}`).then(value => {
      textResponse += `${value} ${cmd}s on ${twitchChannel}\'s channel since server up.
`;
    });
  }
  return textResponse;
}

app.get('/', (req, res) => {
  db.get(`nb_${Object.keys(cmdDict)[0]}s_${twitchChannel}`).then(value => {
    res.send(`${value} ${Object.keys(cmdDict)[0]}s on ${twitchChannel}\'s channel since server up.`);
  });
});

app.listen(3000, () => {
  console.log(`Server started on ${twitchChannel}`);
});
