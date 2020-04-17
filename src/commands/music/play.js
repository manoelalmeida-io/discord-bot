const ytdl = require('ytdl-core');

const play = async ({ msg, args }) => {
  const connection = await msg.member.voice.channel.join();
  await connection.play(ytdl(args[0], { filter: 'audioonly' }));

  console.log('playing now:', args);
}

module.exports = play;