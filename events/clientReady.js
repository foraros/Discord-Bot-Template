const { ActivityType } = require('discord.js');

module.exports = {
    name: `clientReady`,
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}`);

        client.user.setPresence({
            activities: [
                {name: 'Whatever you want', type: ActivityType.Streaming}
            ],
        })
    }
};