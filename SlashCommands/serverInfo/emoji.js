const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "emojiinfo",
  description: "Get Info of a Emoji!!",
  type: "CHAT_INPUT",
  category: "serverInfo",
  botPerms: ["SEND_interactionS", "EMBED_LINKS"],
  options: [
    {
      name: "emoji",
      description:
        "Give a emoji or emojiId to get its info. Dont use `:`, Just enter plain name. Eg: hello",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    if (!args[0])
      return interaction.followUp(
        "a, aaa a \n a a aaa a \n _ _\n _ _ \na\ngive an emoji name or id"
      )

    let emoji = interaction.guild.emojis.cache.find(
      (emoji) =>
        emoji.name === args[0] ||
        emoji.id === args[0] ||
        emoji == args[0].replace(/([^\d])+/gim, "")
    )

    if (!emoji) return interaction.followUp("Invalid emoji")

    let a = null

    let x = "`"

    let galaxy
    let link

    let name = emoji.name

    let id = emoji.id

    let link1 = `https://cdn.discordapp.com/emojis/${id}`

    if (emoji.animated === true) {
      galaxy = `<a:${name}:${emoji.id}>`
      link = link1 + ".gif"
    } else {
      galaxy = `<:${name}:${emoji.id}>`
      link = link1 + ".png"
    }

    let mention = galaxy

    const b = new MessageEmbed()
      .setTitle(`Emoji info!`)
      .setThumbnail(link)
      .addFields(
        { name: "Emoji:", value: `${emoji}`, inline: false },
        {
          name: "Mention:",
          value: `${x}` + `${mention}` + `${x}`,
          inline: false,
        },
        { name: "Name:", value: `${x}` + `${name}` + `${x}`, inline: true },
        { name: "Id:", value: `${x}` + `${id}` + `${x}`, inline: true },
        {
          name: "Animated:",
          value: emoji.animated ? "Animated" : "Not Animated",
          inline: false,
        }
      )
      .setURL(link)
      .setColor("RANDOM")

    interaction.followUp({
      embeds: [b],
    })
  },
}
