const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const globalChatModel = require("../../models/globalChatModel")

module.exports = {
  name: "setglobalchannel",
  description: "Set a Global Chat Channel for this Server.",
  type: "CHAT_INPUT",
  category: "mainFeatures",
  userPerms: ["ADMINISTRATOR"],
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "channel",
      type: "CHANNEL",
      description: "Select the Channel to set Global Chat.",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const channelId = args[0]
    const guildId = interaction.guild.id

    const a = await globalChatModel.findOne({
      guildId,
    })

    const c = await interaction.guild.channels.cache.get(channelId)
    if (c.type != "GUILD_TEXT") {
      return interaction.followUp({
        content:
          "Provided channel must be TEXT CHANNEL not CATEGORY, NEWS CHANNEL, ANNOUNCEMENT CHANNEL, VOICE CHANNEL or any Others.",
      })
    } else {
      const msg = await interaction.followUp({
        content: "Wait a second, I'm Fetching some Data!",
      })

      if (a) {
        const caeRow = new MessageActionRow()

        const channelAlreadyExists = () => {
          caeRow.addComponents(
            new MessageButton()
              .setLabel("Create new & Delete current.")
              .setStyle("SUCCESS")
              .setCustomId("CreateNewChannel")
          )
          caeRow.addComponents(
            new MessageButton()
              .setLabel("Dont Create new, old is gold :)")
              .setStyle("DANGER")
              .setCustomId("DontCreateNewChannel")
          )

          const filter = (i) => i.user.id === interaction.user.id

          const collector = interaction.channel.createMessageComponentCollector(
            {
              filter,
              time: 40000,
            }
          )

          collector.on("collect", async (i) => {
            if (i.customId === "CreateNewChannel") {
              await globalChatModel.findOneAndUpdate(
                {
                  guildId,
                },
                {
                  channelId,
                }
              )
              await i.update({
                content: `Setted Up the New Global Chat Channel to <#${channelId}> from <#${a.channelId}>!`,
                components: [],
              })
              collector.stop()
            } else if (i.customId === "DontCreateNewChannel") {
              await i.update({
                content: `Action Denied! Global Chat Channel is still same: <#${channelId}>.`,
                components: [],
              })
              collector.stop()
            }
          })

          collector.on("end", async (collected) => {
            if (collected.size <= 0) {
              await msg.edit({
                components: [],
                content: `User did not choose any option before timeout. Use cmd again if you want to set a Channel & be FAST!`,
              })
            }
          })
        }

        channelAlreadyExists()
        await msg.edit({
          content: `Server already has a Global Chat Channel (<#${a.channelId}>)!\nDo you want to continue Anyways? Use buttons which are provided below.\nTimeout for Buttons: 40seconds.`,
          components: [caeRow],
        })
      } else {
        await globalChatModel.create({
          guildId,
          channelId,
        })

        const EM = new MessageEmbed()
          .setTitle("Setting Up Global Chat!")
          .setColor("GREEN")
          .setAuthor({
            name: client.user.username,
            url: client.user.avatarURL({ dynamic: true }),
            iconURL: client.user.displayAvatarURL({ dynamic: true }),
          })
          .setDescription(`New Global Chat Channel set to <#${channelId}>!`)

        msg.edit({
          content: `Done! <#${channelId}>.`,
          embeds: [EM],
        })
      }
    }
  },
}
