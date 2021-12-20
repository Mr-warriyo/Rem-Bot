const { Client, Intents } = require("discord.js")
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on("ready", () => {
  client.user.setActivity("New Features Soon!")
  console.log(`Logged In as ${client.user.tag}!`)
})

client.login("ODA4MjYwNjEwOTI0MDg1MzA5.YCD9Wg.rv5d_kG1PXzMW0iApyQbGLmodNU")
