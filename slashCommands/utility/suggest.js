const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('suggest')
		.setDescription('Creates an embed with the users suggestion')
    .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('Type the thing you want to suggest')
                .setRequired(true)),
                
	async execute(interaction, args) {

    const client = interaction.client;
    const suggestion = interaction.options.getString('suggestion')

    const suggestionembed = new MessageEmbed()
      .setTitle(`<:deosuggestion:997992146512654366> Suggestion`)
      .setColor('RANDOM')
      .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
      .setDescription(`${suggestion}`)
      .setTimestamp()
      .setFooter({text:'Suggestion'})
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)

   const msg = await interaction.reply({embeds: [suggestionembed], fetchReply: true})

    msg.react("<:deoupvote:990677768167649290> ");
    msg.react('<:deodownvote:990677789546004481> ');


    setTimeout(async () => {
      var message = await interaction.channel.send({content: `<a:deothankyou:995041507507699752> Thank you for your suggestion ${interaction.user} `})

      setTimeout(() => {
      message.delete()
      }, 5000)
      
      }, 2000)


  
	}
};
