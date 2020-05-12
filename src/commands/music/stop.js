const queue = require('../../components/music/queue');

const stop = async ({ msg }) => {
  queue.flush();

  const connection = await msg.member.voice.channel.join();
  await connection.disconnect();

  console.log('disconnecting');
}

module.exports = stop;