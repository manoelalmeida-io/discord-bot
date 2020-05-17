const embed = require('../../embeds/music/np');
const { Queue } = require('../../components/music/queue');

const np = async ({ client, msg }) => {
  const queue = new Queue();
  const playing = queue.playingNow(client.voiceChannel.id);

  msg.channel.send({ embed: embed(playing.title, playing.author) });
}

module.exports = np;