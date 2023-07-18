module.exports = {
	data: 'summonMessage',
	description:
		'Posts the main Summoning Stone message that members can use to summon others.',
	async execute(summon) {
		console.log('Summoning Stone online...');
		// Update member list
		delete require.cache[require.resolve('../db/members.json')];
		const allMembers = require('../db/members.json');
		const members = allMembers.members;
		// Initial Reactions
		summon.send('React to Summon').then((message) => {
			members.forEach((member) => {
				message.react(member.emoji);
			});
		});
	},
};
