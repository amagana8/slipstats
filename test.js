const { default: SlippiGame } = require('slp-parser-js'); //require the slp-parser-js module
var fs = require('fs'); //require the file system module

const game = new SlippiGame('/mnt/c/Users/Alex/Documents/replays/game.slp');
const stats = game.getStats();
const metadata = game.getMetadata();


// load players' stats into vars
const p1_stats = stats.overall[0];
const p1_actions = stats.actionCounts[0];
const p2_actions = stats.actionCounts[1];
const p2_stats = stats.overall[1];

function convertTime(frame_count) {
    const duration = frame_count / 60;
    const minutes = Math.floor(duration/60);
    const seconds = Math.round(duration - (minutes*60));
    const time = minutes.toString() + ":" + seconds.toString();
    return time;
}

const time_ = convertTime(metadata.lastFrame);

console.log(p1_stats.successfulConversions.ratio);