const { Events, } = require('discord.js');
const { summonid } = require('../config.json');
const allMembers = require('../db/members.json');
const members = allMembers.members;

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {
        const channel = reaction.message.channel;
        const client = reaction.client;

        if (user.bot) return;

        //	Only checks for human reacts in these channels
        if (channel.id == summonid) {
            client.commands.get('summonMember').execute(reaction, user, members);
        }
        //	Mod channel acceptance/rejection
        if (channel.id == summonid) {
            client.commands.get('modReview').execute(reaction);
        }
    }
};