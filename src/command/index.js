"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ping_1 = __importDefault(require("./misc/ping"));
const play_1 = __importDefault(require("./music/play"));
const queue_1 = __importDefault(require("./music/queue"));
const commands = new discord_js_1.Collection();
commands.set('ping', ping_1.default);
commands.set('play', play_1.default);
commands.set('queue', queue_1.default);
exports.default = commands;
