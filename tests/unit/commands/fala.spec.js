const fala = require('../../../src/commands/misc/fala');

describe('"Fala" command', () => {

  it('should call msg.channel.send', () => {
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
});