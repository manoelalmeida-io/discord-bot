import { MessageButton } from "discord.js";
import { MessageButtonStyles } from "discord.js/typings/enums";

export const ShowQueueButton = new MessageButton()
    .setCustomId('show-queue')
    .setLabel('Show Queue')
    .setStyle(MessageButtonStyles.SECONDARY);