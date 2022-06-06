const commonValues = require('./common_values.js');
const axios = require('axios');

/**
 * @param {String} user - User sending the message
 */
async function isStreamerOrModerator(user) {
  let streamerAndModeratorsList = [];
  let chatters = '';

  await axios.get(`http://tmi.twitch.tv/group/user/${commonValues.twitchChannel}/chatters`)
    .then(res => {
      chatters = res.data.chatters;
      streamerAndModeratorsList = chatters.broadcaster.concat(chatters.moderators);
    })
    .catch(error => { });
  return (streamerAndModeratorsList.includes(user));
}


module.exports = {
  isStreamerOrModerator
}