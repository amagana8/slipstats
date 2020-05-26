// require the discord.js module
const Discord = require('discord.js');
const slipStats = require('./SlipStats');

// create a new Discord client
const client = new Discord.Client();

const prefix = '!';
client.on('message', (msg) => {
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'stats') {
        let path = msg.content.substring(7);
        path = decodeURIComponent(path);
        msg.channel.send(`Found replay at ${path}`);
        const game_data = slipStats.loadReplay(path);
        const time_ = slipStats.convertTime(game_data[1].lastFrame);
        const stats_ = slipStats.playerStats(game_data[0]);
        msg.channel.send(`Time: ${time_}`);
        msg.channel.send(`\`\`\`
        ╔══════════════════════════════════╦══════════╦══════════╗
        ║                                  ║ Player 1 ║ Player 2 ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Kills                            ║ ${stats_[0].killCount}        ║ ${stats_[2].killCount}        ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Damage Done                      ║ ${stats_[0].totalDamage.toFixed(1)}    ║ ${stats_[2].totalDamage.toFixed(1)}    ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Wavedashes/Wavelands/Dash Dances ║ ${stats_[1].wavedashCount}/${stats_[1].wavelandCount}/${stats_[1].dashDanceCount}   ║ ${stats_[3].wavedashCount}/${stats_[3].wavelandCount}/${stats_[3].dashDanceCount}   ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Opening Conversion Rate          ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Openings/Kill                    ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Damage/Opening                   ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Neutral Wins                     ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Counter Hits                     ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Beneficial Trades                ║          ║          ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Inputs/Min                       ║          ║          ║
        ╚══════════════════════════════════╩══════════╩══════════╝
        \`\`\``);
    }
});

// login to Discord with your app's token
client.login('NzE0NDAxMTk0OTMxMzg4NDg4.Xsx2Pg.G1754c_LXJ8mzYtEn30o5sNKV2U');