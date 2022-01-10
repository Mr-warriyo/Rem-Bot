const Discord = require("discord.js")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "reactionrole",
  description:
    "Reaction Role creator. There can be 1 to 5 Reaction Roles. To add more ReactionRoles use cmd again.",
  type: "CHAT_INPUT",
  category: "mod",
  userPerms: ["ADMINISTRATOR", "SEND_MESSAGES", "EMBED_LINKS"],
  botPerms: ["ADMINISTRATOR", "SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "role1",
      type: "STRING",
      description: "Role ID Number: 1",
      required: true,
    },
    {
      name: "role2",
      type: "STRING",
      description: "Role ID Number: 2",
      required: false,
    },
    {
      name: "role3",
      type: "STRING",
      description: "Role ID Number: 3",
      required: false,
    },
    {
      name: "role4",
      type: "STRING",
      description: "Role ID Number: 4",
      required: false,
    },
    {
      name: "role5",
      type: "STRING",
      description: "Role ID Number: 5",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    const RoleButton = new MessageActionRow()

    const RoleEmbed = new MessageEmbed()
      .setTitle("Self Roles!")
      .setColor("RANDOM")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription("Tap on Right Buttons, to get those Roles!")
      .addField(
        "Rules:",
        "\nTapping on Button 1st Time adds the role.\nTapping on Button 2nd Time removes the role.\n"
      )
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      })

    for (let i = 0; i < interaction.options.data.length; i++) {
      //loop starts

      const role = interaction.guild.roles.cache.get(args[i])

      if (!role) {
        return interaction.followUp({
          content: `No Role has the Role ID provided by you! ${args[i]}`,
        })
      }
      if (args[i] == args[i + 1])
        return interaction.followUp({
          content: `You Used same ID 2 times remove one! ${args[i]} & ${
            args[i + 1]
          }`,
        })
    } //loop end

    if (args[0]) {
      RoleButton.addComponents(
        new Discord.MessageButton()
          .setLabel(`@${interaction.guild.roles.cache.get(args[0]).name}`)
          .setStyle("DANGER")
          .setCustomId(`role-${args[0]}`)
      )
    }

    if (args[1]) {
      RoleButton.addComponents(
        new Discord.MessageButton()
          .setLabel(`@${interaction.guild.roles.cache.get(args[1]).name}`)
          .setStyle("DANGER")
          .setCustomId(`role-${args[1]}`)
      )
    }

    if (args[2]) {
      RoleButton.addComponents(
        new Discord.MessageButton()
          .setLabel(`@${interaction.guild.roles.cache.get(args[2]).name}`)
          .setStyle("DANGER")
          .setCustomId(`role-${args[2]}`)
      )
    }

    if (args[3]) {
      RoleButton.addComponents(
        new Discord.MessageButton()
          .setLabel(`@${interaction.guild.roles.cache.get(args[3]).name}`)
          .setStyle("DANGER")
          .setCustomId(`role-${args[3]}`)
      )
    }

    if (args[4]) {
      RoleButton.addComponents(
        new Discord.MessageButton()
          .setLabel(`@${interaction.guild.roles.cache.get(args[4]).name}`)
          .setStyle("DANGER")
          .setCustomId(`role-${args[4]}`)
      )
    }

    await interaction.followUp({
      embeds: [RoleEmbed],
      components: [RoleButton],
    })
  },
}
