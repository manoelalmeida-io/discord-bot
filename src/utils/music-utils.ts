import { Playlist } from "discord-player"

interface PlaylistDurationParams {
  playlist: Playlist;
}

interface MillisecondsToMinutesParams {
  ms: number;
}

export const playlistDuration = ({ playlist } : PlaylistDurationParams) => {
  const ms = playlist.tracks.reduce((prev, next) => prev + Number(next.durationMS), 0);
  return millisecondsToMinutes({ ms });
}

export const millisecondsToMinutes = ({ ms } : MillisecondsToMinutesParams) => {
  return Math.floor(ms / 60000);
}