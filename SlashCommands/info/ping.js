const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "ping",
  description: "returns websocket ping",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "info",
  execute: async (client, interaction, args) => {
    const PE = new MessageEmbed()
      .setAuthor(
        client.user.tag,
        client.user.displayAvatarURL({
          dynamic: true,
        })
      )
      .setTitle("Here's my Ping 🏓")
      .setColor("GREEN")
      .setDescription(`${client.ws.ping}ms!`)
      .setTimestamp()

    interaction.followUp({
      embeds: [PE],
    })
  },
}
