const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const { supportServer, github } = require("../../settings/config.json")

module.exports = {
  name: "implinks",
  description: "Important Links related to Bot.",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "settings",
  execute: async (client, interaction, args) => {
    const embed = new MessageEmbed()
      .setTitle("Important Links:")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(
        "Here are some Links which you may find helpfull If you're facing any errors with bot, want to support it or want to join bot's communtiy."
      )
      .setFooter({
        text: "Thanks for Using Me!",
      })

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setLabel("Rem's Discord Server")
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
          .setLabel("Github(src code)")
          .setStyle("LINK")
          .setURL(github)
      )

    interaction.followUp({
      embeds: [embed],
      components: [row],
    })
  },
}
