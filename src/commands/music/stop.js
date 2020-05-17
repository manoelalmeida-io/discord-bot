const { Queue } = require('../../components/music/queue');

const stop = async ({ client, msg }) => {
  const queue = new Queue();
  queue.flush(client.voiceChannel.id);

  const connection = await msg.member.voice.channel.join();
  await connection.disconnect();

  console.log('disconnecting');
}

module.exports = stop;