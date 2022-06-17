"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.millisecondsToMinutes = exports.playlistDuration = void 0;
const playlistDuration = ({ playlist }) => {
    const ms = playlist.tracks.reduce((prev, next) => prev + Number(next.durationMS), 0);
    return (0, exports.millisecondsToMinutes)({ ms });
};
exports.playlistDuration = playlistDuration;
const millisecondsToMinutes = ({ ms }) => {
    return Math.floor(ms / 60000);
};
exports.millisecondsToMinutes = millisecondsToMinutes;
