const { Client, GatewayIntentBits} = require('discord.js');
require('dotenv').config({debug:false});

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});

require('../handlers/eventHandler')(client);

require('../handlers/slashCommandHandler')(client);

client.login(process.env.Token);