const statTools = require('./StatTools');
const path = require('path');

module.exports = {
    //make stats table from replay
    makeTable: function(replay, file_path) {
        try {
        const game_data = statTools.loadReplay(path.join(file_path,replay));
        const stage_ = statTools.getStageName(game_data[2].stageId);
        const time_ = statTools.convertTime(game_data[1].lastFrame);
        const player1 = statTools.assignPlayers(game_data[1])[0];
        const player2 = statTools.assignPlayers(game_data[1])[1];
        const char1 = statTools.getCharName(parseInt(Object.keys(player1.characters)));
        const char2 = statTools.getCharName(parseInt(Object.keys(player2.characters)));
        let name1 = 'Player 1: ' + char1;
        let name2 = 'Player 2: ' + char2;
        if (player1.names.netplay !== undefined) {
            name1 = 'Player 1: ' + player1.names.netplay + ' as ' + char1;
        }
        if (player2.names.netplay !== undefined) {
            name2 = 'Player 2: ' + player2.names.netplay + ' as ' + char2;
        }
        const stats_ = statTools.playerStats(game_data[0]);
        const actions1 = stats_[1].wavedashCount.toString() + '/' + stats_[1].wavelandCount.toString() + '/' + stats_[1].dashDanceCount.toString();
        const actions2 = stats_[3].wavedashCount.toString() + '/' + stats_[3].wavelandCount.toString() + '/' + stats_[3].dashDanceCount.toString();
        const ocr1 = statTools.ratioPercent(stats_[0].successfulConversions.ratio).toString() + '%';
        const ocr2 = statTools.ratioPercent(stats_[2].successfulConversions.ratio).toString() + '%';
        return(`\`\`\`
        Stage: ${stage_}                     Duration: ${time_}
        ${name1}
        ${name2}
        ╔══════════════════════════════════╦══════════╦══════════╗
        ║ Stats                            ║ Player 1 ║ Player 2 ║
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
        catch {
            return "Invalid replay file or path. Please check file and set path before trying again.";
        }
    }
}
