async function start(msg, groupSize, breakDuration, halftimeBreakDuration) {
    // queuing members of voice channel from message author
    let queue = group_channel_voice.members.array();
    let fillable_channels = [];
    let full_channels = [];

    for (let i = 0; i < queue.length / groupSize; i++) {
        fillable_channels.push(createChannel("SPEED DATE #" + i, msg.guild.channels));
    }

    try {
        // wait for all channels to be created
        fillable_channels = await Promise.all(fillable_channels);
    } catch (err) {
        //TODO: error handling lel
    }

    let channel_index = 0;

    while (queue.length > 0) {
        //TODO
    }

    for (let ch of fillable_channels) {
        do {
            let user = queue.pop();
            moveTo(user, ch);
        } while (queue.length % dudes_count !== 0)
    }
}