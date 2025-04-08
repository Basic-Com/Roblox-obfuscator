const Discord = require("Discord.js");
const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.commands = new Map(); // Initialize commands collection

    console.log("\n📂 Loading Commands...");

    // Ensure 'commands' directory exists before reading
    const commandPath = path.join(__dirname, "../commands");
    if (!fs.existsSync(commandPath)) {
        console.error("❌ Error: Commands folder not found!");
        return;
    }

    const commandFolders = fs.readdirSync(commandPath);
    
    for (const folder of commandFolders) {
        const folderPath = path.join(commandPath, folder);
        if (!fs.statSync(folderPath).isDirectory()) continue; // Skip if not a directory

        const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(path.join(folderPath, file));
            if (command.name && command.execute) {
                client.commands.set(command.name, command);
                console.log(`✅ Loaded command: ${command.name}`);
            } else {
                console.log(`❌ Error loading ${file}: Missing name or execute function.`);
            }
        }
    }

    console.log(`✅ Loaded ${client.commands.size} commands.`); // Log the number of loaded commands
};
