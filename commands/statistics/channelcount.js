const { Message } = require("discord.js");

/**
 * @param {Message} msg 
 */
async function start(msg) {
    console.log("Channelcount CALLED");

    // using voice channel of message author
    const group_channel_voice = msg.member.voice.channel;

    const group_channel_text = msg.guild.channels.cache.find(ch => ch.name === 'allgemein');
    if (!group_channel_text) return;
    group_channel_text.send("In dem Voice Channel: " + group_channel_voice.toString + " sind " + group_channel_voice.members.length + " Teilnehmer!");

    console.log("Channelcount END");
}

module.exports = start;
