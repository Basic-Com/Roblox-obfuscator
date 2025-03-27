require("dotenv").config();
const { Client, GatewayIntentBits, ActivityType, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
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
console.log("\n✅ Bot is starting...\n");

// Load commands
const commandFolders = fs.readdirSync(path.join(__dirname, "commands"));

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(path.join(__dirname, "commands", folder)).filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        if (command.name && command.execute) {
            client.commands.set(command.name, command);
            console.log(`✅ Loaded command: ${command.name}`);
        } else {
            console.log(`❌ Error loading ${file}: Missing name or execute function.`);
        }
    }
}

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

client.login(process.env.DISCORD_TOKEN);
