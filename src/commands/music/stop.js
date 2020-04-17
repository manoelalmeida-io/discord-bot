const stop = async ({ msg }) => {
  const connection = await msg.member.voice.channel.join();
  await connection.disconnect();

  console.log('paused');
}

module.exports = stop;