const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { AttachmentBuilder, EmbedBuilder } = require('discord.js');


module.exports = {
  name: "wearedevs-obfuscator",
  description: "Obfuscate a Lua script using the WeAreDevs API",
  async execute(message, args) {


    const attachment = message.attachments.first();
    let luaScript = args.join(' ');

    if (attachment) {
      try {
        const responsetothataxios = await axios.get(attachment.url);
        luaScript = responsetothataxios.data;
        
      } catch (error) {
        console.error("Error downloading file:", error);
        return message.channel.send("❌ Failed to download the attached file.");
      }
    }

    if (!luaScript) {
      const Provideembed = new EmbedBuilder()
        .setTitle("❌ Please provide a Lua script or upload a `.lua` file")
        .setDescription("You need your Lua script to be successfully obfuscated.")
        .setColor(0x00ff00)
        .addFields(
          { name: "📅 Timestamp", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
        )
        .setFooter({ text: "Powered by WeAreDevs API" });

      return message.channel.send({ embeds: [Provideembed] });
    }

    try {
      // **Ensure both folders exist**
      const backupDir = path.join(__dirname, 'backups');
      const obfuscatedDir = path.join(__dirname, 'obfuscated_Source');

      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
      }
      if (!fs.existsSync(obfuscatedDir)) {
        fs.mkdirSync(obfuscatedDir);
      }

      // **Backup original script**
      const backupFileName = `backup_${Math.floor(Date.now() / 1000)}.lua`;
      const backupFilePath = path.join(backupDir, backupFileName);
      fs.writeFileSync(backupFilePath, luaScript, 'utf8');
      console.log(`📂 Backup created: ${backupFilePath}`);

      // **Send API request**
      const response = await axios.post('https://wearedevs.net/api/obfuscate', { script: luaScript });

      if (response.data && response.data.obfuscated) {
        console.log("✅ WeAreDevs-Obfuscation-API successful");

        // **Save obfuscated script**
        const obfuscatedFileName = `obfuscated_${Math.floor(Date.now() / 1000)}.lua`;
        const obfuscatedFilePath = path.join(obfuscatedDir, obfuscatedFileName);

        // **Modify the comment inside the obfuscated script**
        // let modifiedScript = response.data.obfuscated.replace(
        //   /--\[\[ v1\.0\.0 https:\/\/wearedevs\.net\/obfuscator \]\]/g,
        //   "--[[ USING v1.0.0 https://wearedevs.net/obfuscator Obfuscated by UDP ]]"
        // );
        try {
          await message.delete()
        } catch(error) {
          console.log(error)
        }
        fs.writeFileSync(obfuscatedFilePath, response.data.obfuscated, 'utf8');
        console.log(`📂 Source created: ${obfuscatedFilePath}`);
        
        // **Send the file in Discord**
        const file = new AttachmentBuilder(obfuscatedFilePath);
        const embed = new EmbedBuilder()
          .setTitle("✅ Lua Script Obfuscated! - Check your DMs")
          .setDescription("Your Lua script has been successfully obfuscated.")
          .setColor(0x00ff00)
          .addFields(
            { name: "📂 Backup File", value: backupFileName, inline: true },
            { name: "📂 Obfuscated File", value: obfuscatedFileName, inline: true },
            { name: "📂 File ID", value: `Needed ${backupFileName} Required owner`, inline: true },
            { name: "📅 Timestamp", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
          )

        await message.channel.send({ embeds: [embed] });
        await message.channel.send({ files: [file] });

        // **Delete file after sending**
        fs.unlinkSync(obfuscatedFilePath);
      } else {
        message.channel.send("❌ Failed to obfuscate the Lua script.");
      }
    } catch (error) {
      console.error("Obfuscation Error:", error);

      const ErrorAPIEmbed = new EmbedBuilder()
        .setTitle("Error: Something went wrong")
        .setDescription(`${error.message}`)
        .setColor(0xff0000)
        .addFields(
          { name: "❌ API Request Failed", value: error.toString(), inline: true },
          { name: "❌ Error during obfuscation", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
        )
        .setFooter({ text: "Powered by WeAreDevs API" });

      message.channel.send({ embeds: [ErrorAPIEmbed] });
    }
  }
};
