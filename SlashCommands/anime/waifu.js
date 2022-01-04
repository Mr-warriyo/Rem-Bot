const randomanime = require("random-anime")
const Discord = require("discord.js")

module.exports = {
  name: "waifu",
  description: "Gives you a Random Waifu!(NSFW Command)",
  type: "CHAT_INPUT",
  category: "anime",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  nsfw: true,
  execute: async (client, interaction, args) => {
    const anime = randomanime.anime()
    const embed = new Discord.MessageEmbed()
      .setImage(anime)
      .setTitle("Waifu Generator")
      .setDescription("Here is a waifu for you!")
      .setTimestamp()
      .setColor("RANDOM")

    await interaction.followUp({
      embeds: [embed],
    })
  },
}
