import { Client, Intents } from 'discord.js';
import dotenv from 'dotenv';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

dotenv.config({ path: '.env.development.local' });

const TOKEN = process.env.TOKEN;

const CLIENT_ID = '474933203678003201';
const GUILD_ID = '467073140804157462';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const commands = [
  {
    name: 'ping',
    description: 'Replies with pong'
  }
];

const rest = new REST({ version: '9' }).setToken(TOKEN!);

(async () => {
  try {
    console.log('Loading application (/) commands.');

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

    console.log('Successfully loaded application (/) commands.');
  } catch (error) {
    console.log(error);
  }
})();

client.on('ready', (): void => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(TOKEN);
