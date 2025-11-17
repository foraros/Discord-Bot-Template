const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors, MessageFlagsBits } = require('discord.js');

module.exports = {
 data: new SlashCommandBuilder()
	.setName('8ball')
	.setDescription('Ask a question and let 8ball decide the answer')
	.addStringOption(option => option.setName('question').setDescription('Enter a question').setRequired(true)),

	async execute (interaction, args) {
        const client = interaction.client;
		const question = interaction.options.getString('question');
		let responses = [
			'It is certain',
			'It is decidedly so',
			'Without a doubt',
			'Yes definitely',
			'You may rely on it',
			'As I see it, yes',
			'Most likely',
			'For sure',
			'Outlook good',
			'Yes',
			'Signs point to yes',
			'Reply hazy try again',
			'Ask again later',
			'Better not tell you now',
			'Cannot predict now',
			'Concentrate and ask again',
			"Don't count on it",
			'My reply is no',
			'My sources say no',
			'Outlook not so good',
			'Very doubtful',
		];
		const response = Math.floor(Math.random() * responses.length);
		const embed = new EmbedBuilder()
			.setColor(Math.floor(Math.random() * 0xFFFFFF))
            .setFooter({text:`Requested by ${interaction.user.tag}`})
            .setTimestamp()
			.setTitle('🎱 ' + question)
			.setDescription(responses[response])
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};