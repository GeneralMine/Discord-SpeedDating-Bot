const channels = require("./channels");
const { Message } = require("discord.js");
const matching = require("./matching");
//const frech = require("./auslagernFRECH");

/**
 * @param {Message} msg 
 */
function stop(msg) {
    //console.log(frech.instance);
    //frech.instance.stop();
    console.log(matching.instance);
    matching.instance.stop();
}


module.exports = stop;