const { Queue, QueueItem } = require('../../src/components/music/queue');

describe('Create a queue', () => {
  let queue;
  let queueItem;
  
  beforeEach(() => {
    queue = new Queue();
    queue.all.set('channelid', undefined);
    queueItem = QueueItem(
      'title',
      'url',
      'author',
      { id: 'channelid' }
    );
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
    expect(queue.all.get('channelid')[0]).toEqual(queueItem);
  });

  it('should remove the first item of the channel list', () => {
    expect(queue.shift('channelid')).toBe(undefined);

    queue.add(queueItem);
    queue.add(QueueItem('otherTitle', 'url', 'author', { id: 'channelid' }));
    expect(queue.all.get('channelid')[0].title).toBe('title');

    queue.shift('channelid');
    expect(queue.all.get('channelid')[0].title).toBe('otherTitle');
  });

  it('should flush all items', () => {
    expect(queue.flush('channelid')).toBe(undefined);

    queue.add(queueItem);
    queue.flush('channelid');
    expect(queue.all.get('channelid')).toEqual([]);
  });

  it('should get the current item', () => {
    expect(queue.playingNow('channelid')).toBe(undefined);

    const first = QueueItem('firstItem', 'url', 'author', { id: 'channelid' });
    const second = QueueItem('secondItem', 'url', 'author', { id: 'channelid' });

    queue.add(first);
    queue.add(second);
    expect(queue.playingNow('channelid')).toBe(first);

    queue.shift('channelid');
    expect(queue.playingNow('channelid')).toBe(second);
  });
});