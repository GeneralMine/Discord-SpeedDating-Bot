const { Message, GuildMember } = require("discord.js");
const { join } = require("path");
const fs = require("fs");

let client = undefined;
let servers = {};
const commands = {};
const permission = require("./permission");

function load(path = "./commands") {
    let content = fs.readdirSync(path);

    for (let file of content) {
        let fullpath = join(__dirname, path, file);

        if (isJS(fullpath)) {
            let cmd = require(fullpath);
            commands[cmd.name] = cmd;
            console.log("Added: " + cmd.name);
        }
    }
}

function isJS(path) {
    let stat = fs.statSync(path);
    return (stat.isFile() && path.endsWith(".js"));
}

/**
 * @param {Message} msg
 */
function handle(msg) {
    // console.log("content", msg.content);

    let split = msg.content.split(" ");
    let splitFirst = split.length > 0 ? split[0] : undefined;

    // console.log(splitFirst);

    if (splitFirst) {
        let cmd = commands[splitFirst];

        if (cmd) {
            if (hasPermission(msg.member, cmd)) {
                cmd.run(msg);
            } else {
                msg.reply("du hast nicht ausreichende Rechte diesen Befehl zu benutzen!")
            }
        } else {
            msg.reply("'" + splitFirst + "'" + " diesen Befehl gibt es nicht. Eine Übersicht gibt es mit 'help'");
            msg.react("❓");
        }
    } else {
        console.error("WTF");
    }
}

/**
 * 
 * @param {GuildMember} user 
 * @param {*} command 
 */
function hasPermission(user, command) {
    const highest = user.roles.highest.position;
    const neededPermission = servers[user.guild.id][command.permission];
    return highest >= neededPermission;
}

//Loads commmands before connecting
load();

module.exports = {
    cmdHandler: handle,
    loadPermissions: (client) => {
        servers = permission(client);
    }
};
