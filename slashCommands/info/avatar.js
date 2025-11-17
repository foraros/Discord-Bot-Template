const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription("Shows the target's avatar")
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select the user you want to show the avatar for')
                .setRequired(false)),

	async execute(interaction) {

        const client = interaction.client;

        let user = interaction.options.getUser("user") || interaction.user;

        let embed = new EmbedBuilder()
            .setColor(Math.floor(Math.random() * 0xFFFFFF))
            .setTitle("Avatar")
            .setTimestamp()
            .setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}`})
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`[png](${user.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})}) | [jpg](${user.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})}) | [webp](${user.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"})})`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

            await  interaction. reply({ embeds: [embed], allowedMentions: { repliedUser: false }});

	}
};