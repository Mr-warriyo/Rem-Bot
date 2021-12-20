const { MessageEmbed, MessageButton } = require("discord.js")
const PE = require("discordjs-button-pagination")

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
        "Enter a Command name to see its info.\nTo see full help command enter `all` in this field.",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const { slashCommands } = client
    let cmdName = interaction.options.get("command").value

    const main = new MessageEmbed()
      .setTitle(`Help Command was Requested by: ${interaction.user.username}.`)
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor("WHITE")
      .setDescription(
        "```py \n{\n'Bot Name': '@ASTRO Support#7746', \n'Creator': '@Akshansh#2200', \n'Timeout of Help Command': '1 hour', 'Tip': 'Use the buttons below to move through Page.', \n} ```"
      )
      .addField(
        `
        Here's the Navigation Tutorial:
        `,
        `
        \nPage 1: \`Info(Current Page)\`
        \nPage 2: \`Mod Commands\`
        \nPage 3: \`Fun Commands\`
        \nPage 4: \`Server Commands\`
        \nPage 5: \`Info Commands\`
      `
      )
      .addField(
        `NOTE:`,
        "These all are Slash Commands, to use these you'll have to add a `/` before command. example: `/yourcmdname`"
      )

    const mod = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("MOD COMMANDS")
      .setDescription(
        "The Page contains MOD COMMANDS.\nThese can be used only by ones who have permissions."
      )

    const fun = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("FUN COMMANDS")
      .setDescription(
        "The Page contains FUN COMMANDS.\nTry these if you wanna play with your friends."
      )

    const info = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("INFO COMMANDS")
      .setDescription("The Page contains INFO COMMANDS.")

    const server = new MessageEmbed()
      .setAuthor(
        client.user.username,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle("SERVER COMMANDS")
      .setDescription("The Page contains SERVER COMMANDS.")

    const button1 = new MessageButton()
      .setCustomId("prev")
      .setLabel("Previous Page")
      .setStyle("PRIMARY")

    const button2 = new MessageButton()
      .setCustomId("next")
      .setLabel("Next Page")
      .setStyle("PRIMARY")

    const pages = [main, mod, fun, info]

    const buttonList = [button1, button2]

    slashCommands.each(({ name, description, category }) => {
      if (category === "mod") {
        mod.addField(`**Name**: ${name}`, `**Description**: ${description}`)
      } else if (category === "fun") {
        funMusic.addField(
          `**Name**: ${name}`,
          `**Description**: ${description}`
        )
      } else if (category === "info") {
        info.addField(`**Name**: ${name}`, `**Description**: ${description}`)
      } else if (category === "server") {
        server.addField(`**Name**: ${name}`, `**Description**: ${description}`)
      } else {
        console.log(`UNKOWN CATEGORY: ${name}`)
      }
    })

    if (cmdName.toLowerCase() === "all" || cmdName.toUpperCase() === "ALL") {
      await PE(interaction, pages, buttonList, "3600000")
    } else {
      let ressu = 0
      slashCommands.each(({ name, description, category }) => {
        if (name === cmdName) {
          const cmdInfo = new MessageEmbed()
            .setTitle(`Showing Info for: ${cmdName} command.`)
            .setAuthor(
              client.user.username,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("WHITE")
            .addField("Command Name:", name)
            .addField("Command Description:", description)
            .addField("Command Category:", category)
            .setFooter("NOTE: The command above is a Slash Command!")

          interaction.followUp({
            embeds: [cmdInfo],
          })
          ressu++
        }
      })
      if (ressu <= 0) {
        return interaction.followUp({
          content: `Command '${cmdName}' was not found or is Invalid.\nPlease use "/help" & enter command field as "all" to get available commands.`,
        })
      }
    }
  },
}
