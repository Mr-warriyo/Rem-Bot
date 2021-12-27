const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "suggest",
  description:
    "Suggest us anything you want to be added in ASTRO APP or our Community",
  type: "CHAT_INPUT",
  category: "server",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "suggestion",
      type: "STRING",
      description: "Type your Suggestion here!",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const suggestion = interaction.options.get("suggestion").value
    const user = interaction.user
    const server = interaction.guild
    const SugC = interaction.guild.channels.cache.get("885825509546676244")
    const SugE = new MessageEmbed()
      .setAuthor({
        name: client.user.username,
        url: client.user.avatarURL({ dynamic: true }),
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setColor("YELLOW")
      .setTitle("💡｜Here's a new Suggestion!")
      .setDescription(
        "Upvote/Devote the suggestion according to your choice!\nThe votes will decide wether suggestion is going to be selected or not!"
      )
      .addField("Suggestion:", `\n\n${suggestion}`)
      .setFooter(
        server.name,
        server.iconURL({
          dynamic: true,
        })
      )

    interaction.followUp({
      content: `Normal Users are not allowed to use this cmd yet!`,
    })

    /*
    interaction.followUp({
      content: `✅｜Your Suggestion was sent to ${SugC} Succesfully!\nNow, you just need to wait for the results!`,
    })

    const msg = await SugC.send({
      embeds: [SugE],
    })

    msg.react("✅")
    msg.react("❎")
*/
  },
}
