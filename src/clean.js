const { REST, Routes } = require('discord.js');
require('dotenv').config();

const SERVER_ID = 'YOUR_GUILD_ID_HERE'; 

const rest = new REST({ version: '10' }).setToken(process.env.Token);

(async () => {
    try {
        console.log(`🧹 Starting cleanup for Server ID: ${SERVER_ID}...`);

        // This sends an EMPTY list [] to the specific server.
        // It tells Discord: "This server should have ZERO specific commands."
        await rest.put(
            Routes.applicationGuildCommands(process.env.ClientID, SERVER_ID),
            { body: [] }
        );

        console.log('✨ SUCCESS! All old ghost commands for this server have been deleted.');
        
    } catch (error) {
        console.error('❌ Error cleaning up:');
        console.error(error);
    }
})();