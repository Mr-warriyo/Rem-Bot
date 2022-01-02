const { MessageEmbed } = require("discord.js")
const economyModel = require("../../models/economyModel.js")

module.exports = {
  name: "balance",
  description: "Check your or other user's balance",
  type: "CHAT_INPUT",
  category: "economy",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "Provide a User to check their balance!!",
      type: "USER",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    const userId = args[0] || interaction.member.id
    const member = interaction.guild.members.cache.get(userId)

    if (member.user.bot) {
      interaction.followUp({
        content: `A Bot Cannot Play Me! baka!!`,
      })
    } else {
      const a = await economyModel.findOne({
        userId,
      })

      const FootTips = [
        "Use /starteconomy to start Playing Economy!",
        "zachs is a currency.",
        "/starteconomy can give you extra zachs in special cases!",
      ]

      const ranFT = FootTips[Math.floor(Math.random() * FootTips.length)]

      const balEm = new MessageEmbed()
        .setTitle(`Showing ${member.user.tag}'s Balance:`)
        .setAuthor({
          name: client.user.username,
          url: client.user.avatarURL({ dynamic: true }),
          iconURL: client.user.displayAvatarURL({ dynamic: true }),
        })
        .setFooter({
          text: ranFT,
        })

      if (!a) {
        balEm.setDescription(
          `${member.user.tag} has not started Playing economy yet! ${member.user.tag} use \`/starteconomy\` to start Playing!`
        )
        balEm.setColor("RED")

        interaction.followUp({
          embeds: [balEm],
        })
      } else {
        balEm.setDescription(`${member.user.tag} has \`${a.zachs}\` zachs.`)
        balEm.setColor("GREEN")

        interaction.followUp({
          embeds: [balEm],
        })
      }
    }
  },
}
