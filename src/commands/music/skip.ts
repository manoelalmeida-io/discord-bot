import { Message } from "discord.js";

import embed from '../../embeds/music/play';
import { Link } from "../../components/music/link";
import { Queue, QueueItem } from "../../components/music/queue";

interface Params {
  msg: Message;
}

const skip = async ({ msg }: Params) => {
  const channel = msg.member?.voice.channel;

  if (!channel) {
    return;
  }

  const queue = new Queue();
  queue.shift(channel.id);

  const current = queue.playingNow(channel.id);

  if (current) {
    next(current);
    msg.channel.send({ embed: embed(current.title, current.author, current.origin, queue.size(channel.id)) });
  }
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

export default skip;