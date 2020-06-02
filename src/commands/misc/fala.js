const fala = async ({ msg }) => {

  try {
    await msg.channel.send(
      `Fala ${msg.author} Bom dia cara`, {tts: true}
    );
  } catch (err) {
    console.log(err);
    await msg.channel.send('Algo aconteceu :/, tente novamente mais tarde');
  }
}

module.exports = fala;