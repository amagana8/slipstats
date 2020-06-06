const { default: SlippiGame } = require('slp-parser-js'); // require the slp-parser-js module
const fs = require('fs'); // require the file system module
const path = require('path'); // require the path module
const _ = require('underscore'); // require the underscore module

module.exports = {
    // find most recent replay in path
    findLatestReplay: function(dir) {
        var files = fs.readdirSync(dir);
        return _.max(files, function (f) {
            var fullpath = path.join(dir, f);
            return fs.statSync(fullpath).ctime;
        });
    },
    // get stats and metadata from a slippi replay
    loadReplay: function(file) {
        const game = new SlippiGame(file);
        const stats = game.getStats();
        const metadata = game.getMetadata();
        const settings = game.getSettings();
        return [stats, metadata, settings];
    },
    // turns frame_count into min:sec format
    convertTime: function(frame_count) {
        const duration = frame_count / 60;
        const minutes = Math.floor(duration/60).toString();
        let seconds = Math.round(duration - (minutes*60)).toString();
        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }
        const time = minutes + ":" + seconds;
        return time;
    },
    //split stats up by category and player
    playerStats: function(stats) {
    const p1_stats = stats.overall[0];
    const p1_actions = stats.actionCounts[0];
    const p2_stats = stats.overall[1];
    const p2_actions = stats.actionCounts[1];
    return [p1_stats, p1_actions, p2_stats, p2_actions];
    },
    // turn conversion raio into percent
    ratioPercent: function(ratio) {
        let percent = ratio * 100;
        percent = percent.toFixed(2);
        return percent;
    },

    //find which ports the players used
    assignPlayers: function(metadata) {
        for (i = 0; i < 5; i++) {
            if (typeof(metadata.players[i]) !== 'undefined') {
                const char1 = metadata.players[i];
                for (j = i+1; j < 5; j++) {
                    if (typeof(metadata.players[j]) !== 'undefined') {
                        const char2 = metadata.players[j];
                        return [char1, char2];
                    }
                }
            }
        }
    },

    // get stage name from stage ID
    getStageName: function(stage_id) {
        const stage_dict = {2: 'Fountain Of Dreams',
        3: 'Pokémon Stadium',
        4: 'Princess Peach’s Castle',
        5: 'Kongo Jungle',
        6: 'Brinstar ',
        7: 'Corneria ',
        8: 'Yoshi’s Story',
        9: 'Onett ',
        10: 'Mute City',
        11: 'Rainbow Cruise',
        12: 'Jungle Japes',
        13: 'Great Bay',
        14: 'Hyrule Temple',
        15: 'Brinstar Depths',
        16: 'Yoshi’s Island',
        17: 'Green Greens',
        18: 'Fourside',
        19: 'Mushroom Kingdom I',
        20: 'Mushroom Kingdom Ii',
        22: 'Venom',
        23: 'Poke Floats',
        24: 'Big Blue',
        25: 'Icicle Mountain',
        26: 'Icetop',
        27: 'Flat Zone',
        28: 'Dream Land',
        29: 'Yoshi’s Island N64',
        30: 'Kongo Jungle N64',
        31: 'Battlefield',
        32: 'Final Destination'};
        const stage = stage_dict[stage_id];
        return stage;
    },

    // get character name from character ID
    getCharName: function(char_id) {
        const char_dict = {0: 'Mario',
        1: 'Fox',
        2: 'Captain Falcon',
        3: 'Donkey Kong',
        4: 'Kirby',
        5: 'Bowser',
        6: 'Link',
        7: 'Sheik',
        8: 'Ness',
        9: 'Peach',
        10: 'Popo',
        11: 'Nana',
        12: 'Pikachu',
        13: 'Samus',
        14: 'Yoshi',
        15: 'Jigglypuff',
        16: 'Mewtwo',
        17: 'Luigi',
        18: 'Marth',
        19: 'Zelda',
        20: 'Young Link',
        21: 'Dr Mario',
        22: 'Falco',
        23: 'Pichu',
        24: 'Game And Watch',
        25: 'Ganondorf',
        26: 'Roy',
        27: 'Master Hand',
        28: 'Crazy Hand',
        29: 'Wireframe Male',
        30: 'Wireframe Female',
        31: 'Giga Bowser',
        32: 'Sandbag'};
        const char = char_dict[char_id];
        return char;
    }
};
