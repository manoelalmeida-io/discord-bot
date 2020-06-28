import { User, VoiceChannel, Snowflake } from 'discord.js';

export interface QueueItem {
  title: string;
  url: string;
  author: User;
  channel: VoiceChannel;
}

export class Queue {
  private static instance: Queue;
  private all: Map<Snowflake, Array<QueueItem>> = Queue.instance?.all;

  constructor() {
    if (!Queue.instance) {
      Queue.instance = this;
      this.all = new Map();
    }
    
    return Queue.instance;
  }

  isEmpty(channel: Snowflake): boolean {
    const queue = this.all.get(channel);
    return queue == undefined ? true : queue.length === 0;
  }

  add(item: QueueItem): void {
    if (!this.all.get(item.channel.id)) {
      this.all.set(item.channel.id, []);
    }

    this.all.get(item.channel.id)?.push(item);
  }

  shift(channel: Snowflake): void {
    if (this.all.get(channel)) {
      this.all.get(channel)?.shift();
    }
  }

  flush(channel: Snowflake): void {
    if (this.all.get(channel)) {
      this.all.set(channel, []);
    }
  }

  playingNow(channel: Snowflake): QueueItem | undefined {
    const items = this.all.get(channel);
    if (items) {
      return items[0];
    }
  }
}
