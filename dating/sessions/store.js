const fs = require("fs").promises;
const { VoiceChannel } = require("discord.js");

/**
 * @param {string} guild_id 
 */
async function getAllOn(guild_id) {
    let data = await read();

    if (data[guild_id] !== undefined) {
        return data[guild_id];
    }

    throw new Error("No channels on this server");
}

/**
 * @param {string} guild_id 
 */
async function unregisterAllOn(guild_id) {
    let data = await read();
    let last = data[guild_id];
    console.log(last);
    for(let dataPoint of last){
        await unregister(guild_id, dataPoint);
    }
    return last;
}

/**
 * @param {VoiceChannel} channel 
 */
async function registerChannel(channel) {
    return register(channel.guild.id, channel.id);
}

/**
 * @param {VoiceChannel} channel 
 */
async function unregisterChannel(channel) {
    return unregister(channel.guild.id, channel.id);
}

async function register(guildId, channelId) {
    let store = await read();

    if (store[guildId] === undefined) {
        store[guildId] = [];
    }

    store[guildId].push(channelId);
    return write(store);
}

async function unregister(guildId, channelId) {
    console.log("unregister " + channelId);
    let store = await read();

    if (store[guildId] === undefined) {
        store[guildId] = [];
    }

    store[guildId] = store[guildId].filter(item => item !== channelId);
    console.log("now stored: " + store[guildId]);
    return write(store);
}

async function read(path = "../storage.json") {
    let data = await fs.readFile(path, "UTF-8");
    data = data.toString();
    data = JSON.parse(data);
    return data;
}

async function write(data, path = "../storage.json") {
    if (typeof data !== "string") {
        data = JSON.stringify(data);
    }

    try {
        return fs.writeFile(path, data, "UTF-8");
    } catch (ex) {
        console.error("Couldn't write file\n" + ex);
    }
    return false;
}

module.exports = {
    register: register,
    unregister: unregister,
    registerChannel: registerChannel,
    unregisterChannel: unregisterChannel,
    unregisterAllOn: unregisterAllOn,
    getAllOn: getAllOn
}