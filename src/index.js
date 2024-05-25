// File: src/index.js

// Import necessary modules
const Discord = require('discord.js');
const dotenv = require('dotenv');
const winston = require('winston');

// Import other project files
const bot = require('./bot');
const config = require('./utils/config');

// Load environment variables
dotenv.config();

// Create a new Discord client
const client = new Discord.Client();

// Set up logging using Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Event listener for when the bot is ready
client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
});

// Event listener for incoming messages
client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  // Handle commands using the bot command handler
  bot.handleCommand(message, client);
});

// Log in to Discord using the bot token from environment variables
client.login(process.env.DISCORD_BOT_TOKEN);