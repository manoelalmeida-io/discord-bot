function embed(title, author) {
  return {
    title: 'Now playing',
    fields: [
      {
        name: 'from youtube',
        value: `${title} - ${author}`
      }
    ]
  };
}

module.exports = embed;