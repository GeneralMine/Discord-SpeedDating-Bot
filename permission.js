const { Client } = require("discord.js");

/**
 * Loads stuff
 * @param {Client} client 
 */
function load(client) {
    let servers = {};

    for (let server of client.guilds.cache.array()) {
        const id = server.id;
        servers[id] = {};

        for (let role of server.roles.cache.array()) {
            servers[id][role.name] = role.position;
        }
    }

    return servers;
}

module.exports = load;
