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
		let memberSum;

		if (reaction.replied) {
			reaction.deleteReply();
		}

		if (reaction.isButton()) {
			memberSum = reaction.customId;
		} else {
			memberSum = reaction.user;
		}

		try {
			const memCode = findCodeByName(memberSum);
			reaction.reply(`Summoning: ${memCode}`);
		} catch (error) {
			console.error(`ERROR FROM SUMMON MEMBER COMMAND: ${error}`);
		}

		// console.log(reaction);

	},
};
