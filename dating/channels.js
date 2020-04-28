const { GuildChannelManager, GuildMember } = require("discord.js");
const store = require("./sessions/store");

module.exports.createChannel = createChannel;
module.exports.deleteChannel = deleteChannel;
module.exports.deleteAllOn = deleteAllOn;
module.exports.moveTo = moveTo;

/**
 * @param {string} server_id - msg.guild.id zB
 * @param {GuildChannelManager} channels 
 */
async function deleteAllOn(server_id, channels) {
    console.log("DeletingAllOn...");
    let all_channels = channels.cache.array();
    let deletedChannels = await store.unregisterAllOn(server_id);
    console.log("DeletedChannels: " + deletedChannels);
    await deletedChannels.map(el => channels.resolve(el)).map(el => el.delete());
    
    /*
    let allOn = (await Promise.all(store.unregisterAllOn(server_id)))
        .map(el => channels.resolve(el))
        .map(el => el.delete());
    */
}

/**
 * 
 * @param {string} msg 
 * @param {GuildChannelManager} channels
 */
async function createChannel(name, channels, channelType) {
    console.log("CREATING CHANNELS");
    let channel = await channels.create(name, { type: channelType });
    store.registerChannel(channel);
    return channel;
}

/**
 * 
 * @param {string} msg 
 * @param {GuildChannelManager} channels
 */
async function deleteChannel(id, channels) {
    let channels_with_id = channels.cache.array().filter((el) => el.id === id);

    if (channels_with_id.length === 1) {
        let ch = channels_with_id[0];

        let c_id = ch.id;
        let g_id = ch.guild.id;

        let ok = await ch.delete();

        if (ok) {
            store.unregister(g_id, c_id);
        }

        return true;
    } else {
        console.error("Have " + channels_with_id.length + " channels with this ID");
        return false;
    }
}

/**
 * 
 * @param {GuildMember} dude
 * @param {VoiceChannel} channel 
 * @returns {Promise<GuildMember>}
 */
async function moveTo(user, channel) {
    console.log("move user " + user.id + " to " + channel);

    try {
        await user.voice.setChannel(channel);
        return true;
    } catch (ex) {
        return false;
    }
}

