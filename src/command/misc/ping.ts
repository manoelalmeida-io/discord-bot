import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, CommandInteraction } from 'discord.js';

interface Params {
  interaction: CommandInteraction<CacheType>
}

const command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  run: async ({ interaction }: Params) => {
    return interaction.editReply('Pong!');
  }
}

export default command;