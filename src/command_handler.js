const twitchHandler = require('./twitch_api_handler.js');
const commonValues = require('./common_values.js');
const dbHandler = require('./setup_database.js');

/**
 * @param {Object} argsDict - Dict with all usefull arguments
 */
async function handleCmd(argsDict) {
  const command = argsDict['args'].shift().toLowerCase();
  let res = '';

  if (argsDict['channel'] != commonValues.twitchChannel || !(await twitchHandler.isStreamerOrModerator(argsDict['context'].username))) {
    return (res);
  }

  console.log(`${argsDict['context'].username}:${command}`);

  res = returnResFromCmd(command);

  return (res);
}

/* returned response related to cmd */
function returnResFromCmd(command) {
  if (!commonValues.cmdDict[command]) {
    return '';
  }

  dbHandler.db.get(`nb_${command}s_${commonValues.twitchChannel}`).then(value => {
    dbHandler.db.set(`nb_${command}s_${commonValues.twitchChannel}`, value + 1).then(() => { });
  });
  return (commonValues.cmdDict[command]);
}

module.exports = {
    handleCmd
}