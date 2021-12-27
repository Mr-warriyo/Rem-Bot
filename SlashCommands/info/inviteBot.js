const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Invite Rem Bot to your Server!",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (client, interaction, args) => {
    const invEm = new MessageEmbed()
      .setColor("#FFC0CB")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `Want your server to be full of Amazing things? Invite Rem Bot now!\nIt's Main Features are: \`Global Chat\` & \`ChatBot\`. It can also create \`Reaction Roles\`, \`Moderate your server\` & comes with variety of \`Gaming\`, \`Fun\` & \`Simple Commands!\``
      )
      .setImage(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))

    const invR = new MessageActionRow()

    const b1 = invR.addComponents(
      new MessageButton()
        .setLabel("Invite Me!")
        .setStyle("LINK")
        .setURL(`https://top.gg/bot/${client.user.id}`)
    )

    interaction.followUp({
      embeds: [invEm],
      components: [invR],
    })
  },
}
