const embed = require('../../embeds/music/pause');

const pause = async ({ msg }) => {
  const connection = await msg.member.voice.channel.join();
  const dispatcher = connection.dispatcher;

  await dispatcher.pause();
  msg.channel.send({ embed: embed(msg.author) });

  console.log('Music paused');
}

module.exports = pause;