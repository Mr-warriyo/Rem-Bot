const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const chatbotModel = require("../../models/chatbotModel")

module.exports = {
  name: "setchatbotchannel",
  description: "Set a Chatbot Channel & stop using `/chat` command.",
  type: "CHAT_INPUT",
  category: "mainFeatures",
  userPerms: ["ADMINISTRATOR"],
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "channel",
      description: "Add a Channel to set ChatBot",
      type: "CHANNEL",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const channelId = args[0]
    const guildId = interaction.guild.id

    const a = await chatbotModel.findOne({
      guildId,
    })

    const msg = await interaction.followUp({
      content: "Wait a second, I'm Fetching some Data!",
    })

    if (a) {
      const newRow = new MessageActionRow()

      newRow.addComponents(
        new MessageButton()
          .setLabel("Create New Channel")
          .setStyle("DANGER")
          .setCustomId("CreateNewChannel")
      )

      newRow.addComponents(
        new MessageButton()
          .setLabel("Dont Create New Channel")
          .setStyle("DANGER")
          .setCustomId("DontCreateNewChannel")
      )

      const channelAlreadyExists = () => {
        const filter = (i) => i.user.id === interaction.user.id

        const collector = interaction.channel.createMessageComponentCollector({
          filter,
          time: 40000,
        })

        collector.on("collect", async (i) => {
          if (i.customId === "CreateNewChannel") {
            await chatbotModel.findOneAndUpdate(
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
              embeds: [],
            })
            collector.stop()
          } else if (i.customId === "DontCreateNewChannel") {
            await i.update({
              content: `Action Denied! Global Chat Channel is still same: <#${channelId}>.`,
              components: [],
              embeds: [],
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

      const AEm = new MessageEmbed()
        .setTitle("Set Chatbot Channel")
        .setColor("RANDOM")
        .setAuthor(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription("Some Error Occurred while the execution!")
        .addField(
          "Error:",
          `There is Already a Chatbot Channel (<#${a.channelId}>)`
        )
        .addField("Info", `Use Buttons below to continue or Abort the command.`)
        .setFooter("Timeout for Buttons: 40secs")

      await msg.edit({
        embeds: [AEm],
        components: [newRow],
      })
    } else {
      await chatbotModel.create({
        guildId,
        channelId,
      })

      const EM = new MessageEmbed()
        .setTitle("Setting Up ChatBot!")
        .setColor("GREEN")
        .setAuthor(
          client.user.username,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setDescription(`New ChatBot Channel set to <#${channelId}>!`)

      msg.edit({
        content: `Done! <#${channelId}>.`,
        embeds: [EM],
      })
    }
  },
}
