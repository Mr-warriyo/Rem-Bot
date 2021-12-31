const client = require("../Rem")
const { Permissions, MessageEmbed } = require("discord.js")
// const PermsArray = require("../permissionArray.js")

client.on("interactionCreate", async (interaction) => {
  if (interaction.user.bot) return
  if (interaction.isCommand()) {
    await interaction
      .deferReply({
        ephemeral: false,
      })
      .catch(() => {})

    const cmd = client.slashCommands.get(interaction.commandName)
    if (!cmd) {
      return interaction.followUp({
        content:
          "Some error occurred, Try again later.\nPlease ping @Akshansh#2200, If this error continues.",
      })
    }
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
      const EPERM = new MessageEmbed()
        .setTitle("Error!")
        .setColor("RED")
        .setDescription(
          "Some Error Occurred while executing the Command.\nDetails of this error are listed below:"
        )

      if (cmd) {
        if (!interaction.member.permissions.has(cmd.userPerms || [])) {
          EPERM.addField(
            "Permission Error",
            `You need: \`${
              cmd.userPerms || []
            }\` Permission(s) to use this Command!`
          )

          return interaction.followUp({
            embeds: [EPERM],
          })
        } else if (!interaction.guild.me.permissions.has(cmd.botPerms || [])) {
          EPERM.addField(
            "Permission Error",
            `I require: \`${
              cmd.botPerms || []
            }\` Permission(s) to run this Command!`
          )

          return interaction.followUp({
            embeds: [EPERM],
          })
        }
      }

      if (cmd) {
        if (cmd.ownerOnly === true) {
          if (
            interaction.user.id !== "584684175035203605" &&
            interaction.user.id !== "621217072541597696"
          ) {
            EPERM.addField(
              "Permission Error",
              `This command is only made for Bot Owner! \`@Akshansh#2200\` & \` @Sanikava#2663\``
            )
            return interaction.followUp({
              embeds: [EPERM],
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
