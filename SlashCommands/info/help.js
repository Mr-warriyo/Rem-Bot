const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "help",
  description: "Contains Info of all available commands.",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "command",
      description:
        "Enter a Command name to see its info.\nDo not enter anything in this field to get all available cmds.",
      type: "STRING",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    const { slashCommands } = client
    const cmdName = args[0]

    if (!cmdName) {
      let serverInfo = ""
      let info = ""
      let fun = ""
      let battle = ""
      let mod = ""
      let mainFeatures = ""
      let settings = ""
      slashCommands.each(({ category, name }) => {
        if (category === "serverInfo") {
          return (serverInfo = serverInfo + `\`/${name}\`, `)
        } else if (category === "info") {
          return (info = info + `\`/${name}\`, `)
        } else if (category === "fun") {
          return (fun = fun + `\`/${name}\`, `)
        } else if (category === "game:battle") {
          return (battle = battle + `\`/${name}\`, `)
        } else if (category === "mod") {
          return (mod = mod + `\`/${name}\`, `)
        } else if (category === "mainFeatures") {
          return (mainFeatures = mainFeatures + `\`/${name}\`, `)
        } else if (category === "settings") {
          return (settings = settings + `\`/${name}\`, `)
        }
      })

      const mainPage = new MessageEmbed()
        .setTitle("Help Command")
        .setAuthor({
          name: client.user.username,
          url: client.user.avatarURL({ dynamic: true }),
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setColor("RANDOM")
        .setDescription(
          `Bot Name: ${client.user.tag}, \nCreator: @Akshansh#2200`
        )
        .addField(
          ":information_source: Server Info Commands:",
          `\n${serverInfo}`
        )
        .addField(":information_source: Info:", `\n${info}`)
        .addField(":laughing: Fun:", `\n${fun}`)
        .addField(":crossed_swords: Battle Commands:", `\n${battle}`)
        .addField(":exclamation: Mod:", `\n${mod}`)
        .addField(":trophy: Main Features:", `\n${mainFeatures}`)
        .addField(":gear: Settings:", `\n${settings}`)
        .setFooter({
          text: "Info: Use `/help cmd-name` to know more about that commamd.",
        })

      interaction.followUp({
        embeds: [mainPage],
      })
    } else {
      let ressu = 0
      slashCommands.each(
        ({ name, description, category, userPerms, botPerms }) => {
          if (name === cmdName) {
            const cmdInfo = new MessageEmbed()
              .setTitle(`Showing Info for \`/${cmdName}\` command.`)
              .setAuthor({
                name: client.user.username,
                url: client.user.avatarURL({ dynamic: true }),
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
              })
              .setColor("WHITE")
              .addField("Command Name:", name)
              .addField("Command Description:", description)
              .addField("Command Category:", category)
              .addField("Required Perms(User):", `${userPerms || "NONE"}`)
              .addField("Required Perms(Bot):", `${botPerms || "NONE"}`)
              .setFooter({
                text: "NOTE: The above command is a Slash Command!!",
              })

            interaction.followUp({
              embeds: [cmdInfo],
            })
            ressu++
          }
        }
      )
      if (ressu <= 0) {
        return interaction.followUp({
          content: `Command \`/${cmdName}\` was not found or is Invalid.\nPlease use \`/help\` to get available commands.`,
        })
      }
    }
  },
}
