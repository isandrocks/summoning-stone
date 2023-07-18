const { Events } = require('discord.js');
const { summonid } = require('./config.json');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		client.commands.get('clearChannel').execute(summonid);
		client.commands.get('summonMessage').execute(summonid);
	},
};
