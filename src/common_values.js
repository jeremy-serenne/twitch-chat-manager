require('dotenv').config();

const twitchChannel = process.env['TWITCH_CHANNEL'];
const cmdAndResList = process.env['LIST_OF_CMDS'].split(';');
const cmdLineList = process.env['LIST_OF_CMDS_LINE'].split(';');
let cmdDict = {};

module.exports = {
  twitchChannel,
  cmdLineList,
  cmdAndResList,
  cmdDict
}