const fs = require('fs');
module.exports = {
	name: 'addEmoji',
	description: 'Adds the approved emoji to the server.',
	async execute(msg, args) {
		delete require.cache[require.resolve('../db/pending-emoji.json')];
		const pending = require('../db/pending-emoji.json');
		const pendingEmoji = pending.newEmoji;
		const newEmoji = pendingEmoji.find(({ id }) => id === args.toString());
		if (newEmoji) {
			const filtered = pendingEmoji.filter((emj) => {
				return emj.id !== newEmoji.id;
			});
			const newPending = { newEmoji: filtered };
			fs.writeFile(
				'db/pending-emoji.json',
				JSON.stringify(newPending, null, 2),
				(err) => {
					if (err) throw err;
				}
			);
			console.log('Adding new Emoji');
			console.log(newEmoji);
			msg.channel.guild.emojis
				.create(newEmoji.url, newEmoji.name)
				.then((emoji) =>
					console.log(`Created new emoji with name ${emoji.name}`)
				)
				.catch(console.error);
		}
	},
};
