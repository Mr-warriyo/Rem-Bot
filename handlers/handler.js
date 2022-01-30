const { glob } = require("glob")
const { promisify } = require("util")
const { Client } = require("discord.js")
const { Permissions } = require("discord.js")

const globPromise = promisify(glob)

module.exports = async (client) => {
  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`)
  eventFiles.map((value) => require(value))

  // Slash Commands
  const slashCommands = await globPromise(
    `${process.cwd()}/SlashCommands/*/*.js`
  )

  const arrayOfSlashCommands = []
  slashCommands.map((value) => {
    const file = require(value)
    if (!file?.name) return
    client.slashCommands.set(file.name, file)

    if (["MESSAGE", "USER"].includes(file.type)) delete file.description
    arrayOfSlashCommands.push(file)
  })
  client.on("ready", async () => {
    await client.application.commands.set(arrayOfSlashCommands)
    await client.guilds.cache
      .get("925389763572301835")
      .commands.set(arrayOfSlashCommands)

    console.log("[Slash Commands] Registered!")
  })
}
