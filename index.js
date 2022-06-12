const botListener = require('./src/bot_listener.js');
const consoleHandler = require('./src/console_handler.js');
const clientHandler = require('./src/twitch_client_handler.js');
const timeHandler = require('./src/time_functions.js');
const dbHandler = require('./src/setup_database.js');
const server = require('./src/server.js');
const commonValues = require('./src/common_values.js');
const cmdHandler = require('./src/command_handler.js');

let lastMsgAuthor = '';

consoleHandler.setUpCmdLineDict();
dbHandler.setUpDB(); // check DB

clientHandler.client.on('message', async (channel, context, message) => {

  if (channel.slice(1) != commonValues.twitchChannel) {
    return;
  }

  botListener.channelBotListener(context.username, message, lastMsgAuthor);

  lastMsgAuthor = context.username;

  if (!message.startsWith('!')) return;

  if ((new Date().getHours()) < 11) return; // shutdown script when live is offline
  
  return;//off

  const argsDict = { channel: channel.slice(1), context: context, args: message.slice(1).split(' ') };

  let res = await cmdHandler.handleCmd(argsDict);
  if (res) {
    console.log(`${res} will be send.`);
    await timeHandler.delay(4000);
    clientHandler.client.say(channel, res);
    console.log(`${res} was sent!`);

    await timeHandler.delay(2000);
    clientHandler.client.say(channel, "Prayge i"); // Dodge the 30sec to wait in case of identical message error
  }

  if (context.username == commonValues.username) {
    console.log(`You said ${message}.`);
  }

});


async function getDatas() {
  let textResponse = '';
  for (var cmd in commonValues.cmdDict) {
    await dbHandler.db.get(`nb_${cmd}s_${commonValues.twitchChannel}`).then(value => {
      textResponse += `${value} ${cmd}s on ${commonValues.twitchChannel}\'s channel since server up.
`;
    });
  }
  return textResponse;
}



server.app.listen(3000, () => {
  console.log(`Server started on ${commonValues.twitchChannel}`);
});

consoleHandler.consoleListener();
