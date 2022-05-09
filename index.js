const express = require('express');
const app = express();
const moment = require('moment');

const fs = require('fs');

const axios = require('axios');

const Database = require("@replit/database");
const db = new Database();

db.list().then(keys => {console.log(keys)});

const tmi = require('tmi.js');
require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];

const botListeningTo = process.env['TWITCH_BOT_NAME_LISTENER']

const cmdAndResList = process.env['LIST_OF_CMDS'].split(';'); // format cmd:res;cmd:res

let cmdLineList = ''; // format cmd:r,es;cmd:res  
//, -> end of line
//' -> :

let cmdDict = {};

let cmdLineDict = {};

function setUpCmdLineDict() {
  cmdLineList = process.env['LIST_OF_CMDS_LINE'].split(';');
  for (var i in cmdLineList) {
    var cmdAndRes = cmdLineList[i].split(':');
    cmdLineDict[cmdAndRes[0]] = cmdAndRes[1].replace(/'/g, ':');
  }
}

setUpCmdLineDict();

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

// client.on('connect', function(connection) {
//   console.log('WebSocket Client Connected');
//   daily_message.msg1.start(client)
// });

function getBotData(botName, filePath, message) {
  let transaction = '';
  const amount = message.match(/(\d+)/)[0];
  const date = moment().format('DD/MM/YYYY HH:mm:ss');

  if (message.includes('-')) {
    transaction = '-';
  } else if (message.includes('+')) {
    transaction = '+';
  } else {
    return;
  }
  var logStream = fs.createWriteStream(filePath, {flags: 'a'});
    logStream.write(`${transaction} ${amount} ${date}`);
    logStream.end('\n');
}

client.on('message', async (channel, context, message) => {

  if (context.username == botListeningTo) {
     getBotData(botListeningTo, 'stats.txt', message);
     console.log(`${botListeningTo} said ${message}.`);
  }
  if (!message.startsWith('!')) return;


  const argsDict = {channel: channel.slice(1), context: context, args: message.slice(1).split(' ')};

  let res = await handleCmd(argsDict);
  if (res) {
    await delay(1000);
    client.say(channel, "i"); // Dodge the 30sec to wait in case of identical message error
    console.log(`${res} will be send.`);
    await delay(1500);
    console.log(`${res} was sent!`);
  }
  client.say(channel, res);

  if (context.username == process.env['TWITCH_BOT_USERNAME']) {
     console.log(`You said ${message}.`);
  }
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

/* Scheduled actions */

// async function dailyCmd() {
//   var dailyTime = new Date().getTime();
//   console.log(new Date(dailyTime).toString());
  
//   var parsedMsg = cmdLineDict['!daily'].split(',');
//   for (var i in parsedMsg) {
//     await delay(2000);
//     client.say(twitchChannel, parsedMsg[i]);
//   }
// }

// function setDailyMsg() {
//   setInterval(dailyCmd, 86400000);
//   // dailyCmd();
// }

// var currentTime = new Date().getTime();
// var time = 25200000;


// setTimeout(setDailyMsg, time-currentTime);
// console.log(new Date(currentTime).toString());



/* */

const readline = require('readline');
// const fileStream = fs.createReadStream('input.txt');

const rl = readline.createInterface({
  input: process.stdin, //or fileStream 
  output: process.stdout
});

// !cmd:nb

const start = async () =>{
  for await (const line of rl) {    
    let cmd = line.split(':')[0];
    let arg = parseInt(line.split(':')[1]);

    for (let step = 0; step < arg; step++)
      if (!cmdLineDict[cmd]) {
        console.log(`line=${cmd}`);
      } else {
      var parsedMsg = cmdLineDict[cmd].split(',');
         for (var i in parsedMsg) {
           await delay(1050);
           client.say(twitchChannel, parsedMsg[i]);
           // console.log(parsedMsg[i]);
         }
      }
   }
}

start();
