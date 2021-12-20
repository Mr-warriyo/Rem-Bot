const Discord = require("discord.js")
const { MessageEmbed } = Discord

module.exports = {
  name: "sudo",
  description: "Updated version of say command! Try to see the magic 😉",
  type: "CHAT_INPUT",
  category: "fun",
  options: [
    {
      name: "user",
      description: "mention a user!",
      type: "USER",
      required: true,
    },
    {
      name: "text",
      description: "type some text",
      type: "STRING",
      required: true,
    },
  ],
  execute: async (client, interaction, args) => {
    const u = interaction.options.get("user")
    const t = interaction.options.get("text")

    if (u && t) {
      const { user } = u
      const uu = client.users.cache.get(user.id)
      const tt = t.value

      interaction.channel
        .createWebhook(uu.username, {
          avatar: uu.displayAvatarURL({
            dynamic: true,
          }),
        })
        .then((webhook) => {
          webhook.send(tt)
          setTimeout(() => {
            webhook.delete()
          }, 2000)
        })

      interaction.followUp({
        content: "✅｜Command was successfully Executed!",
      })
    }
  },
}
