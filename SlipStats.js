const { default: SlippiGame } = require('slp-parser-js'); //require the slp-parser-js module
var fs = require('fs'); //require the file system module

module.exports = {
    // get stats and metadata from a slippi replay
    loadReplay: function(path) {
        const game = new SlippiGame(path);
        const stats = game.getStats();
        const metadata = game.getMetadata();
        return [stats, metadata];
    },
    // turns frame_count into min:sec format
    convertTime: function(frame_count) {
        const duration = frame_count / 60;
        const minutes = Math.floor(duration/60);
        const seconds = Math.round(duration - (minutes*60));
        const time = minutes.toString() + ":" + seconds.toString();
        return time;
    },
    //split stats up by category and player
    playerStats: function(stats) {
    const p1_stats = stats.overall[0];
    const p1_actions = stats.actionCounts[0];
    const p2_stats = stats.overall[1];
    const p2_actions = stats.actionCounts[1];
    return [p1_stats, p1_actions, p2_stats, p2_actions];
    }
};
