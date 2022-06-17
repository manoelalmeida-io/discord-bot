"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builders_1 = require("@discordjs/builders");
const discord_js_1 = require("discord.js");
const command = {
    data: new builders_1.SlashCommandBuilder()
        .setName('queue')
        .setDescription('shows and controls queue')
        .addSubcommand((subcommand) => subcommand.setName('show')
        .setDescription('shows the queue')
        .addIntegerOption((option) => option.setName('page').setDescription('page to show'))),
    run: ({ client, interaction, player }) => __awaiter(void 0, void 0, void 0, function* () {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return yield interaction.editReply('There are no songs in the queue');
        }
        if (interaction.options.getSubcommand() === 'show') {
            const totalPages = Math.ceil(queue.tracks.length / 10) || 1;
            const page = (interaction.options.getInteger('page') || 1) - 1;
            if (page > totalPages) {
                return yield interaction.editReply(`Invalid page. The queue only has ${totalPages} pages`);
            }
            const current = queue.current;
            yield interaction.editReply({
                embeds: [embed({ current, queue, page, totalPages })]
            });
        }
    })
};
const embed = ({ current, queue, page, totalPages }) => {
    const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
        return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`;
    }).join("\n");
    return new discord_js_1.MessageEmbed()
        .setDescription(`**Currently Playing**\n` +
        (current ? `\`[${current.duration}]\` ${current.title} -- <@${current.requestedBy.id}>` : 'None') +
        `\n\n**Queue**\n${queueString}`)
        .setFooter({
        text: `Page ${page + 1} of ${totalPages}`
    })
        .setThumbnail(current.thumbnail);
};
exports.default = command;
