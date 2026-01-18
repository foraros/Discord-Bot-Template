const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dare')
		.setDescription('Sends a random dare question'),
	
  async execute(interaction) {
        try {

        const filePath = path.join(__dirname, '..', '..', 'dares.txt');
        const fileContent = fs.readFileSync(filePath, 'utf8');

        const client = interaction.client;
        const messages = fileContent
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const randomMessage = messages[Math.floor(Math.random() * messages.length)]; 

            await interaction.reply(`**${randomMessage}**`);

        } catch (error) {
            console.error(error);
            await interaction.reply("❌ Δεν μπόρεσα να διαβάσω το αρχείο dares.txt!");
        }
    }
};