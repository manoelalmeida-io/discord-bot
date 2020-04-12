const ytdl = require('ytdl-core');

const play = async (msg, args) => {
  console.log('tocando...', args);

  const broadcast = await msg.member.voice.channel.join();
  broadcast.play(ytdl(args[0], { filter: 'audioonly' }));
}

module.exports = play;