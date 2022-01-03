const client = require("../Rem")
const globalChatModel = require("../models/globalChatModel")
const { MessageEmbed } = require("discord.js")

client.on("messageCreate", async (message) => {
  if (message.author.bot) return
  const channelId = message.channel.id
  const guildId = message.guild.id

  const a = await globalChatModel.findOne({
    guildId,
  })

  if (!a) return
  if (a) {
    if (message.channel.id === a.channelId) {
      client.guilds.cache.forEach(async (guild) => {
        const b = await globalChatModel.findOne({
          guildId: guild.id,
        })

        if (!b) return
        if (b) {
          const otherSr = client.guilds.cache.get(guild.id)
          const otherCh = otherSr.channels.cache.get(b.channelId)

          if (message.attachments) console.log(message.attachments.url)

          const EM = new MessageEmbed()
            .setTitle("Global Chat: Connecting Servers.")
            .setColor("RANDOM")
            .setAuthor({
              name: message.author.tag,
              url: message.author.avatarURL({ dynamic: true }),
              iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField(
              `Message:`,
              `\n${message.content || "*(System: User did not add any text)*"}`
            )
            .addField(
              `Links:`,
              `\n[Support Server](https://discord.gg/m9q39CZuHv)\n[Top.gg](https://top.gg/bot/${client.user.id})
              `
            )
            .setFooter({
              text: `Server Name: ${message.guild.name} | Server ID: ${message.guild.id} | Member Count: ${message.guild.memberCount}`,
            })
            .setTimestamp()

          otherCh.send({
            embeds: [EM],
          })
        }
      })
    }
  }
})
