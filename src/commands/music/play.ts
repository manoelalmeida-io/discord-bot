import ytdl from 'ytdl-core';
import { Client, Message, VoiceChannel } from 'discord.js';

import embed from '../../embeds/music/play';
import { Queue, QueueItem } from '../../components/music/queue';
import { Link } from '../../components/music/link';

interface Params {
  client: Client;
  msg: Message;
  args: Array<string>
}

const play = async ({ msg, args }: Params) => {
  const link = new Link();
  const queue = new Queue();

  const url = args[0];
  const channel = msg.member?.voice.channel;
  const origin = link.origin(url);

  const { title } = await link.handleLinkInfo(url);

  if (!channel) {
    return;
  }

  const position = queue.add({
    title,
    url,
    origin,
    author: msg.author,
    channel,
  });
  
  if (position == 1) {
    const current = queue.playingNow(channel.id);
    
    if (current) {
      next(current);
    }
  }

  msg.channel.send({ embed: embed(title, msg.author, origin, queue.size(channel.id)) });
}

const next = async ({ url, channel }: QueueItem) => {
  const link = new Link();
  const queue = new Queue();

  const connection = await channel.join();

  let dispatcher = link.handleLinkDispatcher(connection, url);

  dispatcher.once('finish', () => {
    queue.shift(channel.id);

    const current = queue.playingNow(channel.id);

    if (current) {
      next(current);
    }
  });

  console.log('playing now:', url);
}

export default play;