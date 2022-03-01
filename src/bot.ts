import Discord from 'discord.js';
import dotenv from 'dotenv';

import * as commands from './commands';

dotenv.config({ path: '.env.development.local' });

const token = process.env.TOKEN;
const client = new Discord.Client();

client.on('ready', ():void => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', async (msg: Discord.Message):Promise<void> => {
  const message = msg.content;

  if (message.startsWith('.')) {
    const args: Array<string> = message.substr(1).split(' ');
    const command = args.shift();

    commands.resolve(msg, command, ...args);
  }

  if (message === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token);
