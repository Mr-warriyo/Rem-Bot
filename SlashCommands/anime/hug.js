const { MessageEmbed } = require("discord.js")
const { TENOR_API_KEY } = require("../../settings/config.json")

// Set Tenor for GIFs:
const { client, Trending } = require("tenorjs")
client({
  Key: TENOR_API_KEY,
  Filter: "off",
  Locale: "en_US",
  MediaFilter: "minimal",
  DateFormat: "D/MM/YYYY - H:mm:ss A",
})

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
      return interaction.followUp({
        content: "Why are you hugging yourself?",
      })
    }

    const user = interaction.user
    const taggedUser = client.users.cache.get(args[0])

    if (taggedUser.bot) {
      return interaction.followUp({
        content: "You cannot hug bots! Silly hooman!!!",
      })
    }

    const embed = new MessageEmbed()
      .setTitle("Hug~~~~")
      .setAuthor({
        name: client.user.tag,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setColor("RANDOM")
      .setDescription(`*${user.tag} hugs ${taggedUser.tag}* UwU~~~`)
      .setFooter({
        text: "Powered by Tenor",
      })
      .setTimestamp()

    Trending.GIFs("1")
      .then(async (Results) => {
        Results.forEach((Post) => {
          console.log(`Item #${Post.id} (${Post.created}) @ ${Post.url}`)
        })
        await embed.setImage(Post.url)

        interaction.followUp({
          embeds: [embed],
        })
      })
      .catch(console.error)
  },
}
