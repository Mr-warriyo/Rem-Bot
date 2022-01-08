const { MessageEmbed } = require("discord.js")

// Set GIPHY for GIFs:
const { setAPIKey, query, random } = require("gif-search")
const { GIPHY_API_KEY } = require("../../settings/config.json")
gifSearch.setAPIKey(GIPHY_API_KEY)

module.exports = {
  name: "hug",
  description: "Gives a Random Anime Hug GIF, hug someone :)",
  type: "CHAT_INPUT",
  category: "anime",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "User whom you wanna hug ❤️",
      type: "USER",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    if (args[0] === interaction.user.id) {
      return interaction.reply({
        content: "Why are you hugging yourself?",
      })
    }

    const user = interaction.user
    const taggedUser = interaction.guild.members.cache.get(args[0])

    const embed = new MessageEmbed()
      .setTitle("Hug~~~~")
      .setAuthor({
        name: user.tag,
        url: user.avatarURL({ dynamic: true }),
        iconURL: user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(`*${user} hugs ${taggedUser}* UwU~~~`)
      .setFooter("Powered by GIPHY")
      .setTimestamp()

    gifSearch.random("cat").then(async (gifUrl) => {
      await embed.setImage(gifUrl)
    })

    await interaction.followUp({
      embeds: [embed],
    })
  },
}
