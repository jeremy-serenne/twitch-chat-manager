const moment = require('moment');
const fs = require('fs');

const botListeningTo = process.env['TWITCH_BOT_NAME_LISTENER']

function getBotData(botName, filePath, message, target) {
  let transaction = '';
  const amount = message.match(/(\d+)/)[0];
  const date = moment().format('DD/MM/YYYY HH:mm:ss');

  if (message.includes('-')) {
    transaction = '-';
  } else if (message.includes('+')) {
    transaction = '+';
  } else if (message.includes('TO')) {
    transaction = 'TO';
  } else {
    return;
  }
  var logStream = fs.createWriteStream(filePath, { flags: 'a' });
  logStream.write(`${transaction} ${amount} ${date} ${target}`);
  logStream.end('\n');
}

function channelBotListener(username, message, lastMsgAuthor) {
  if (username == botListeningTo) {
    getBotData(botListeningTo, 'stats.txt', message, lastMsgAuthor);
    console.log(`${botListeningTo} said ${message}.`);
  }
}

module.exports = {
    channelBotListener
}