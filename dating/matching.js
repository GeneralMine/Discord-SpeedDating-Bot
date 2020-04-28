const channels = require("./channels");
const { wait } = require("./scheduling");
const frech = require("./auslagernFRECH");
const {GuildMember, GuildChannelManager, VoiceChannel, TextChannel, GuildManager} = require("discord.js");

let exampleDuSpack =
{ // speeddate
    rounds:
        [
            {
                breakDuration: 999999,
                matches: [ // runde
                    { // match
                        channel: "id",
                        user: [
                            "a",
                            "b"
                        ]
                    }
                ]
            }
        ]
};

let instance = undefined;

/**
 * @param {GuildMember} members
 * @param {number} groupSizeGet
 * @param {number} roundDurationGet
 * @param {VoiceChannel} group_channel_voice
 * @param {TextChannel} group_channel_text
 * @param {GuildManager} guild
 */
async function matchSetup(members, groupSizeGet, roundDurationGet, group_channel_voice, group_channel_text, guild) {
    console.log("Running matchSetup...");
    this.channelsManager = guild.channels;
    this.groupSize = groupSizeGet;
    this.roundDuration = roundDurationGet;
    this.membersCount = members.length;
    this.groupsCount = this.membersCount / this.groupSize;
    this.playing = false;
    this.paused = false;
    this.availableChannels = [];
    this.participants = members;
    this.group_channel_voice = group_channel_voice;
    this.group_channel_text = group_channel_text;
    this.roundCounter = 0;
    console.log("Setup with groupSize " + this.groupSize + " and roundDuration " + this.roundDuration);

    for(let i = 0; i < this.groupsCount; i++){
        await this.availableChannels.push(await channels.createChannel("Speed Dating #" + i, this.channelsManager, "voice"));
    }
    
    this.group_channel_text.send("SpeedDating mit " + this.membersCount + " Personen daten wir jetzt für " + this.roundDuration + " Minuten in " + this.groupSize + "er Gruppen!");


    this.instance = this;

    this.play = async function () {
        console.log("Running play...");

        console.log("Playing with " + this.participants);

        if(this.playing || this.paused){
            return;
        } else{
            this.playing = true;
            this.paused = false;
        }

        while(this.playing && !this.paused){
            this.roundCounter++;
            this.group_channel_text.setName("speed-dating runde "+ this.roundCounter)
            console.log("playing with " + this.participants.length + " participants!-------------!");
            // for every dude
            for(let part of shuffle(this.participants)){
                // find availableChannel
                for(let channel of this.availableChannels){
                    console.log("Members in channel " + channel.id + " number: " + channel.members.size);
                    if(channel.members.size < this.groupSize){
                        // found channel with space
                        //console.log("move user " + part + " to " + channel.id)
                        await channels.moveTo(part, channel);  
                        break;
                    }
                }
            }

            if(!(this.playing && !this.paused))
                    return;
            
            this.group_channel_text.send("SpeedDating Runde #" + this.roundCounter + ": Start!");

            wait().minutes(this.roundDuration/2).and().then(() => {
                this.group_channel_text.send("SpeedDating Runde #" + this.roundCounter + ": Halbzeit!");
            });
            

            wait().minutes(this.roundDuration).minusSeconds(15).and().then(() => {
                this.group_channel_text.send("SpeedDating Runde #" + this.roundCounter + ": Endet in 15 Sekunden!");
            });
            await wait().minutes(this.roundDuration).and(); 
            
            this.group_channel_text.send("SpeedDating Runde #" + this.roundCounter + ": Vorbei!");
            
            for(let part of this.participants){
                if(!(this.playing && !this.paused))
                    return;
                if(channels.moveTo(part, this.group_channel_voice)) {
                    console.log("Nutzer wurde verschoben");
                } else {
                    console.log("Nutzer wurde nicht verschoben");
                }
            }
            await wait().seconds(3).and();
        }
    }
    
    
    // pausing the speed date
    this.pause = async function (){
        console.log("Running pause...");
        this.paused = true;
        for(let part of this.participants){
            channels.moveTo(part, this.group_channel_voice);
        }
        
    }
    
    // stopping the entire Speed Dating
    this.stop = async function (){
        console.log("Running stop...");


        this.playing = false;
        this.paused = true;    

        for(let part of this.participants){
            channels.moveTo(part, this.group_channel_voice);
        }
        await wait().seconds(1).and();
        
        channels.deleteAllOn(this.channelsManager.guild.id, this.channelsManager);

    }
    return this;
}

/**
 * @param {any[]} array
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    
    return array;
}

module.exports.instance = instance;
module.exports.matchSetup = matchSetup;