// File: src/commands/moderation.js

const { Client, Intents, MessageEmbed } = require('discord.js');
const { moderationService } = require('../services/moderationService');
const { logger } = require('../utils/logger');

module.exports = {
  name: 'moderation',
  description: 'Moderation commands for the Discord bot',

  async execute(message, args) {
    const command = args.shift().toLowerCase();

    if (command === 'warn') {
      if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to warn users.');
      }

      const user = message.mentions.users.first();
      const reason = args.join(' ');

      if (user) {
        moderationService.warnUser(user, reason);
        message.channel.send(`Successfully warned ${user.tag} for ${reason}`);
      } else {
        message.reply('You need to mention a user to warn.');
      }
    } else if (command === 'kick') {
      if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply('You do not have permission to kick users.');
      }

      const user = message.mentions.users.first();
      const reason = args.join(' ');

      if (user) {
        moderationService.kickUser(user, reason);
        message.channel.send(`Successfully kicked ${user.tag} for ${reason}`);
      } else {
        message.reply('You need to mention a user to kick.');
      }
    } else if (command === 'ban') {
      if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply('You do not have permission to ban users.');
      }

      const user = message.mentions.users.first();
      const reason = args.join(' ');

      if (user) {
        moderationService.banUser(user, reason);
        message.channel.send(`Successfully banned ${user.tag} for ${reason}`);
      } else {
        message.reply('You need to mention a user to ban.');
      }
    } else if (command === 'purge') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.reply('You do not have permission to purge messages.');
      }

      const amount = parseInt(args[0]) + 1;

      if (isNaN(amount)) {
        return message.reply('Please provide a valid number of messages to delete.');
      }

      moderationService.purgeMessages(message.channel, amount);
    } else {
      message.reply('Invalid command. Available commands: warn, kick, ban, purge');
    }
  },
};