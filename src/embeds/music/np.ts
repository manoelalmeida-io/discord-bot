import { User } from 'discord.js'; 
import play from './play';

function embed(title: string, author: User, origin: string) {
  return play(title, author, origin, 1);
}

export default embed;