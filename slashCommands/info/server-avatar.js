const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-avatar')
		.setDescription("Shows the target's server avatar")
    .addUserOption(option =>
            option.setName('user')
                .setDescription('Select the user you want to show the avatar for')
                .setRequired(true)),
                
	async execute(interaction) {
        const client = interaction.client;

        let user = interaction.options.getUser("user");

        const member = interaction.guild.members.cache.get(user.id);

        let embed = new EmbedBuilder();
        setColor(Math.floor(Math.random() * 0xFFFFFF))
        setTitle("Avatar")
        setTimestamp()
        setAuthor({ name: `${user.tag}`, iconURL: `${user.displayAvatarURL({ dynamic: true })}`})
        setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
        setDescription(`[png](${member.displayAvatarURL({ size: 2048, dynamic: true, format: "png"})}) | [jpg](${member.displayAvatarURL({ size: 2048, dynamic: true, format: "jpg"})}) | [webp](${member.displayAvatarURL({ size: 2048, dynamic: true, format: "webp"})})`)
        setImage(member.displayAvatarURL({ dynamic: true, size: 4096 }))
    
        await interaction. reply({ embeds: [embed], allowedMentions: { repliedUser: false }});

	}
};