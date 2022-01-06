const { Client, Intents, Collection } = require("discord.js")
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
  params: ["CHANNEL"],
  restRequestTimeout: 60000,
})
const { token, prefix } = require("./settings/config.json")
const sdjs = require("sanikava-djs")

const db = require("sanikava-db.json")
db.File("./DB/database.json")

module.exports = db

module.exports = client

// Global Variables
client.commands = new Collection()
client.slashCommands = new Collection()
client.config = require("./settings/config.json")
client.sdjs = sdjs

// Initializing the project
require("./handlers/handler")(client)
console.log("Handler is Running!")

client.login(token)
