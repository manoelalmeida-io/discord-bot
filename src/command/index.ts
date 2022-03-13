import { Collection } from 'discord.js';

import Command from '../interface/Command';

import ping from './misc/ping';

import play from './music/play';

const commands = new Collection<string, Command>();

commands.set('ping', ping);
commands.set('play', play);

export default commands;