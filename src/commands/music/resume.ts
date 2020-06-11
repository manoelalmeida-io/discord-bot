import { Message } from 'discord.js';

interface Params {
  msg: Message;
}

const resume = async ({ msg }: Params) => {
  const connection = await msg.member?.voice.channel?.join();
  const dispatcher = connection?.dispatcher;

  if (dispatcher) {
    dispatcher?.resume();
    console.log('Music resumed');
  }
}

export default resume;