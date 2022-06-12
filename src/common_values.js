require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];
const cmdAndResList = process.env['LIST_OF_CMDS'].split(';');
const cmdLineList = process.env['LIST_OF_CMDS_LINE'].split(';');
const username = process.env['TWITCH_BOT_USERNAME'];
let cmdDict = {};

module.exports = {
  twitchChannel,
  cmdLineList,
  cmdAndResList,
  cmdDict,
  username
}