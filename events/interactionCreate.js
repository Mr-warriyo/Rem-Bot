const client = require("../Rem")
const { Permissions, MessageEmbed } = require("discord.js")
// const PermsArray = require("../permissionArray.js")

client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot) return
  if (interaction.isCommand()) {
    await interaction
      .deferReply({
        ephermal: false,
      })
      .catch(() => {})
  
    const cmd = client.slashCommands.get(interaction.commandName)
    const args = []
    try {
      for (let option of interaction.options.data) {
        if (option.type === "SUB_COMMAND") {
          if (option.name) args.push(option.name)
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value)
          })
        } else if (option.value) args.push(option.value)
      }
      interaction.member = interaction.guild.members.cache.get(
        interaction.user.id
      )
      const Err = new MessageEmbed()
        .setTitle("Error!")
        .setColor("RED")
        .setDescription(
          "Some Error Occurred while executing the Command.\nDetails of this error are listed below:"
        )

      if (cmd) {
        if (!interaction.member.permissions.has(cmd.userPerms || [])) {
          Err.addField(
            "Permission Error",
            `You need: \`${
              cmd.userPerms || []
            }\` Permission(s) to use this Command!`
          )

          return interaction.followUp({
            embeds: [Err],
          })
        } else if (!interaction.guild.me.permissions.has(cmd.botPerms || [])) {
          Err.addField(
            "Permission Error",
            `I require: \`${
              cmd.botPerms || []
            }\` Permission(s) to run this Command!`
          )

          return interaction.followUp({
            embeds: [Err],
          })
        }
      }

      if (cmd) {
        if (cmd.ownerOnly) {
          if (
            interaction.user.id !== "584684175035203605" &&
            interaction.user.id !== "621217072541597696"
          ) {
            Err.addField(
              "Permission Error",
              `This command is only made for Bot Owner! \`@Akshansh#2200\` & \` @Sanikava#2663\``
            )
            return interaction.followUp({
              embeds: [Err],
            })
          }
        }
      }

      if (cmd) {
        if (cmd.nsfw) {
          if (!interaction.channel.nsfw) {
            Err.addField(
              "Channel Allowance Error",
              `This command is \`Not Safe for Watch\`(NSFW).\nPlease mark this channel as \`NSFW_CHANNEL\` to use this command.`
            )
            return interaction.followUp({
              embeds: [Err],
            })
          }
        }
      }

      if (cmd) cmd.execute(client, interaction, args)
    } catch (err) {
      interaction.followUp({
        content: `Some Error Occurred! Please try again Later.\nIf this error continues kindly Ping @Akshansh#2200.`,
      })
      console.log(err)
    }
  }
})

client.on("interactionCreate", async (interaction) => {
  let sdjs = require("sanikava-djs")
  sdjs.btnclick(interaction, { credit: false })
})
