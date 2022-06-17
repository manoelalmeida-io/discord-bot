"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowQueueButton = void 0;
const discord_js_1 = require("discord.js");
exports.ShowQueueButton = new discord_js_1.MessageButton()
    .setCustomId('show-queue')
    .setLabel('Show Queue')
    .setStyle(2 /* SECONDARY */);
