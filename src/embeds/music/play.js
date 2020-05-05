function embed(title, author, next) {
  return {
    title: next ? 'Now playing' : 'Added to queue',
    fields: [
      {
        name: 'from youtube',
        value: `${title} - ${author}`
      }
    ]
  };
}

module.exports = embed;