import { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Player, Playlist, GuildQueue, Track, useQueue } from 'discord-player';
import { CacheType, Client, GuildMember, CommandInteraction, EmbedBuilder, CommandInteractionOptionResolver } from 'discord.js';
import { ShowQueueButton } from '../../components/music/buttons';
import { playlistDuration } from '../../utils/music-utils';

interface Params {
  client: Client;
  interaction: CommandInteraction<CacheType>;
  player: Player;
}

interface EmbedParams {
  song: Track;
  queue: GuildQueue;
}

interface PlaylistEmbedParams {
  playlist: Playlist
}

const action = async ({ client, interaction, player }: Params) => {
  if (!(interaction.member as GuildMember).voice.channel) {
    return interaction.editReply('You need to be in a voice chat to use this command');
  }

  let search = (interaction.options as CommandInteractionOptionResolver).getString('search');

  const result = await player.search(search ?? '', {
    requestedBy: interaction.user
  });

  if (result.tracks.length === 0) {
    return interaction.editReply("Your search give no results");
  }

  const embeds: any[] = [];
  const components = new ActionRowBuilder<ButtonBuilder>().addComponents(ShowQueueButton);

  const song = result.tracks[0];

  if (result.playlist) {
    embeds.push(playlistEmbed({ playlist: result.playlist }));
  }

  await player.play((interaction.member as GuildMember).voice.channel!, result)

  const queue = useQueue(interaction.guild?.id!)!;

  return interaction.editReply({
    embeds: [...embeds, embed({ song, queue })],
    components: result.playlist ? [components] : []
  });
}

const command = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a music by name or url')
    .addStringOption((option) => option.setName('search')
        .setDescription('Music name or url')
        .setRequired(true)),
  run: action
}

const embed = ({ song, queue } : EmbedParams) => {
  const current = queue.currentTrack == song;
  return new EmbedBuilder()
      .setTitle(current ? 'Now playing' : 'Added to the queue')
      .setDescription(`${song.author} - **[${song.title}](${song.url})**`)
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
}

const playlistEmbed = ({ playlist } : PlaylistEmbedParams) => {
  const size = playlist.tracks.length;
  const duration = playlistDuration({ playlist });

  return new EmbedBuilder()
      .setTitle(`${size} tracks added to queue`)
      .setDescription(`${playlist.author.name} - **[${playlist.title}](${playlist.url})**`)
      .setThumbnail(playlist.thumbnail)
      .setFooter({ text: `Duration: ${duration} minutes` });
}

export default command;