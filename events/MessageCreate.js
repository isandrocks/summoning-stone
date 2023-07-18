const { Events, } = require('discord.js');
const { summonid, modid } = require('../config.json');
const allMembers = require('../db/members.json');
const members = allMembers.members;


module.exports = {
    name: Events.MessageCreate,
    async execute(msg) {
            const client = msg.client;
            const summon = client.channels.cache.get(summonid);
            const mod = client.channels.cache.get(modid);
            const userID = msg.author.id;

            //	Delete a summon if the user sends a message
            summon.messages.cache.forEach((msssage) => {
                if (msssage.mentions.has(userID)) {
                    msssage.delete();
                }
            });

            //	Check for command prefix
            if (!msg.content.startsWith('!')) return;

            const args = msg.content.slice('!'.length).trim().split(/ +/);
            const command = args.shift();
            //	Global Commands
            if (!msg.author.bot) {
                switch (command) {
                    case 'help':
                        // msg.channel.send(helpEmbed);
                        client.commands.get('help').execute(msg);
                        break;
                    case 'clear':
                        client.commands.get('clearChannel').execute(msg.channel);
                        break;
                    case 'addsummon':
                        client.commands.get('reqSummon').execute(msg, members, mod);
                        break;
                    case 'addemoji':
                        client.commands.get('reqEmoji').execute(msg, members, mod);
                        break;
                    default:
                        break;
                }
                // if(msg.content.startsWith(prefix + command)) client.commands.get(command).execute(msg, members, mod);
            }
            //	Mod Channel Commands
            if (msg.channel.id == mod && msg.author.bot) {
                const pend = args.toString();

                switch (
                command //	If a command needs approval, create reactions for easy approval
                ) {
                    case 'Approval':
                        msg.react('👍').then(() => msg.react('👎'));
                        break;
                    case 'Approved':
                        if (pend.endsWith('S')) {
                            //	Add user to Summoning Stone
                            client.commands.get('addSummon').execute(args);
                            client.commands.get('clearChannel').execute(summon);
                            client.commands.get('summonMessage').execute(summon);
                        }
                        else if (pend.endsWith('E')) {
                            //	Add custom emoji
                            client.commands.get('addEmoji').execute(msg, args);
                        }
                        break;
                    case 'Rejected':
                        console.log('Request rejected.');
                        break;
                }
            }
        }
};