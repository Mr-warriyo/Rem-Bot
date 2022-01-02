const Discord = require("discord.js")
const pkg = require("../../package.json")
const { version: discordjsVersion } = require("discord.js")

module.exports = {
  name: "stats",
  description: "Shows the stats of the bot",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "settings",
  execute: async (client, interaction, args) => {
    let seconds = Math.floor(client.uptime / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    seconds %= 60
    minutes %= 60
    hours %= 24

    const em = await interaction.followUp({
      content: `Calculating the Statistics of the Bot!`,
    })

    const statembed = new Discord.MessageEmbed()
      .setTitle("Bot Stats")
      .setThumbnail(
        client.user.displayAvatarURL({
          dynamic: true,
        })
      )
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(`Rem Bot's Statistics`)
      .addField(
        "Total Servers:",
        `I am in ${client.guilds.cache.size} server(s)`
      )
      .addField(
        "Version:",
        `Node.js: ${process.version}\nDiscord.js: ${discordjsVersion}\nBot Version: ${pkg.version} running on ${pkg.platform}`
      )
      .addField("My Creation Date:", `2/8/2021`)
      .addField(
        "Uptime:",
        `${days} day(s), ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      )
      .addField(
        "Ping:",
        `Bot's Latency is ${
          em.createdTimestamp - interaction.createdTimestamp
        }ms.\nBot's ping is ${Math.round(client.ws.ping)}ms.`
      )
      .addField(
        "Memory:",
        `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(
          process.memoryUsage().heapUsed /
          1024 /
          1024
        ).toFixed(2)} MB Heap`
      )
      .setTimestamp()

    em.edit({
      content: "Calculated the Statistics!!",
      embeds: [statembed],
    })
  },
}
