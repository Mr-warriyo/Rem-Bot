const { MessageEmbed } = require("discord.js")
const { ownerID } = require("../../settings/config.json")

module.exports = {
  name: "reportbug",
  description: "Report a Bug which you find in Bot :)",
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
    const { user } = interaction
    
    /**
     * ownerID[0] is first ID of array
     * check settings/config.json
     * or settings/test_config.json
     */

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
