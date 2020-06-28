import { Message, TextChannel, User } from 'discord.js';
import { mock, instance, when, verify, anyString, anything } from 'ts-mockito';
import fala from '../../../src/commands/misc/fala';

jest.mock('discord.js');

describe('"Fala" command', () => {

  it('should call msg.channel.send', async () => {
    const userMock: User = mock(User);
    const messageMock: Message = mock(Message);
    const channelMock: TextChannel = mock(TextChannel);
    
    let user = { toString: () => 'John' } as User;
    let msg = instance(messageMock);
    let channel = instance(channelMock);

    msg.author = user;
    msg.channel = channel;

    await fala({ msg });
    verify(channelMock.send(anything(), anything())).once();
  });

  it('should handle errors sending a message', async () => {
    const userMock: User = mock(User);
    const messageMock: Message = mock(Message);
    const channelMock: TextChannel = mock(TextChannel);
    
    let user = instance(userMock);
    let msg = instance(messageMock);
    let channel = instance(channelMock);

    msg.author = user;
    msg.channel = channel;

    await fala({ msg });

    verify(channelMock.send('Algo aconteceu :/, tente novamente mais tarde')).once();
  });
});