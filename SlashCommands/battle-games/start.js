const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const start = require("./BattleFuncs/battleStartFuncs.js")

module.exports = {
  name: "startbattle",
  description: "Start the Battle between you & the Bot!",
  type: "CHAT_INPUT",
  category: "game:battle",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (client, interaction, args) => {

    const BattleBeginEm = new MessageEmbed()
      .setTitle("The Battle has begun!")
      .setColor("#00FFF")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription(
        `Started the battle between Bot & You! More Details are Provided below:`
      )
      .addField(
        "Players:",
        `
        1. ${client.user.tag}\n2. ${interaction.user.tag}
        `
      )
      .addField(
        "Info:",
        `
        Use the buttons Provided below to do Random Damage to Bot. Bot will do the same to you. After each move done by you & bot, embed will be updated to the latest HP & Damage. *Random Attack Button will do a Random Attack(either Kick or Punch)*.
        \nThe Attacks do a damage between 0 to 200.
        \nBoth of the Players will get 800 HP, easy to take down each other? Maybe.
        `
      )

    start(interaction, BattleBeginEm)
  },
}
