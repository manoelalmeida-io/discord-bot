const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

const { token } = require('./config/auth.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === 'p') {
    const broadcast = await msg.member.voice.channel.join();
    broadcast.play(ytdl('https://www.youtube.com/watch?v=SCxBtaZERR4', { type: 'opus', filter: 'audioonly' }))
  }
});

client.login(token);