function run(msg) {
    msg.reply(msg.content);
}

module.exports.name = "echo";
module.exports.run = run;
module.exports.permission = "@everyone";