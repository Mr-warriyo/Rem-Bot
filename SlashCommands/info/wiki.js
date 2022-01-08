const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: "wiki",
  description: "Search something on wikipedia!",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "query",
      description: "Your Query/Search.",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const wiki = args[0]
    if (!wiki) return interaction.followUp("Provide A Query To Search.")
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      wiki
    )}`

    let response
    try {
      response = await fetch(url).then((res) => res.json())
    } catch (e) {
      console.log(e)
      return interaction.followUp("An Error Occured, Try Again.")
    }

    try {
      if (response.type === "disambiguation") {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(response.title)
          .setAuthor({
            name: user.tag,
            url: user.avatarURL({ dynamic: true }),
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setURL(response.content_urls.desktop.page)
          .setDescription([
            `
                ${response.extract}
                Links For Topic You Searched [Link](${response.content_urls.desktop.page}).`,
          ])

        interaction.followUp({
          embeds: [embed],
        })
      } else {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setTitle(response.title)
          .setAuthor({
            name: user.tag,
            url: user.avatarURL({ dynamic: true }),
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setURL(response.content_urls.desktop.page)
          .setThumbnail(response.thumbnail.source)
          .setDescription(response.extract)

        interaction.followUp({
          embeds: [embed],
        })
      }
    } catch {
      return interaction.followUp("Provide A Valid Query To Search.")
    }
  },
}
