const play = require('../music/play');

function embed(title, author) {
  return play(title, author, true);
}

module.exports = embed;