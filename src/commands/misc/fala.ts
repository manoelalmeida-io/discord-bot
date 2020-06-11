import { Message } from 'discord.js';

interface Params {
  msg: Message;
}

const fala = async ({ msg }: Params) => {

  try {
    await msg.channel.send(
      `Fala ${msg.author.toString()} Bom dia cara`, {tts: true}
    );
  } catch (err) {
    console.log(err);
    await msg.channel.send('Algo aconteceu :/, tente novamente mais tarde');
  }
}

export default fala;