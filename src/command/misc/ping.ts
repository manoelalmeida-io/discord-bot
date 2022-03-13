import { SlashCommandBuilder } from '@discordjs/builders';
import { CacheType, BaseCommandInteraction } from 'discord.js';

interface Params {
  interaction: BaseCommandInteraction<CacheType>
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