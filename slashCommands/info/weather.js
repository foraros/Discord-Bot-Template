const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Shows weather for a city')
    .addStringOption(option =>
      option.setName('location')
        .setDescription('City,CountryCode (e.g., Athens,GR)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const location = interaction.options.getString('location'); 
    const apiKey = process.env.WEATHER_API_KEY;

    try {
      const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`);
      if (!geoRes.data.length) return interaction.reply('❌ City not found');

      const { lat, lon, name, country } = geoRes.data[0];

      const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`);
      const weather = weatherRes.data;

      const embed = new EmbedBuilder()
        .setTitle(`☁️ Weather in ${name}, ${country}`)
        .setDescription(
          `🌡️ Temperature: **${Math.round(weather.main.temp)}°C**\n` +
          `💧 Humidity: **${weather.main.humidity}%**\n` +
          `🌬️ Wind: **${weather.wind.speed} km/h**\n` +
          `🌥️ Description: **${weather.weather[0].description}**`
        )
        .setColor(Math.floor(Math.random() * 0xFFFFFF))
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err.response?.data || err);
      await interaction.reply('❌ Error fetching weather.');
    }
  }
};
