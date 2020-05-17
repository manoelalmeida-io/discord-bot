const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/play');
const { Queue, QueueItem } = require('../../components/music/queue');

const play = async ({ client, msg, args }) => {
  const url = args[0];

  const queue = new Queue();
  const connection = await msg.member.voice.channel.join();

  client.voiceChannel = msg.member.voice.channel;

  if (queue.isEmpty(msg.member.voice.channel.id)) {
    let dispatcher = await connection.play(ytdl(url, { filter: 'audioonly' }));

    dispatcher.once('finish', () => {
      queue.shift(client.voiceChannel.id);
      if (!queue.isEmpty(client.voiceChannel.id)) {
        next(queue.playingNow(client.voiceChannel.id));
      }
    });
  }

  const videoInfo = await ytdl.getBasicInfo(url);

  msg.channel.send({ embed: embed(videoInfo.title, msg.author, queue.isEmpty(msg.member.voice.channel.id)) });

  queue.add(QueueItem(
    videoInfo.title,
    url,
    msg.author,
    msg.member.voice.channel
  ));

  console.log('playing now:', args);
}

const next = async(music) => {
  const { url } = music;

  const connection = await music.channel.join();
  let dispatcher = await connection.play(ytdl(url, { filter: 'audioonly' }));

  dispatcher.once('finish', () => {
    queue.shift(client.voiceChannel.id);
    if (!queue.isEmpty(client.voiceChannel.id)) {
      next(queue.playingNow(client.voiceChannel.id));
    }
  });

  console.log('next:', url);
}

module.exports = play;