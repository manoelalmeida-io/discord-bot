import { SlashCommandBuilder } from '@discordjs/builders';
import { Player, Playlist, Queue, Track } from 'discord-player';
import { CacheType, Client, GuildMember, CommandInteraction, MessageEmbed, Message, MessageActionRow } from 'discord.js';
import { ShowQueueButton } from '../../components/music/buttons';
import { playlistDuration } from '../../utils/music-utils';

interface Params {
  client: Client;
  interaction: CommandInteraction<CacheType>;
  player: Player;
}

interface EmbedParams {
  song: Track;
  queue: Queue;
}

interface PlaylistEmbedParams {
  playlist: Playlist
}

const action = async ({ client, interaction, player }: Params) => {
  if (!(interaction.member as GuildMember).voice.channel) {
    return interaction.editReply('You need to be in a voice chat to use this command');
  }

  let search = interaction.options.getString('search');

  const queue = await player.createQueue(interaction.guild!);
  if (!queue.connection) {
    await queue.connect((interaction.member as GuildMember).voice.channel!);
  }

  const result = await player.search(search ?? '', {
    requestedBy: interaction.user
  });

  if (result.tracks.length === 0) {
    return interaction.editReply("Your search give no results");
  }

  const embeds = [];
  const components = new MessageActionRow();

  const song = result.tracks[0];

  if (result.playlist) {
    await queue.addTracks(result.playlist?.tracks);
    embeds.push(playlistEmbed({ playlist: result.playlist }));
    components.addComponents(ShowQueueButton);
  } else {
    await queue.addTrack(song);
  }

  if (!queue.playing) {
    await queue.play();
  }

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
  const current = queue.current == song;
  return new MessageEmbed()
      .setTitle(current ? 'Now playing' : 'Added to the queue')
      .setDescription(`${song.author} - **[${song.title}](${song.url})**`)
      .setThumbnail(song.thumbnail)
      .setFooter({ text: `Duration: ${song.duration}` });
}

const playlistEmbed = ({ playlist } : PlaylistEmbedParams) => {
  const size = playlist.tracks.length;
  const duration = playlistDuration({ playlist });

  return new MessageEmbed()
      .setTitle(`${size} tracks added to queue`)
      .setDescription(`${playlist.author.name} - **[${playlist.title}](${playlist.url})**`)
      .setThumbnail(playlist.thumbnail)
      .setFooter({ text: `Duration: ${duration} minutes` });
}

export default command;