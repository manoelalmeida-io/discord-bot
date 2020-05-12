const list = [];
let channel = null;

function QueueItem(title, url, author) {
  return {
    title,
    url,
    author
  }
}

const isEmpty = function() {
  return list.length === 0;
}

const playingNow = function() {
  return list[0];
}

const flush = function() {
  list.splice(0, list.length);
}

module.exports = {
  list,
  channel,
  isEmpty,
  playingNow,
  flush,
  QueueItem
};