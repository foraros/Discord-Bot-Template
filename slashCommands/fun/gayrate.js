const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gayrate')
		.setDescription('Shows how gay someone is')
    .addUserOption(option =>
            option.setName('user')
                .setDescription('Select the user you want to rate')
                .setRequired(false)),
  
	async execute(interaction) {

    const client = interaction.client;

    let user = interaction.options.getUser("user") || interaction.user;

   const gayrate = Math.floor(Math.random() * 101)

        if(user === interaction.user)
        {
          let embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random() * 0xFFFFFF))
          .setTitle("Gayrate 🏳️‍🌈")
          .setDescription(`**${user} you are ${gayrate}% gay :rainbow_flag:**`)
          .setTimestamp()

  interaction.reply({ embeds: [embed] });
        }
        else 
        {
          let embed = new EmbedBuilder()
          .setColor(Math.floor(Math.random() * 0xFFFFFF))
          .setTitle("Gayrate 🏳️‍🌈")
          .setDescription(`**${user} is ${gayrate}% gay :rainbow_flag:**`)
          .setTimestamp()

      interaction.reply({ embeds: [embed] });
      }
	}
};