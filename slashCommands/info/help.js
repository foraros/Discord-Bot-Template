const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, Colors } = require('discord.js');
const os = require("os");
const { outdent } = require("outdent");
const moment = require('moment')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('bot-info')
		.setDescription("Returns bot's information"),
  
	  async execute(interaction) {
    const client = interaction.client;

    let seconds = Math.floor(client.uptime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    seconds %= 60;
    minutes %= 60;
    hours %= 24;

    // (not mine) CPU
    const platform = process.platform.replace(/win32/g, "Windows");
    const architecture = os.arch();
    const cores = os.cpus().length;
    const cpuUsage = `${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB`;

    // (not mine) RAM
    const botUsed = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`;
    const botAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
    const botUsage = `${((process.memoryUsage().heapUsed / os.totalmem()) * 100).toFixed(1)}%`;

    const overallUsed = `${((os.totalmem() - os.freemem()) / 1024 / 1024 / 1024).toFixed(2)} GB`;
    const overallAvailable = `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`;
    const overallUsage = `${Math.floor(((os.totalmem() - os.freemem()) / os.totalmem()) * 100)}%`;
    
    const botinfo = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}`})
      .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
      .setColor(Math.floor(Math.random() * 0xFFFFFF))
      .addField('Name', `${client.user.tag}`, true)
      .addField('ID', `${client.user.id}`, true)
      .addField('Created At', `${moment(client.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')} (${moment(client.user.createdAt).fromNow()})`)
      .addField('Uptime', `\`${days}\` Days \`${hours}\` Hours \`${minutes}\` Minutes \`${seconds}\` Seconds`)
      .addField('Discord JS', `${require("discord.js/package.json").version}`, true)
      .addField('Node Version', process.versions.node, true)
      .addField('OS Version' , `${platform} [${architecture}]`,true)
      .addField("CPU Usage:",outdent`${cpuUsage}`,true)
      .addField("RAM Usage:",outdent`${botUsed}`,true)
      .addField('Cores', outdent`${cores}`,true)
      .setFooter({text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
      .setTimestamp()

    await interaction.reply({embeds: [botinfo] })


	}
};