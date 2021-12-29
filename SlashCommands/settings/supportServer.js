const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { supportServer } = require("../../settings/config.json")

module.exports = {
  name: "supportserver",
  description: "Rem Bot's Support Discord Server Link.",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "settings",
  execute: async (client, interaction, args) => {
    const ss = new MessageEmbed()
      .setTitle("Support Server Link!")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("#FFC0CB")
      .setDescription(
        "Found some Spooky Bugs in the Bot or want to Join the Rem Bot's Community?\nThen, Bravo! you've used the right command!"
      )
      .setFooter("There are some other Important Links in form of Buttons!")

    const ssR = new MessageActionRow()
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
      .addComponents(
        new MessageButton()
          .setLabel("Github(Source Code)")
          .setStyle("LINK")
          .setURL("https://github.com/Mr-warriyo/Rem-Bot")
      )

    interaction.followUp({
      embeds: [ss],
      components: [ssR],
    })
  },
}
