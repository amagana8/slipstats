const Discord = require('discord.js');
const statTools = require('./StatTools');
const table = require('./MakeTable');

// set bot token
const token = 'NzE0NDAxMTk0OTMxMzg4NDg4.Xtljcg.AeSq29OqqlJpBG3CUGdPL6qTjfg';

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

    // command for user to set replay directory
    if (command === 'path') {
        file_path = msg.content.substring(6);
        msg.channel.send(`Path set to ${file_path}`);
    }

    // command for user to generate table of latest replay
    if (command === 'stats') {
        const replay = statTools.findLatestReplay(file_path);
        msg.channel.send(table.makeTable(replay, file_path));
    }
});

// login to Discord with your app's token
client.login(token);
