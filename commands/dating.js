const { Message, GuildMember, GuildChannelManager, VoiceChannel } = require("discord.js");

const startHandler = require("../dating/start");
const stopHandler = require("../dating/stop");
const pauseHandler = require("../dating/pause");
const playHandler = require("../dating/play");

/**
 * 
 * @param {Message} msg 
 * 
 * command parameters:
 * [action] [params]
 * start [groupSize] [breakDuration] [halftimeBreakDuration]
 */
async function run(msg) {
    let args = msg.content.split(" ");
    args.shift(); // get rid of command it self, to only store the parameters

    // get action from args
    switch (args.shift()) {
        case "start":
            let groupSize = args.shift();
            let roundDuration = args.shift();

            startHandler(msg, groupSize, roundDuration);
            break;
        case "stop":
            stopHandler();
            break;
        case "pause":
            pauseHandler();
            break;
        case "play":
            playHandler();
        default:
            msg.reply("Diese Aktion kenne ich nicht.")
            break;
    }
}




// send broadcast to all speed dating members to inform e.g. about next round, break or ending
function broadcast(msg) {

}

module.exports.name = "dating";
module.exports.permission = "Community Builder";
module.exports.run = run;