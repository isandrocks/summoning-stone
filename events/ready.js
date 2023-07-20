const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		try {
			// console.log(client);
			client.commands.get('clearchannel').execute(client);
			// client.commands.get('summonMessage').execute(client);
		} catch (error) {
			console.error(`ERROR FROM READY EVENT: ${error}`);
		}
	},
};
