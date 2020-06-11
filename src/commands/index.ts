import { Client, Message } from 'discord.js';

import play from './music/play';
import stop from './music/stop';
import pause from './music/pause';
import resume from './music/resume';
import np from './music/np';

import fala from './misc/fala';

interface AcceptedCommands {
  play?: Function;
  stop?: Function;
  pause?: Function;
  resume?: Function;
  np?: Function;
  fala?: Function;
}

const acceptedCommands: AcceptedCommands  = {
  play,
  stop,
  pause,
  resume,
  np,
  fala
}

export function resolve(msg: Message, command: string = '', ...args: Array<string>) {
  const action = acceptedCommands[command as keyof AcceptedCommands];
  
  if (action) {
    action({ msg, args });
  }else{
    msg.reply('tá errado irmão');
  }
}
