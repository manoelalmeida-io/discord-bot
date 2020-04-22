const resume = async ({ msg }) => {
  const connection = await msg.member.voice.channel.join();
  const dispatcher = connection.dispatcher;

  dispatcher.resume();

  console.log('Music resumed');
}

module.exports = resume;