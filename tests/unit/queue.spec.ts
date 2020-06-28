import { Queue, QueueItem } from "../../src/components/music/queue";
import { VoiceChannel, User } from "discord.js";

describe('Create a queue', () => {
  let queue: Queue;
  let queueItem: QueueItem;
  
  beforeEach(() => {
    queue = new Queue();
    queueItem = {
      title: 'title',
      url: 'url',
      author: { username: 'author' } as User,
      channel: { id: 'channelid' } as VoiceChannel
    };
  });

  it('should verify if the list is empty', () => {
    expect(queue.isEmpty('channelid')).toBeTruthy();

    queue.add(queueItem);
    expect(queue.isEmpty('channelid')).toBeFalsy();

    queue.flush('channelid');
    expect(queue.isEmpty('channelid')).toBeTruthy();
  });

  it('should create a unique queue', () => {
    queue.add(queueItem);
    const otherQueue = new Queue();
    expect(queue).toEqual(otherQueue);
  });

  it('should add a new item', () => {
    queue.add(queueItem);
    expect(queue.playingNow('channelid')).toEqual(queueItem);
  });

  it('should remove the first item of the channel list', () => {
    queue.flush('channelid');
    expect(queue.shift('channelid')).toBe(undefined);

    queue.add(queueItem);
    queue.add({
      title: 'otherTitle',
      url: 'url',
      author: { username: 'author' } as User,
      channel: { id: 'channelid' } as VoiceChannel
    });

    expect(queue.playingNow('channelid')?.title).toBe('title');

    queue.shift('channelid');
    expect(queue.playingNow('channelid')?.title).toBe('otherTitle');
  });

  it('should flush all items', () => {
    expect(queue.flush('channelid')).toBe(undefined);

    queue.add(queueItem);
    queue.flush('channelid');
    expect(queue.playingNow('channelid')).toEqual(undefined);
  });

  it('should get the current item', () => {
    expect(queue.playingNow('channelid')).toBe(undefined);

    const first = { 
      title: 'firstItem', 
      url: 'url', 
      author: { username: 'author'} as User, 
      channel: { id: 'channelid' } as VoiceChannel
    };

    const second = { 
      title: 'secondItem', 
      url: 'url', 
      author: { username: 'author'} as User, 
      channel: { id: 'channelid' } as VoiceChannel
    };

    queue.add(first);
    queue.add(second);
    expect(queue.playingNow('channelid')).toBe(first);

    queue.shift('channelid');
    expect(queue.playingNow('channelid')).toBe(second);
  });
});