const axios = require('axios');  // Import axios
const fs = require('fs');  // Node.js file system module
const path = require('path');  // Path module to handle file paths and names
const { AttachmentBuilder, EmbedBuilder } = require('discord.js'); // For sending files

module.exports = {
  name: "help",
  description: "Obfuscate a Lua script using the WeAreDevs API",
  async execute(message, args) {

        const detectEmbed = new EmbedBuilder()
          .setTitle("🚨 Help Menu!")
          .setDescription("Command")
          .setColor(0xff0000) // Red color
          .addFields(
            { name: "Command", value: '```!wearedevs-obfuscator```', inline: true },
            { name: "NOT OUT", value: '```!NOT OUT```', inline: true },
            { name: "NOT OUT", value: '```!NOT OUT```', inline: true },
          )
          

        return message.channel.send({ embeds: [detectEmbed] });
        
  }
};
