const channels = require("./channels");
const { Message } = require("discord.js");
const matching = require("./matching");

/**
 * @param {Message} msg 
 * @param {number} groupSize 
 * @param {number} roundDuration 
 * @param {number} halftimeBreakDuration 
 */
async function start(msg, groupSize, roundDuration) {
    console.log("START CALLED");
    await channels.deleteAllOn(msg.guild.id, msg.guild.channels);


    // using voice channel of message author
    const group_channel_voice = msg.member.voice.channel;

    let group_channel_text = await channels.createChannel("SpeedDating", msg.guild.channels, "text");
    group_channel_text.send("Willkommen zum SpeedDating!");
    group_channel_text.send("Gleich geht es los!");


    let matchingInstance = await matching.matchSetup(
        group_channel_voice.members.array(), 
        groupSize, 
        roundDuration, 
        group_channel_voice, 
        group_channel_text, 
        msg.guild);

    matchingInstance.play();
    console.log("Start END");
}

module.exports = start;
