import { User } from 'discord.js'; 
import play from './play';

function embed(title: string, author: User) {
  return play(title, author, true);
}

export default embed;