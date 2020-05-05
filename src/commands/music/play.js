const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/play');
const queue = require('../../components/music/queue');

const play = async ({ msg, args }) => {
  const connection = await msg.member.voice.channel.join();

  if (queue.isEmpty()) {
    await connection.play(ytdl(args[0], { filter: 'audioonly' }));
  }

  videoInfo = await ytdl.getBasicInfo(args[0]);

  msg.channel.send({ embed: embed(videoInfo.title, msg.author, queue.isEmpty()) });
  queue.add(args[0]);

  console.log('playing now:', args);
  console.log(queue);
}

module.exports = play;