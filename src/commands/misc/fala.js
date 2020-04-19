const ytdl = require('ytdl-core');

const fala = async ({ msg }) => {

  msg.channel.send(
    `Fala ${msg.author} Bom dia cara`, {tts: true}
  ); 

}

module.exports = fala;