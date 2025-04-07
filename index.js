require("dotenv").config();
const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");
const axios = require("axios")
const { logCommandStructure } = require("./logCommands"); // Import the function

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]
});

client.commands = new Collection();


// 📂 Log the folder structure before loading commands
console.log("\n📂 Command Structure:");
logCommandStructure(path.join(__dirname, "commands"));
console.log("\n✅ Bot is starting...\n")

require('./handler/MessageHandlerEvent')(client);
require('./handler/readyEvent')(client);


client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

    const args = message.content.slice(1).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    try {
        await client.commands.get(commandName).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command.');
        
    }
});



// client.on('interactionCreate', async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {

//     await interaction.reply('Pong!');

// if (interaction.commandName === 'hello') {

//   const helloEmbed = new EmbedBuilder()
//     .setColor(0x0099FF) // Sets the embed color
//     .setTitle('Greetings!')
//     .setDescription('Hello! How can I assist you today?')
//     .setThumbnail('https://i.imgur.com/AfFp7pu.png') // Optional: Set a thumbnail image
//     .setTimestamp() // Adds a timestamp to the embed
//     .setFooter({ text: 'Your friendly bot', iconURL: 'https://i.imgur.com/AfFp7pu.png' }); // Optional: Set footer text and icon

//   await interaction.reply({ embeds: [helloEmbed] });
//     }
//   }
// });

client.login(process.env.DISCORD_TOKEN);
