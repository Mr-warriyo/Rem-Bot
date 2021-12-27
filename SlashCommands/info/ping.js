const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "ping",
  description: "returns bot ping",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "info",
  execute: async (client, interaction, args) => {
    const hello = await interaction.followUp({
      content: `🏓 | Calculating the Ping!`,
    })

    const PE = new MessageEmbed()
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Here's my Ping 🏓")
      .setColor("GREEN")
      .addField(
        "Ping:",
        `Bot's Latency is ${
          hello.createdTimestamp - interaction.createdTimestamp
        }ms.\nBot's ping is ${Math.round(client.ws.ping)}ms.`
      )
      .setTimestamp()

    await hello.edit({
      content: "Calculated!",
      embeds: [PE],
    })
  },
}
