// File: src/commands/roles.js

const { Client, Message, MessageEmbed } = require('discord.js');
const { getRoleByName, getRoles, assignRole, removeRole } = require('../services/roleService');
const { logger } = require('../utils/logger');

/**
 * Command to assign a role to a user
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {string[]} args - The command arguments
 */
const assignRoleCommand = async (client, message, args) => {
    try {
        const roleName = args[0];
        const role = getRoleByName(roleName);
        
        if (!role) {
            message.reply(`Role "${roleName}" not found.`);
            return;
        }
        
        const member = message.member;
        
        if (member.roles.cache.has(role.id)) {
            message.reply(`You already have the role "${role.name}".`);
            return;
        }
        
        await assignRole(member, role);
        message.reply(`Role "${role.name}" assigned successfully.`);
    } catch (error) {
        logger.error(`Error in assignRoleCommand: ${error}`);
        message.reply('An error occurred while assigning the role.');
    }
};

/**
 * Command to remove a role from a user
 * @param {Client} client - The Discord client
 * @param {Message} message - The message that triggered the command
 * @param {string[]} args - The command arguments
 */
const removeRoleCommand = async (client, message, args) => {
    try {
        const roleName = args[0];
        const role = getRoleByName(roleName);
        
        if (!role) {
            message.reply(`Role "${roleName}" not found.`);
            return;
        }
        
        const member = message.member;
        
        if (!member.roles.cache.has(role.id)) {
            message.reply(`You do not have the role "${role.name}".`);
            return;
        }
        
        await removeRole(member, role);
        message.reply(`Role "${role.name}" removed successfully.`);
    } catch (error) {
        logger.error(`Error in removeRoleCommand: ${error}`);
        message.reply('An error occurred while removing the role.');
    }
};

/**
 * Command to list all available roles on the server
 * @param {Message} message - The message that triggered the command
 */
const listRolesCommand = (message) => {
    try {
        const roles = getRoles();
        const roleNames = roles.map(role => role.name);
        const embed = new MessageEmbed()
            .setTitle('Available Roles')
            .setDescription(roleNames.join('\n'));
        
        message.channel.send({ embeds: [embed] });
    } catch (error) {
        logger.error(`Error in listRolesCommand: ${error}`);
        message.reply('An error occurred while listing roles.');
    }
};

module.exports = {
    assignRoleCommand,
    removeRoleCommand,
    listRolesCommand,
};