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

          const EM = new MessageEmbed()
            .setTitle("Global Chat: Connecting Servers.")
            .setColor("GREEN")
            .setAuthor(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true })
            )
            .setDescription(`Message:\n${message.content}.`)
            .addField(
              `Tips:`,
              `[Vote Me](https://top.gg/bot/${client.user.id}/vote)`
            )
            .addField(
              `Guild Info:`,
              `Message from ${message.guild.name} | ServerID: ${message.guild.id}. | Member Count: ${message.guild.memberCount}`
            )
            .setFooter(
              message.guild.id,
              message.guild.iconURL({
                dynamic: true,
              })
            )

          otherCh.send({
            embeds: [EM],
          })
        }
      })
    }
  }
})
