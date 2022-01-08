const { MessageEmbed } = require("discord.js")
const { TENOR_API_KEY } = require("../../settings/config.json")

// Set Tenor for GIFs:
const Tenor = require("tenorjs").client({
  Key: TENOR_API_KEY,
  Filter: "off",
  Locale: "en_US",
  MediaFilter: "minimal",
  DateFormat: "D/MM/YYYY - H:mm:ss A",
})

module.exports = {
  name: "kiss",
  description: "Gives a Random Anime Kiss GIF, kiss someone :)",
  type: "CHAT_INPUT",
  category: "anime",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "User whom you wanna kiss ❤️",
      type: "USER",
      required: true,
    },
  ],
  nsfw: true,
  execute: async (client, interaction, args) => {
    if (args[0] === interaction.user.id) {
      return interaction.followUp({
        content: "Why are you kissing yourself?",
      })
    }

    const user = interaction.user
    const taggedUser = client.users.cache.get(args[0])

    if (taggedUser.bot) {
      return interaction.followUp({
        content: "You cannot kiss bots! Silly hooman!!!",
      })
    }

    const embed = new MessageEmbed()
      .setTitle("Kiss~~~~")
      .setAuthor({
        name: client.user.tag,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(`*${user.tag} kisses ${taggedUser.tag}* UwU~~~`)
      .setFooter({
        text: "Powered by Tenor",
      })
      .setTimestamp()

    Tenor.Search.Random("Anime Kiss", "1").then((Results) => {
      embed.setImage(Results[0].media[0].gif.url)

      interaction.followUp({
        embeds: [embed],
      })
    })
  },
}
