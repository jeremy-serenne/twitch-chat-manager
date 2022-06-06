const timeHandler = require('./time_functions.js');
const clientHandler = require('./twitch_client_handler.js');
const commonValues = require('./common_values.js');
const client = clientHandler.client;

const readline = require('readline');

let cmdLineDict = {};

function setUpCmdLineDict() {
  for (var i in commonValues.cmdLineList) {
    var cmdAndRes = commonValues.cmdLineList[i].split(':');
    cmdLineDict[cmdAndRes[0]] = cmdAndRes[1].replace(/'/g, ':');
  }
}

const rl = readline.createInterface({
  input: process.stdin, //or fileStream 
  output: process.stdout
});

const consoleListener = async () => {
  for await (const line of rl) {
    let cmd = line.split(':')[0];
    let arg = parseInt(line.split(':')[1]);

    for (let step = 0; step < arg; step++)
      if (!cmdLineDict[cmd]) {
        console.log(`line=${cmd}`);
      } else {
        var parsedMsg = cmdLineDict[cmd].split(',');
        for (var i in parsedMsg) {
          await timeHandler.delay(1100);
          client.say(commonValues.twitchChannel, parsedMsg[i]);
        }
      }
  }
}

// type !cmd:nb in the console
// cmd -> command's name
// nb -> number of occurrences

module.exports = {
  setUpCmdLineDict,
  consoleListener
}