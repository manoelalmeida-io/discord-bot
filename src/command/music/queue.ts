import { SlashCommandBuilder } from "@discordjs/builders";
import { Player, GuildQueue, Track, useQueue } from "discord-player";
import { CacheType, Client, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder } from "discord.js";

interface Params {
  client: Client;
  interaction: CommandInteraction<CacheType>;
  player: Player;
}

interface EmbedParams {
  current: Track;
  queue: GuildQueue;
  page: number;
  totalPages: number;
}

const action = async ({ client, interaction, player }: Params) => {

  const queue = useQueue(interaction.guildId!!);

  if (!queue || !queue.isPlaying) {
    return await interaction.editReply('There are no songs in the queue');
  }

  if ((interaction.options as CommandInteractionOptionResolver).getSubcommand() === 'show') {
    const totalPages = Math.ceil(queue.tracks.size / 10) || 1;
    const page = ((interaction.options as CommandInteractionOptionResolver).getInteger('page') || 1) - 1;

    if (page > totalPages) {
      return await interaction.editReply(`Invalid page. The queue only has ${totalPages} pages`);
    }

    const current = queue.currentTrack!;

    await interaction.editReply({
      embeds: [embed({ current, queue, page, totalPages })]
    });
    
  } else if ((interaction.options as CommandInteractionOptionResolver).getSubcommand() === 'shuffle') {
    queue.tracks.shuffle();
    await interaction.editReply(`The queue of ${queue.tracks.size} songs have been shuffled!`)
  }
}

const command = {
  data: new SlashCommandBuilder()
      .setName('queue')
      .setDescription('Shows and controls queue')
      .addSubcommand((subcommand) => subcommand.setName('show')
          .setDescription('Shows the queue')
          .addIntegerOption((option) => option.setName('page').setDescription('page to show')))
      .addSubcommand((subcommand) => subcommand.setName('shuffle')
          .setDescription('Shuffles the queue')),
  run: action
}

const embed = ({ current, queue, page, totalPages } : EmbedParams) => {

  const queueString = queue.tracks.data.slice(page * 10, page * 10 + 10).map((song, i) => {
    return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy?.id}>`;
  }).join("\n")

  return new EmbedBuilder()
      .setDescription(`**Currently Playing**\n` +
      (current ? `\`[${current.duration}]\` ${current.title} -- <@${current.requestedBy?.id}>` : 'None') + 
      `\n\n**Queue**\n${queueString}`
      )
      .setFooter({
        text: `Page ${page + 1} of ${totalPages}`
      })
      .setThumbnail(current.thumbnail);
}

export default command;