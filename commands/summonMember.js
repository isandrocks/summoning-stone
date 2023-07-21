const { SlashCommandBuilder } = require('discord.js');
const { members } = require('../db/members.json');

function findCodeByName(idToFind) {
	const foundObject = members.find(obj => obj.name === idToFind);

	if (foundObject) {
		return foundObject.code;
	} else {
		return idToFind;
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summon-member')
		.setDescription('Mentions the corresponding user when their emoji is clicked.'),
	async execute(reaction) {
		let memberName;
		const channel = reaction.channel;
		const { summons } = reaction.client;

		if (reaction.replied) {
			reaction.deleteReply();
		}

		if (reaction.isButton()) {
			memberName = reaction.customId;
		} else {
			memberName = reaction.user;
		}

		if (summons.has(memberName)) {
			await channel.messages.delete(summons.get(memberName));
			await summons.delete(memberName);
		}

		try {
			const memCode = findCodeByName(memberName);
			let sumMsg;

			await reaction.reply({
				content: `Summoning: ${memCode}`,
				fetchReply: true
			})
			.then(msg => sumMsg = msg);

			summons.set(memberName, sumMsg.id);

		} catch (error) {
			console.error(`ERROR FROM SUMMON MEMBER COMMAND: ${error}`);
		}

		// console.log(reaction);

	},
};
