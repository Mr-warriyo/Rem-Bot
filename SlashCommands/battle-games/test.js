const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const data = require("./move.json")

module.exports = {
  name: "test",
  description: "Test.",
  type: "CHAT_INPUT",
  category: "game_battle",
  execute: async (client, interaction, args) => {
    const names = data.map(({ name }) => name).join(" | ")

    const embed = new MessageEmbed()
      .setTitle("Characters")
      .setDescription("Choose your character! \n" + `${names}`)
      .setColor("ORANGE")
      .setFooter("FRIDAY")

    const row = new MessageActionRow()
    let fori
    for (fori = 0; fori < data.length; fori++) {
      row.addComponents(
        new MessageButton()
          .setCustomId(`${data[fori].name}`)
          .setLabel(`${data[fori].name}`)
          .setStyle("PRIMARY")
      )
      console.log(data[fori].name)
    }

    interaction.followUp({
      embeds: [embed],
      components: [row],
    })
  },
}
