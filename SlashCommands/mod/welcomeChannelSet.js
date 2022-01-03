const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const welcomeChModel = require("../../models/welcomeChannelModel.js")

module.exports = {
  name: "setwelcomechannel",
  description:
    "Set a Welcome Channel & everytime someone joins bot will make sure to greet them :)",
  type: "CHAT_INPUT",
  category: "mainFeatures",
  userPerms: ["ADMINISTRATOR"],
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "channel",
      description: "Add a Channel to set as the Welcome Channel",
      type: "CHANNEL",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    await interaction.followUp({
      content: `Sorry, Bot lacks Permission to detect events.\nThis Command won't work for a while. Please wait until bot gets Permissions from Discord `,
    })

    /*   const channelId = args[0]
    const guildId = interaction.guild.id

    const a = await welcomeChModel.findOne({
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
            await welcomeChModel.findOneAndUpdate(
              {
                guildId,
              },
              {
                channelId,
              }
            )
            await i.update({
              content: `Setted Up the New Welcome Channel to <#${channelId}> from <#${a.channelId}>!`,
              components: [],
              embeds: [],
            })
            collector.stop()
          } else if (i.customId === "DontCreateNewChannel") {
            await i.update({
              content: `Action Denied! Welcome Channel is still same: <#${channelId}>.`,
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
        .setTitle("Set Welcome Channel")
        .setColor("RANDOM")
        .setAuthor({
          name: client.user.username,
          url: client.user.avatarURL({ dynamic: true }),
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription("Some Error Occurred while the execution!")
        .addField(
          "Error:",
          `There is Already a Welcome Channel (<#${a.channelId}>)`
        )
        .addField("Info", `Use Buttons below to continue or Abort the command.`)
        .setFooter({ text: "Timeout for Buttons: 40secs" })

      await msg.edit({
        embeds: [AEm],
        components: [newRow],
      })
    } else {
      await welcomeChModel.create({
        guildId,
        channelId,
      })

      const EM = new MessageEmbed()
        .setTitle("Setup Done!!")
        .setColor("GREEN")
        .setAuthor({
          name: client.user.username,
          url: client.user.avatarURL({ dynamic: true }),
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setDescription(`New Welcome Channel set to <#${channelId}>!`)

      msg.edit({
        content: `Done! <#${channelId}>.`,
        embeds: [EM],
      })
    }
    }*/
  },
}
