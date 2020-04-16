const Discord = require('discord.js');

const commands = require('./commands');
const { token } = require('./config/auth.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
  const message = msg.content;

  if (message.startsWith('.')) {
    const messageSplitted = message.substr(1).split(' ');
    commands.resolve(msg,...messageSplitted);
  }

  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(token || process.env.TOKEN);

module.exports = client;