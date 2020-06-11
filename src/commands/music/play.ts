import ytdl from 'ytdl-core';
import { Client, Message } from 'discord.js';

import embed from '../../embeds/music/play';
import { Queue, QueueItem } from '../../components/music/queue';

interface Params {
  client: Client;
  msg: Message;
  args: Array<string>
}

const play = async ({ msg, args }: Params) => {
  const url = args[0];
  const voiceChannel = msg.member?.voice.channel;

  if (!voiceChannel) {
    return;
  }

  const queue = new Queue();
  const connection = await voiceChannel.join();

  if (queue.isEmpty(voiceChannel.id)) {
    let dispatcher = connection.play(ytdl(url, { filter: 'audioonly' }));

    dispatcher.once('finish', () => {
      const queue = new Queue();
      queue.shift(voiceChannel.id);

      const current = queue.playingNow(voiceChannel.id);

      if (current) {
        next(current);
      }
    });
  }

  const videoInfo = await ytdl.getBasicInfo(url);

  msg.channel.send({ embed: embed(videoInfo.title, msg.author, queue.isEmpty(voiceChannel.id)) });

  queue.add({
    title: videoInfo.title,
    url,
    author: msg.author,
    channel: voiceChannel,
  });

  console.log('playing now:', args);
}

const next = async ({ url, channel }: QueueItem) => {

  const connection = await channel.join();
  let dispatcher = connection.play(ytdl(url, { filter: 'audioonly' }));

  dispatcher.once('finish', () => {
    const queue = new Queue();
    queue.shift(channel.id);

    const current = queue.playingNow(channel.id);

    if (current) {
      next(current);
    }
  });

  console.log('next:', url);
}

export default play;