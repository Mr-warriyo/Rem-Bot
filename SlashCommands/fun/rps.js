const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
  name: "rps",
  description: "Rock Paper Scissors! You v/s me. Let the Game begin!",
  type: "CHAT_INPUT",
  category: "fun",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  execute: async (client, interaction, args) => {
    const em = new MessageEmbed()
      .setTitle("Rock Paper Scissors")
      .setColor("WHITE")
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setDescription("The Game has begun!!")
      .addField("Players:", `${interaction.user.tag} v/s ${client.user.tag}`)
      .setFooter("Use Buttons to Select your Choice!")

    const rpsR = new MessageActionRow()

    const rock = rpsR.addComponents(
      new MessageButton()
        .setLabel("ROCK")
        .setStyle("SECONDARY")
        .setEmoji("🗻")
        .setCustomId("🗻")
    )

    const paper = rpsR.addComponents(
      new MessageButton()
        .setLabel("PAPER")
        .setStyle("PRIMARY")
        .setEmoji("📄")
        .setCustomId("📄")
    )

    const scissors = rpsR.addComponents(
      new MessageButton()
        .setLabel("SCISSORS")
        .setStyle("DANGER")
        .setEmoji("✂️")
        .setCustomId("✂️")
    )

    const msg = await interaction.followUp({
      embeds: [em],
      components: [rpsR],
    })

    const choices = [
      "🗻",
      "✂️",
      "📄",
      "🗻",
      "📄",
      "✂️",
      "🗻",
      "🗻",
      "✂️",
      "📄",
      "🗻",
      "✂️",
    ]
    const botChoice = choices[Math.floor(Math.random() * choices.length)]

    const filter = (i) => {
      return (
        ["🗻", "✂️", "📄"].includes(i.customId) &&
        i.user.id === interaction.user.id
      )
    }

    //  const filter = (i) => i.user.id === interaction.user.id

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 40000,
    })

    collector.on("collect", async (i) => {
      let lose = new MessageEmbed()
        .setTitle("Result")
        .addField(`${interaction.user.tag}'s Choice`, `${i.customId}`)
        .addField(`${client.user.tag}'s Choice`, `${botChoice}`)
        .addField("Result", "You Lost. Better Luck Next Time")
        .setTimestamp()

      let tie = new MessageEmbed()
        .setTitle("Result")
        .addField(`${interaction.user.tag}'s Choice`, `${i.customId}`)
        .addField(`${client.user.tag}'s Choice`, `${botChoice}`)
        .addField(
          "Result",
          "Shit! It's a tie! I think we should do another duel"
        )
        .setTimestamp()

      let won = new MessageEmbed()
        .setTitle("Result")
        .addField(`${interaction.user.tag}'s Choice`, `${i.customId}`)
        .addField(`${client.user.tag}'s Choice`, `${botChoice}`)
        .addField("Result", "You Won. GG! want another duel?")
        .setTimestamp()

      if (
        (botChoice === "🗻" && i.customId === "✂️") ||
        (botChoice === "✂️" && i.customId === "📄") ||
        (botChoice === "📄" && i.customId === "🗻")
      ) {
        await msg.edit({
          embeds: [lose],
          components: [],
        })
        collector.stop()
      } else if (botChoice === i.customId) {
        await msg.edit({
          embeds: [tie],
          components: [],
        })
        collector.stop()
      } else {
        await msg.edit({
          embeds: [won],
          components: [],
        })
        collector.stop()
      }
    })

    collector.on("end", async (collected) => {
      if (collected.size <= 0) {
        await msg.edit({
          content: `User did not select anything! Battle Ended.`,
          embeds: [],
          components: [],
        })
      }
    })
  },
}
