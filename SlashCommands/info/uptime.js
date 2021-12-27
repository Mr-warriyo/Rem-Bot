const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "uptime",
  description: "Tells the uptime of bot.",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "info",
  execute: async (client, interaction, args) => {
    let seconds = Math.floor(client.uptime / 1000)
    let minutes = Math.floor(seconds / 60)
    let hours = Math.floor(minutes / 60)
    let days = Math.floor(hours / 24)

    seconds %= 60
    minutes %= 60
    hours %= 24

    const UptimeEm = new MessageEmbed()
      .setTitle("Uptime of Bot:")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("WHITE")
      .setDescription(
        `Bot was last restarted: \`${days}\`: Days \`${hours}\`: Hours \`${minutes}\`: Minutes \`${seconds}\`: Seconds ago.`
      )
      .setTimestamp()

    await interaction.followUp({
      embeds: [UptimeEm],
    })
  },
}
