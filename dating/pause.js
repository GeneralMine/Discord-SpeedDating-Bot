const channels = require("./channels");
const { Message } = require("discord.js");
const matching = require("./matching");

/**
 * @param {Message} msg 
 */
function pause(msg) {
    matching.instance.pause();
}


module.exports = pause;