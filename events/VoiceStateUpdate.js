const { Events, } = require('discord.js');
const { summonid } = require('../config.json');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldMember, newMember) {
        console.log(newMember);
        const client = newMember.client;
        const summon = client.channels.cache.get(summonid);

        console.log(client);

        summon.messages.cache.forEach((msg) => {
            if (msg.mentions.has(newMember.id)) {
                msg.delete();
            }
        });
    }
};