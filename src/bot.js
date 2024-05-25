// bot.js

const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const winston = require('winston');
const { registerCommands, registerEvents } = require('./utils/register');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Register all commands and events
(async () => {
  client.commands = new Map();
  client.events = new Map();
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
})();

client.login(process.env.DISCORD_TOKEN);

// Error handling
process.on('unhandledRejection', (error) => {
  winston.error(`Unhandled promise rejection: ${error.message}`);
});

// Dependency injection
module.exports = {
  client,
};