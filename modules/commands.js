const {Client, Intents, Permissions} = require("discord.js")
const FunctionsModule = require("./functions.js")
const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})

module.exports = {
    help: {
        description : "Tells you all commands this bot has.",
        Arguments : "none",
        example : "sdm$help",
        functionToRun : function(msg){
            const allCommands = require("./commands.js")
            let msgToReplyWith = "My current commands are:"
            const tripleQuotes = "```"
            for (const name in allCommands){
               const command = allCommands[name]
               msgToReplyWith = msgToReplyWith + `${tripleQuotes}\nname: ${name}\ndescription: ${command.description}\narguments: ${command.Arguments}\nexample: ${command.example}${tripleQuotes}`
            }
            msg.reply(msgToReplyWith)
        }
    },
    timeout: {
        description : "Times out the user in minutes.",
        Arguments : "<user(ping)> <time> <reason>",
        example : "sdm$timeout @noob 5 my epic reason",
        functionToRun : function(msg){
           if (!msg.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)){
            msg.reply("do you even have permission to moderate members?")
            return
           }
           const split = msg.content.split(" ")
           const user = split[1]
           const time = split[2]
           let reason = ""
           for (let i = 3; i < split.length; i++){
             reason = reason + split[i] + " "
           }
           const member = msg.guild.members.cache.get(FunctionsModule.getUserIdFromTag(user))
           if (member){
            if (member.roles.highest.position >= msg.member.roles.highest.position){
                msg.reply("epic workaround to timeout hihger ranks :|")
                return
               }
            if (Number(time)){
                member.timeout(Number(time) * 60 * 1000, `Timed out by ${msg.author.tag}\nreason: ` + reason)
                .then(() => {msg.reply("Timed out user.")})
                .catch(() => {msg.reply("Could not time out user")})
            } else {
                msg.reply("Invalid time")
            }
           } else {
            msg.reply("Invalid user")
           }
        }
    },
    ban: {
        description: "Bans the user.",
        Arguments: "<user(ping)> <days(optional)> <reason>",
        example: "sdm$ban @noob stop being a clown",
        functionToRun: function(msg){
            if (!msg.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)){
                msg.reply("do you even have permission to ban members?")
                return
            }
            const split = msg.content.split(" ")
            const user = split[1]
            const time = split[2]
            let reason = ""
            for (let i = 3; i < split.length; i++){
              reason = reason + split[i] + " "
            }
            const member = msg.guild.members.cache.get(FunctionsModule.getUserIdFromTag(user))
            if (member){
                if (member.roles.highest.position >= msg.member.roles.highest.position){
                    msg.reply("epic workaround to ban hihger ranks :|")
                    return
                }
                let tableForBan = {
                    reason: `Banned by ${msg.author.tag}\nreason: ` + reason
                }
                if (Number(time)){
                    tableForBan["days"] = Number(time)
                }
                member.ban(tableForBan)
                .then(() => {msg.reply("Banned user.")})
                .catch((err) => {msg.reply("Could not ban user. " + err)})
            } else {
                msg.reply("Invalid member.")
            } 
        }
    },
    warn : {
        description : "Warns the user",
        Arguments : "<ping(user)> <message>",
        example : "sdm$warn @noob stop being a clown",
        functionToRun : (msg) => {
            const msgsplit = msg.content.split(" ")
            const user = msgsplit[1]
            let reason = ""
            for (let i = 2; i < msgsplit.length; i++){
                reason = reason + msgsplit[i] + " "
            }
            const member = msg.guild.members.cache.get(FunctionsModule.getUserIdFromTag(user))
            if (member){
                if (member.roles.highest.position >= msg.member.roles.highest.position){
                    msg.reply("epic workaround to warn hihger ranks :|")
                    return
                }
                const authorOfUserToWarn = member
                authorOfUserToWarn.send(`Warned by : ${msg.author.tag}\nreason:${reason}`)
                .then(() => {msg.reply("sent warning")})
                .catch(() => {msg.reply("Could not warn user. He either has DMS off or blocked me.")})
            } else {
                msg.reply("Invalid member.")
            }
        }
    },
    devex : {
        description : "Tells you the amount of dollars you would get from the amount of robux you inputted.",
        Arguments : "<robuxamount>",
        example : "sdm$devex 500",
        functionToRun : (msg) => {
            const robux = Number(msg.content.split(" ")[1])
            if (robux){
                msg.reply(`Amount of money : ${robux * 0.0035}$`)
            } else {
                msg.reply("Invalid robux")
            }
        }
    }
}