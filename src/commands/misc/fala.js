const ytdl = require('ytdl-core');

const fala = async ({ msg }) => {

  msg.channel.send(
    `Fala, ${msg.author}. Bom dia, cara.`, {tts: true}
  ); 

  const url = 'https://www.youtube.com/watch?v=3h52KJ10Bxw';

  const connection = await msg.member.voice.channel.join(); 
  await connection.play(ytdl(url, { filter: 'audioonly' }));

  console.log('playing now:', url);
}

module.exports = fala;