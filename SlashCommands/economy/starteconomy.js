const { MessageEmbed } = require("discord.js")
const economyModel = require("../../models/economyModel")

module.exports = {
  name: "economystart",
  description: "Start Playing Economy!",
  type: "CHAT_INPUT",
  category: "economy",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (client, interaction, args) => {
    const member = interaction.member
    const userId = interaction.user.id

    const zachs = Math.floor(Math.random() * 500)

    const a = await economyModel.findOne({
      userId,
    })

    const Em = new MessageEmbed()
      .setTitle(`Setting up ${member.user.tag}'s Account:`)
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })

    if (!a) {
      await economyModel.create({
        userId,
        zachs,
      })

      Em.setDescription(`Your Account was successfully Created/Started!`)
      Em.addField("Tips:", `\n=> Check your balance via \`/balance\` command!`)
      Em.setFooter({
        text: `You got ${zachs} zachs for Starting your Account! use /balance command to check your balance!!`,
      })
      Em.setColor("GREEN")

      interaction.followUp({
        embeds: [Em],
      })
    } else {
      Em.setDescription(`You have already started your Account!`)
      Em.setFooter({
        text: `Tip: Use /balance command to check your balance!`,
      })
      Em.setColor("RED")

      interaction.followUp({
        embeds: [Em],
      })
    }
  },
}
