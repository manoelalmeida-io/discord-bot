const Discord = require('discord.js');

const commands = require('./commands');

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

if (process.env.TOKEN) {
	client.login(process.env.TOKEN);
}
else {
	const { token } = require('./config/auth.json');
	client.login(token);
}