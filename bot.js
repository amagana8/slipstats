// require the discord.js module
const Discord = require('discord.js');
const slipStats = require('./SlipStats');
const path = require('path');

// set bot token
const token = '';

// create a new Discord client
const client = new Discord.Client();

// set command prefix
const prefix = '!';
var file_path = '';
client.on('message', (msg) => {
    // look for command messages only
    if (!msg.content.startsWith(prefix) || msg.author.bot) {
        return;
    }
    // get bot command and command argument
    const args = msg.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if (command === 'path') {
        file_path = msg.content.substring(6);
        msg.channel.send(`Path set to ${file_path}`);
    }
    if (command === 'stats') {
        const replay = slipStats.findReplay(file_path);
        const game_data = slipStats.loadReplay(path.join(file_path,replay));
        const stage_ = slipStats.getStageName(game_data[2].stageId);
        const time_ = slipStats.convertTime(game_data[1].lastFrame);
        const player1 = slipStats.assignPlayers(game_data[1])[0];
        const player2 = slipStats.assignPlayers(game_data[1])[1];
        const char1 = slipStats.getCharName(parseInt(Object.keys(player1.characters)));
        const char2 = slipStats.getCharName(parseInt(Object.keys(player2.characters)));
        const stats_ = slipStats.playerStats(game_data[0]);
        const actions1 = stats_[1].wavedashCount.toString() + '/' + stats_[1].wavelandCount.toString() + '/' + stats_[1].dashDanceCount.toString();
        const actions2 = stats_[3].wavedashCount.toString() + '/' + stats_[3].wavelandCount.toString() + '/' + stats_[3].dashDanceCount.toString();
        const ocr1 = slipStats.ratioPercent(stats_[0].successfulConversions.ratio).toString() + '%';
        const ocr2 = slipStats.ratioPercent(stats_[2].successfulConversions.ratio).toString() + '%';
        msg.channel.send(`\`\`\`
        Stage: ${stage_}                     Duration: ${time_}
        Player 1: ${player1.names.netplay} as ${char1}
        Player 2: ${player2.names.netplay} as ${char2}
        ╔══════════════════════════════════╦══════════╦══════════╗
        ║                                  ║ Player 1 ║ Player 2 ║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Kills                            ║ ${stats_[0].killCount.toString().padEnd(9)}║ ${stats_[2].killCount.toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Damage Done                      ║ ${stats_[0].totalDamage.toFixed(1).toString().padEnd(9)}║ ${stats_[2].totalDamage.toFixed(1).toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Wavedashes/Wavelands/Dash Dances ║ ${actions1.padEnd(9)}║ ${actions2.padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Opening Conversion Rate          ║ ${ocr1.padEnd(9)}║ ${ocr2.padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Openings/Kill                    ║ ${stats_[0].openingsPerKill.ratio.toFixed(1).toString().padEnd(9)}║ ${stats_[2].openingsPerKill.ratio.toFixed(1).toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Damage/Opening                   ║ ${stats_[0].damagePerOpening.ratio.toFixed(1).toString().padEnd(9)}║ ${stats_[2].damagePerOpening.ratio.toFixed(1).toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Neutral Wins                     ║ ${stats_[0].neutralWinRatio.count.toString().padEnd(9)}║ ${stats_[2].neutralWinRatio.count.toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Counter Hits                     ║ ${stats_[0].counterHitRatio.count.toString().padEnd(9)}║ ${stats_[2].counterHitRatio.count.toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Beneficial Trades                ║ ${stats_[0].beneficialTradeRatio.count.toString().padEnd(9)}║ ${stats_[2].beneficialTradeRatio.count.toString().padEnd(9)}║
        ╠══════════════════════════════════╬══════════╬══════════╣
        ║ Inputs/Min                       ║ ${stats_[0].inputsPerMinute.ratio.toFixed(1).toString().padEnd(9)}║ ${stats_[2].inputsPerMinute.ratio.toFixed(1).toString().padEnd(9)}║
        ╚══════════════════════════════════╩══════════╩══════════╝
        \`\`\``);
    }
});

// login to Discord with your app's token
client.login(token);