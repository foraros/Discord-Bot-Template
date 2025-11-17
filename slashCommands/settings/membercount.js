const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('membercount')
        .setDescription('Returns current members of this server'),
        
    async execute(interaction) {
        const guild = interaction.guild; // το guild όπου έγινε το command
        const memberCount = guild.memberCount;

        const embed = new EmbedBuilder()
            .setTitle(`👥 Members in ${guild.name}`)
            .setColor(Colors.Blue)
            .setDescription(`This server has **${memberCount} members**.`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};
