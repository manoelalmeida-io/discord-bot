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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_player_1 = require("discord-player");
const dotenv_1 = __importDefault(require("dotenv"));
const rest_1 = require("@discordjs/rest");
const v9_1 = require("discord-api-types/v9");
const command_1 = __importDefault(require("./command"));
dotenv_1.default.config({ path: '.env.development.local' });
const TOKEN = process.env.TOKEN;
const CLIENT_ID = '474933203678003201';
const GUILD_ID = '467073140804157462';
const client = new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES] });
const player = new discord_player_1.Player(client, {
    ytdlOptions: {
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    }
});
const rest = new rest_1.REST({ version: '9' }).setToken(TOKEN);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Loading application (/) commands.');
        const slashCommands = command_1.default.map(command => command.data);
        yield rest.put(v9_1.Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: slashCommands });
        console.log('Successfully loaded application (/) commands.');
    }
    catch (error) {
        console.log(error);
    }
}))();
client.on('ready', () => {
    var _a;
    console.log(`Logged in as ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag}!`);
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const command = command_1.default.get(interaction.commandName);
    if (!command) {
        interaction.reply(`Command '${interaction.commandName}' is not a valid command`);
    }
    yield interaction.deferReply();
    yield (command === null || command === void 0 ? void 0 : command.run({ client, interaction, player }));
}));
client.login(TOKEN);
