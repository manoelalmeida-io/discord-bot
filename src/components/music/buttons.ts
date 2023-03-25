import { ButtonBuilder, ButtonStyle } from "discord.js";

export const ShowQueueButton = new ButtonBuilder()
    .setCustomId('show-queue')
    .setLabel('Show Queue')
    .setStyle(ButtonStyle.Secondary);