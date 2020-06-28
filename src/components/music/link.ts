import ytdl from 'ytdl-core';
import { StreamDispatcher, VoiceConnection } from "discord.js";

export class Link {
  private ytRegex = RegExp('^(http(s)?:\/\/)?((w){3}.)?(music.)?youtu(be|.be)?(\.com)?\/.+');
  private fileRegex = RegExp('([a-zA-Z0-9\s_\\.\\-\\(\):])+(.mp3|.wav)$');

  origin(link: string): string {
    if (this.ytRegex.test(link)) {
      return 'youtube';
    }
    if (this.fileRegex.test(link)) {
      return 'file';
    }

    return 'unknown';
  }

  handleLinkDispatcher(connection: VoiceConnection, url: string): StreamDispatcher {
    const origin = this.origin(url);
    
    switch(origin) {
      case 'youtube':
        return connection.play((ytdl(url, { filter: 'audioonly' })));
      case 'file':
        return connection.play(url);
      default:
        throw new Error('Cannot find the resource of the given url');
    }
  }

  async handleLinkInfo(url: string) {
    const origin = this.origin(url);

    switch(origin) {
      case 'youtube':
        const videoInfo = await ytdl.getBasicInfo(url);
        return { 
          title: videoInfo.videoDetails.title 
        };

      case 'file':
        return {
          title: url.substr(url.lastIndexOf('/') + 1)
        };

      default:
        throw new Error('Cannot find info from a unknown origin');
    }
  }
}