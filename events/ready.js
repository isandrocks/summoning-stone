const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		try {
			// console.log(client);
			await client.commands.get('clearchannel').execute(client);
			await client.commands.get('summon-msg').execute(client);

			console.log(`Ready! Logged in as ${client.user.tag}`);

		} catch (error) {
			console.error(`ERROR FROM READY EVENT: ${error}`);
		}
	},
};
