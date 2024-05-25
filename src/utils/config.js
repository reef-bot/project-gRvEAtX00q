// File: src/utils/config.js

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  prefix: '!',
};