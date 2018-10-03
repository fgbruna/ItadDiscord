/**
 * A bot that welcomes new guild members when they join
 */
const gameinfo = require('./library.js').gameInfo;

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

const discordKey = process.env.API_KEY

const itadKey = process.env.ITAD_KEY

const prefix = "!";

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.find(ch => ch.name === 'General');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

client.on('message', message => {

    console.log(message.content);

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    if (command === "info") {
        gameinfo(itadKey, args[0]) // fetch info about game
            .then(function (respuestas) {
                // then send it to the channel
                message.channel.send(JSON.stringify(respuestas['data'][args[0]]['urls']));
            });
    } else if (command === "ping") {
        message.channel.send('Que te pasa maldyto' + message.author);
    }
});


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(discordKey);