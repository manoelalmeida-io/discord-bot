import { Message } from 'discord.js';
import embed from '../../embeds/music/pause';

interface Params {
  msg: Message;
}

const pause = async ({ msg }: Params) => {
  const connection = await msg.member?.voice.channel?.join();
  const dispatcher = connection?.dispatcher;

  if (dispatcher) {
    dispatcher.pause();
    msg.channel.send({ embed: embed() });
  
    console.log('Music paused');
  }
}

export default pause;