const client = require("../Rem")
const globalChatModel = require("../models/globalChatModel")
const { MessageEmbed } = require("discord.js")

// BadWords Detection:
const Filter = require("bad-words")
const filter = new Filter({
  placeHolder: "*",
})

// Image Detection:
const deepai = require("deepai")
const { DEEPAI_API_KEY } = require("../settings/config.json")
deepai.setApiKey(DEEPAI_API_KEY)

client.on("messageCreate", async (message) => {
  if (message.author.bot) return

  const channelId = message.channel.id
  const guildId = message.guild.id

  const a = await globalChatModel.findOne({
    guildId,
  })

  if (a) {
    if (message.channel.id === a.channelId) {
      const usersMap = new Map()
      const LIMIT = 7
      const DIFF = 5000

      if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id)
        const { lastMessage, timer } = userData
        const difference =
          message.createdTimestamp - lastMessage.createdTimestamp
        let msgCount = userData.msgCount

        if (difference > DIFF) {
          clearTimeout(timer)
          console.log("Cleared Timeout")
          userData.msgCount = 1
          userData.lastMessage = message
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id)
            console.log("Removed from map.")
          }, TIME)
          usersMap.set(message.author.id, userData)
        } else {
          ++msgCount
          if (parseInt(msgCount) === LIMIT) {
            message.reply({
              content: "Warning: Spamming in this channel is forbidden.",
            })
            message.channel.bulkDelete(LIMIT)
            return false
          } else {
            userData.msgCount = msgCount
            usersMap.set(message.author.id, userData)
          }
        }
      }

      if (
        message.content.includes("http") ||
        message.content.includes("discord.gg")
      ) {
        message.reply({
          content:
            "Sorry, you are not allowed to send any kind of Links in Global Chat!\nIf this is a gif or image, please send it in a form of attached file/image. Thanks.",
        })
        return false
      }

      let cleanedText
      if (message.content) {
        try {
          cleanedText = filter.clean(message.content)
        } catch (err) {
          console.log(err)
          message.reply({
            content: "Sorry, I was unable to detect any text in this Message.",
          })
          return false
        }
      }

      if (message.content.length >= 1024) {
        message.reply({
          content: `Sorry, You cannot send a message having more than 1024 characters. :(`,
        })
        return false
      }

      if (message.attachments.size) {
        const imgs = JSON.stringify(...message.attachments.values())
        for (rem = 0; rem < message.attachments.size; rem++) {
          const image =
            message.attachments.at(rem).url ||
            message.attachments.at(rem).proxyURL

          const resp = await deepai
            .callStandardApi("nsfw-detector", {
              image,
            })
            .catch((err) => {
              message.reply({
                content:
                  "Some Error Occured with Image Detection Side.\nPlease Try Again Later or contact my dev via my support server.\n\nDev Usernames: `@Akshansh#2200`, `@Elon Dominican#2663`.",
              })
              console.log(err)
              return false
            })

          if (!resp.output) return
          if (resp.output.nsfw_score >= 0.7) {
            message.reply({
              content:
                "Your message has a NSFW image, Please dont send it. Your message was not sent to any servers.",
            })
            return false
          }
        }
      }

      client.guilds.cache.forEach(async (guild) => {
        const b = await globalChatModel.findOne({
          guildId: guild.id,
        })

        if (b) {
          const otherSr = client.guilds.cache.get(guild.id)
          const otherCh = otherSr.channels.cache.get(b.channelId)

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
              `\n${cleanedText || "*(System: User did not add any text)*"}`
            )
            .addField(
              `Links:`,
              `\n[Support Server](https://discord.gg/m9q39CZuHv)\n[Top.gg](https://top.gg/bot/${client.user.id})
              `
            )
            .addField(
              `User Note:`,
              `\n*1. Don't Download any Files sent in Global Chat, If it is some harmfull file, we will not be responsible for it.*`
            )
            .setFooter({
              text: `Server Name: ${message.guild.name} | Server ID: ${message.guild.id} | Member Count: ${message.guild.memberCount}`,
            })
            .setTimestamp()

          otherCh.send({
            embeds: [EM],
            files: [...(message.attachments.values() || null)],
          })
        }
      })
    }
  }
})
