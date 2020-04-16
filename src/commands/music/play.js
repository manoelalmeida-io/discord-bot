const ytdl = require('ytdl-core');

const play = async (msg, args) => {
  console.log('tocando...', args);

  const connection = await msg.member.voice.channel.join();
  const dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly' }));
}

module.exports = play;