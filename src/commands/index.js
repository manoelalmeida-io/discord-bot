const play = require('./music/play');

const acceptedCommands = {
  play,
}

const resolve = (msg, command, ...args) => {
  const action = acceptedCommands[command];
  
  if (action) {
    action(msg, args);
  }
}

module.exports = { resolve };