import { SlashCommandBuilder } from "@discordjs/builders";
import { Player, useQueue } from "discord-player";
import { CacheType, Client, CommandInteraction } from "discord.js";

interface Params {
  client: Client;
  interaction: CommandInteraction<CacheType>;
  player: Player;
}

const action = async ({ client, interaction, player }: Params) => {

  const queue = useQueue(interaction.guildId!!);
  queue?.delete();

  await interaction.editReply("Bye!");
}

const command = {
  data: new SlashCommandBuilder()
      .setName("quit")
      .setDescription("Quit bot from voice channel and clear the queue"),
  run: action
}

export default command;