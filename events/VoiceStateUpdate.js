const { Events, } = require('discord.js');
const { summonid } = require('./config.json');

module.exports = {
    name: Events.voiceStateUpdate,
    async execute(oldMember, newMember) {
        const client = oldMember.client;
        const summon = client.channels.cache.get(summonid);
        summon.messages.cache.forEach((msg) => {
            if (msg.mentions.has(newMember.id)) {
                msg.delete();
            }
        });
    }
};