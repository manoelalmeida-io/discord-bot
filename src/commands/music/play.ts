import { Client, Message } from 'discord.js';

import embed from '../../embeds/music/play';
import { Queue, QueueItem } from '../../components/music/queue';
import { Link } from '../../components/music/link';
import { Search } from '../../components/music/search';

interface Params {
  client: Client;
  msg: Message;
  args: Array<string>
}

const play = async ({ msg, args }: Params) => {
  const link = new Link();
  const search = new Search();
  const queue = new Queue();

  const url = link.isLink(args[0]) 
      ? args[0]
      : await search.findLinkBySearch(args.join(' '));

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