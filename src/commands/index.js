const play = require('./music/play');
const stop = require('./music/stop');

const acceptedCommands = {
  play,
  stop
}

const resolve = (msg, command, ...args) => {
  const action = acceptedCommands[command];
  
  if (action) {
    action({ msg, args });
  }
}

module.exports = { resolve };