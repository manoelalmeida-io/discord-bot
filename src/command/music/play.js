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
const buttons_1 = require("../../components/music/buttons");
const music_utils_1 = require("../../utils/music-utils");
const command = {
    data: new builders_1.SlashCommandBuilder()
        .setName('play')
        .setDescription('play a music by name or url')
        .addStringOption((option) => option.setName('search')
        .setDescription('music name or url')
        .setRequired(true)),
    run: ({ client, interaction, player }) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!interaction.member.voice.channel) {
            return interaction.editReply('You need to be in a voice chat to use this command');
        }
        let search = interaction.options.getString('search');
        const queue = yield player.createQueue(interaction.guild);
        if (!queue.connection) {
            yield queue.connect(interaction.member.voice.channel);
        }
        const result = yield player.search(search !== null && search !== void 0 ? search : '', {
            requestedBy: interaction.user
        });
        if (result.tracks.length === 0) {
            return interaction.editReply("Your search give no results");
        }
        const embeds = [];
        const components = new discord_js_1.MessageActionRow();
        const song = result.tracks[0];
        if (result.playlist) {
            yield queue.addTracks((_a = result.playlist) === null || _a === void 0 ? void 0 : _a.tracks);
            embeds.push(playlistEmbed({ playlist: result.playlist }));
            components.addComponents(buttons_1.ShowQueueButton);
        }
        else {
            yield queue.addTrack(song);
        }
        if (!queue.playing) {
            yield queue.play();
        }
        return interaction.editReply({
            embeds: [...embeds, embed({ song, queue })],
            components: result.playlist ? [components] : []
        });
    })
};
const embed = ({ song, queue }) => {
    const current = queue.current == song;
    return new discord_js_1.MessageEmbed()
        .setTitle(current ? 'Now playing' : 'Added to the queue')
        .setDescription(`${song.author} - **[${song.title}](${song.url})**`)
        .setThumbnail(song.thumbnail)
        .setFooter({ text: `Duration: ${song.duration}` });
};
const playlistEmbed = ({ playlist }) => {
    const size = playlist.tracks.length;
    const duration = (0, music_utils_1.playlistDuration)({ playlist });
    return new discord_js_1.MessageEmbed()
        .setTitle(`${size} tracks added to queue`)
        .setDescription(`${playlist.author.name} - **[${playlist.title}](${playlist.url})**`)
        .setThumbnail(playlist.thumbnail)
        .setFooter({ text: `Duration: ${duration} minutes` });
};
exports.default = command;
