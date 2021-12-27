const Discord = require("discord.js")
const { MessageEmbed } = Discord
module.exports = {
  name: "avatar",
  description:
    "Check the avatar of tagged user, if no user is tagged it shows your avatar!",
  type: "CHAT_INPUT",
  category: "info",
  botPerms: ["SEND_MESSAGES", "EMBED_LINKS"],
  options: [
    {
      name: "user",
      description: "Tag a user to see their avatar!",
      type: "USER",
      required: false,
    },
  ],
  execute: async (client, interaction, args) => {
    let user = interaction.user
    const u = interaction.options.get("user")
    if (!u) {
      const TU = new MessageEmbed()
        .setTitle("Here's the Avatar!")
        .setAuthor({
          name: user.tag,
          url: user.avatarURL({ dynamic: true }),
          iconURL: user.displayAvatarURL({ dynamic: true }),
        })
        .setImage(
          user.displayAvatarURL({
            dynamic: true,
            size: 1024,
          })
        )
        .setColor("RANDOM")

      interaction.followUp({
        embeds: [TU],
      })
    } else if (u) {
      const { user } = u
      const us = client.users.cache.get(user.id) || client.users.cache.get(u)
      const UT = new MessageEmbed()
        .setTitle("Here's the avatar")
        .setAuthor({
          name: us.tag,
          url: us.avatarURL({ dynamic: true }),
          iconURL: us.displayAvatarURL({ dynamic: true }),
        })
        .setImage(
          us.displayAvatarURL({
            dynamic: true,
            size: 1024,
          })
        )
        .setColor("RANDOM")

      interaction.followUp({
        embeds: [UT],
      })
    } else {
      interaction.followUp({
        content: `I cannot execute command because of some error, Try again Later!`,
      })
    }
  },
}
