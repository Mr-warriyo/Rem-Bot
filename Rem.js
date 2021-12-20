const { Client, Intents } = require("discord.js")
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})
const { token } = require("./settings/config.json")

client.on("ready", () => {
  client.user.setActivity("New Features Soon!")
  console.log(`Logged In as ${client.user.tag}!`)
})

client.login(token)
