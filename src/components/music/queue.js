class Queue {

  constructor() {
    if (!Queue.instance) {
      this.all = new Map();
      Queue.instance = this;
    }

    return Queue.instance;
  }

  isEmpty(channel) {
    return !this.all.get(channel) || this.all.get(channel).length === 0;
  }

  add(item) {
    if (!this.all.get(item.channel.id)) {
      this.all.set(item.channel.id, []);
    }

    this.all.get(item.channel.id).push(item);
  }

  shift(channel) {
    if (this.all.get(channel)) {
      this.all.get(channel).shift();
    }
  }

  flush(channel) {
    if (this.all.get(channel)) {
      this.all.set(channel, []);
    }
  }

  playingNow(channel) {
    if (this.all.get(channel)) {
      return this.all.get(channel)[0];
    }
  }
}

function QueueItem(title, url, author, channel) {
  return {
    title,
    url,
    author,
    channel
  }
}

module.exports = {
  Queue,
  QueueItem
};