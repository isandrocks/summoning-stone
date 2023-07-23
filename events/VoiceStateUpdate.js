const { Events, } = require('discord.js');
const { summonid } = require('../config.json');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldMember, newMember) {

        const client = oldMember.client;
        const summon = client.channels.cache.get(summonid);

        const summonMsgs = await summon.messages.fetch({ limit: 100, cache: false });

        try {
            await summonMsgs.forEach((msg) => {
                if (msg.mentions.has(newMember.id)) {
                    msg.delete();
                    client.summons.delete(`<@${newMember.id}>`);
                }
            });
        } catch (error) {
            console.error(`ERROR FROM VOICE STATE UPDATE: ${error}`);
        }
    }
};