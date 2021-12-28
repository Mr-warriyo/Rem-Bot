const { MessageEmbed } = require("discord.js")
const { ownerID } = require("../../settings/config.json")

module.exports = {
  name: "reportbug",
  description: "Report a Bug which you see in Bot :)",
  type: "CHAT_INPUT",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  category: "info",
  options: [
    {
      name: "bug",
      description: "Bug which you are facing!",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const ownerA = client.users.cache.get(ownerID[0])
    const bug = args[0]
    const user = interaction.user
    // ownerID[0] is of Akshansh#2200.

    const em = new MessageEmbed()
      .setTitle("Bug Report!")
      .setAuthor({
        name: user.tag,
        url: user.avatarURL({ dynamic: true }),
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(
        `${user.username}#${user.discriminator}(ID: ${user.id}) Reported a Bug!!`
      )
      .addField("Bug:", `${bug}`)
      .addField("Bug Reported By:", `${interaction.user.tag}`)
      .addField(
        "Server:",
        `Name: ${interaction.guild.name}\nID: ${interaction.guild.id}`
      )
      .setFooter("Reply to them :)")

    ownerA.send({
      embeds: [em],
    })
    interaction.followUp({
      content: `Reported \`${bug}\` to Owner! You'll get reply soon!!`,
    })
  },
}
