import { Message } from 'discord.js';

import embed from '../../embeds/music/np';
import { Queue } from '../../components/music/queue';

interface Params {
  msg: Message;
}

const np = async ({ msg }: Params) => {
  const queue = new Queue();
  const voiceChannel = msg.member?.voice.channel;

  if (voiceChannel) {
    const playing = queue.playingNow(voiceChannel.id);

    if (playing) {
      msg.channel.send({ embed: embed(playing.title, playing.author, playing.origin) });
    }
  }
}

export default np;