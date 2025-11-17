const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server-info')
		.setDescription('Displays information about the server'),
  
	async execute(interaction) {
    const client = interaction.client;
    const guild = interaction.guild;
    const Roles = guild.roles.cache.size || "No Roles!";
    const Members = guild.memberCount;
    const Humans = guild.members.cache.filter(member => !member.user.bot).size;
    const Bots = guild.members.cache.filter(member => member.user.bot).size;
    const { createdTimestamp , emojis , stickers} = guild;
    const Text = guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size;
    const Voice = guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size;
    const Threads = guild.channels.cache.filter(channel => channel.type === 'GUILD_NEWS_THREAD' && 'GUILD_PRIVATE_THREAD' && 'GUILD_PUBLIC_THREAD').size;
    const Categories = guild.channels.cache.filter(channel => channel.type === 'GUILD_CATEGORY').size;
    const Stages = guild.channels.cache.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size;
    const News = guild.channels.cache.filter(channel => channel.type === 'GUILD_NEWS').size;

    const Channels = Text + Voice + Threads +Categories + Stages + News

    const embed = new EmbedBuilder()
      .setTitle("Server Information")
      .setColor(Math.floor(Math.random() * 0xFFFFFF))
      .setThumbnail(guild.iconURL())
      .addFields(
        {
          name: '🛡️ | General',
          value:
          `➥ Owner: ${await guild.fetchOwner().then(m => m.user)}\n➥ Name: ${guild.name}\n➥ Created At: <t:${parseInt(createdTimestamp / 1000)}:R>\n➥ Verification Level: ${guild.verificationLevel}\n➥ Boosts: ${guild.premiumSubscriptionCount}`
        },
        {
          name: '👥 | Members',
          value: 
          ` ➥ All Members: ${Members}\n➥ Members: ${Humans}\n➥ Bots: ${Bots}`
        },
        {
          name: '💬 | Channels',
          value: 
          `➥ Text: ${Text}\n➥ Voice: ${Voice}\n➥ Threads: ${Threads}\n➥ Categories: ${Categories}\n➥ Stages: ${Stages}\n➥ News: ${News}\n\n➥ Total: ${Channels}`
        },
        {
          name: '😎 | Emojis',
          value:
          `➥ Animated: ${emojis.cache.filter((e) => e.animated).size}\n➥ Static: ${emojis.cache.filter((e) => !e.animated).size}\n➥ Stickers: ${stickers.cache.size}\n\n➥ Total: ${stickers.cache.size + emojis.cache.size}
          `
        },
        {
          name: '🎭 | Roles',
          value:
          `➥ Roles: ${Roles}`
        }
      )
      
      .setFooter({text:`Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ dynamic: true })})
      .setTimestamp();
    

    await interaction.reply({ embeds: [embed] })


	}
};