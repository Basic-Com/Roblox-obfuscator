require("dotenv").config();
const fs = require('fs');
const path = require('path');

module.exports = (client) => {

    client.once('ready', () => {
        console.log(`✅ Logged in as ${client.user.tag}!`);

        client.user.setPresence({
            status: 'dnd', // 'online', 'idle', 'dnd', 'invisible'
            activities: [{
                name: '!help -t Lua Obfuscator 👀', // Custom status text
                type: 3 // Type 3 represents "Watching"
            }]
        });
    });
};
