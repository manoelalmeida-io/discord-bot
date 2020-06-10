import Discord from 'discord.js';
import token from './config';

const client = new Discord.Client();

client.on('ready', ():void => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('message', async (msg):Promise<void> => {
  const message = msg.content;

  if (message === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token());