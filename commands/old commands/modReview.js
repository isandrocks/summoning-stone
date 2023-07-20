module.exports = {
	data: 'modReview',
	description: 'Send approval status once item has been reviewed.',
	async execute(reaction) {
		const args = reaction.message.content.split(' ');
		const id = args[2];
		if (reaction.emoji.name === '👍') {
			reaction.message.channel.send(`!Approved ${id}`);
		}
		else if (reaction.emoji.name === '👎') {
			reaction.message.channel.send('!Rejected');
		}
		reaction.message.reactions.removeAll();
	},
};
