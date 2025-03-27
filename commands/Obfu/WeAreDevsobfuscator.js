const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');

const blockedURLs = [
  "grabify.link", "bmwforum.co", "catsnthing.com", "discordinvite.com",
  "freegiftcards.co", "gaming-at-my.best", "google.docs.com",
  "joinmy.site", "curiouscat.club", "leancoding.co",
  "stopify.co", "starbucksisbadforyou.com"
];

module.exports = {
  name: "wearedevs-obfuscator",
  description: "Obfuscate a Lua script using the WeAreDevs API",
  async execute(message, args) {

   //code it yourself LOL
    message.channel.send("Learn please")
  }
};
