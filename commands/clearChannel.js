module.exports = {
	name: 'clearChannel',
	description: 'Deletes the last 100 messages',
	async execute(msg) {
		console.log('Clearing messages...');
		msg.messages.fetch({ limit: 100 }).then((m) => {
			m.forEach((ms) => {
				ms.delete();
			});
		});
	},
};
