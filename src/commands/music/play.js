const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/play');
const queue = require('../../components/music/queue');

const play = async ({ msg, args }) => {
  const url = args[0];

  try {
    const connection = await msg.member.voice.channel.join();
  
    if (msg.member.voice.channel !== queue.channel) {
      queue.flush();
      queue.channel = msg.member.voice.channel;
    }
  
    if (queue.isEmpty()) {
      let dispatcher = await connection.play(ytdl(url, { filter: 'audioonly' }));
  
      dispatcher.once('finish', () => {
        queue.list.shift();
        if (!queue.isEmpty()) {
          next(queue.playingNow());
        }
      });
    }
  
    videoInfo = await ytdl.getBasicInfo(url);
  
    msg.channel.send({ embed: embed(videoInfo.title, msg.author, queue.isEmpty()) });
    queue.list.push(queue.QueueItem(videoInfo.title, url, msg.author));
  
    console.log('playing now:', args);
  } catch (err) {
    console.log(err);
    queue.flush();
  }
}

const next = async(music) => {
  const { url } = music;

  try {
    const connection = await queue.channel.join();
    let dispatcher = await connection.play(ytdl(url, { filter: 'audioonly' }));
  
    dispatcher.once('finish', () => {
      queue.list.shift();
      if (!queue.isEmpty()) {
        next(queue.playingNow());
      }
    });
  
    console.log('next:', url);
  } catch (err) {
    console.log(err);
    queue.flush();
  }
}

module.exports = play;