const { Events, Collection } = require('discord.js');
const { summonid } = require('../config.json');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		// console.log(interaction);

		if (interaction.isButton()) {
			if (interaction.channelId === summonid) {
				return interaction.client.commands.get('summon-member').execute(interaction);
			}
		}

		if (!interaction.isChatInputCommand()) return; // I should turn this into a if block instead of just a cut off with return

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const { cooldowns } = interaction.client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				interaction.reply({ content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
				return setTimeout(() => interaction.editReply(`Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again Now!`), cooldownAmount);
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
