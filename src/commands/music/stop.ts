import { Message } from 'discord.js';
import { Queue } from '../../components/music/queue';

interface Params {
  msg: Message;
}

const stop = async ({ msg }: Params) => {
  const queue = new Queue();
  const voiceChannel = msg.member?.voice.channel;

  if (voiceChannel) { 
    queue.flush(voiceChannel.id);
  
    const connection = await voiceChannel.join();
    connection.disconnect();
  
    console.log('disconnecting');
  }
}

export default stop;