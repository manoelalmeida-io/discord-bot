import { Collection } from 'discord.js';

import Command from '../interface/Command';

import ping from './misc/ping';
import play from './music/play';
import queue from './music/queue';

const commands = new Collection<string, Command>();

commands.set('ping', ping);
commands.set('play', play);
commands.set('queue', queue);

export default commands;