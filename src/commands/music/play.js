const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/play');

const play = async ({ msg, args }) => {
  const connection = await msg.member.voice.channel.join();
  await connection.play(ytdl(args[0], { filter: 'audioonly' }));

  videoInfo = await ytdl.getBasicInfo(args[0]);

  msg.channel.send({ embed: embed(videoInfo.title, msg.author) });
  console.log('playing now:', args);
}

module.exports = play;