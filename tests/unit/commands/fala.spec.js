const fala = require('../../../src/commands/misc/fala');

describe('"Fala" command', () => {

  it('should call msg.channel.send', async () => {
    const mockSend = jest.fn();
    const msg = {
      author: 'John Doe',
      channel: {
        send: mockSend
      }
    }

    fala({ msg });
    expect(mockSend.mock.calls.length).toBe(1);
  });

  it('should handle errors sending a message', async () => {
    const mockSend = jest.fn();
    const msg = {
      author: 'John Doe',
      channel: {
        send: mockSend
      }
    }

    mockSend.mockRejectedValueOnce('error sending message');

    await fala({ msg });

    expect(mockSend.mock.calls[0]).toEqual([`Fala ${msg.author} Bom dia cara`, { tts: true }]);
    expect(mockSend.mock.calls[1]).toEqual(['Algo aconteceu :/, tente novamente mais tarde']);
  });
});