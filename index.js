require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const CONSTANTS = require("./constants");
const { cmdHandler, loadPermissions } = require("./cmdHandler");
const channels = require("./dating/channels");

console.clear();

client.on("ready", () => {
    console.log(`BOT VERBUNDEN: ${client.user.tag}`);
    console.log("Connected to:");
    client.guilds.cache.forEach(g => {
        channels.deleteAllOn(g.id, g.channels);
        console.log(" - " + g.name)
    });
    loadPermissions(client);
});

client.on("message", (msg) => {
    if (!msg.author.bot) {
        let userArray = msg.mentions.users.array();

        if (userArray.length > 0 && userArray[0].id === client.user.id) {
            const mention = `<@!${client.user.id}>`;

            if (msg.content.startsWith(mention)) {
                msg.content = msg.content.substring(mention.length).trim();
                cmdHandler(msg);
            }
        }
    }
});

client.login(process.env.TOKEN);