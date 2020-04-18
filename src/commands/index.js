const play = require('./music/play');
const stop = require('./music/stop');
const fala = require('./misc/fala');

const acceptedCommands = {
  play,
  stop,
  fala
}

const resolve = (msg, command, ...args) => {
  const action = acceptedCommands[command];
  
  if (action) {
    action({ msg, args });
  }else{
    msg.reply('tá errado irmão');
  }
}

module.exports = { resolve };