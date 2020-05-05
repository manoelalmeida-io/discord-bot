const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/play');
const queue = require('../../components/music/queue');

const play = async ({ msg, args }) => {
  const connection = await msg.member.voice.channel.join();

  if (queue.isEmpty()) {
    let dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly' }));

    dispatcher.once('finish', () => {
      queue.shift();
      if (!queue.isEmpty()) {
        next(queue.playingNow());
      }
    });
  }

  videoInfo = await ytdl.getBasicInfo(args[0]);

  msg.channel.send({ embed: embed(videoInfo.title, msg.author, queue.isEmpty()) });
  queue.add({ msg, args });

  console.log('playing now:', args);
}

const next = async({ msg, args }) => {
  const connection = await msg.member.voice.channel.join();
  let dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly' }));

  dispatcher.once('finish', () => {
    queue.shift();
    if (!queue.isEmpty()) {
      next(queue.playingNow());
    }
  });
}

module.exports = play;