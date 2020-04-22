const play = require('./music/play');
const stop = require('./music/stop');
const pause = require('./music/pause');
const resume = require('./music/resume');

const fala = require('./misc/fala');

const acceptedCommands = {
  play,
  stop,
  pause,
  resume,
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