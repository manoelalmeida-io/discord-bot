import { Client, Intents } from 'discord.js';
import { Player } from 'discord-player';
import dotenv from 'dotenv';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import commands from './command';

// dotenv.config({ path: '.env.development.local' });

const TOKEN = process.env.TOKEN;

const CLIENT_ID = '474933203678003201';
const GUILD_ID = '467073140804157462';

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });
const player = new Player(client, {
  ytdlOptions: {
    quality: 'highestaudio',
    highWaterMark: 1 << 25
  }
});

const rest = new REST({ version: '9' }).setToken(TOKEN!);

(async () => {
  try {
    console.log('Loading application (/) commands.');

    const slashCommands = commands.map(command => command.data);

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: slashCommands });

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

  const command = commands.get(interaction.commandName);

  if (!command) {
    interaction.reply(`Command '${interaction.commandName}' is not a valid command`);
  }

  await interaction.deferReply();
  await command?.run({ client, interaction, player });
});

client.login(TOKEN);
