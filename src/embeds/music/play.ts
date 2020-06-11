import { User } from 'discord.js';

function embed(title: string, author: User, next: boolean) {
  return {
    title: next ? 'Now playing' : 'Added to queue',
    fields: [
      {
        name: 'from youtube',
        value: `${title} - ${author.toString()}`
      }
    ]
  };
}

export default embed;