// roleService.js

// Import necessary packages
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');
const winston = require('winston');

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Function to assign a role to a user
const assignRole = (userId, roleName) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const role = guild.roles.cache.find((role) => role.name === roleName);

  if (!role) {
    winston.error(`Role ${roleName} not found`);
    return;
  }

  const member = guild.members.cache.get(userId);

  if (!member) {
    winston.error(`User ${userId} not found`);
    return;
  }

  member.roles.add(role)
    .then(() => {
      winston.info(`Role ${roleName} assigned to user ${userId}`);
    })
    .catch((error) => {
      winston.error(`Error assigning role: ${error.message}`);
    });
};

// Function to remove a role from a user
const removeRole = (userId, roleName) => {
  const guild = client.guilds.cache.get(process.env.GUILD_ID);
  const role = guild.roles.cache.find((role) => role.name === roleName);

  if (!role) {
    winston.error(`Role ${roleName} not found`);
    return;
  }

  const member = guild.members.cache.get(userId);

  if (!member) {
    winston.error(`User ${userId} not found`);
    return;
  }

  member.roles.remove(role)
    .then(() => {
      winston.info(`Role ${roleName} removed from user ${userId}`);
    })
    .catch((error) => {
      winston.error(`Error removing role: ${error.message}`);
    });
};

// Export the functions for external use
module.exports = {
  assignRole,
  removeRole,
};