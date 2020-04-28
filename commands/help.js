function run(msg) {
    // returns list of commands
    msg.reply(msg.content);
}

module.exports.name = "help";
module.exports.permission = "@everyone";
module.exports.run = run;