import { SlashCommandBuilder, SlashCommandStringOption } from "@discordjs/builders";

interface Command {
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">,
  run: Function
}

export default Command;