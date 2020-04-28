const { Message } = require("discord.js");
const matching = require("./matching");

/**
 * @param {Message} msg 
 */
function pause(msg) {
    matching.instance.play();
}


module.exports = pause;