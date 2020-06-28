import { User } from 'discord.js';

function embed(title: string, author: User, origin: string, position: number) {

  return {
    title: position === 1 ? 'Now playing' : `Added to queue - N°${position}`,
    fields: [
      {
        name: `from ${origin}`,
        value: `${title} - ${author.toString()}`
      }
    ]
  };
}

export default embed;