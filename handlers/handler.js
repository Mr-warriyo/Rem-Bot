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
    client.guilds.cache.forEach(async (guild) => {
      try {
        console.log("Slash Registered:", guild.name, guild.id)
        await client.guilds.cache
          .get(guild.id)
          .commands.set(arrayOfSlashCommands)
      } catch (err) {
        console.log(
          "w/out perms(Slash cmd not registered):",
          guild.name,
          guild.id,
          `\n${err}`
        )
      }
    })
  })

  // If bot joins a guild
  client.on("guildCreate", async (guild) => {
    try {
      await client.guilds.cache.get(guild.id).commands.set(arrayOfSlashCommands)
      console.log(
        "Joined & Registered Slash Command for Server:",
        guild.name,
        guild.id
      )
    } catch (err) {
      console.log(
        "Someone Invited me w/out perms(Slash cmd not registered):",
        guild.name,
        guild.id,
        `\n${err}`
      )
    }
  })
}
