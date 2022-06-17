import { SlashCommandBuilder } from "@discordjs/builders";
import { Player, Queue, Track } from "discord-player";
import { CacheType, Client, CommandInteraction, MessageEmbed } from "discord.js";

interface Params {
  client: Client;
  interaction: CommandInteraction<CacheType>;
  player: Player;
}

interface EmbedParams {
  current: Track;
  queue: Queue;
  page: number;
  totalPages: number;
}

const command = {
  data: new SlashCommandBuilder()
      .setName('queue')
      .setDescription('shows and controls queue')
      .addSubcommand((subcommand) => subcommand.setName('show')
          .setDescription('shows the queue')
          .addIntegerOption((option) => option.setName('page').setDescription('page to show'))),
  run: async ({ client, interaction, player }: Params) => {
    const queue = player.getQueue(interaction.guildId!!);
    if (!queue || !queue.playing) {
      return await interaction.editReply('There are no songs in the queue');
    }

    if (interaction.options.getSubcommand() === 'show') {
      const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
      const page = (interaction.options.getInteger('page') || 1) - 1;

      if (page > totalPages) {
        return await interaction.editReply(`Invalid page. The queue only has ${totalPages} pages`);
      }

      const current = queue.current;

      await interaction.editReply({
        embeds: [embed({ current, queue, page, totalPages })]
      });
    }
  }
}

const embed = ({ current, queue, page, totalPages } : EmbedParams) => {

  const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
    return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
  }).join("\n")

  return new MessageEmbed()
      .setDescription(`**Currently Playing**\n` +
      (current ? `\`[${current.duration}]\` ${current.title} -- <@${current.requestedBy.id}>` : 'None') + 
      `\n\n**Queue**\n${queueString}`
      )
      .setFooter({
        text: `Page ${page + 1} of ${totalPages}`
      })
      .setThumbnail(current.thumbnail);
}

export default command;