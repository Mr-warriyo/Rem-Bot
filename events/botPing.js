const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const client = require("../Rem")
const { supportServer } = require("../settings/config.json")

client.on("messageCreate", async (message) => {
  if (message.content.includes(client.user.id)) {
    const em = new MessageEmbed()
      .setTitle("Pong!")
      .setColor("RANDOM")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `I think you wanna use me. Try \`/help\`(A Slash Command) to get a List of available Commands.\n\nIf you're unable to see my Slash Command, check if I have \`APPLICATION COMMANDS\` Permission or Join My Support Server & get support with this Issue!`
      )

    const emR = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Discord Server")
          .setStyle("LINK")
          .setURL(supportServer)
      )
      .addComponents(
        new MessageButton()
          .setLabel("Top.gg")
          .setStyle("LINK")
          .setURL(`https://top.gg/bot/${client.user.id}`)
      )

    message.reply({
      embeds: [em],
      components: [emR],
      content: `${message.author} Just Pinged me :eyes:`,
    })
  }
})
