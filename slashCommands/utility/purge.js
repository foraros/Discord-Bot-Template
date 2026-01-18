const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Deletes a specific number of messages.')
    .addIntegerOption(option => 
        option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply({ 
                content: "❌ You do not have permission to delete messages!", 
                ephemeral: true 
            });
        }

        const amount = interaction.options.getInteger('amount');

        try {
            const deletedMessages = await interaction.channel.bulkDelete(amount, true);

            await interaction.reply({content: `🧹 Successfully deleted **${deletedMessages.size}** messages!`});
        } catch(error) {
            console.error(error);

            await interaction.reply({content: '❌ I cannot delete messages that are older than 14 days or I lack permissions.'});
        }
    }
}