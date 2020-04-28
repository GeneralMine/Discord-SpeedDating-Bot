const { Message, GuildMember, GuildChannelManager, VoiceChannel } = require("discord.js");

const membersHandler = require("./statistics/members");
const channelcountHandler = require("./statistics/channelcount");


async function run(msg) {
    let args = msg.content.split(" ");
    args.shift(); // get rid of command it self, to only store the parameters

    // get action from args
    switch (args.shift()) {
        case "members":
            membersHandler(msg);
            break;
        case "channelcount":
            channelcountHandler(msg);
            break;
        case "pause":
            break;
        case "play":
            break;
        default:
            msg.reply("Diese Aktion kenne ich nicht.")
            break;
    }
}

module.exports.name = "statistics";
module.exports.run = run;
module.exports.permission = "@everyone";