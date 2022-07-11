const {MessageEmbed, Client, Intents} = require("discord.js")
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], partials: ["CHANNEL"]})
require("dotenv").config()
const token = process.env.token
const modulesPath = "./modules/"
const commandsModule = require(modulesPath + "commands.js")
const prefix = "sdm$"
require(modulesPath + "server.js")()

client.on("messageCreate", (msg) => {
    if (msg.author.bot){return}
    const recognizedPrefix = msg.content.substring(0, prefix.length)
    if (recognizedPrefix === prefix){
        const messaged = msg.content.substring(prefix.length, msg.content.length)
        const commandFetched = commandsModule[messaged.split(" ")[0]]
        if (commandFetched){
            commandFetched.functionToRun(msg)
        }
    }
})

client.once("ready", () => {
    console.log("Ready")
})

client.login(token)