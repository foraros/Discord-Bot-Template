const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Lists all available bot commands'),

    async execute(interaction) {
        const commandsDir = path.join(__dirname, '../../slashCommands'); // Go up 2 levels to find 'slashCommands'
        const folders = fs.readdirSync(commandsDir);

        const embed = new EmbedBuilder()
            .setTitle('📜 Command List')
            .setDescription('Here are all the available commands categorized by folder:')
            .setColor(Math.floor(Math.random() * 0xFFFFFF))
            .setThumbnail(interaction.client.user.displayAvatarURL())
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();

        // Loop through each folder (fun, info, utility, etc.)
        for (const folder of folders) {
            const folderPath = path.join(commandsDir, folder);
            
            // Make sure it's a folder and not a file
            if (fs.statSync(folderPath).isDirectory()) {
                const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
                
                // If the folder has commands, add a field to the embed
                if (files.length > 0) {
                    // Remove ".js" from filenames to get just the command names
                    const commandNames = files.map(file => `\`/${file.replace('.js', '')}\``);
                    
                    // Capitalize the folder name (e.g., "fun" -> "Fun")
                    const categoryName = folder.charAt(0).toUpperCase() + folder.slice(1);

                    embed.addFields({
                        name: `${categoryName} (${files.length})`,
                        value: commandNames.join(', '),
                        inline: false
                    });
                }
            }
        }

        await interaction.reply({ embeds: [embed] });
    }
};