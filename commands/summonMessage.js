const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { summonid } = require('../config.json');
const { members } = require('../db/members.json');

const buttonArray = [];

members.forEach((ele, i) => {
    buttonArray.push(new ButtonBuilder()
        .setCustomId(members[i].name)
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(members[i].emoji));
});

const actionRow = new ActionRowBuilder()
    .addComponents(buttonArray);

const summonEmbed = new EmbedBuilder()
    .setColor('#2b2d31')
    .setTitle('\u200B')
    .setThumbnail('https://i.imgur.com/aRnOYfm.png')
    .setFields({ name: 'Click the button to Summon', value: '\u200B', inline: true });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('summon-msg')
        .setDescription('Posts the main Summoning Stone message that members can use to summon others.'),
    async execute(interaction) {
        const sumChannel = interaction.channels.cache.get(summonid);

        sumChannel.send({
            embeds: [summonEmbed],
            components: [actionRow],
        });

    }

};