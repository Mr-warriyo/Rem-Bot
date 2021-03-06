const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const battleModel = require("../../models/battleModel")

module.exports = {
  name: "battlestats",
  description:
    "Shows your Battle Card :)! It's all based on /battlestart command.",
  type: "CHAT_INPUT",
  category: "game:battle",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "Provide a User to check their battle card/stats!!",
      type: "USER",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    const userId = args[0] || interaction.member.id
    const member = interaction.guild.members.cache.get(userId)
    const guildId = interaction.guild.id
    const model = await battleModel.findOne({
      userId,
    })

    const em = new MessageEmbed()
      .setTitle(`Battle Card of ${member.user.tag}!`)
      .setColor("RANDOM")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })

    if (model) {
      em.addField("Wins:", `${model.wins}`)
      em.addField("Loses:", `${model.loses}`)
      em.addField("Total Games Played:", `${model.totalGamesPlayed}`)

      interaction.followUp({
        embeds: [em],
        content: `Here is ${member.user.tag}'s Battle Card!`
      })
    } else {
      em.addField("Wins:", `0`)
      em.addField("Loses:", `0`)
      em.addField("Total Games Played:", `0`)

      interaction.followUp({
        embeds: [em],
        content:
          `Here is your Battle Card! I think ${member.user.tag} never Played a game with me.\nTry \`/battlestart\` command once :)`,
      })
    }
  },
}
