const pause = async ({ msg }) => {
  const connection = await msg.member.voice.channel.join();
  const dispatcher = connection.dispatcher;

  dispatcher.pause();

  console.log('Music paused');
}

module.exports = pause;