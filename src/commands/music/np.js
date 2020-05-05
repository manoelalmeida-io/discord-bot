const ytdl = require('ytdl-core');
const embed = require('../../embeds/music/np');
const queue = require('../../components/music/queue');

const np = async ({ msg }) => {
  const connection = await msg.member.voice.channel.join();

  videoInfo = await ytdl.getBasicInfo(queue.playingNow());

  msg.channel.send({ embed: embed(videoInfo.title, msg.author) });
}

module.exports = np;