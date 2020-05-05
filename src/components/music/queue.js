const queue = [];

const isEmpty = function() {
  return queue.length === 0;
}

const add = function(music) {
  queue.push(music);
}

const shift = function() {
  queue.shift();
}

const playingNow = function() {
  return queue[0];
}

module.exports = {
  queue,
  isEmpty,
  playingNow,
  add,
  shift
};